import { Modal } from './Modal';
import { Spinner } from './Spinner';

type LoadingModalProps = {
  open: boolean;
  text: string;
};

export function LoadingModal({ open, text }: LoadingModalProps) {
  return (
    <Modal
      open={open}
      onClose={() => {}}
      title={text}
      widthClassName="max-w-sm"
    >
      <div className="flex items-center gap-3 py-2">
        <Spinner className="h-6 w-6" />
        <span className="text-sm text-gray-700">{text}</span>
      </div>
    </Modal>
  );
}
