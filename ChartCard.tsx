import { ReactNode, useState } from 'react';
import { X, ChevronRight } from 'lucide-react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  action?: ReactNode;
  fullWidth?: boolean;
  details?: string;
  detailedContent?: ReactNode;
}

export default function ChartCard({ 
  title, 
  subtitle, 
  children, 
  action, 
  fullWidth,
  details = '',
  detailedContent
}: ChartCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const hasDetailsModal = details || detailedContent;

  return (
    <>
      <div className={`bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all duration-300 ${fullWidth ? 'col-span-full' : ''}`}>
        <div className="px-5 pt-5 pb-3 flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900">{title}</h3>
            {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          <div className="flex items-center gap-2">
            {action}
            {hasDetailsModal && (
              <button
                onClick={() => setShowDetails(true)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
                title="View details"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        <div className="px-5 pb-5">
          {children}
        </div>
      </div>

      {/* Detail Modal */}
      {showDetails && hasDetailsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold">{title}</h2>
                {subtitle && <p className="text-white/80 text-sm mt-1">{subtitle}</p>}
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
              {detailedContent ? (
                detailedContent
              ) : (
                <div className="text-slate-600">
                  <p>{details}</p>
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
