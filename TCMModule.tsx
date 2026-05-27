import { useState } from 'react';
import { 
  Target, Users, BarChart3, Calendar,
  Zap, Activity
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadialBarChart, RadialBar
} from 'recharts';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import DataTable from './DataTable';
import AnalysisBadge from './AnalysisBadge';
import NudgeCard from './NudgeCard';

type AnalysisType = 'Descriptive' | 'Diagnostic' | 'Predictive' | 'Prescriptive';

// TCM Data
const dailyTrendData = [
  { day: 'Mon', transactions: 245, target: 280, achievement: 87.5 },
  { day: 'Tue', transactions: 312, target: 280, achievement: 111.4 },
  { day: 'Wed', transactions: 289, target: 280, achievement: 103.2 },
  { day: 'Thu', transactions: 198, target: 280, achievement: 70.7 },
  { day: 'Fri', transactions: 345, target: 280, achievement: 123.2 },
  { day: 'Sat', transactions: 156, target: 200, achievement: 78.0 },
  { day: 'Sun', transactions: 98, target: 150, achievement: 65.3 },
];

const weeklyTrendData = [
  { week: 'W1', transactions: 1650, target: 1800, achievement: 91.7 },
  { week: 'W2', transactions: 1820, target: 1800, achievement: 101.1 },
  { week: 'W3', transactions: 1590, target: 1800, achievement: 88.3 },
  { week: 'W4', transactions: 1950, target: 1800, achievement: 108.3 },
];

const hourlyDropData = [
  { hour: '6AM', txn: 12 }, { hour: '7AM', txn: 28 }, { hour: '8AM', txn: 65 },
  { hour: '9AM', txn: 89 }, { hour: '10AM', txn: 112 }, { hour: '11AM', txn: 98 },
  { hour: '12PM', txn: 45 }, { hour: '1PM', txn: 67 }, { hour: '2PM', txn: 89 },
  { hour: '3PM', txn: 78 }, { hour: '4PM', txn: 56 }, { hour: '5PM', txn: 34 },
  { hour: '6PM', txn: 23 }, { hour: '7PM', txn: 15 }, { hour: '8PM', txn: 8 },
];

const serviceMixData = [
  { name: 'Cash Deposit', value: 35, color: '#3B82F6' },
  { name: 'Fund Transfer', value: 28, color: '#8B5CF6' },
  { name: 'Bill Payment', value: 18, color: '#10B981' },
  { name: 'Airtime', value: 12, color: '#F59E0B' },
  { name: 'Others', value: 7, color: '#6B7280' },
];

const peerComparisonData = [
  { name: 'Agent A', score: 92, percentile: 95 },
  { name: 'Agent B', score: 85, percentile: 82 },
  { name: 'Agent C', score: 78, percentile: 68 },
  { name: 'Agent D', score: 71, percentile: 52 },
  { name: 'Agent E', score: 65, percentile: 38 },
  { name: 'Current', score: 72, percentile: 55 },
];

const rollingAvgData = [
  { week: 'W1', actual: 1800, expected: 1960, rolling: 1800 },
  { week: 'W2', actual: 1950, expected: 1960, rolling: 1875 },
  { week: 'W3', actual: 2100, expected: 1960, rolling: 1950 },
  { week: 'W4', actual: 1850, expected: 1960, rolling: 1925 },
  { week: 'W5', actual: 2200, expected: 1960, rolling: 1980 },
  { week: 'W6', actual: 1900, expected: 1960, rolling: 1967 },
  { week: 'W7', actual: 2050, expected: 1960, rolling: 1979 },
  { week: 'W8', actual: 2150, expected: 1960, rolling: 2000 },
];

const agentPerformanceData = [
  { agent: 'Rajesh Kumar', target: 500, achieved: 465, rate: 93, status: 'active', trend: 'up' },
  { agent: 'Priya Sharma', target: 500, achieved: 512, rate: 102.4, status: 'active', trend: 'up' },
  { agent: 'Amit Patel', target: 450, achieved: 312, rate: 69.3, status: 'active', trend: 'down' },
  { agent: 'Sneha Reddy', target: 480, achieved: 478, rate: 99.6, status: 'active', trend: 'stable' },
  { agent: 'Vikram Singh', target: 400, achieved: 289, rate: 72.3, status: 'inactive', trend: 'down' },
  { agent: 'Neha Gupta', target: 520, achieved: 498, rate: 95.8, status: 'active', trend: 'up' },
  { agent: 'Arun Verma', target: 450, achieved: 445, rate: 98.9, status: 'active', trend: 'stable' },
  { agent: 'Meera Joshi', target: 480, achieved: 356, rate: 74.2, status: 'active', trend: 'down' },
];

const radialData = [
  { name: 'Target Achievement', value: 82, fill: '#3B82F6' },
];

