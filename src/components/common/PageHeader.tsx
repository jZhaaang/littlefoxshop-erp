type PageHeaderProps = {
  title: string;
  description: string;
  buttonText?: string;
  onClick?: () => void;
};

export function PageHeader({
  title,
  description,
  buttonText,
  onClick,
}: PageHeaderProps) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
        <p className="text-slate-500">{description}</p>
      </div>
      {buttonText && (
        <button
          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700"
          onClick={onClick}
        >
          ＋ {buttonText}
        </button>
      )}
    </div>
  );
}
