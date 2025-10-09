import { useEffect, type ReactNode } from 'react';

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  widthClassName?: string;
  onClose: () => void;
};

export function Modal({
  open,
  title,
  children,
  footer,
  widthClassName = 'max-w-xl',
  onClose,
}: ModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`w-full ${widthClassName} rounded-2xl bg-white shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="border-b px-5 py-4">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        )}

        <div className="px-5 py-4">{children}</div>

        {footer && (
          <div className="border-t px-5 py-3 flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
