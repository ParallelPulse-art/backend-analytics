import { useState } from 'react';
import { MapPin, BarChart3, TrendingUp, Users, Activity, ChevronRight, Search } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ChartCard from './ChartCard';
import GeographicDrill from './GeographicDrill';
import ScatterPlotChart from './ScatterPlotChart';
import HeatmapChart from './HeatmapChart';
import GaugeChart from './GaugeChart';
import TimelineChart from './TimelineChart';

// Geographic data
const geographicData = [
  {
    region: 'North',
    value: 5420,
    change: 8.5,
    percentage: 28,
    status: 'high' as const,
    transactions: 2145,
    agents: 12,
    children: [
      { region: 'Delhi', state: 'Delhi', city: 'New Delhi', value: 2850, change: 12.3, percentage: 15, status: 'high' as const, transactions: 1125, agents: 6 },
      { region: 'Punjab', state: 'Punjab', city: 'Chandigarh', value: 1562, change: 5.2, percentage: 8, status: 'high' as const, transactions: 618, agents: 3 },
      { region: 'Haryana', state: 'Haryana', city: 'Gurgaon', value: 1008, change: 2.1, percentage: 5, status: 'medium' as const, transactions: 402, agents: 3 },
    ],
  },
  {
    region: 'South',
    value: 4850,
    change: 5.2,
    percentage: 25,
    status: 'high' as const,
    transactions: 1920,
    agents: 11,
    children: [
      { region: 'Tamil Nadu', state: 'Tamil Nadu', city: 'Chennai', value: 2145, change: 7.8, percentage: 11, status: 'high' as const, transactions: 849, agents: 5 },
      { region: 'Telangana', state: 'Telangana', city: 'Hyderabad', value: 1623, change: 4.5, percentage: 8, status: 'medium' as const, transactions: 645, agents: 3 },
      { region: 'Karnataka', state: 'Karnataka', city: 'Bangalore', value: 1082, change: -1.2, percentage: 6, status: 'medium' as const, transactions: 426, agents: 3 },
    ],
  },
  {
    region: 'East',
    value: 3620,
    change: -2.1,
    percentage: 19,
    status: 'medium' as const,
    transactions: 1432,
    agents: 9,
    children: [
      { region: 'West Bengal', state: 'West Bengal', city: 'Kolkata', value: 1860, change: -1.5, percentage: 10, status: 'medium' as const, transactions: 735, agents: 5 },
      { region: 'Bihar', state: 'Bihar', city: 'Patna', value: 980, change: -3.2, percentage: 5, status: 'medium' as const, transactions: 388, agents: 2 },
      { region: 'Odisha', state: 'Odisha', city: 'Bhubaneswar', value: 780, change: -1.8, percentage: 4, status: 'low' as const, transactions: 309, agents: 2 },
    ],
  },
  {
    region: 'West',
    value: 4320,
    change: 3.8,
    percentage: 22,
    status: 'high' as const,
    transactions: 1708,
    agents: 10,
    children: [
      { region: 'Maharashtra', state: 'Maharashtra', city: 'Mumbai', value: 2560, change: 5.3, percentage: 13, status: 'high' as const, transactions: 1024, agents: 6 },
      { region: 'Gujarat', state: 'Gujarat', city: 'Ahmedabad', value: 1120, change: 1.2, percentage: 6, status: 'medium' as const, transactions: 443, agents: 2 },
      { region: 'Goa', state: 'Goa', city: 'Panaji', value: 640, change: 2.5, percentage: 3, status: 'medium' as const, transactions: 241, agents: 2 },
    ],
  },
];

