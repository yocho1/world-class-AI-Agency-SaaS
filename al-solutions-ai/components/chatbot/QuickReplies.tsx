interface QuickRepliesProps {
  options: string[];
  onSelect: (value: string) => void;
}

export function QuickReplies({ options, onSelect }: QuickRepliesProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          className="rounded-full border border-primary-600 px-3 py-1 text-xs font-medium text-primary-400 hover:bg-primary-600/15"
          key={option}
          onClick={() => onSelect(option)}
          type="button"
        >
          {option}
        </button>
      ))}
    </div>
  );
}