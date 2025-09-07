'use client';

import { useEffect, useRef, useState } from 'react';

const url = 'http://localhost:4000/sse';
const withCredentials = true;
export default function Notification() {
  const [unread, setUnread] = useState(0);

  const lastPingAtRef = useRef<number>(Date.now());
  const reconnectAttemptRef = useRef(0);
  const esRef = useRef<EventSource | null>(null);
  const healthTimerRef = useRef<number | null>(null);

  useEffect(() => {
    function connect() {
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }

      const es = new EventSource(url, { withCredentials });
      esRef.current = es;

      es.addEventListener('unread', ev => {
        const { unread } = JSON.parse((ev as MessageEvent).data);
        setUnread(unread);
        lastPingAtRef.current = Date.now();
      });

      es.addEventListener('ping', () => {
        lastPingAtRef.current = Date.now();
      });

      es.onopen = () => {
        reconnectAttemptRef.current = 0;
      };

      es.onerror = () => {
        // 브라우저가 자동 재연결을 시도하지만, 헬스체크로 보조 로직도 둠.
      };

      // 5초마다 헬스체크: 40초 이상 핑/이벤트가 없으면 강제 재연결
      if (healthTimerRef.current) window.clearInterval(healthTimerRef.current);
      healthTimerRef.current = window.setInterval(() => {
        const silenceMs = Date.now() - lastPingAtRef.current;
        console.log('silenceMs', silenceMs);
        if (silenceMs > 40_000) {
          // 강제 재연결
          try {
            es.close();
          } catch {}
          const attempt = ++reconnectAttemptRef.current;
          connect();
        }
      }, 5_000);
    }

    connect();

    return () => {
      if (healthTimerRef.current) window.clearInterval(healthTimerRef.current);
      if (esRef.current) esRef.current.close();
    };
  }, []);

  return <div>Notification Badge : {unread}</div>;
}
