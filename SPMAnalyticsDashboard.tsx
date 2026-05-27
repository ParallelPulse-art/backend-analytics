import { Activity, AlertTriangle, TrendingUp } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from './ChartCard';
import GeographicDrill from './GeographicDrill';
import ScatterPlotChart from './ScatterPlotChart';
import HeatmapChart from './HeatmapChart';
import GaugeChart from './GaugeChart';
import TimelineChart from './TimelineChart';

// Geographic performance data
const geographicPerformanceData = [
  {
    region: 'North',
    value: 96.2,
    change: 1.2,
    percentage: 25,
    status: 'high' as const,
    transactions: 8750,
    agents: 12,
    children: [
      { region: 'Delhi', state: 'Delhi', city: 'New Delhi', value: 97.5, change: 0.8, percentage: 13, status: 'high' as const, transactions: 4380, agents: 6 },
      { region: 'Punjab', state: 'Punjab', city: 'Chandigarh', value: 95.8, change: 1.5, percentage: 8, status: 'high' as const, transactions: 2680, agents: 3 },
      { region: 'Haryana', state: 'Haryana', city: 'Gurgaon', value: 94.2, change: 2.1, percentage: 4, status: 'high' as const, transactions: 1690, agents: 3 },
    ],
  },
  {
    region: 'South',
    value: 94.8,
    change: -0.5,
    percentage: 25,
    status: 'high' as const,
    transactions: 8920,
    agents: 11,
    children: [
      { region: 'Tamil Nadu', state: 'Tamil Nadu', city: 'Chennai', value: 96.1, change: 0.3, percentage: 12, status: 'high' as const, transactions: 3920, agents: 5 },
      { region: 'Telangana', state: 'Telangana', city: 'Hyderabad', value: 93.5, change: -1.2, percentage: 8, status: 'medium' as const, transactions: 2750, agents: 3 },
      { region: 'Karnataka', state: 'Karnataka', city: 'Bangalore', value: 92.8, change: -0.8, percentage: 5, status: 'medium' as const, transactions: 2250, agents: 3 },
    ],
  },
  {
    region: 'East',
    value: 91.5,
    change: -2.3,
    percentage: 24,
    status: 'medium' as const,
    transactions: 8420,
    agents: 9,
    children: [
      { region: 'West Bengal', state: 'West Bengal', city: 'Kolkata', value: 93.2, change: -1.5, percentage: 12, status: 'medium' as const, transactions: 3850, agents: 5 },
      { region: 'Bihar', state: 'Bihar', city: 'Patna', value: 89.8, change: -3.2, percentage: 8, status: 'medium' as const, transactions: 2680, agents: 2 },
      { region: 'Odisha', state: 'Odisha', city: 'Bhubaneswar', value: 88.5, change: -2.8, percentage: 4, status: 'low' as const, transactions: 1890, agents: 2 },
    ],
  },
  {
    region: 'West',
    value: 95.3,
    change: 0.9,
    percentage: 26,
    status: 'high' as const,
    transactions: 9280,
    agents: 10,
    children: [
      { region: 'Maharashtra', state: 'Maharashtra', city: 'Mumbai', value: 96.8, change: 1.2, percentage: 14, status: 'high' as const, transactions: 5520, agents: 6 },
      { region: 'Gujarat', state: 'Gujarat', city: 'Ahmedabad', value: 94.1, change: 0.5, percentage: 8, status: 'high' as const, transactions: 2200, agents: 2 },
      { region: 'Goa', state: 'Goa', city: 'Panaji', value: 91.2, change: 0.3, percentage: 4, status: 'medium' as const, transactions: 1560, agents: 2 },
    ],
  },
];

// Vendor Performance Scatter
const vendorScatterData = [
  { name: 'Vendor A', x: 98.2, y: 120, category: 'Excellent' },
  { name: 'Vendor B', x: 94.5, y: 250, category: 'Good' },
  { name: 'Vendor C', x: 89.1, y: 450, category: 'Fair' },
  { name: 'Vendor D', x: 97.8, y: 150, category: 'Excellent' },
  { name: 'Vendor E', x: 92.3, y: 320, category: 'Good' },
  { name: 'Vendor F', x: 85.5, y: 580, category: 'Poor' },
];

