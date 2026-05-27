import { useState } from 'react';
import { AlertTriangle, Shield, MapPin, TrendingUp } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from './ChartCard';
import GeographicDrill from './GeographicDrill';
import ScatterPlotChart from './ScatterPlotChart';
import HeatmapChart from './HeatmapChart';
import GaugeChart from './GaugeChart';
import TimelineChart from './TimelineChart';

// Geographic risk data
const geographicRiskData = [
  {
    region: 'North',
    value: 245,
    change: -5.2,
    percentage: 28,
    status: 'medium' as const,
    transactions: 8720,
    agents: 12,
    children: [
      { region: 'Delhi', state: 'Delhi', city: 'New Delhi', value: 125, change: -8.3, percentage: 15, status: 'medium' as const, transactions: 4350, agents: 6 },
      { region: 'Punjab', state: 'Punjab', city: 'Chandigarh', value: 78, change: -2.1, percentage: 9, status: 'low' as const, transactions: 2680, agents: 3 },
      { region: 'Haryana', state: 'Haryana', city: 'Gurgaon', value: 42, change: 3.5, percentage: 4, status: 'low' as const, transactions: 1690, agents: 3 },
    ],
  },
  {
    region: 'South',
    value: 198,
    change: 12.3,
    percentage: 23,
    status: 'high' as const,
    transactions: 7850,
    agents: 11,
    children: [
      { region: 'Tamil Nadu', state: 'Tamil Nadu', city: 'Chennai', value: 95, change: 15.2, percentage: 11, status: 'high' as const, transactions: 3620, agents: 5 },
      { region: 'Telangana', state: 'Telangana', city: 'Hyderabad', value: 72, change: 8.9, percentage: 8, status: 'medium' as const, transactions: 2750, agents: 3 },
      { region: 'Karnataka', state: 'Karnataka', city: 'Bangalore', value: 31, change: 5.6, percentage: 4, status: 'low' as const, transactions: 1480, agents: 3 },
    ],
  },
  {
    region: 'East',
    value: 156,
    change: 3.8,
    percentage: 18,
    status: 'medium' as const,
    transactions: 6120,
    agents: 9,
    children: [
      { region: 'West Bengal', state: 'West Bengal', city: 'Kolkata', value: 82, change: 2.1, percentage: 9, status: 'medium' as const, transactions: 3145, agents: 5 },
      { region: 'Bihar', state: 'Bihar', city: 'Patna', value: 51, change: 4.2, percentage: 6, status: 'medium' as const, transactions: 1680, agents: 2 },
      { region: 'Odisha', state: 'Odisha', city: 'Bhubaneswar', value: 23, change: 6.7, percentage: 3, status: 'low' as const, transactions: 1295, agents: 2 },
    ],
  },
  {
    region: 'West',
    value: 312,
    change: 8.5,
    percentage: 31,
    status: 'high' as const,
    transactions: 9340,
    agents: 10,
    children: [
      { region: 'Maharashtra', state: 'Maharashtra', city: 'Mumbai', value: 187, change: 9.8, percentage: 21, status: 'high' as const, transactions: 5620, agents: 6 },
      { region: 'Gujarat', state: 'Gujarat', city: 'Ahmedabad', value: 89, change: 5.3, percentage: 10, status: 'medium' as const, transactions: 1900, agents: 2 },
      { region: 'Goa', state: 'Goa', city: 'Panaji', value: 36, change: 12.1, percentage: 4, status: 'low' as const, transactions: 1040, agents: 2 },
    ],
  },
];

// Anomaly Risk Scatter
const anomalyScatterData = [
  { name: 'Agent A', x: 85, y: 15, category: 'Low Risk' },
  { name: 'Agent B', x: 92, y: 8, category: 'Low Risk' },
  { name: 'Agent C', x: 45, y: 68, category: 'High Risk' },
  { name: 'Agent D', x: 78, y: 25, category: 'Medium Risk' },
  { name: 'Agent E', x: 65, y: 42, category: 'Medium Risk' },
  { name: 'Agent F', x: 55, y: 72, category: 'High Risk' },
  { name: 'Agent G', x: 35, y: 85, category: 'Critical' },
  { name: 'Agent H', x: 48, y: 58, category: 'High Risk' },
  { name: 'Agent I', x: 88, y: 12, category: 'Low Risk' },
  { name: 'Agent J', x: 72, y: 35, category: 'Medium Risk' },
];

