import { ReactNode } from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface NudgeCardProps {
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  action?: string;
  icon?: ReactNode;
}

const typeConfig = {
  info: { bg: 'bg-blue-50', border: 'border-blue-200', icon: Info, iconColor: 'text-blue-500' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', icon: AlertTriangle, iconColor: 'text-amber-500' },
  success: { bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle, iconColor: 'text-emerald-500' },
  error: { bg: 'bg-rose-50', border: 'border-rose-200', icon: AlertCircle, iconColor: 'text-rose-500' }
};

export default function NudgeCard({ type, title, message, action, icon }: NudgeCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`${config.bg} border ${config.border} rounded-xl p-4 flex gap-3`}>
      <div className="flex-shrink-0 mt-0.5">
        {icon || <Icon className={`w-5 h-5 ${config.iconColor}`} />}
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-900 text-sm">{title}</h4>
        <p className="text-sm text-slate-600 mt-1">{message}</p>
        {action && (
          <button className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1">
            {action} →
          </button>
        )}
      </div>
    </div>
  );
}
