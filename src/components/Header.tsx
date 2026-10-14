import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Activity,
  RefreshCw,
  ShieldCheck,
  Palette,
  Check,
  Globe,
  Bell,
  MessageSquareHeart,
  BookOpen,
  Pencil,
  LogOut,
  Crown,
  KeyRound,
  Building2,
} from 'lucide-react';

import { PWAInstallButton } from './PWA/PWAInstallButton';
import { EditClinicModal } from './Modals/EditClinicModal';

interface HeaderProps {
  onOpen2FA: () => void;
  onOpenSurvey: () => void;
  onOpenDocs: () => void;
  onLogout?: () => void;
  onOpenAdminModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpen2FA,
  onOpenSurvey,
  onOpenDocs,
  onLogout,
  onOpenAdminModal,
}) => {
  const {
    lang,
    setLang,
    theme,
    setTheme,
    clinicConfig,
    is2FAEnabled,
    cloudSyncStatus,
    triggerManualSync,
    notifications,
    markNotificationsAsRead,
    unreadCount,
    currentUser,
    t,
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showEditClinic, setShowEditClinic] = useState(false);

  const bgImage = clinicConfig.hospitalBackgroundUrl || '/hospital-bg.jpg';

  return (
    <header className="sticky top-0 z-30 shadow-md border-b border-purple-900 select-none">
      {/* ======================================================== */}
      {/* TIER 1: SLIM TOP UTILITY STRIP (উপরে উঠিয়ে দেওয়া টুলবার) */}
      {/* ======================================================== */}
      <div className="bg-purple-950 text-purple-200 border-b border-purple-900/80 px-3 sm:px-6 py-1 text-[11px] flex items-center justify-between gap-2 flex-wrap">
        {/* Left Utility Tools: PWA, Sync, 2FA */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* PC & Mobile APK Install Button */}
          <PWAInstallButton variant="header" />

          {/* Cloud Sync Status */}
          <button
            onClick={triggerManualSync}
            title="Click to synchronize data with encrypted cloud storage"
            className="flex items-center gap-1 px-2 py-0.5 bg-purple-900/90 hover:bg-purple-850 text-purple-200 rounded text-[10px] sm:text-[11px] border border-purple-800 transition cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 text-emerald-400 ${cloudSyncStatus === 'syncing' ? 'animate-spin' : ''}`} />
            <span className="text-emerald-300 font-semibold hidden xs:inline">Cloud Synced</span>
          </button>

          {/* 2FA Security Button */}
          <button
            onClick={onOpen2FA}
            title="Two-Factor Authentication Security"
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-[11px] font-semibold border transition cursor-pointer ${
              is2FAEnabled
                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                : 'bg-purple-900/90 text-purple-300 border-purple-800 hover:bg-purple-850'
            }`}
          >
            <ShieldCheck className={`w-3 h-3 ${is2FAEnabled ? 'text-emerald-400' : 'text-purple-400'}`} />
            <span className="hidden sm:inline">{is2FAEnabled ? t.twoFactorActive : t.twoFactor}</span>
          </button>
        </div>

        {/* Right Utility Tools: Theme, Lang, Notifications, Survey, Docs */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Selector */}
          <div className="relative">
            <button
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-1 bg-purple-900 hover:bg-purple-850 text-purple-200 rounded transition cursor-pointer flex items-center gap-1"
              title="Theme Style"
            >
              <Palette className="w-3.5 h-3.5 text-purple-300" />
            </button>

            {showThemeMenu && (
              <div className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 py-1 z-50 text-xs">
                <button
                  onClick={() => {
                    setTheme('classic');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-purple-50 dark:hover:bg-gray-700 cursor-pointer ${
                    theme === 'classic' ? 'font-bold text-purple-800 dark:text-purple-300' : ''
                  }`}
                >
                  <span>{t.classicTheme}</span>
                  {theme === 'classic' && <Check className="w-3.5 h-3.5 text-purple-700" />}
                </button>
                <button
                  onClick={() => {
                    setTheme('modern');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-purple-50 dark:hover:bg-gray-700 cursor-pointer ${
                    theme === 'modern' ? 'font-bold text-purple-800 dark:text-purple-300' : ''
                  }`}
                >
                  <span>{t.modernTheme}</span>
                  {theme === 'modern' && <Check className="w-3.5 h-3.5 text-purple-700" />}
                </button>
                <button
                  onClick={() => {
                    setTheme('dark');
                    setShowThemeMenu(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-purple-50 dark:hover:bg-gray-700 cursor-pointer ${
                    theme === 'dark' ? 'font-bold text-purple-800 dark:text-purple-300' : ''
                  }`}
                >
                  <span>{t.darkTheme}</span>
                  {theme === 'dark' && <Check className="w-3.5 h-3.5 text-purple-700" />}
                </button>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            className="flex items-center gap-1 px-2 py-0.5 bg-purple-900 hover:bg-purple-850 text-white rounded text-[10px] sm:text-[11px] font-bold border border-purple-800 transition cursor-pointer"
            title="Switch Language"
          >
            <Globe className="w-3 h-3 text-pink-300" />
            <span>{lang === 'bn' ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (!showNotifications) markNotificationsAsRead();
              }}
              className="p-1 bg-purple-900 hover:bg-purple-850 text-purple-200 rounded transition cursor-pointer relative"
              title={t.notifications}
            >
              <Bell className="w-3.5 h-3.5 text-purple-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 text-white rounded-full text-[8px] font-bold flex items-center justify-center animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-1.5 w-76 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 text-xs">
                <div className="p-2.5 bg-purple-900 text-white font-bold flex justify-between items-center text-xs">
                  <span>{t.notifications}</span>
                  <button
                    onClick={markNotificationsAsRead}
                    className="text-[10px] text-purple-200 hover:underline cursor-pointer"
                  >
                    {t.markAllRead}
                  </button>
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-gray-400 italic">{t.noNotifications}</div>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="p-2.5 hover:bg-purple-50/50 dark:hover:bg-gray-750">
                        <div className="flex justify-between font-bold text-purple-950 dark:text-purple-300">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-gray-400 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-0.5">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Feedback Survey Button */}
          <button
            onClick={onOpenSurvey}
            className="p-1 bg-purple-900 hover:bg-purple-850 text-purple-200 rounded transition cursor-pointer"
            title="Provide User Feedback"
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-pink-400" />
          </button>

          {/* User Guide Button */}
          <button
            onClick={onOpenDocs}
            className="p-1 bg-purple-900 hover:bg-purple-850 text-purple-200 rounded transition cursor-pointer"
            title={t.userGuide}
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-300" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* TIER 2: MAIN BRANDING BANNER WITH HOSPITAL BACKGROUND */}
      {/* ======================================================== */}
      <div
        className="relative bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : undefined,
          backgroundColor: '#2e1065',
        }}
      >
        {/* Semi-transparent high-contrast glass & gradient overlay */}
        <div className="bg-gradient-to-r from-purple-950/95 via-purple-950/88 to-indigo-950/92 backdrop-blur-[1.5px] px-3 sm:px-6 py-2.5 sm:py-3 text-white">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
            {/* Left: Prominent Logo on one side & Institution Name */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              {/* Prominent Logo */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/95 p-1 shadow-lg border-2 border-pink-400/50 flex items-center justify-center shrink-0 overflow-hidden">
                {clinicConfig.logoUrl ? (
                  <img
                    src={clinicConfig.logoUrl}
                    alt="Hospital Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as any).src = '/icon.svg';
                    }}
                  />
                ) : (
                  <div className="w-full h-full rounded-xl bg-gradient-to-tr from-purple-700 via-pink-600 to-indigo-600 flex items-center justify-center text-white shadow-inner">
                    <Activity className="w-7 h-7 text-white" />
                  </div>
                )}
              </div>

              {/* Institution Details */}
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="font-black text-sm sm:text-lg tracking-tight leading-tight text-white drop-shadow-md">
                    <span>{lang === 'bn' ? clinicConfig.clinicNameBn : clinicConfig.clinicName}</span>
                  </h1>

                  {/* Institution Name & Logo Edit Button */}
                  <button
                    type="button"
                    onClick={() => setShowEditClinic(true)}
                    className="flex items-center gap-1 px-2 py-0.5 bg-pink-600/40 hover:bg-pink-600 text-pink-100 hover:text-white rounded-md text-[11px] font-bold border border-pink-400/60 transition cursor-pointer active:scale-95 shadow-xs"
                    title={lang === 'bn' ? 'প্রতিষ্ঠানের নাম ও লোগো পরিবর্তন করুন' : 'Edit Institution Name & Logo'}
                  >
                    <Pencil className="w-3 h-3 text-pink-200" />
                    <span>{lang === 'bn' ? 'ইডিট' : 'Edit'}</span>
                  </button>

                  <span className="hidden md:inline-block px-2 py-0.5 bg-purple-900/80 border border-purple-700/60 text-[10px] font-bold rounded-full text-purple-200">
                    PRO v2.6
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-0.5 text-[11px] text-purple-200/90 font-medium truncate">
                  <span className="font-semibold text-pink-300 uppercase tracking-wide text-[10px]">
                    {clinicConfig.clinicName}
                  </span>
                  <span className="hidden sm:inline text-purple-400">·</span>
                  <span className="hidden sm:inline text-purple-300">
                    {lang === 'bn' ? clinicConfig.taglineBn : clinicConfig.tagline}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: "আদিবা অ্যাডমিন" & "লগআউট" placed together right here! */}
            <div className="flex items-center gap-2 shrink-0 self-center">
              {/* Adiba Admin / Active User Profile Button */}
              {currentUser && (
                <button
                  type="button"
                  onClick={onOpenAdminModal}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-white cursor-pointer transition active:scale-95 shadow-md ${
                    currentUser.role === 'Admin'
                      ? 'bg-gradient-to-r from-purple-800 via-pink-700 to-indigo-800 hover:from-purple-700 hover:via-pink-600 border-pink-400 ring-1 ring-pink-400/50'
                      : 'bg-purple-900/90 hover:bg-purple-800 border-purple-700'
                  }`}
                  title={
                    lang === 'bn'
                      ? 'আদিবা অ্যাডমিন - ক্লিক করে ইউজার ও পাসওয়ার্ড ব্যবস্থাপনা করুন'
                      : 'Adiba Admin - Click to view users & set passwords'
                  }
                >
                  <div className="w-6 h-6 rounded-lg bg-pink-500 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-xs">
                    {currentUser.role === 'Admin' ? (
                      <Crown className="w-4 h-4 text-amber-200" />
                    ) : (
                      currentUser.fullName ? currentUser.fullName.charAt(0) : 'U'
                    )}
                  </div>
                  <div className="text-left leading-tight">
                    <div className="font-black text-xs text-white flex items-center gap-1">
                      <span>{currentUser.role === 'Admin' && lang === 'bn' ? 'আদিবা অ্যাডমিন' : currentUser.fullName}</span>
                    </div>
                    <div className="text-[10px] text-pink-200 font-mono flex items-center gap-1">
                      <span>@{currentUser.username}</span>
                      <KeyRound className="w-2.5 h-2.5 text-amber-300" />
                    </div>
                  </div>
                </button>
              )}

              {/* Logout Button placed directly with Adiba Admin */}
              {onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white rounded-xl text-xs font-black border border-red-400/60 transition cursor-pointer shadow-md active:scale-95"
                  title={lang === 'bn' ? 'সফটওয়্যার থেকে লগআউট করুন' : 'Log out from software'}
                >
                  <LogOut className="w-3.5 h-3.5 text-white" />
                  <span>{lang === 'bn' ? 'লগআউট' : 'Logout'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {showEditClinic && <EditClinicModal onClose={() => setShowEditClinic(false)} />}
    </header>
  );
};