// Scatter plot data - Agent Performance vs Volume
const agentScatterData = [
  { name: 'Agent A', x: 85, y: 2400, category: 'Top Performers' },
  { name: 'Agent B', x: 92, y: 2800, category: 'Top Performers' },
  { name: 'Agent C', x: 78, y: 1900, category: 'High Performers' },
  { name: 'Agent D', x: 88, y: 2200, category: 'Top Performers' },
  { name: 'Agent E', x: 65, y: 1200, category: 'Average' },
  { name: 'Agent F', x: 72, y: 1450, category: 'Average' },
  { name: 'Agent G', x: 45, y: 680, category: 'Needs Improvement' },
  { name: 'Agent H', x: 55, y: 950, category: 'Needs Improvement' },
];

// Heatmap data - Service performance by hour
const serviceHeatmapData = [
  // Hour vs Service rows
  { x: '6AM', y: 'Deposit', value: 12 },
  { x: '6AM', y: 'Transfer', value: 8 },
  { x: '6AM', y: 'Billing', value: 5 },
  { x: '10AM', y: 'Deposit', value: 156 },
  { x: '10AM', y: 'Transfer', value: 98 },
  { x: '10AM', y: 'Billing', value: 75 },
  { x: '12PM', y: 'Deposit', value: 89 },
  { x: '12PM', y: 'Transfer', value: 120 },
  { x: '12PM', y: 'Billing', value: 92 },
  { x: '3PM', y: 'Deposit', value: 145, label: 'Peak for deposits' },
  { x: '3PM', y: 'Transfer', value: 167 },
  { x: '3PM', y: 'Billing', value: 103 },
  { x: '6PM', y: 'Deposit', value: 98 },
  { x: '6PM', y: 'Transfer', value: 145 },
  { x: '6PM', y: 'Billing', value: 67 },
  { x: '9PM', y: 'Deposit', value: 34 },
  { x: '9PM', y: 'Transfer', value: 56 },
  { x: '9PM', y: 'Billing', value: 23 },
];

// Timeline events
const timelineEvents = [
  {
    id: 'evt1',
    timestamp: 'Today 9:45 AM',
    title: 'Campaign Launched',
    description: 'New promotional campaign started across all regions',
    type: 'milestone' as const,
    value: 2450,
    change: 15.8,
    details: { Regions: '4', Agents: '42', Target: '5000' },
  },
  {
    id: 'evt2',
    timestamp: 'Today 2:30 PM',
    title: 'Performance Peak',
    description: 'Highest transaction volume achieved today',
    type: 'success' as const,
    value: 450,
    change: 22.5,
    details: { 'Daily Avg': '220', 'Peak Hour': '3PM', Transactions: '450' },
  },
  {
    id: 'evt3',
    timestamp: 'Yesterday 11:15 PM',
    title: 'Target Achieved',
    description: 'Weekly target surpassed for North region',
    type: 'success' as const,
    value: 105,
    change: 5.2,
    details: { Region: 'North', Achievement: '105%', Agents: '12' },
  },
  {
    id: 'evt4',
    timestamp: 'Yesterday 5:00 PM',
    title: 'Performance Dip',
    description: 'Unexpected drop in evening transactions',
    type: 'warning' as const,
    value: 65,
    change: -12.3,
    details: { Hour: '5PM', 'Avg Hourly': '95', Actual: '65' },
  },
  {
    id: 'evt5',
    timestamp: '2 days ago 8:30 AM',
    title: 'System Maintenance',
    description: 'Scheduled system maintenance completed successfully',
    type: 'milestone' as const,
    details: { 'Downtime': '45 mins', 'Start': '8:00 AM', 'End': '8:45 AM' },
  },
];

// Service distribution by time
const timeServiceData = [
  { time: '6AM', deposits: 12, transfers: 8, billing: 5 },
  { time: '9AM', deposits: 156, transfers: 98, billing: 75 },
  { time: '12PM', deposits: 189, transfers: 145, billing: 92 },
  { time: '3PM', deposits: 201, transfers: 189, billing: 103 },
  { time: '6PM', deposits: 145, transfers: 167, billing: 78 },
  { time: '9PM', deposits: 56, transfers: 89, billing: 34 },
];

