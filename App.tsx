import { useState } from 'react';
import { BarChart3, Shield, Activity, Target, Settings, TrendingUp, ChevronRight, Menu, X } from 'lucide-react';
import TCMModule from './components/TCMModule';
import ARMModule from './components/ARMModule';
import SPMModule from './components/SPMModule';

type Module = 'TCM' | 'ARM' | 'SPM';

const modules = [
  {
    id: 'TCM' as Module,
    name: 'Target & Campaign',
    shortName: 'TCM',
    icon: Target,
    color: 'from-blue-500 to-indigo-600',
    bgLight: 'bg-blue-50',
    textColor: 'text-blue-600',
    description: 'Performance metrics, target tracking & achievement analysis'
  },
  {
    id: 'ARM' as Module,
    name: 'Anomaly and Risk Management',
    shortName: 'ARM',
    icon: Shield,
    color: 'from-rose-500 to-red-600',
    bgLight: 'bg-rose-50',
    textColor: 'text-rose-600',
    description: 'Anomaly detection, risk monitoring & suspicious behavior analysis'
  },
  {
    id: 'SPM' as Module,
    name: 'System Performance Monitoring',
    shortName: 'SPM',
    icon: Activity,
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    description: 'System health, failure analysis & performance optimization'
  }
];

export default function App() {
  const [activeModule, setActiveModule] = useState<Module>('TCM');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentModule = modules.find(m => m.id === activeModule)!;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
        ${sidebarOpen ? 'w-64' : 'w-20'}
        fixed lg:relative inset-y-0 left-0 z-40
        bg-white border-r border-slate-200 
        transition-all duration-300 ease-in-out
        flex flex-col shadow-lg lg:shadow-sm
      `}>
        {/* Logo */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="font-bold text-slate-900 text-sm">Analytics Hub</h1>
                <p className="text-xs text-slate-400">Enterprise Dashboard</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <p className={`text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3 ${!sidebarOpen && 'text-center'}`}>
            {sidebarOpen ? 'Modules' : '•••'}
          </p>
          
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => {
                  setActiveModule(mod.id);
                  setMobileMenuOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? `bg-gradient-to-r ${mod.color} text-white shadow-lg shadow-${mod.id === 'TCM' ? 'blue' : mod.id === 'ARM' ? 'rose' : 'emerald'}-200` 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-white/20' : `${mod.bgLight}`
                }`}>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : mod.textColor}`} />
                </div>
                {sidebarOpen && (
                  <div className="flex-1 text-left">
                    <p className="font-medium text-sm">{mod.shortName}</p>
                    <p className={`text-xs ${isActive ? 'text-white/70' : 'text-slate-400'}`}>{mod.name}</p>
                  </div>
                )}
                {sidebarOpen && isActive && (
                  <ChevronRight className="w-4 h-4 text-white/70" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Toggle sidebar */}
        <div className="p-4 border-t border-slate-100 hidden lg:block">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors text-sm"
          >
            <Settings className="w-4 h-4" />
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentModule.color} flex items-center justify-center`}>
                <currentModule.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900">{currentModule.name} Management</h2>
                <p className="text-sm text-slate-500">{currentModule.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-sm">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">Live Data</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Module content */}
        <div className="p-6">
          {activeModule === 'TCM' && <TCMModule />}
          {activeModule === 'ARM' && <ARMModule />}
          {activeModule === 'SPM' && <SPMModule />}
        </div>
      </main>
    </div>
  );
}
