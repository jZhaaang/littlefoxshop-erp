type SearchBarProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
};

export function SearchBar({ search, setSearch, placeholder }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 bg-white border rounded-xl px-3 py-2">
      <span className="text-slate-400">🔎</span>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={placeholder}
        className="w-full outline-none text-sm"
      />
    </div>
  );
}
