interface QuickRepliesProps {
  options: string[];
  onSelect: (value: string) => void;
  disabled?: boolean;
}

export function QuickReplies({ options, onSelect, disabled = false }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          className="rounded-full border border-primary-600 px-3 py-1 text-xs font-medium text-primary-400 transition-all hover:bg-primary-600/15 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent"
          key={option}
          onClick={() => onSelect(option)}
          type="button"
          disabled={disabled}
        >
          {option}
        </button>
      ))}
    </div>
  );
}