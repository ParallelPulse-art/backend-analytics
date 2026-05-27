interface HeatmapDataPoint {
  x: string;
  y: string;
  value: number;
  label?: string;
}

interface Props {
  data: HeatmapDataPoint[];
  title: string;
  subtitle?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
  colorScheme?: 'blue' | 'red' | 'green' | 'purple' | 'amber';
}

export default function HeatmapChart({
  data,
  title,
  subtitle,
  xAxisLabel = 'X Axis',
  yAxisLabel = 'Y Axis',
  colorScheme = 'blue',
}: Props) {
  const xValues = [...new Set(data.map((d) => d.x))];
  const yValues = [...new Set(data.map((d) => d.y))];

  const getColor = (value: number, max: number) => {
    const ratio = value / max;
    const colors = {
      blue: [
        '#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6',
        '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A',
      ],
      red: [
        '#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444',
        '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D',
      ],
      green: [
        '#DCFCE7', '#BBEF63', '#86EFAC', '#4ADE80', '#22C55E',
        '#16A34A', '#15803D', '#166534', '#14532D',
      ],
      purple: [
        '#F3E8FF', '#E9D5FF', '#D8B4FE', '#C084FC', '#A855F7',
        '#9333EA', '#7E22CE', '#6B21A8', '#581C87',
      ],
      amber: [
        '#FEFCE8', '#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24',
        '#F59E0B', '#D97706', '#B45309', '#92400E',
      ],
    };

    const colorArray = colors[colorScheme];
    const index = Math.min(Math.floor(ratio * colorArray.length), colorArray.length - 1);
    return colorArray[index];
  };

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));

  const getDataPoint = (x: string, y: string) => {
    return data.find((d) => d.x === x && d.y === y);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>

      <div className="overflow-x-auto mb-6">
        <div className="inline-block min-w-full">
          {/* Y-axis label */}
          <div className="flex">
            {/* Corner cell */}
            <div className="w-20 h-12 flex items-center justify-center border border-slate-200 bg-slate-50">
              <span className="text-xs font-semibold text-slate-600">{yAxisLabel}</span>
            </div>

            {/* X-axis headers */}
            {xValues.map((x) => (
              <div
                key={`header-${x}`}
                className="h-12 w-20 flex items-center justify-center border border-slate-200 bg-slate-50"
              >
                <span className="text-xs font-semibold text-slate-600 text-center">{x}</span>
              </div>
            ))}
          </div>

          {/* Heatmap rows */}
          {yValues.map((y) => (
            <div key={`row-${y}`} className="flex">
              {/* Y-axis label */}
              <div className="w-20 h-20 flex items-center justify-center border border-slate-200 bg-slate-50">
                <span className="text-xs font-semibold text-slate-600 text-center">{y}</span>
              </div>

              {/* Data cells */}
              {xValues.map((x) => {
                const point = getDataPoint(x, y);
                const bgColor = point ? getColor(point.value, maxValue) : '#F9FAFB';

                return (
                  <div
                    key={`cell-${x}-${y}`}
                    className="w-20 h-20 border border-slate-200 flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow group relative"
                    style={{ backgroundColor: bgColor }}
                  >
                    {point && (
                      <>
                        <span className="text-sm font-semibold text-slate-900">{point.value}</span>
                        <div className="absolute hidden group-hover:block bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-slate-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                          {point.label || `${x}: ${point.value}`}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <span className="font-medium text-slate-600">Value Range:</span>
        <div className="flex items-center gap-2">
          <span className="text-slate-600">{minValue}</span>
          <div className="flex gap-1">
            {Array.from({ length: 9 }).map((_, i) => {
              const colors = {
                blue: ['#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A'],
                red: ['#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D'],
                green: ['#DCFCE7', '#BBEF63', '#86EFAC', '#4ADE80', '#22C55E', '#16A34A', '#15803D', '#166534', '#14532D'],
                purple: ['#F3E8FF', '#E9D5FF', '#D8B4FE', '#C084FC', '#A855F7', '#9333EA', '#7E22CE', '#6B21A8', '#581C87'],
                amber: ['#FEFCE8', '#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#B45309', '#92400E'],
              };
              return (
                <div
                  key={`legend-${i}`}
                  className="w-6 h-6 border border-slate-300"
                  style={{ backgroundColor: colors[colorScheme][i] }}
                />
              );
            })}
          </div>
          <span className="text-slate-600">{maxValue}</span>
        </div>
      </div>
    </div>
  );
}
