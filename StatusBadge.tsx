interface StatusBadgeProps {
  status: 'healthy' | 'warning' | 'critical' | 'inactive';
  label?: string;
  size?: 'sm' | 'md';
}

const statusConfig = {
  healthy: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: 'Healthy' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500', label: 'Warning' },
  critical: { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-500', label: 'Critical' },
  inactive: { bg: 'bg-slate-50', text: 'text-slate-600', dot: 'bg-slate-400', label: 'Inactive' }
};

export default function StatusBadge({ status, label, size = 'sm' }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center gap-1.5 ${config.bg} ${config.text} rounded-full font-medium ${
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1.5 text-sm'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {label || config.label}
    </span>
  );
}
