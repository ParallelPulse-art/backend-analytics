import { useState } from 'react';
import { 
  Activity, AlertTriangle, CheckCircle, Clock, Server, 
  Zap, Settings, TrendingUp
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import DataTable from './DataTable';
import AnalysisBadge from './AnalysisBadge';
import NudgeCard from './NudgeCard';
import StatusBadge from './StatusBadge';

type AnalysisType = 'Descriptive' | 'Diagnostic' | 'Predictive' | 'Prescriptive';

// SPM Data
const successFailureData = [
  { day: 'Mon', success: 1245, failure: 55, rate: 95.8 },
  { day: 'Tue', success: 1356, failure: 44, rate: 96.9 },
  { day: 'Wed', success: 1189, failure: 111, rate: 91.5 },
  { day: 'Thu', success: 1423, failure: 77, rate: 94.9 },
  { day: 'Fri', success: 1298, failure: 102, rate: 92.7 },
  { day: 'Sat', success: 987, failure: 113, rate: 89.7 },
  { day: 'Sun', success: 756, failure: 144, rate: 84.0 },
];

const serviceVolumeData = [
  { service: 'Cash Deposit', volume: 4500, fill: '#3B82F6' },
  { service: 'Fund Transfer', volume: 3800, fill: '#8B5CF6' },
  { service: 'Bill Payment', volume: 2900, fill: '#10B981' },
  { service: 'Airtime', volume: 2100, fill: '#F59E0B' },
  { service: 'Card Services', volume: 1200, fill: '#EC4899' },
  { service: 'Account Services', volume: 800, fill: '#6366F1' },
];

const responseCodeData = [
  { code: '200', label: 'Success', count: 8542, percentage: 85.4, color: '#10B981' },
  { code: '201', label: 'Created', count: 542, percentage: 5.4, color: '#3B82F6' },
  { code: '400', label: 'Bad Request', count: 423, percentage: 4.2, color: '#F59E0B' },
  { code: '401', label: 'Unauthorized', count: 198, percentage: 2.0, color: '#F97316' },
  { code: '500', label: 'Server Error', count: 156, percentage: 1.6, color: '#EF4444' },
  { code: '503', label: 'Unavailable', count: 89, percentage: 0.9, color: '#DC2626' },
  { code: 'TIMEOUT', label: 'Timeout', count: 50, percentage: 0.5, color: '#7C3AED' },
];

const vendorPerformanceData = [
  { vendor: 'Vendor A', successRate: 98.2, latency: 120, volume: 4500, status: 'healthy' },
  { vendor: 'Vendor B', successRate: 94.5, latency: 250, volume: 3200, status: 'warning' },
  { vendor: 'Vendor C', successRate: 89.1, latency: 450, volume: 2800, status: 'critical' },
  { vendor: 'Vendor D', successRate: 97.8, latency: 150, volume: 3800, status: 'healthy' },
  { vendor: 'Vendor E', successRate: 92.3, latency: 320, volume: 1900, status: 'warning' },
];

const failurePatternData = [
  { time: '00:00', service1: 2, service2: 1, service3: 3 },
  { time: '04:00', service1: 5, service2: 8, service3: 12 },
  { time: '08:00', service1: 3, service2: 2, service3: 4 },
  { time: '12:00', service1: 8, service2: 15, service3: 6 },
  { time: '16:00', service1: 12, service2: 10, service3: 8 },
  { time: '20:00', service1: 6, service2: 4, service3: 5 },
];

const channelFailureData = [
  { channel: 'Mobile App', failures: 234, total: 5000, rate: 4.7 },
  { channel: 'Web Portal', failures: 189, total: 4500, rate: 4.2 },
  { channel: 'USSD', failures: 456, total: 3000, rate: 15.2 },
  { channel: 'POS', failures: 78, total: 2000, rate: 3.9 },
  { channel: 'API', failures: 45, total: 8000, rate: 0.6 },
];

const latencyData = [
  { service: 'Cash Deposit', p50: 120, p90: 350, p99: 800 },
  { service: 'Fund Transfer', p50: 250, p90: 600, p99: 1200 },
  { service: 'Bill Payment', p50: 180, p90: 450, p99: 900 },
  { service: 'Airtime', p50: 90, p90: 200, p99: 500 },
  { service: 'Card Services', p50: 300, p90: 700, p99: 1500 },
];

const failureTrendData = [
  { week: 'W1', failures: 120, successRate: 95.2 },
  { week: 'W2', failures: 135, successRate: 94.8 },
  { week: 'W3', failures: 142, successRate: 94.5 },
  { week: 'W4', failures: 128, successRate: 95.0 },
  { week: 'W5', failures: 156, successRate: 93.8 },
  { week: 'W6', failures: 168, successRate: 93.2 },
  { week: 'W7', failures: 145, successRate: 94.2 },
  { week: 'W8', failures: 132, successRate: 94.8 },
];

const rootCauseData = [
  { cause: 'Network Timeout', count: 234, percentage: 28.5, trend: 'up' },
  { cause: 'Invalid Parameters', count: 189, percentage: 23.0, trend: 'down' },
  { cause: 'Insufficient Funds', count: 156, percentage: 19.0, trend: 'stable' },
  { cause: 'Authentication Failed', count: 98, percentage: 11.9, trend: 'down' },
  { cause: 'Service Unavailable', count: 78, percentage: 9.5, trend: 'up' },
  { cause: 'Rate Limited', count: 45, percentage: 5.5, trend: 'up' },
  { cause: 'Other', count: 21, percentage: 2.6, trend: 'stable' },
];

export default function SPMModule() {
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisType>('Descriptive');

  const renderDescriptive = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 bg-emerald-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">System Health Overview</h3>
        <span className="text-sm text-slate-500">How reliable is the system?</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Success Rate"
          value="94.2%"
          change={1.5}
          changeLabel="improved from yesterday"
          icon={<CheckCircle className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <MetricCard
          title="Failure Rate"
          value="5.8%"
          change={-1.5}
          changeLabel="decreased from yesterday"
          icon={<AlertTriangle className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-rose-500 to-red-600"
        />
        <MetricCard
          title="Total Transactions"
          value="52,340"
          change={8.2}
          changeLabel="this week"
          icon={<Activity className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
        <MetricCard
          title="Avg Response Time"
          value="245ms"
          change={-12}
          changeLabel="improved latency"
          icon={<Clock className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-violet-500 to-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Success vs Failure Rate" subtitle="Daily transaction outcomes">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={successFailureData}>
                <defs>
                  <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="failureGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend />
                <Area type="monotone" dataKey="success" stroke="#10B981" fill="url(#successGrad)" strokeWidth={2} name="Success" />
                <Area type="monotone" dataKey="failure" stroke="#EF4444" fill="url(#failureGrad)" strokeWidth={2} name="Failure" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Service-wise Transaction Volume" subtitle="Most used services">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceVolumeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis dataKey="service" type="category" tick={{ fontSize: 11 }} stroke="#94a3b8" width={100} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="volume" radius={[0, 4, 4, 0]}>
                  {serviceVolumeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Response Code Distribution" subtitle="What errors are occurring?" fullWidth>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3">
            {responseCodeData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-16 text-xs font-mono font-medium text-slate-700">{item.code}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-600">{item.label}</span>
                    <span className="text-sm font-semibold text-slate-900">{item.count.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.percentage}%`, backgroundColor: item.color }} />
                  </div>
                </div>
                <span className="text-xs text-slate-500 w-12 text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={responseCodeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="count"
                >
                  {responseCodeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ChartCard>

      <ChartCard title="Vendor/Channel Performance" subtitle="Who is performing well/poorly?" fullWidth>
        <DataTable
          columns={[
            { key: 'vendor', label: 'Vendor', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
            { key: 'successRate', label: 'Success Rate', align: 'center', render: (v) => (
              <div className="flex items-center justify-center gap-2">
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${v >= 95 ? 'bg-emerald-500' : v >= 90 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${v}%` }} />
                </div>
                <span className={`text-xs font-semibold ${v >= 95 ? 'text-emerald-600' : v >= 90 ? 'text-amber-600' : 'text-rose-600'}`}>{v}%</span>
              </div>
            )},
            { key: 'latency', label: 'Avg Latency', align: 'right', render: (v) => (
              <span className={`font-mono text-xs ${v > 400 ? 'text-rose-600' : v > 200 ? 'text-amber-600' : 'text-emerald-600'}`}>{v}ms</span>
            )},
            { key: 'volume', label: 'Volume', align: 'right', render: (v) => <span className="text-slate-700">{v.toLocaleString()}</span> },
            { key: 'status', label: 'Status', align: 'center', render: (v) => <StatusBadge status={v} /> },
          ]}
          data={vendorPerformanceData}
        />
      </ChartCard>
    </div>
  );

  const renderDiagnostic = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 bg-amber-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">Failure Analysis</h3>
        <span className="text-sm text-slate-500">Where & Why are failures occurring?</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Failure Pattern by Time" subtitle="Where are failures concentrated?">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failurePatternData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend />
                <Bar dataKey="service1" stackId="a" fill="#3B82F6" name="Cash Deposit" />
                <Bar dataKey="service2" stackId="a" fill="#8B5CF6" name="Fund Transfer" />
                <Bar dataKey="service3" stackId="a" fill="#F59E0B" name="Bill Payment" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Peak Failure Time Analysis" subtitle="When failures occur most?">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failurePatternData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="service1" fill="#EF4444" name="Failures" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Root Cause Analysis" subtitle="Why failures occur?">
          <div className="space-y-3">
            {rootCauseData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-700 font-medium">{item.cause}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{item.count}</span>
                      <span className={`text-xs ${item.trend === 'up' ? 'text-rose-600' : item.trend === 'down' ? 'text-emerald-600' : 'text-slate-500'}`}>
                        {item.trend === 'up' ? '↑' : item.trend === 'down' ? '↓' : '→'}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${i < 2 ? 'bg-rose-500' : i < 4 ? 'bg-amber-500' : 'bg-slate-400'}`} 
                      style={{ width: `${item.percentage}%` }} 
                    />
                  </div>
                </div>
                <span className="text-xs text-slate-500 w-12 text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Channel/Device Failure Rate" subtitle="Which infrastructure is failing?">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={channelFailureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="channel" tick={{ fontSize: 11 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="rate" name="Failure Rate %" radius={[4, 4, 0, 0]}>
                  {channelFailureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.rate > 10 ? '#EF4444' : entry.rate > 5 ? '#F59E0B' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Latency Analysis" subtitle="Is delay causing failures?" fullWidth>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={latencyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="service" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" label={{ value: 'ms', angle: -90, position: 'insideLeft' }} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="p50" fill="#10B981" name="P50" radius={[4, 4, 0, 0]} />
              <Bar dataKey="p90" fill="#F59E0B" name="P90" radius={[4, 4, 0, 0]} />
              <Bar dataKey="p99" fill="#EF4444" name="P99" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );

  const renderPredictive = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 bg-purple-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">System Degradation Prediction</h3>
        <span className="text-sm text-slate-500">Will system degrade?</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Predicted Failure Rate"
          value="6.5%"
          change={12}
          changeLabel="next week forecast"
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-rose-500 to-red-600"
        />
        <MetricCard
          title="Expected Failures"
          value="~180"
          change={8}
          changeLabel="next week projection"
          icon={<AlertTriangle className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
        />
        <MetricCard
          title="Latency Trend"
          value="+15%"
          change={15}
          changeLabel="expected increase"
          icon={<Clock className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-purple-500 to-indigo-600"
        />
      </div>

      <ChartCard title="Failure Trend Analysis" subtitle="Failure count and success rate over time" fullWidth>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={failureTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} stroke="#94a3b8" domain={[90, 100]} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="failures" stroke="#EF4444" strokeWidth={2} name="Failure Count" dot={{ r: 4 }} />
              <Line yAxisId="right" type="monotone" dataKey="successRate" stroke="#10B981" strokeWidth={2} name="Success Rate %" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Service-wise Failure Forecast" subtitle="Predicted failure patterns by service" fullWidth>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={failurePatternData}>
              <defs>
                <linearGradient id="s1Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="s2Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="service1" stroke="#3B82F6" fill="url(#s1Grad)" strokeWidth={2} name="Cash Deposit" />
              <Area type="monotone" dataKey="service2" stroke="#8B5CF6" fill="url(#s2Grad)" strokeWidth={2} name="Fund Transfer" />
              <Area type="monotone" dataKey="service3" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.2} strokeWidth={2} name="Bill Payment" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );

  const renderPrescriptive = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 bg-emerald-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">Optimization Actions</h3>
        <span className="text-sm text-slate-500">What actions reduce failures?</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Services Needing Throttle"
          value="2"
          subtitle="USSD, Card Services"
          icon={<Zap className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
        />
        <MetricCard
          title="Vendors for Review"
          value="2"
          subtitle="Vendor C, Vendor E"
          icon={<Server className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-rose-500 to-red-600"
        />
        <MetricCard
          title="Load Balancing Actions"
          value="3"
          subtitle="recommended redistributions"
          icon={<Settings className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NudgeCard
          type="error"
          title="USSD Channel Critical"
          message="USSD failure rate at 15.2% (threshold: 5%). Immediate throttling recommended. Redirect traffic to Mobile App channel."
          action="Apply throttling"
        />
        <NudgeCard
          type="warning"
          title="Vendor C Performance Degraded"
          message="Vendor C success rate dropped to 89.1% with 450ms latency. Consider failover to Vendor A or D."
          action="Initiate failover"
        />
        <NudgeCard
          type="info"
          title="Load Balancing Suggestion"
          message="Card Services experiencing high P99 latency (1500ms). Redistribute 30% traffic from Vendor C to Vendor A."
          action="Apply suggestion"
        />
        <NudgeCard
          type="success"
          title="API Channel Optimal"
          message="API channel showing 0.6% failure rate with excellent latency. Consider increasing API traffic allocation."
          action="View optimization"
        />
      </div>

      <ChartCard title="Vendor/Device Recommendations" subtitle="What needs improvement?" fullWidth>
        <DataTable
          columns={[
            { key: 'vendor', label: 'Vendor', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
            { key: 'currentLoad', label: 'Current Load', align: 'center', render: (v) => `${v}%` },
            { key: 'recommended', label: 'Recommended', align: 'center', render: (v) => (
              <span className="font-semibold text-blue-600">{v}%</span>
            )},
            { key: 'action', label: 'Action', render: (v) => (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                v === 'Increase' ? 'bg-emerald-50 text-emerald-700' : 
                v === 'Decrease' ? 'bg-rose-50 text-rose-700' : 
                'bg-slate-50 text-slate-700'
              }`}>
                {v}
              </span>
            )},
            { key: 'priority', label: 'Priority', align: 'center', render: (v) => (
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                v === 'High' ? 'bg-rose-50 text-rose-700' : 
                v === 'Medium' ? 'bg-amber-50 text-amber-700' : 
                'bg-slate-50 text-slate-700'
              }`}>
                {v}
              </span>
            )},
          ]}
          data={[
            { vendor: 'Vendor A', currentLoad: 35, recommended: 45, action: 'Increase', priority: 'High' },
            { vendor: 'Vendor B', currentLoad: 25, recommended: 20, action: 'Decrease', priority: 'Medium' },
            { vendor: 'Vendor C', currentLoad: 22, recommended: 10, action: 'Decrease', priority: 'High' },
            { vendor: 'Vendor D', currentLoad: 12, recommended: 20, action: 'Increase', priority: 'Medium' },
            { vendor: 'Vendor E', currentLoad: 6, recommended: 5, action: 'Maintain', priority: 'Low' },
          ]}
        />
      </ChartCard>

      <ChartCard title="Service Throttling Rules" subtitle="Recommended controls by service" fullWidth>
        <DataTable
          columns={[
            { key: 'service', label: 'Service', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
            { key: 'currentRate', label: 'Current Rate', align: 'center' },
            { key: 'threshold', label: 'Threshold', align: 'center' },
            { key: 'status', label: 'Status', align: 'center', render: (v) => <StatusBadge status={v} /> },
            { key: 'action', label: 'Action Required', render: (v) => (
              <span className={`text-xs px-2 py-1 rounded-full ${
                v === 'Throttle' ? 'bg-rose-50 text-rose-700' : 
                v === 'Monitor' ? 'bg-amber-50 text-amber-700' : 
                'bg-emerald-50 text-emerald-700'
              }`}>
                {v}
              </span>
            )},
          ]}
          data={[
            { service: 'USSD', currentRate: '15.2%', threshold: '5%', status: 'critical', action: 'Throttle' },
            { service: 'Card Services', currentRate: '8.5%', threshold: '5%', status: 'warning', action: 'Monitor' },
            { service: 'Mobile App', currentRate: '4.7%', threshold: '5%', status: 'healthy', action: 'Normal' },
            { service: 'Web Portal', currentRate: '4.2%', threshold: '5%', status: 'healthy', action: 'Normal' },
            { service: 'API', currentRate: '0.6%', threshold: '2%', status: 'healthy', action: 'Normal' },
          ]}
        />
      </ChartCard>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Analysis Type Selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-slate-900">Analysis Type</h3>
            <p className="text-sm text-slate-500">Select analysis view to explore different insights</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['Descriptive', 'Diagnostic', 'Predictive', 'Prescriptive'] as AnalysisType[]).map((type) => (
              <AnalysisBadge
                key={type}
                type={type}
                size="md"
                active={activeAnalysis === type}
                onClick={() => setActiveAnalysis(type)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Content */}
      {activeAnalysis === 'Descriptive' && renderDescriptive()}
      {activeAnalysis === 'Diagnostic' && renderDiagnostic()}
      {activeAnalysis === 'Predictive' && renderPredictive()}
      {activeAnalysis === 'Prescriptive' && renderPrescriptive()}
    </div>
  );
}