export default function TCMModule() {
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisType>('Descriptive');

  const renderDescriptive = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 bg-blue-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">Performance Overview</h3>
        <span className="text-sm text-slate-500">What is current performance?</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Target Achievement"
          value="82.3%"
          change={5.2}
          changeLabel="vs last week"
          icon={<Target className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
          description="Overall performance metric measuring the percentage of targets achieved across all agents and transactions"
          details={[
            { label: 'Current Week', value: '82.3%' },
            { label: 'Last Week', value: '77.1%' },
            { label: 'Target Range', value: '75% - 95%' },
            { label: 'Status', value: 'On Track' },
          ]}
          subtitle="This metric represents the overall performance achievement rate compared to set targets across the organization."
        />
        <MetricCard
          title="Total Transactions"
          value="1,543"
          change={12.8}
          changeLabel="this week"
          icon={<BarChart3 className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-emerald-500 to-teal-600"
          description="Total number of transactions processed during the current period"
          details={[
            { label: 'This Week', value: '1,543' },
            { label: 'Last Week', value: '1,366' },
            { label: 'Daily Average', value: '220' },
            { label: 'Peak Day', value: 'Friday (345 txn)' },
          ]}
          subtitle="Transactions are tracked across all agents and service types including deposits, transfers, and payments."
        />
        <MetricCard
          title="Active Agents"
          value="24/28"
          change={-2}
          changeLabel="2 inactive today"
          icon={<Users className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-violet-500 to-purple-600"
          description="Number of active agents available for transactions"
          details={[
            { label: 'Active', value: '24' },
            { label: 'Total', value: '28' },
            { label: 'Inactive', value: '4' },
            { label: 'Availability Rate', value: '85.7%' },
          ]}
          subtitle="Includes both permanently active agents and those with temporary status changes during the current period."
        />
        <MetricCard
          title="Avg Daily Txn"
          value="220"
          change={8.5}
          changeLabel="rolling 7-day avg"
          icon={<Activity className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
          description="Rolling 7-day average of daily transactions"
          details={[
            { label: 'Current Average', value: '220' },
            { label: 'Previous Average', value: '202' },
            { label: 'Highest Day', value: '345' },
            { label: 'Lowest Day', value: '98' },
          ]}
          subtitle="Calculated using a rolling window to smooth out daily fluctuations and identify trends."
        />
      </div>

      <div className="flex items-center gap-2 mb-2 mt-8">
        <div className="w-1 h-6 bg-blue-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">Transaction Trends</h3>
        <span className="text-sm text-slate-500">How performance is evolving?</span>
      </div>
      <ChartCard title="Daily Transaction Trend" subtitle="Transactions vs Target" fullWidth>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyTrendData}>
              <defs>
                <linearGradient id="txnGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Legend />
              <Area type="monotone" dataKey="transactions" stroke="#3B82F6" fill="url(#txnGradient)" strokeWidth={2} name="Actual Txn" />
              <Line type="monotone" dataKey="target" stroke="#EF4444" strokeDasharray="5 5" strokeWidth={2} name="Target" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Weekly Performance Summary" subtitle="Weekly achievement trends" fullWidth>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="transactions" fill="#3B82F6" name="Actual" radius={[4, 4, 0, 0]} />
              <Bar dataKey="target" fill="#E2E8F0" name="Target" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );

  const renderDiagnostic = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 bg-amber-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">Performance Drop Analysis</h3>
        <span className="text-sm text-slate-500">When & Why is performance dropping?</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Hourly Performance Drop" subtitle="When is performance dropping?">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyDropData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="txn" fill="#3B82F6" radius={[4, 4, 0, 0]}>
                  {hourlyDropData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.txn < 30 ? '#EF4444' : entry.txn < 60 ? '#F59E0B' : '#3B82F6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Service Mix Analysis" subtitle="Which services are underused?">
          <div className="flex items-center gap-6">
            <div className="h-56 w-56 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceMixData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {serviceMixData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-3">
              {serviceMixData.map((service, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: service.color }} />
                    <span className="text-sm text-slate-700">{service.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{service.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Active vs Inactive Days" subtitle="Agent engagement consistency">
          <div className="space-y-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
              const active = [26, 25, 27, 22, 24, 18, 12][i];
              const total = 28;
              return (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-slate-600 w-8">{day}</span>
                  <div className="flex-1">
                    <div className="flex gap-1">
                      {Array.from({ length: total }).map((_, j) => (
                        <div 
                          key={j}
                          className={`h-6 flex-1 rounded-sm ${j < active ? 'bg-blue-500' : 'bg-slate-100'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500 w-12 text-right">{active}/{total}</span>
                </div>
              );
            })}
          </div>
        </ChartCard>

        <ChartCard title="Peer Comparison" subtitle="Percentile ranking analysis">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={peerComparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} stroke="#94a3b8" width={70} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="percentile" fill="#8B5CF6" radius={[0, 4, 4, 0]}>
                  {peerComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Current' ? '#3B82F6' : '#C4B5FD'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );

  const renderPredictive = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 bg-purple-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">Performance Forecast</h3>
        <span className="text-sm text-slate-500">Where performance is heading?</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Expected Transaction Trend" subtitle="Rolling average forecast">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rollingAvgData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend />
                <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={2} name="Actual" dot={{ r: 4 }} />
                <Line type="monotone" dataKey="expected" stroke="#EF4444" strokeDasharray="5 5" strokeWidth={2} name="Expected" dot={false} />
                <Line type="monotone" dataKey="rolling" stroke="#10B981" strokeWidth={2} name="Rolling Avg" dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Target Achievement Forecast" subtitle="Projected end-of-month performance">
          <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={radialData} startAngle={180} endAngle={0}>
                  <RadialBar background dataKey="value" fill="#3B82F6" cornerRadius={10} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-slate-900">82%</span>
                <span className="text-sm text-slate-500">Projected</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="text-center p-3 bg-slate-50 rounded-xl">
              <p className="text-xs text-slate-500">Current</p>
              <p className="text-lg font-bold text-slate-900">78%</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-xl">
              <p className="text-xs text-blue-600">Projected</p>
              <p className="text-lg font-bold text-blue-700">82%</p>
            </div>
            <div className="text-center p-3 bg-emerald-50 rounded-xl">
              <p className="text-xs text-emerald-600">Stretch Goal</p>
              <p className="text-lg font-bold text-emerald-700">95%</p>
            </div>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Achievement Trend Prediction" subtitle="8-week rolling forecast analysis" fullWidth>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={rollingAvgData}>
              <defs>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="rollingGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="actual" stroke="#3B82F6" fill="url(#actualGrad)" strokeWidth={2} name="Actual" />
              <Area type="monotone" dataKey="rolling" stroke="#10B981" fill="url(#rollingGrad)" strokeWidth={2} name="Trend" />
              <Line type="monotone" dataKey="expected" stroke="#EF4444" strokeDasharray="5 5" strokeWidth={2} name="Target" dot={false} />
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
        <h3 className="text-lg font-bold text-slate-900">Recommended Actions</h3>
        <span className="text-sm text-slate-500">What should agents do to meet targets?</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Required Txn/Day"
          value="287"
          subtitle="to meet monthly target"
          icon={<Zap className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-rose-500 to-red-600"
        />
        <MetricCard
          title="Suggested Target"
          value="420"
          subtitle="based on recent performance"
          icon={<Target className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <MetricCard
          title="Days Remaining"
          value="12"
          subtitle="until month-end deadline"
          icon={<Calendar className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NudgeCard
          type="warning"
          title="Below Peer Average"
          message="Your transaction volume is 15% below the peer average. Focus on cash deposit and fund transfer services to improve."
          action="View peer strategies"
        />
        <NudgeCard
          type="error"
          title="Low Activity Alert"
          message="Agent has been inactive for 2 consecutive days. Immediate engagement required to maintain target trajectory."
          action="Trigger engagement"
        />
        <NudgeCard
          type="info"
          title="Target Adjustment Suggestion"
          message="Based on 30-day rolling average, a target of 420 txn/month is recommended for sustainable achievement."
          action="Apply suggestion"
        />
        <NudgeCard
          type="success"
          title="Strong Performance Area"
          message="Cash deposit service shows 95% target achievement. Consider increasing volume in this category."
          action="View details"
        />
      </div>

      <ChartCard title="Agent Performance Details" subtitle="Target vs Achievement breakdown with recommended actions" fullWidth>
        <DataTable
          columns={[
            { key: 'agent', label: 'Agent Name', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
            { key: 'target', label: 'Target', align: 'right' },
            { key: 'achieved', label: 'Achieved', align: 'right', render: (v, row) => (
              <span className={v >= row.target ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>{v}</span>
            )},
            { key: 'rate', label: 'Achievement %', align: 'center', render: (v) => (
              <div className="flex items-center justify-center gap-2">
                <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${v >= 90 ? 'bg-emerald-500' : v >= 70 ? 'bg-amber-500' : 'bg-rose-500'}`} style={{ width: `${Math.min(v, 100)}%` }} />
                </div>
                <span className={`text-xs font-medium ${v >= 90 ? 'text-emerald-600' : v >= 70 ? 'text-amber-600' : 'text-rose-600'}`}>{v}%</span>
              </div>
            )},
            { key: 'action', label: 'Recommended Action', render: (_v, row) => (
              <span className={`text-xs px-2 py-1 rounded-full ${
                row.rate >= 90 ? 'bg-emerald-50 text-emerald-700' : 
                row.rate >= 70 ? 'bg-amber-50 text-amber-700' : 
                'bg-rose-50 text-rose-700'
              }`}>
                {row.rate >= 90 ? 'Maintain pace' : row.rate >= 70 ? 'Increase volume' : 'Urgent attention'}
              </span>
            )},
          ]}
          data={agentPerformanceData}
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
