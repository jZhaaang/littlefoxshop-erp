import { Modal } from './Modal';
import { Spinner } from './Spinner';

type ConfirmDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => Promise<void>;
};

type LoadingDialogProps = {
  open: boolean;
  text: string;
};

export function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onCancel,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      title={title}
      widthClassName="max-w-md"
      footer={
        <>
          <button
            className="rounded-lg border px-4 py-2 hover:bg-gray-50"
            onClick={() => onCancel()}
          >
            {cancelText}
          </button>
          <button
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:opacity-90"
            onClick={() => onConfirm()}
          >
            {confirmText}
          </button>
        </>
      }
      onClose={onCancel}
    >
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </Modal>
  );
}

export function LoadingDialog({ open, text }: LoadingDialogProps) {
  return (
    <Modal
      open={open}
      title={text}
      widthClassName="max-w-sm"
      onClose={() => {}}
    >
      <div className="flex items-center gap-3 py-2">
        <Spinner className="h-6 w-6" />
        <span className="text-sm text-gray-700">{text}</span>
      </div>
    </Modal>
  );
}