// Failure pattern heatmap
const failureHeatmapData = [
  { x: '00:00', y: 'Service1', value: 5 },
  { x: '00:00', y: 'Service2', value: 3 },
  { x: '00:00', y: 'Service3', value: 8 },
  { x: '06:00', y: 'Service1', value: 2 },
  { x: '06:00', y: 'Service2', value: 1 },
  { x: '06:00', y: 'Service3', value: 2 },
  { x: '12:00', y: 'Service1', value: 8 },
  { x: '12:00', y: 'Service2', value: 12 },
  { x: '12:00', y: 'Service3', value: 6 },
  { x: '18:00', y: 'Service1', value: 15 },
  { x: '18:00', y: 'Service2', value: 10 },
  { x: '18:00', y: 'Service3', value: 8 },
];

// Performance events
const performanceEvents = [
  {
    id: 'evt1',
    timestamp: 'Today 10:30 AM',
    title: 'Peak Performance',
    description: 'System achieved 99.2% success rate',
    type: 'success' as const,
    value: 99.2,
    details: { 'Transactions': '2450', 'Failures': '19', 'Services': '5' },
  },
  {
    id: 'evt2',
    timestamp: 'Today 2:00 PM',
    title: 'Vendor Issue Detected',
    description: 'Vendor C showing latency spike',
    type: 'alert' as const,
    value: 450,
    change: 45.5,
    details: { Vendor: 'Vendor C', Latency: '450ms', Threshold: '300ms' },
  },
  {
    id: 'evt3',
    timestamp: 'Yesterday 11:45 PM',
    title: 'Failure Resolved',
    description: 'Network timeout issue resolved',
    type: 'success' as const,
    details: { Type: 'Network Timeout', Duration: '12 mins', Impact: 'Low' },
  },
  {
    id: 'evt4',
    timestamp: 'Yesterday 8:15 PM',
    title: 'Maintenance Window',
    description: 'Scheduled maintenance completed',
    type: 'milestone' as const,
    details: { 'Start': '8:00 PM', 'End': '8:30 PM', 'Services': '3' },
  },
  {
    id: 'evt5',
    timestamp: '2 days ago 3:00 PM',
    title: 'SLA Breach Alert',
    description: 'Response time exceeded SLA for Service2',
    type: 'warning' as const,
    value: 2.1,
    details: { Service: 'Service2', SLA: '2s', Actual: '2.1s' },
  },
];

// Failure rate by channel
const channelFailureData = [
  { channel: 'Mobile App', failures: 234, total: 5000, rate: 4.7 },
  { channel: 'Web Portal', failures: 189, total: 4500, rate: 4.2 },
  { channel: 'USSD', failures: 456, total: 3000, rate: 15.2 },
  { channel: 'POS', failures: 78, total: 2000, rate: 3.9 },
  { channel: 'API', failures: 45, total: 8000, rate: 0.6 },
];

// Latency percentiles
const latencyData = [
  { week: 'W1', p50: 120, p90: 350, p99: 800 },
  { week: 'W2', p50: 125, p90: 370, p99: 850 },
  { week: 'W3', p50: 118, p90: 340, p99: 780 },
  { week: 'W4', p50: 122, p90: 355, p99: 810 },
];