// Hour of day anomalies
const anomalyHeatmapData = [
  { x: '12AM', y: 'Velocity', value: 85 },
  { x: '12AM', y: 'Concentration', value: 72 },
  { x: '12AM', y: 'Pattern', value: 91 },
  { x: '6AM', y: 'Velocity', value: 45 },
  { x: '6AM', y: 'Concentration', value: 38 },
  { x: '6AM', y: 'Pattern', value: 52 },
  { x: '12PM', y: 'Velocity', value: 28 },
  { x: '12PM', y: 'Concentration', value: 22 },
  { x: '12PM', y: 'Pattern', value: 18 },
  { x: '3PM', y: 'Velocity', value: 35 },
  { x: '3PM', y: 'Concentration', value: 41 },
  { x: '3PM', y: 'Pattern', value: 31 },
  { x: '6PM', y: 'Velocity', value: 62 },
  { x: '6PM', y: 'Concentration', value: 68 },
  { x: '6PM', y: 'Pattern', value: 55 },
  { x: '9PM', y: 'Velocity', value: 78 },
  { x: '9PM', y: 'Concentration', value: 82 },
  { x: '9PM', y: 'Pattern', value: 89 },
];

// Timeline events
const anomalyEvents = [
  {
    id: 'evt1',
    timestamp: 'Today 2:15 PM',
    title: 'High Volume Alert',
    description: 'Unusual transaction volume detected in West region',
    type: 'alert' as const,
    value: 85,
    details: { Region: 'West', 'Anomaly Score': '85/100', Agents: '8', 'Transactions': '245' },
  },
  {
    id: 'evt2',
    timestamp: 'Today 10:45 AM',
    title: 'Risk Mitigated',
    description: 'Flagged suspicious pattern identified and blocked',
    type: 'success' as const,
    details: { Type: 'Concentration', 'Status': 'Blocked', 'Agent': 'C' },
  },
  {
    id: 'evt3',
    timestamp: 'Yesterday 8:30 PM',
    title: 'Velocity Anomaly',
    description: 'Agent showing unusual transaction speed patterns',
    type: 'warning' as const,
    value: 78,
    change: 15.5,
    details: { Type: 'Velocity', 'TxnPerMin': '12.5', 'Threshold': '8.0' },
  },
  {
    id: 'evt4',
    timestamp: 'Yesterday 3:00 PM',
    title: 'Pattern Detection',
    description: 'Repeat transaction pattern flagged for review',
    type: 'alert' as const,
    details: { Type: 'Repeat', 'Occurrences': '12', 'Region': 'South' },
  },
  {
    id: 'evt5',
    timestamp: '2 days ago 6:00 PM',
    title: 'Risk Score Improved',
    description: 'Overall risk metrics improved after intervention',
    type: 'success' as const,
    value: 45,
    change: -22.3,
    details: { 'Avg Score': '45', 'High Risk': '2', 'Medium Risk': '8' },
  },
];

// Risk trend data
const riskTrendData = [
  { day: 'Mon', critical: 2, high: 8, medium: 15, low: 75 },
  { day: 'Tue', critical: 1, high: 6, medium: 18, low: 75 },
  { day: 'Wed', critical: 3, high: 12, medium: 22, low: 63 },
  { day: 'Thu', critical: 2, high: 9, medium: 19, low: 70 },
  { day: 'Fri', critical: 4, high: 14, medium: 25, low: 57 },
  { day: 'Sat', critical: 1, high: 5, medium: 12, low: 82 },
  { day: 'Sun', critical: 0, high: 3, medium: 8, low: 89 },
];

