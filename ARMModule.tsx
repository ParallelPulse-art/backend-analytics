import { useState } from 'react';
import { 
  Shield, AlertTriangle, Eye, Bell, ShieldAlert, ShieldCheck, Activity, TrendingUp
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import MetricCard from './MetricCard';
import ChartCard from './ChartCard';
import DataTable from './DataTable';
import AnalysisBadge from './AnalysisBadge';
import NudgeCard from './NudgeCard';
import StatusBadge from './StatusBadge';

type AnalysisType = 'Descriptive' | 'Diagnostic' | 'Predictive' | 'Prescriptive';

// ARM Data
const riskDistributionData = [
  { name: 'Low Risk', value: 65, color: '#10B981' },
  { name: 'Medium Risk', value: 25, color: '#F59E0B' },
  { name: 'High Risk', value: 10, color: '#EF4444' },
];

const anomalyTrendData = [
  { day: 'Day 1', anomalies: 3, agents: 2 },
  { day: 'Day 2', anomalies: 5, agents: 3 },
  { day: 'Day 3', anomalies: 2, agents: 2 },
  { day: 'Day 4', anomalies: 8, agents: 5 },
  { day: 'Day 5', anomalies: 12, agents: 7 },
  { day: 'Day 6', anomalies: 6, agents: 4 },
  { day: 'Day 7', anomalies: 15, agents: 9 },
  { day: 'Day 8', anomalies: 10, agents: 6 },
  { day: 'Day 9', anomalies: 18, agents: 11 },
  { day: 'Day 10', anomalies: 14, agents: 8 },
];

const volumeSpikeData = [
  { time: '00:00', normal: 10, actual: 12 },
  { time: '02:00', normal: 5, actual: 45 },
  { time: '04:00', normal: 3, actual: 38 },
  { time: '06:00', normal: 15, actual: 18 },
  { time: '08:00', normal: 80, actual: 85 },
  { time: '10:00', normal: 120, actual: 115 },
  { time: '12:00', normal: 90, actual: 88 },
  { time: '14:00', normal: 100, actual: 95 },
  { time: '16:00', normal: 85, actual: 82 },
  { time: '18:00', normal: 40, actual: 38 },
  { time: '20:00', normal: 20, actual: 65 },
  { time: '22:00', normal: 10, actual: 52 },
];

const velocityData = [
  { agent: 'Agent A', txnPerMin: 2.3, avgAmount: 5000, risk: 'low' },
  { agent: 'Agent B', txnPerMin: 8.5, avgAmount: 15000, risk: 'high' },
  { agent: 'Agent C', txnPerMin: 3.1, avgAmount: 7500, risk: 'low' },
  { agent: 'Agent D', txnPerMin: 12.2, avgAmount: 25000, risk: 'high' },
  { agent: 'Agent E', txnPerMin: 1.8, avgAmount: 3000, risk: 'low' },
  { agent: 'Agent F', txnPerMin: 6.7, avgAmount: 12000, risk: 'medium' },
];

const oddHourData = [
  { hour: '12AM', ratio: 45 }, { hour: '1AM', ratio: 52 },
  { hour: '2AM', ratio: 68 }, { hour: '3AM', ratio: 72 },
  { hour: '4AM', ratio: 58 }, { hour: '5AM', ratio: 25 },
  { hour: '6AM', ratio: 12 }, { hour: '7AM', ratio: 8 },
  { hour: '8AM', ratio: 5 }, { hour: '9AM', ratio: 3 },
  { hour: '10AM', ratio: 2 }, { hour: '11AM', ratio: 2 },
];

const customerConcentrationData = [
  { agent: 'Agent A', top5: 15, total: 100 },
  { agent: 'Agent B', top5: 78, total: 100 },
  { agent: 'Agent C', top5: 22, total: 100 },
  { agent: 'Agent D', top5: 85, total: 100 },
  { agent: 'Agent E', top5: 18, total: 100 },
  { agent: 'Agent F', top5: 45, total: 100 },
];

const repeatPatternData = [
  { pattern: 'Same Customer', count: 45, percentage: 32 },
  { pattern: 'Same Amount', count: 38, percentage: 27 },
  { pattern: 'Same Service', count: 28, percentage: 20 },
  { pattern: 'Same Time', count: 18, percentage: 13 },
  { pattern: 'Other', count: 11, percentage: 8 },
];

const serviceDriftData = [
  { week: 'W1', cash: 45, transfer: 30, bill: 25 },
  { week: 'W2', cash: 42, transfer: 33, bill: 25 },
  { week: 'W3', cash: 35, transfer: 40, bill: 25 },
  { week: 'W4', cash: 28, transfer: 48, bill: 24 },
  { week: 'W5', cash: 20, transfer: 55, bill: 25 },
  { week: 'W6', cash: 15, transfer: 62, bill: 23 },
];

const riskTrendData = [
  { week: 'W1', low: 60, medium: 25, high: 15 },
  { week: 'W2', low: 58, medium: 27, high: 15 },
  { week: 'W3', low: 55, medium: 28, high: 17 },
  { week: 'W4', low: 52, medium: 30, high: 18 },
  { week: 'W5', low: 50, medium: 28, high: 22 },
  { week: 'W6', low: 48, medium: 27, high: 25 },
];

const agentRiskData = [
  { agent: 'Rajesh Kumar', riskScore: 25, anomalyCount: 2, status: 'low', oddHour: '5%', velocity: '2.1/min' },
  { agent: 'Priya Sharma', riskScore: 82, anomalyCount: 12, status: 'high', oddHour: '45%', velocity: '9.2/min' },
  { agent: 'Amit Patel', riskScore: 35, anomalyCount: 3, status: 'low', oddHour: '8%', velocity: '2.8/min' },
  { agent: 'Sneha Reddy', riskScore: 68, anomalyCount: 8, status: 'medium', oddHour: '28%', velocity: '5.5/min' },
  { agent: 'Vikram Singh', riskScore: 91, anomalyCount: 18, status: 'high', oddHour: '62%', velocity: '11.3/min' },
  { agent: 'Neha Gupta', riskScore: 42, anomalyCount: 4, status: 'low', oddHour: '12%', velocity: '3.2/min' },
  { agent: 'Arun Verma', riskScore: 75, anomalyCount: 10, status: 'high', oddHour: '38%', velocity: '7.8/min' },
  { agent: 'Meera Joshi', riskScore: 28, anomalyCount: 2, status: 'low', oddHour: '6%', velocity: '2.4/min' },
];

export default function ARMModule() {
  const [activeAnalysis, setActiveAnalysis] = useState<AnalysisType>('Descriptive');

  const renderDescriptive = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 bg-rose-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">Risk Overview</h3>
        <span className="text-sm text-slate-500">Overall risk landscape</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Overall Risk Score"
          value="42/100"
          change={-8}
          changeLabel="improved from last week"
          icon={<Shield className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
        <MetricCard
          title="High Risk Agents"
          value="3"
          change={33}
          changeLabel="increased this week"
          icon={<ShieldAlert className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-rose-500 to-red-600"
        />
        <MetricCard
          title="Total Anomalies"
          value="47"
          change={15}
          changeLabel="this month"
          icon={<AlertTriangle className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
        />
        <MetricCard
          title="Active Alerts"
          value="8"
          change={-12}
          changeLabel="2 resolved today"
          icon={<Bell className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-violet-500 to-purple-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Risk Distribution" subtitle="Agent risk categorization">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Anomaly Count Trend" subtitle="Frequency of anomalies detected">
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={anomalyTrendData}>
                <defs>
                  <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="anomalies" stroke="#EF4444" fill="url(#anomalyGradient)" strokeWidth={2} name="Anomalies" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );

  const renderDiagnostic = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-1 h-6 bg-amber-500 rounded-full" />
        <h3 className="text-lg font-bold text-slate-900">Suspicious Behavior Detection</h3>
        <span className="text-sm text-slate-500">What anomalies are occurring?</span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Volume Spike Detection" subtitle="Sudden abnormal activity">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={volumeSpikeData}>
                <defs>
                  <linearGradient id="normalGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend />
                <Area type="monotone" dataKey="normal" stroke="#10B981" fill="url(#normalGradient)" strokeWidth={2} name="Normal Range" />
                <Area type="monotone" dataKey="actual" stroke="#EF4444" fill="url(#actualGradient)" strokeWidth={2} name="Actual Volume" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Velocity Analysis" subtitle="Transaction burst behavior">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={velocityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="agent" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="txnPerMin" name="Txn/Min" radius={[4, 4, 0, 0]}>
                  {velocityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.risk === 'high' ? '#EF4444' : entry.risk === 'medium' ? '#F59E0B' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Odd-Hour Activity Ratio" subtitle="Suspicious timing patterns">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={oddHourData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="ratio" fill="#F59E0B" radius={[4, 4, 0, 0]}>
                  {oddHourData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.ratio > 50 ? '#EF4444' : entry.ratio > 30 ? '#F59E0B' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Customer Concentration" subtitle="Dependency on few customers">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={customerConcentrationData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis dataKey="agent" type="category" tick={{ fontSize: 12 }} stroke="#94a3b8" width={60} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Bar dataKey="top5" name="Top 5 Customers %" radius={[0, 4, 4, 0]}>
                  {customerConcentrationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.top5 > 60 ? '#EF4444' : entry.top5 > 40 ? '#F59E0B' : '#10B981'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Repeat Transaction Patterns" subtitle="Repeated usage anomaly">
          <div className="space-y-3">
            {repeatPatternData.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-slate-700 font-medium">{item.pattern}</span>
                    <span className="text-sm font-semibold text-slate-900">{item.count}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${i < 2 ? 'bg-rose-500' : 'bg-amber-500'}`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
                <span className="text-xs text-slate-500 w-12 text-right">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Service Mix Drift" subtitle="Behavioral change detection">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={serviceDriftData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
                <Legend />
                <Area type="monotone" dataKey="cash" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.3} name="Cash Deposit" />
                <Area type="monotone" dataKey="transfer" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} name="Transfer" />
                <Area type="monotone" dataKey="bill" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.3} name="Bill Pay" />
              </AreaChart>
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
        <h3 className="text-lg font-bold text-slate-900">Risk Trend Prediction</h3>
        <span className="text-sm text-slate-500">Is risk increasing?</span>
      </div>
      <ChartCard title="Risk Trend Analysis" subtitle="Risk category distribution over time" fullWidth>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={riskTrendData}>
              <defs>
                <linearGradient id="lowRiskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="medRiskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="highRiskGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="high" stackId="1" stroke="#EF4444" fill="url(#highRiskGrad)" name="High Risk" />
              <Area type="monotone" dataKey="medium" stackId="1" stroke="#F59E0B" fill="url(#medRiskGrad)" name="Medium Risk" />
              <Area type="monotone" dataKey="low" stackId="1" stroke="#10B981" fill="url(#lowRiskGrad)" name="Low Risk" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Predicted High Risk"
          value="5 agents"
          change={40}
          changeLabel="by next week"
          icon={<TrendingUp className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-rose-500 to-red-600"
        />
        <MetricCard
          title="Anomaly Forecast"
          value="~65"
          change={25}
          changeLabel="expected next week"
          icon={<AlertTriangle className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
        />
        <MetricCard
          title="Risk Score Trend"
          value="48"
          change={12}
          changeLabel="projected increase"
          icon={<Activity className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-purple-500 to-indigo-600"
        />
      </div>

      <ChartCard title="Anomaly Trend Forecast" subtitle="Predicted anomaly patterns" fullWidth>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={anomalyTrendData}>
              <defs>
                <linearGradient id="forecastGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 10 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="anomalies" stroke="#8B5CF6" fill="url(#forecastGrad)" strokeWidth={2} name="Actual Anomalies" />
              <Line type="monotone" dataKey="agents" stroke="#F59E0B" strokeWidth={2} name="Agents Affected" dot={{ r: 4 }} />
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
        <h3 className="text-lg font-bold text-slate-900">Risk Mitigation Actions</h3>
        <span className="text-sm text-slate-500">What actions should be taken?</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MetricCard
          title="Overall Risk Score"
          value="42"
          subtitle="Medium risk level"
          icon={<Shield className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-amber-500 to-orange-600"
        />
        <MetricCard
          title="Agents Requiring Review"
          value="5"
          subtitle="immediate attention needed"
          icon={<Eye className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-rose-500 to-red-600"
        />
        <MetricCard
          title="Auto-Blocked Transactions"
          value="23"
          subtitle="today's prevention count"
          icon={<ShieldCheck className="w-5 h-5 text-white" />}
          color="bg-gradient-to-br from-emerald-500 to-teal-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NudgeCard
          type="error"
          title="Critical: Velocity Spike Detected"
          message="Agent Vikram Singh showing 11.3 txn/min, 4x above normal. Transaction limit has been automatically applied."
          action="Review agent activity"
        />
        <NudgeCard
          type="warning"
          title="Odd-Hour Activity Alert"
          message="Agent Priya Sharma has 45% of transactions during odd hours (12AM-5AM). Manual review recommended."
          action="Schedule review"
        />
        <NudgeCard
          type="info"
          title="Customer Concentration Warning"
          message="Agent Vikram Singh has 85% transactions from top 5 customers. Consider diversification requirement."
          action="View customer breakdown"
        />
        <NudgeCard
          type="success"
          title="Risk Score Improved"
          message="Agent Rajesh Kumar's risk score decreased from 45 to 25. Monitoring restrictions can be relaxed."
          action="Adjust monitoring"
        />
      </div>

      <ChartCard title="Alert & Escalation Rules" subtitle="Recommended actions by risk level" fullWidth>
        <DataTable
          columns={[
            { key: 'agent', label: 'Agent', render: (v) => <span className="font-medium text-slate-900">{v}</span> },
            { key: 'riskScore', label: 'Risk Score', align: 'center', render: (v) => (
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${v >= 70 ? 'bg-rose-500' : v >= 40 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${v}%` }} />
                </div>
                <span className={`text-xs font-semibold ${v >= 70 ? 'text-rose-600' : v >= 40 ? 'text-amber-600' : 'text-emerald-600'}`}>{v}</span>
              </div>
            )},
            { key: 'status', label: 'Risk Level', align: 'center', render: (v) => <StatusBadge status={v === 'high' ? 'critical' : v === 'medium' ? 'warning' : 'healthy'} label={`${v} risk`} /> },
            { key: 'action', label: 'Recommended Action', render: (_v, row) => (
              <span className={`text-xs px-2 py-1 rounded-full ${
                row.status === 'high' ? 'bg-rose-50 text-rose-700' : 
                row.status === 'medium' ? 'bg-amber-50 text-amber-700' : 
                'bg-emerald-50 text-emerald-700'
              }`}>
                {row.status === 'high' ? 'Immediate block & review' : row.status === 'medium' ? 'Enhanced monitoring' : 'Standard monitoring'}
              </span>
            )},
          ]}
          data={agentRiskData}
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
