'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const url = 'http://localhost:4000/sse';
const withCredentials = true;

export default function Notification() {
  const [unread, setUnread] = useState(0);

  const lastPingAtRef = useRef<number>(Date.now());
  const reconnectAttemptRef = useRef(0);
  const esRef = useRef<EventSource | null>(null);
  const healthTimerRef = useRef<number | null>(null);

  const connect = useCallback(() => {
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
      // 자동 재연결 + 헬스체크로 보조
    };

    // 5초마다 헬스체크: 40초 이상 무응답이면 강제 재연결
    if (healthTimerRef.current) window.clearInterval(healthTimerRef.current);
    healthTimerRef.current = window.setInterval(() => {
      const silenceMs = Date.now() - lastPingAtRef.current;
      if (silenceMs > 40_000) {
        try {
          es.close();
        } catch {}
        reconnectAttemptRef.current += 1;
        connect();
      }
    }, 5_000);
  }, []);

  useEffect(() => {
    connect();
    return () => {
      if (healthTimerRef.current) window.clearInterval(healthTimerRef.current);
      if (esRef.current) esRef.current.close();
    };
  }, [connect]);

  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'hidden') {
        esRef.current?.close();
        esRef.current = null;
      } else {
        connect();
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [connect]);

  // ▼▼▼ 여기부터 UI (Tailwind 스타일) ▼▼▼
  return (
    <div className="flex items-center">
      <button
        type="button"
        aria-label={
          unread > 0 ? `You have ${unread} notifications` : 'Notifications'
        }
        className="
          relative inline-flex h-10 w-10 items-center justify-center
          rounded-full bg-white/80 text-zinc-700
          shadow-sm ring-1 ring-inset ring-zinc-200
          hover:bg-white hover:shadow transition
          focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2
          dark:bg-zinc-900/70 dark:text-zinc-200 dark:ring-zinc-700 dark:hover:bg-zinc-900 dark:hover:shadow
        "
        // onClick={() => setOpen((v) => !v)} // 패널 토글이 필요하면 사용
      >
        {/* Bell Icon (inline SVG) */}
        <svg
          aria-hidden="true"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M14.857 17.5H9.143c-1.657 0-3-1.343-3-3v-2.222c0-2.86 1.98-5.342 4.77-5.93a1 1 0 0 0 .787-.98V4.75a1.75 1.75 0 1 1 3.5 0v.618a1 1 0 0 0 .787.981c2.79.587 4.77 3.07 4.77 5.93V14.5c0 1.657-1.343 3-3 3Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M10 18.5a2 2 0 1 0 4 0"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Unread badge */}
        {unread > 0 && (
          <>
            {/* ping 효과 (부드럽게 주목) */}
            <span
              className="
                pointer-events-none absolute -right-0.5 -top-0.5 inline-flex h-5 w-5
                animate-ping rounded-full bg-rose-400/60
              "
              aria-hidden="true"
            />
            {/* 실제 배지 */}
            <span
              className="
                absolute -right-0.5 -top-0.5 inline-flex min-w-[1.25rem] h-5
                items-center justify-center rounded-full
                bg-rose-500 px-1 text-[11px] font-semibold leading-none text-white
                shadow ring-1 ring-white/70 dark:ring-zinc-900
              "
              aria-live="polite"
            >
              {unread > 99 ? '99+' : unread}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
