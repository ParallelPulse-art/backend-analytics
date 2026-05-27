import { ReactNode, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, X, ChevronRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: ReactNode;
  color: string;
  subtitle?: string;
  details?: {
    label: string;
    value: string | number;
  }[];
  description?: string;
}

export default function MetricCard({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon, 
  color, 
  subtitle,
  details = [],
  description = ''
}: MetricCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === undefined || change === 0;

  return (
    <>
      <button
        onClick={() => setShowDetails(true)}
        className="w-full bg-white rounded-2xl p-5 border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 group cursor-pointer text-left"
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
            {icon}
          </div>
          <div className="flex items-center gap-2">
            {change !== undefined && (
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                isPositive ? 'bg-emerald-50 text-emerald-700' : 
                isNegative ? 'bg-rose-50 text-rose-700' : 
                'bg-slate-50 text-slate-600'
              }`}>
                {isPositive && <TrendingUp className="w-3 h-3" />}
                {isNegative && <TrendingDown className="w-3 h-3" />}
                {isNeutral && <Minus className="w-3 h-3" />}
                <span>{Math.abs(change)}%</span>
              </div>
            )}
            <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500 font-medium">{title}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
          {changeLabel && <p className="text-xs text-slate-400 mt-1">{changeLabel}</p>}
        </div>
      </button>

      {/* Detail Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className={`bg-gradient-to-r ${color} text-white p-6 flex items-start justify-between`}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                  {icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{title}</h2>
                  <p className="text-white/80 text-sm mt-1">{description || 'Detailed Analysis'}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Main Value Section */}
              <div className="bg-slate-50 rounded-2xl p-6 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">Current Value</p>
                    <p className="text-3xl font-bold text-slate-900">{value}</p>
                  </div>
                  {change !== undefined && (
                    <div>
                      <p className="text-slate-600 text-sm font-medium mb-1">Change</p>
                      <div className="flex items-baseline gap-2">
                        <p className={`text-3xl font-bold ${isPositive ? 'text-emerald-600' : isNegative ? 'text-rose-600' : 'text-slate-600'}`}>
                          {isPositive ? '+' : ''}{change}%
                        </p>
                        {isPositive && <TrendingUp className="w-6 h-6 text-emerald-600" />}
                        {isNegative && <TrendingDown className="w-6 h-6 text-rose-600" />}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Grid */}
              {details.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-slate-900 mb-4">Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {details.map((detail, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-xl p-4">
                        <p className="text-slate-600 text-sm font-medium mb-1">{detail.label}</p>
                        <p className="text-xl font-bold text-slate-900">{detail.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              {subtitle && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-blue-900 text-sm font-medium">Note</p>
                  <p className="text-blue-800 text-sm mt-1">{subtitle}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-6 flex justify-end gap-3">
              <button
                onClick={() => setShowDetails(false)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-900 font-medium hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
