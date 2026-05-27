import { useMemo } from 'react';

interface Props {
  value: number;
  min?: number;
  max?: number;
  title: string;
  subtitle?: string;
  unit?: string;
  thresholds?: {
    low: number;
    medium: number;
    high: number;
  };
  size?: 'sm' | 'md' | 'lg';
}

export default function GaugeChart({
  value,
  min = 0,
  max = 100,
  title,
  subtitle,
  unit = '%',
  thresholds = { low: 33, medium: 66, high: 100 },
  size = 'md',
}: Props) {
  const percentage = ((value - min) / (max - min)) * 100;

  const getStatus = () => {
    if (value <= thresholds.low) return { status: 'Critical', color: 'text-rose-600', bg: '#FEE2E2' };
    if (value <= thresholds.medium) return { status: 'Warning', color: 'text-amber-600', bg: '#FEF3C7' };
    return { status: 'Healthy', color: 'text-emerald-600', bg: '#DCFCE7' };
  };

  const sizeClasses = {
    sm: { container: 'w-40 h-40', needle: 'w-2', arc: 'w-32' },
    md: { container: 'w-56 h-56', needle: 'w-3', arc: 'w-48' },
    lg: { container: 'w-72 h-72', needle: 'w-4', arc: 'w-64' },
  };

  const status = getStatus();
  const rotation = (percentage * 180) / 100;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex flex-col items-center justify-center py-8">
        {/* Gauge */}
        <div className={`relative ${sizeClasses[size].container} mb-8`}>
          {/* Background arcs */}
          <svg
            className={`absolute inset-0 ${sizeClasses[size].arc}`}
            viewBox="0 0 200 120"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Low risk arc (green) */}
            <path
              d="M 10 110 A 90 90 0 0 1 46 25"
              fill="none"
              stroke="#10B981"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Medium risk arc (amber) */}
            <path
              d="M 46 25 A 90 90 0 0 1 154 25"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* High risk arc (red) */}
            <path
              d="M 154 25 A 90 90 0 0 1 190 110"
              fill="none"
              stroke="#EF4444"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </svg>

          {/* Needle */}
          <div
            className={`absolute left-1/2 top-full ${sizeClasses[size].needle} h-16 bg-slate-900 rounded-full transform -translate-x-1/2 -translate-y-1/2 origin-top transition-transform duration-500`}
            style={{
              transform: `translateX(-50%) translateY(-50%) rotate(${rotation - 90}deg)`,
            }}
          />

          {/* Center circle */}
          <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-slate-900 rounded-full z-10" />
        </div>

        {/* Value display */}
        <div className="text-center mb-6">
          <div className="text-5xl font-bold text-slate-900">
            {value}
            <span className="text-2xl text-slate-500 ml-1">{unit}</span>
          </div>
          <p className="text-sm text-slate-500 mt-2">Range: {min} - {max}</p>
        </div>

        {/* Status */}
        <div
          className="px-4 py-2 rounded-lg font-medium text-sm"
          style={{ backgroundColor: status.bg }}
        >
          <span className={status.color}>{status.status}</span>
        </div>
      </div>

      {/* Threshold indicators */}
      <div className="mt-8 bg-slate-50 rounded-lg p-4">
        <p className="text-xs font-semibold text-slate-600 uppercase mb-3">Thresholds</p>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full" />
              <span className="text-slate-600">Optimal</span>
            </div>
            <span className="font-medium text-slate-900">&gt; {thresholds.medium}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span className="text-slate-600">Warning</span>
            </div>
            <span className="font-medium text-slate-900">{thresholds.low} - {thresholds.medium}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-rose-500 rounded-full" />
              <span className="text-slate-600">Critical</span>
            </div>
            <span className="font-medium text-slate-900">&lt; {thresholds.low}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
