'use client';

import { useCallback, useEffect, useState } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { getFirebaseMessaging } from '../lib/firebaseClient';

const VAPID_KEY = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!;

async function saveTokenToServer(token: string) {
  await fetch('/api/fcm/save-token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ token, ua: navigator.userAgent, platform: 'web' }),
  });
}

export default function FcmBootstrap() {
  const [perm, setPerm] = useState<NotificationPermission>(
    typeof window !== 'undefined' ? Notification.permission : 'default'
  );
  const [supported, setSupported] = useState(true);
  const isGranted = perm === 'granted';

  const requestPermission = useCallback(async () => {
    if (!('Notification' in window)) {
      setSupported(false);
      return;
    }
    const p = await Notification.requestPermission();
    setPerm(p);
  }, []);

  const ensureToken = useCallback(async () => {
    const messaging = await getFirebaseMessaging();
    if (!messaging) {
      setSupported(false);
      return;
    }
    const reg = await navigator.serviceWorker.register(
      '/firebase-messaging-sw.js',
      { scope: '/' }
    );
    const t = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: reg,
    });
    if (t) await saveTokenToServer(t);
  }, []);

  // 포그라운드 메시지
  useEffect(() => {
    (async () => {
      const messaging = await getFirebaseMessaging();
      if (!messaging) return;
      const off = onMessage(messaging, payload => {
        // TODO: 토스트/배지 등 UI
        console.debug('onMessage', payload);
      });
      return () => off();
    })();
  }, []);

  // 권한 허용되면 토큰 확보
  useEffect(() => {
    if (isGranted) ensureToken();
  }, [isGranted, ensureToken]);

  // SW로부터 클릭 메시지 수신
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'notification-click') {
        const url = e.data?.data?.url;
        if (url) window.location.href = url;
      }
    };
    navigator.serviceWorker.addEventListener('message', handler);
    return () =>
      navigator.serviceWorker.removeEventListener('message', handler);
  }, []);

  if (!supported) return null;

  return !isGranted ? (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-md border p-3 bg-amber-50">
      <b>알림을 켜주세요</b>
      <button
        onClick={requestPermission}
        className="ml-3 px-3 py-1 border rounded"
      >
        허용
      </button>
    </div>
  ) : null;
}