export default function SPMAnalyticsDashboard() {
  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">System Performance Monitoring Analytics</h2>
        <p className="text-slate-500 mt-1">Detailed system health and performance analysis across regions</p>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200 shadow-sm">
          <p className="text-sm text-emerald-600 mb-2 font-medium">Success Rate</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">94.8%</span>
            <span className="text-sm text-emerald-600 font-medium">+0.9%</span>
          </div>
          <p className="text-xs text-emerald-600 mt-2">this week</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 shadow-sm">
          <p className="text-sm text-blue-600 mb-2 font-medium">Avg Latency</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">121ms</span>
            <span className="text-sm text-blue-600 font-medium">-2ms</span>
          </div>
          <p className="text-xs text-blue-600 mt-2">p50 latency</p>
        </div>
        <div className="bg-gradient-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-rose-200 shadow-sm">
          <p className="text-sm text-rose-600 mb-2 font-medium">Total Failures</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">589</span>
            <span className="text-sm text-rose-600 font-medium">-3.2%</span>
          </div>
          <p className="text-xs text-rose-600 mt-2">this week</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200 shadow-sm">
          <p className="text-sm text-purple-600 mb-2 font-medium">Healthy Vendors</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">4/6</span>
            <span className="text-sm text-purple-600 font-medium">67%</span>
          </div>
          <p className="text-xs text-purple-600 mt-2">operational</p>
        </div>
      </div>

      {/* Regional Performance Drill Down */}
      <GeographicDrill
        data={geographicPerformanceData}
        title="Regional Success Rate Analysis"
        subtitle="System success rates by region - Click to expand for state/city performance"
        metric="Success Rate %"
        expandable={true}
      />

      {/* Gauge Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GaugeChart
          value={94.8}
          max={100}
          title="System Success Rate"
          subtitle="Overall system reliability"
          thresholds={{ low: 80, medium: 90, high: 100 }}
        />
        <GaugeChart
          value={121}
          max={500}
          title="P50 Latency"
          subtitle="Median response time (ms)"
          unit="ms"
          thresholds={{ low: 200, medium: 350, high: 500 }}
        />
        <GaugeChart
          value={98}
          max={100}
          title="Uptime Score"
          subtitle="System availability"
          thresholds={{ low: 90, medium: 95, high: 100 }}
        />
      </div>

      {/* Vendor Performance Scatter */}
      <ScatterPlotChart
        data={vendorScatterData}
        title="Vendor Performance Analysis"
        xAxisLabel="Success Rate %"
        yAxisLabel="Latency (ms)"
        colors={{
          'Excellent': '#10B981',
          'Good': '#3B82F6',
          'Fair': '#F59E0B',
          'Poor': '#EF4444',
        }}
      />

      {/* Failure Pattern Heatmap */}
      <HeatmapChart
        data={failureHeatmapData}
        title="Failure Pattern Heatmap"
        subtitle="Failure distribution by service and time of day"
        xAxisLabel="Time"
        yAxisLabel="Service"
        colorScheme="red"
      />

      {/* Performance Timeline */}
      <TimelineChart
        data={performanceEvents}
        title="System Performance Events"
        subtitle="Recent system events, issues, and resolutions"
        direction="vertical"
      />

      {/* Channel Failure Analysis */}
      <ChartCard
        title="Failure Rate by Channel"
        subtitle="Comparing failure rates across different service channels"
        fullWidth
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelFailureData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="channel" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#94a3b8" label={{ value: 'Failure Count', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="#94a3b8" label={{ value: 'Failure Rate %', angle: 90, position: 'insideRight' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar yAxisId="left" dataKey="failures" fill="#EF4444" name="Failure Count" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="rate" fill="#F59E0B" name="Failure Rate %" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Latency Percentiles Trend */}
      <ChartCard
        title="Latency Percentiles Trend"
        subtitle="P50, P90, and P99 latency over weeks"
        fullWidth
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line type="monotone" dataKey="p50" stroke="#3B82F6" strokeWidth={2} name="P50" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="p90" stroke="#F59E0B" strokeWidth={2} name="P90" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="p99" stroke="#EF4444" strokeWidth={2} name="P99" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Response Code Distribution */}
      <ChartCard
        title="Response Code Distribution"
        subtitle="HTTP status codes and success/error patterns"
        fullWidth
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={[
                { code: '200', count: 8542, percentage: 85.4, color: '#10B981' },
                { code: '201', count: 542, percentage: 5.4, color: '#3B82F6' },
                { code: '400', count: 423, percentage: 4.2, color: '#F59E0B' },
                { code: '401', count: 198, percentage: 2.0, color: '#F97316' },
                { code: '5xx', count: 295, percentage: 2.9, color: '#EF4444' },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="code" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                {[
                  { code: '200', count: 8542, percentage: 85.4, color: '#10B981' },
                  { code: '201', count: 542, percentage: 5.4, color: '#3B82F6' },
                  { code: '400', count: 423, percentage: 4.2, color: '#F59E0B' },
                  { code: '401', count: 198, percentage: 2.0, color: '#F97316' },
                  { code: '5xx', count: 295, percentage: 2.9, color: '#EF4444' },
                ].map((entry, index) => (
                  <Bar key={`bar-${index}`} dataKey="count" fill={entry.color} radius={[4, 4, 0, 0]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
