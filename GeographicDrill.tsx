import { useState } from 'react';
import { MapPin, ChevronDown, ChevronUp, TrendingUp, TrendingDown } from 'lucide-react';

interface RegionData {
  region: string;
  state?: string;
  city?: string;
  value: number;
  change: number;
  transactions?: number;
  agents?: number;
  percentage?: number;
  status?: 'high' | 'medium' | 'low';
  children?: RegionData[];
}

interface Props {
  data: RegionData[];
  title: string;
  subtitle?: string;
  metric?: string;
  expandable?: boolean;
}

export default function GeographicDrill({ data, title, subtitle, metric = 'Value', expandable = true }: Props) {
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());

  const toggleExpand = (region: string) => {
    const newSet = new Set(expandedRegions);
    if (newSet.has(region)) {
      newSet.delete(region);
    } else {
      newSet.add(region);
    }
    setExpandedRegions(newSet);
  };

  const renderRegionRow = (item: RegionData, level = 0, parentId = '') => {
    const itemId = `${parentId}-${item.region}`;
    const isExpanded = expandedRegions.has(itemId);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={itemId}>
        <div
          className={`flex items-center justify-between py-3 px-4 border-b border-slate-100 hover:bg-slate-50 transition-colors ${
            level > 0 ? 'bg-slate-50' : 'bg-white'
          }`}
          style={{ paddingLeft: `${16 + level * 24}px` }}
        >
          <div className="flex items-center gap-3 flex-1">
            {hasChildren && expandable && (
              <button
                onClick={() => toggleExpand(itemId)}
                className="p-1 hover:bg-slate-200 rounded transition-colors"
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-slate-600" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                )}
              </button>
            )}
            {!hasChildren && (
              <div className="w-6" />
            )}
            <MapPin className="w-4 h-4 text-slate-400" />
            <div>
              <p className="font-medium text-slate-900 text-sm">{item.region}</p>
              {item.city && (
                <p className="text-xs text-slate-500">{item.city}, {item.state}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-8 ml-4">
            <div className="text-right">
              <p className="font-semibold text-slate-900 text-sm">{item.value.toLocaleString()}</p>
              {item.percentage !== undefined && (
                <p className="text-xs text-slate-500">{item.percentage}%</p>
              )}
            </div>

            <div className="flex items-center gap-1">
              {item.change >= 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-600" />
              )}
              <span
                className={`text-sm font-medium ${
                  item.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {item.change > 0 ? '+' : ''}{item.change}%
              </span>
            </div>

            {item.status && (
              <div className="w-24 text-right">
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    item.status === 'high'
                      ? 'bg-emerald-100 text-emerald-700'
                      : item.status === 'medium'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)} Performance
                </span>
              </div>
            )}

            {item.transactions !== undefined && (
              <div className="w-32 text-right">
                <p className="text-sm text-slate-600">{item.transactions} txn</p>
                {item.agents !== undefined && (
                  <p className="text-xs text-slate-500">{item.agents} agents</p>
                )}
              </div>
            )}
          </div>
        </div>

        {hasChildren && isExpanded && expandable && (
          <div>
            {item.children!.map((child) =>
              renderRegionRow(child, level + 1, itemId)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="w-5 h-5 text-slate-400" />
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        </div>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="flex items-center justify-between py-3 px-4 bg-slate-50 border-b border-slate-200 sticky top-0">
            <div className="flex-1">
              <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Location</p>
            </div>
            <div className="flex items-center gap-8 ml-4">
              <div className="w-24 text-right">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{metric}</p>
              </div>
              <div className="w-20 text-right">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Trend</p>
              </div>
              <div className="w-24">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Status</p>
              </div>
              <div className="w-32 text-right">
                <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Details</p>
              </div>
            </div>
          </div>

          <div>
            {data.map((item) => renderRegionRow(item))}
          </div>
        </div>
      </div>
    </div>
  );
}
