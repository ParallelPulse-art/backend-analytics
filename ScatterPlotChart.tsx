import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface ScatterDataPoint {
  name: string;
  x: number;
  y: number;
  z?: number;
  category?: string;
}

interface Props {
  data: ScatterDataPoint[];
  title: string;
  xAxisLabel: string;
  yAxisLabel: string;
  width?: number;
  height?: number;
  colors?: Record<string, string>;
}

export default function ScatterPlotChart({
  data,
  title,
  xAxisLabel,
  yAxisLabel,
  width,
  height = 400,
  colors = {},
}: Props) {
  const categories = [...new Set(data.map((d) => d.category || 'Default'))];
  const defaultColors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  const getColor = (category: string) => {
    return colors[category] || defaultColors[categories.indexOf(category) % defaultColors.length];
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 mt-1">
          {xAxisLabel} vs {yAxisLabel}
        </p>
      </div>

      <div style={{ width: width || '100%', height }}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis type="number" dataKey="x" name={xAxisLabel} tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis type="number" dataKey="y" name={yAxisLabel} tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip
              contentStyle={{
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
              }}
              formatter={(value: any) => value.toFixed(2)}
            />
            {categories.length > 1 && <Legend />}

            {categories.map((category, idx) => (
              <Scatter
                key={category}
                name={category}
                data={data.filter((d) => (d.category || 'Default') === category)}
                fill={getColor(category)}
                fillOpacity={0.6}
              />
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {categories.map((category) => {
          const categoryData = data.filter((d) => (d.category || 'Default') === category);
          const avgX = categoryData.reduce((sum, d) => sum + d.x, 0) / categoryData.length;
          const avgY = categoryData.reduce((sum, d) => sum + d.y, 0) / categoryData.length;

          return (
            <div key={category} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <p className="text-sm font-medium text-slate-900">{category}</p>
              <div className="text-xs text-slate-600 mt-2 space-y-1">
                <p>Avg {xAxisLabel}: {avgX.toFixed(2)}</p>
                <p>Avg {yAxisLabel}: {avgY.toFixed(2)}</p>
                <p>Points: {categoryData.length}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
