type Tab = {
  key: string;
  label: string;
  icon?: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  value: string;
  onChange: (k: string) => void;
};

export function Tabs({ tabs, value, onChange }: TabsProps) {
  return (
    <div className="flex items-center gap-6 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`relative pb-3 -mb-px flex items-center gap-2 text-sm
            ${value === tab.key ? 'text-blue-600' : 'text-slate-600 hover:text-slate-900'}`}
        >
          {tab.icon}
          {tab.label}
          {value === tab.key && (
            <span className="absolute left-0 right-0 -bottom-[1px] h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
