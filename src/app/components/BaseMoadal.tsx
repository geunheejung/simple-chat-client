// components/modal/BaseModal.tsx
'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';
import { ReactNode, useCallback } from 'react';

type BaseModalProps = {
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void; // 전달 안 하면 router.back()
  closeOnBackdrop?: boolean; // 기본 true
  panelClassName?: string; // 패널 추가 스타일
  overlayClassName?: string; // 오버레이 추가 스타일
};

export default function BaseModal({
  title,
  children,
  footer,
  onClose,
  closeOnBackdrop = true,
  panelClassName,
  overlayClassName,
}: BaseModalProps) {
  const router = useRouter();
  const handleClose = useCallback(() => {
    if (onClose) onClose();
    else router.back();
  }, [onClose, router]);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40',
        overlayClassName
      )}
      onMouseDown={e => {
        if (!closeOnBackdrop) return;
        if (e.target === e.currentTarget) handleClose();
      }}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={clsx(
          'relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl ring-1 ring-black/5',
          panelClassName
        )}
      >
        {/* Header */}
        {(title || onClose !== undefined) && (
          <div className="mb-4 flex items-center justify-between">
            <div className="text-lg font-semibold text-zinc-900">{title}</div>
            <button
              type="button"
              aria-label="Close"
              onClick={handleClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              ✕
            </button>
          </div>
        )}
        {/* Body */}
        <div>{children}</div>
        {/* Footer */}
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}