export default function TCMAnalyticsDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Target & Campaign Analytics</h2>
        <p className="text-slate-500 mt-1">Detailed drill downs and geographic performance analysis</p>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-2">Total Achievement</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">82.3%</span>
            <span className="text-sm text-emerald-600 font-medium">+5.2%</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">vs last week</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-2">Total Transactions</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">19,210</span>
            <span className="text-sm text-emerald-600 font-medium">+12.8%</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">this week</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-2">Active Agents</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">42/50</span>
            <span className="text-sm text-slate-600 font-medium">84%</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">active agents</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
          <p className="text-sm text-slate-500 mb-2">Top Region</p>
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-slate-900">North</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">5,420 txn</p>
        </div>
      </div>

      {/* Regional Performance Drill Down */}
      <GeographicDrill
        data={geographicData}
        title="Regional Performance Overview"
        subtitle="Click to expand regions and see detailed state/city performance"
        metric="Transactions"
        expandable={true}
      />

      {/* Gauge Chart - Overall Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GaugeChart
          value={82.3}
          max={100}
          title="Overall Performance"
          subtitle="Target Achievement Rate"
          thresholds={{ low: 50, medium: 75, high: 100 }}
        />
        <GaugeChart
          value={84}
          max={100}
          title="Agent Availability"
          subtitle="Active Agents Status"
          thresholds={{ low: 60, medium: 80, high: 100 }}
        />
        <GaugeChart
          value={78.5}
          max={100}
          title="Service Efficiency"
          subtitle="Average Transaction Speed"
          thresholds={{ low: 50, medium: 70, high: 100 }}
        />
      </div>

      {/* Scatter Plot - Agent Performance */}
      <ScatterPlotChart
        data={agentScatterData}
        title="Agent Performance vs Transaction Volume"
        xAxisLabel="Performance Score"
        yAxisLabel="Transaction Volume"
        colors={{
          'Top Performers': '#10B981',
          'High Performers': '#3B82F6',
          'Average': '#F59E0B',
          'Needs Improvement': '#EF4444',
        }}
      />

      {/* Heatmap - Service Performance by Hour */}
      <HeatmapChart
        data={serviceHeatmapData}
        title="Service Performance Heatmap"
        subtitle="Transaction volume by service type and hour"
        xAxisLabel="Hour"
        yAxisLabel="Service Type"
        colorScheme="blue"
      />

      {/* Timeline Chart - Recent Events */}
      <TimelineChart
        data={timelineEvents}
        title="Performance Timeline"
        subtitle="Recent milestones, achievements, and events"
        direction="vertical"
      />

      {/* Service Distribution by Time */}
      <ChartCard
        title="Service Mix by Time of Day"
        subtitle="Transaction distribution across different services"
        fullWidth
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeServiceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Bar dataKey="deposits" fill="#3B82F6" name="Deposits" radius={[4, 4, 0, 0]} />
              <Bar dataKey="transfers" fill="#8B5CF6" name="Transfers" radius={[4, 4, 0, 0]} />
              <Bar dataKey="billing" fill="#10B981" name="Billing" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Regional Comparison Line Chart */}
      <ChartCard
        title="Regional Performance Trend"
        subtitle="Weekly performance comparison across regions"
        fullWidth
      >
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { week: 'W1', north: 4800, south: 4200, east: 3800, west: 3900 },
              { week: 'W2', north: 5100, south: 4450, east: 3650, west: 4100 },
              { week: 'W3', north: 5420, south: 4850, east: 3620, west: 4320 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} />
              <Legend />
              <Line type="monotone" dataKey="north" stroke="#3B82F6" strokeWidth={2} name="North" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="south" stroke="#8B5CF6" strokeWidth={2} name="South" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="east" stroke="#F59E0B" strokeWidth={2} name="East" dot={{ r: 4 }} />
              <Line type="monotone" dataKey="west" stroke="#10B981" strokeWidth={2} name="West" dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
