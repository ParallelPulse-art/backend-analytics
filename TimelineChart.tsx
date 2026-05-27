import { AlertCircle, CheckCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description?: string;
  type: 'event' | 'milestone' | 'alert' | 'success' | 'warning';
  value?: number;
  change?: number;
  details?: Record<string, string | number>;
}

interface Props {
  data: TimelineEvent[];
  title: string;
  subtitle?: string;
  direction?: 'vertical' | 'horizontal';
}

export default function TimelineChart({
  data,
  title,
  subtitle,
  direction = 'vertical',
}: Props) {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case 'warning':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'milestone':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-slate-600" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'alert':
        return { bg: 'bg-rose-50', border: 'border-rose-200', badge: 'bg-rose-100 text-rose-700' };
      case 'success':
        return { bg: 'bg-emerald-50', border: 'border-emerald-200', badge: 'bg-emerald-100 text-emerald-700' };
      case 'warning':
        return { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700' };
      case 'milestone':
        return { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-100 text-blue-700' };
      default:
        return { bg: 'bg-slate-50', border: 'border-slate-200', badge: 'bg-slate-100 text-slate-700' };
    }
  };

  if (direction === 'horizontal') {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-min">
            {data.map((event, index) => {
              const colors = getEventColor(event.type);
              return (
                <div
                  key={event.id}
                  className={`flex-shrink-0 w-64 p-4 rounded-lg border-2 ${colors.border} ${colors.bg}`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    {getEventIcon(event.type)}
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-slate-900">{event.title}</p>
                      <p className="text-xs text-slate-500">{event.timestamp}</p>
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-sm text-slate-600 mb-3">{event.description}</p>
                  )}

                  {event.value !== undefined && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl font-bold text-slate-900">{event.value}</span>
                      {event.change !== undefined && (
                        <div className="flex items-center gap-1">
                          {event.change >= 0 ? (
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-rose-600" />
                          )}
                          <span
                            className={`text-sm font-medium ${
                              event.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {event.change > 0 ? '+' : ''}{event.change}%
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {event.details && (
                    <div className="text-xs space-y-1 text-slate-600">
                      {Object.entries(event.details).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-slate-500">{key}:</span>
                          <span className="font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Vertical timeline
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>

      <div className="space-y-4">
        {data.map((event, index) => {
          const colors = getEventColor(event.type);
          return (
            <div key={event.id} className="flex gap-4">
              {/* Timeline marker */}
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center">
                  {getEventIcon(event.type)}
                </div>
                {index < data.length - 1 && (
                  <div className="w-1 h-12 bg-slate-200 my-2" />
                )}
              </div>

              {/* Event content */}
              <div className={`flex-1 p-4 rounded-lg border ${colors.border} ${colors.bg} mt-1`}>
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div>
                    <p className="font-semibold text-slate-900">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.timestamp}</p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${colors.badge}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>

                {event.description && (
                  <p className="text-sm text-slate-600 mb-3">{event.description}</p>
                )}

                {event.value !== undefined && (
                  <div className="flex items-center gap-4 mb-3">
                    <div>
                      <p className="text-xs text-slate-500">Value</p>
                      <p className="text-lg font-bold text-slate-900">{event.value}</p>
                    </div>
                    {event.change !== undefined && (
                      <div className="flex items-center gap-1">
                        {event.change >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-rose-600" />
                        )}
                        <span
                          className={`text-sm font-medium ${
                            event.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                          }`}
                        >
                          {event.change > 0 ? '+' : ''}{event.change}%
                        </span>
                      </div>
                    )}
                  </div>
                )}

                {event.details && (
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    {Object.entries(event.details).map(([key, value]) => (
                      <div key={key} className="p-2 bg-white/50 rounded border border-slate-100">
                        <p className="text-slate-500 mb-1">{key}</p>
                        <p className="font-medium text-slate-900">{value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
