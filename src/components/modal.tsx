import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  title: string;
  description?: JSX.Element;
  confirmBtn: {
    text: string;
    bgColor?: string;
    color?: string;
    hoverColor?: string;
  };
  cancelBtn: {
    text: string;
    bgColor?: string;
    color?: string;
    hoverColor?: string;
  };
  onConfirm: () => void;
  onCancel: () => void;
  children?: React.ReactNode;
};

export default function Modal({
  isOpen,
  title,
  description,
  confirmBtn,
  cancelBtn,
  onConfirm,
  onCancel,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  const defaultConfirmStyles = {
    color: "text-white",
    bgColor: "bg-red-600",
    hoverColor: "bg-red-700",
  };
  const defaultCancelStyles = {
    bgColor: "bg-gray-5",
    color: "text-white",
    hoverColor: "bg-gray-4",
  };
  const mergedConfirmStyles = { ...defaultConfirmStyles, ...confirmBtn };
  const mergeCancelStyles = { ...defaultCancelStyles, ...cancelBtn };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-dark-gray-3 rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-white text-xl mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{description}</p>
        <div className="mb-6">{children}</div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className={`${mergeCancelStyles.bgColor} ${mergeCancelStyles.color} hover:${mergeCancelStyles.hoverColor} px-4 py-2 rounded-lg transition-colors duration-200`}
          >
            {cancelBtn.text}
          </button>
          <button
            onClick={onConfirm}
            className={`${mergedConfirmStyles.bgColor} ${mergedConfirmStyles.color} hover:${mergedConfirmStyles.hoverColor} px-4 py-2 rounded-lg transition-colors duration-200`}
          >
            {confirmBtn.text}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
