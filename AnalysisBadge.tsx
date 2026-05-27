interface AnalysisBadgeProps {
  type: 'Descriptive' | 'Diagnostic' | 'Predictive' | 'Prescriptive';
  size?: 'sm' | 'md';
  active?: boolean;
  onClick?: () => void;
}

const badgeConfig = {
  Descriptive: { 
    bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200',
    activeBg: 'bg-blue-600', activeText: 'text-white', activeBorder: 'border-blue-600'
  },
  Diagnostic: { 
    bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200',
    activeBg: 'bg-amber-600', activeText: 'text-white', activeBorder: 'border-amber-600'
  },
  Predictive: { 
    bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200',
    activeBg: 'bg-purple-600', activeText: 'text-white', activeBorder: 'border-purple-600'
  },
  Prescriptive: { 
    bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200',
    activeBg: 'bg-emerald-600', activeText: 'text-white', activeBorder: 'border-emerald-600'
  }
};

export default function AnalysisBadge({ type, size = 'sm', active = false, onClick }: AnalysisBadgeProps) {
  const config = badgeConfig[type];
  const isActive = active;
  
  return (
    <button 
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 transition-all duration-200 ${
        isActive 
          ? `${config.activeBg} ${config.activeText} border ${config.activeBorder} shadow-md` 
          : `${config.bg} ${config.text} border ${config.border} hover:shadow-md`
      } rounded-full font-medium cursor-pointer ${
        size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-2 text-sm'
      }`}
    >
      {type}
    </button>
  );
}
