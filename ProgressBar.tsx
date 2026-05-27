interface ProgressBarProps {
  value: number;
  max?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export default function ProgressBar({ value, max = 100, color = 'bg-blue-500', size = 'md', showLabel = true, label }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'md' ? 'h-2.5' : 'h-4';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-slate-500">{label}</span>
          <span className="text-xs font-semibold text-slate-700">{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className={`w-full ${heightClass} bg-slate-100 rounded-full overflow-hidden`}>
        <div 
          className={`${heightClass} ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
