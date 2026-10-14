import React from 'react';
import { useApp } from '../context/AppContext';
import {
  FlaskConical,
  Receipt,
  UserCheck,
  Activity,
  Film,
  Waves,
  Stethoscope,
  BarChart3,
  Lock,
  Settings,
  ShieldCheck,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, t, hasAccessToModule, currentUser } = useApp();

  const allTabs = [
    {
      id: 'pathology',
      label: t.pathology,
      icon: FlaskConical,
      badge: 'Main',
      color: 'from-purple-700 to-indigo-800',
    },
    {
      id: 'billing',
      label: t.billing,
      icon: Receipt,
      color: 'from-emerald-700 to-teal-800',
    },
    {
      id: 'doctorVisit',
      label: t.doctorVisit,
      icon: UserCheck,
      color: 'from-blue-700 to-indigo-800',
    },
    {
      id: 'ecg',
      label: t.ecg,
      icon: Activity,
      color: 'from-rose-700 to-red-800',
    },
    {
      id: 'xray',
      label: t.xray,
      icon: Film,
      color: 'from-slate-700 to-gray-800',
    },
    {
      id: 'ultrasound',
      label: t.ultrasound,
      icon: Waves,
      color: 'from-cyan-700 to-blue-800',
    },
    {
      id: 'doctorPortal',
      label: t.doctorPortal,
      icon: Stethoscope,
      badge: 'Rx',
      color: 'from-violet-700 to-purple-800',
    },
    {
      id: 'analytics',
      label: t.analytics,
      icon: BarChart3,
      color: 'from-amber-700 to-orange-800',
    },
    {
      id: 'chat',
      label: t.encryptedChat,
      icon: Lock,
      color: 'from-green-700 to-emerald-800',
    },
    {
      id: 'settings',
      label: t.settings,
      icon: Settings,
      color: 'from-fuchsia-700 to-purple-800',
    },
  ];

  // Only show tabs the current user has permission to see!
  const visibleTabs = allTabs.filter((tab) => hasAccessToModule(tab.id));

  return (
    <nav className="bg-white dark:bg-gray-850 border-b border-purple-200 dark:border-gray-700 shadow-xs px-2 sm:px-4 overflow-x-auto select-none scrollbar-none flex items-center justify-between">
      <div className="flex items-center gap-1.5 py-1.5 min-w-max">
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition cursor-pointer relative ${
                isActive
                  ? `bg-gradient-to-r ${tab.color} text-white shadow-xs`
                  : 'text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-800 hover:text-purple-900'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-purple-600 dark:text-purple-400'}`} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`ml-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200'
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}

        {visibleTabs.length === 0 && (
          <div className="text-xs text-amber-600 p-2 font-medium">
            No modules assigned to this user ID. Please contact administrator.
          </div>
        )}
      </div>

      {/* Logged in User ID indicator */}
      {currentUser && (
        <div className="hidden lg:flex items-center gap-2 pl-4 py-1 text-xs shrink-0 border-l border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/70 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-500 shrink-0" />
            <span className="font-bold font-mono">@{currentUser.username}</span>
            <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200 font-semibold">
              {currentUser.role}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};
