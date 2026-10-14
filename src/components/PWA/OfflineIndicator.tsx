import React from 'react';
import { WifiOff } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const { isOnline } = usePWAInstall();

  if (isOnline) return null;

  return (
    <aside aria-label="Network status" className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 text-white px-3.5 py-2 text-xs font-semibold shadow-xl border border-amber-500 animate-in slide-in-from-bottom duration-300">
      <span className="flex h-2 w-2 relative">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
      </span>
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>অফলাইন মোড — ক্যাশ করা ডাটা ব্যবহার করা হচ্ছে (Offline Mode Active)</span>
    </aside>
  );
};
