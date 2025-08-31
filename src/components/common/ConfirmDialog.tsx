import { Modal } from './Modal';

type ConfirmProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
};

export function ConfirmDialog({
  open,
  title = 'Are you sure?',
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onCancel,
  onConfirm,
}: ConfirmProps) {
  return (
    <Modal
      open={open}
      onClose={onCancel}
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
    >
      {description && <p className="text-sm text-gray-600">{description}</p>}
    </Modal>
  );
}