export default function ARMAnalyticsDashboard() {
  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Anomaly & Risk Management Analytics</h2>
        <p className="text-slate-500 mt-1">Detailed risk analysis and anomaly detection across regions</p>
      </div>

      {/* Key Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-rose-50 to-red-50 p-4 rounded-lg border border-rose-200 shadow-sm">
          <p className="text-sm text-rose-600 mb-2 font-medium">Critical Risks</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">8</span>
            <span className="text-sm text-rose-600 font-medium">+2</span>
          </div>
          <p className="text-xs text-rose-600 mt-2">Active alerts</p>
        </div>
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200 shadow-sm">
          <p className="text-sm text-amber-600 mb-2 font-medium">Medium Risk</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">23</span>
            <span className="text-sm text-amber-600 font-medium">+5</span>
          </div>
          <p className="text-xs text-amber-600 mt-2">Under review</p>
        </div>
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200 shadow-sm">
          <p className="text-sm text-emerald-600 mb-2 font-medium">Low Risk</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">69</span>
            <span className="text-sm text-emerald-600 font-medium">+8</span>
          </div>
          <p className="text-xs text-emerald-600 mt-2">Compliant</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 shadow-sm">
          <p className="text-sm text-blue-600 mb-2 font-medium">Overall Risk Score</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">35.2</span>
          </div>
          <p className="text-xs text-blue-600 mt-2">Low Overall</p>
        </div>
      </div>

      {/* Geographic Risk Drill Down */}
      <GeographicDrill
        data={geographicRiskData}
        title="Regional Risk Distribution"
        subtitle="Anomalies detected per region - Click to expand for state/city details"
        metric="Anomalies"
        expandable={true}
      />

      {/* Gauge Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GaugeChart
          value={35.2}
          max={100}
          title="Overall Risk Score"
          subtitle="System-wide risk assessment"
          thresholds={{ low: 30, medium: 60, high: 100 }}
        />
        <GaugeChart
          value={92}
          max={100}
          title="Compliance Rate"
          subtitle="Detection & mitigation effectiveness"
          thresholds={{ low: 70, medium: 85, high: 100 }}
        />
        <GaugeChart
          value={78}
          max={100}
          title="System Security"
          subtitle="Overall security posture"
          thresholds={{ low: 50, medium: 75, high: 100 }}
        />
      </div>

      {/* Risk Scatter Plot */}
      <ScatterPlotChart
        data={anomalyScatterData}
        title="Agent Risk Profile Analysis"
        xAxisLabel="Compliance Score"
        yAxisLabel="Risk Level"
        colors={{
          'Low Risk': '#10B981',
          'Medium Risk': '#F59E0B',
          'High Risk': '#EF4444',
          'Critical': '#DC2626',
        }}
      />

      {/* Anomaly Type Heatmap */}
      <HeatmapChart
        data={anomalyHeatmapData}
        title="Anomaly Intensity by Hour & Type"
        subtitle="Risk levels across different anomaly types throughout the day"
        xAxisLabel="Hour"
        yAxisLabel="Anomaly Type"
        colorScheme="red"
      />

      {/* Timeline of Risk Events */}
      <TimelineChart
        data={anomalyEvents}
        title="Risk Events Timeline"
        subtitle="Recent anomalies, alerts, and mitigation actions"
        direction="vertical"
      />

      {/* Risk Distribution by Level */}
      <ChartCard
        title="Risk Distribution Trend"
        subtitle="Daily breakdown of risk levels"
        fullWidth
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={riskTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="critical" fill="#DC2626" name="Critical" radius={[4, 4, 0, 0]} />
              <Bar dataKey="high" fill="#EF4444" name="High" radius={[4, 4, 0, 0]} />
              <Bar dataKey="medium" fill="#F59E0B" name="Medium" radius={[4, 4, 0, 0]} />
              <Bar dataKey="low" fill="#10B981" name="Low" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Anomaly Trend Area Chart */}
      <ChartCard
        title="Cumulative Anomalies Over Time"
        subtitle="Total detected anomalies trend"
        fullWidth
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={[
                { week: 'W1', velocity: 45, concentration: 32, pattern: 28 },
                { week: 'W2', velocity: 52, concentration: 38, pattern: 35 },
                { week: 'W3', velocity: 61, concentration: 45, pattern: 42 },
                { week: 'W4', velocity: 55, concentration: 42, pattern: 38 },
              ]}
            >
              <defs>
                <linearGradient id="velocityGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="concentrationGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="patternGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Area type="monotone" dataKey="velocity" stroke="#EF4444" fill="url(#velocityGrad)" name="Velocity" />
              <Area type="monotone" dataKey="concentration" stroke="#F59E0B" fill="url(#concentrationGrad)" name="Concentration" />
              <Area type="monotone" dataKey="pattern" stroke="#8B5CF6" fill="url(#patternGrad)" name="Pattern" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
