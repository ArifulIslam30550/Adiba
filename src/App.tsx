import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { PathologyModule } from './components/Pathology/PathologyModule';
import { BillingModule } from './components/Billing/BillingModule';
import { DoctorVisitModule } from './components/DoctorVisit/DoctorVisitModule';
import { DoctorPortalModule } from './components/DoctorPortal/DoctorPortalModule';
import { EcgModule } from './components/Imaging/EcgModule';
import { XrayModule } from './components/Imaging/XrayModule';
import { UltrasoundModule } from './components/Imaging/UltrasoundModule';
import { AnalyticsModule } from './components/Analytics/AnalyticsModule';
import { ChatModule } from './components/Chat/ChatModule';
import { SettingsModule } from './components/Settings/SettingsModule';
import { TwoFactorModal } from './components/Modals/TwoFactorModal';
import { SurveyModal } from './components/Modals/SurveyModal';
import { UserGuideModal } from './components/Modals/UserGuideModal';
import { AdminUserPasswordModal } from './components/Modals/AdminUserPasswordModal';
import { OfflineIndicator } from './components/PWA/OfflineIndicator';
import { LoginScreen } from './components/Auth/LoginScreen';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    theme,
    currentUser,
    logoutUser,
    hasAccessToModule,
    getAllowedTabs,
    lang,
  } = useApp();

  const [open2FA, setOpen2FA] = useState<boolean>(false);
  const [openSurvey, setOpenSurvey] = useState<boolean>(false);
  const [openDocs, setOpenDocs] = useState<boolean>(false);
  const [openAdminModal, setOpenAdminModal] = useState<boolean>(false);

  // Enforce access control: if user is logged in and activeTab is not allowed, redirect to first allowed tab
  useEffect(() => {
    if (currentUser && !hasAccessToModule(activeTab)) {
      const allowed = getAllowedTabs();
      if (allowed.length > 0 && !allowed.includes(activeTab as any)) {
        setActiveTab(allowed[0]);
      }
    }
  }, [currentUser, activeTab, hasAccessToModule, getAllowedTabs, setActiveTab]);

  // If not logged in, show lock screen
  if (!currentUser) {
    return <LoginScreen onLoginSuccess={() => {}} />;
  }

  const isCurrentTabAllowed = hasAccessToModule(activeTab);

  return (
    <div
      className={`min-h-screen flex flex-col font-sans ${
        theme === 'dark' ? 'dark bg-gray-900 text-gray-100' : 'bg-slate-50 text-gray-900'
      }`}
    >
      <Header
        onOpen2FA={() => setOpen2FA(true)}
        onOpenSurvey={() => setOpenSurvey(true)}
        onOpenDocs={() => setOpenDocs(true)}
        onLogout={logoutUser}
        onOpenAdminModal={() => setOpenAdminModal(true)}
      />
      <Navbar />

      <main className="flex-1 overflow-x-hidden">
        {!isCurrentTabAllowed ? (
          <div className="max-w-md mx-auto my-16 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-red-200 dark:border-red-900 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-950/60 text-red-600 rounded-full flex items-center justify-center">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
              {lang === 'bn' ? 'অ্যাক্সেস সংরক্ষিত / অনুমতি নেই' : 'Restricted Module Access'}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {lang === 'bn'
                ? `আপনার ইউজার আইডি (@${currentUser.username}) এই মডিউলটি দেখার অনুমতি নেই। আপনি শুধুমাত্র আপনার জন্য নির্ধারিত ইন্টারফেসে প্রবেশ করতে পারবেন।`
                : `Your account (@${currentUser.username}) is not permitted to access this department. Please contact your system administrator.`}
            </p>
            <button
              onClick={() => {
                const allowed = getAllowedTabs();
                if (allowed.length > 0) setActiveTab(allowed[0]);
              }}
              className="mt-6 px-4 py-2 bg-purple-800 hover:bg-purple-900 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'bn' ? 'অনুমোদিত ড্যাশবোর্ডে ফিরে যান' : 'Return to Allowed Module'}</span>
            </button>
          </div>
        ) : (
          <>
            {activeTab === 'pathology' && <PathologyModule />}
            {activeTab === 'billing' && <BillingModule />}
            {activeTab === 'doctorVisit' && <DoctorVisitModule />}
            {activeTab === 'doctorPortal' && <DoctorPortalModule />}
            {activeTab === 'ecg' && <EcgModule />}
            {activeTab === 'xray' && <XrayModule />}
            {activeTab === 'ultrasound' && <UltrasoundModule />}
            {activeTab === 'analytics' && <AnalyticsModule />}
            {activeTab === 'chat' && <ChatModule />}
            {activeTab === 'settings' && <SettingsModule />}
          </>
        )}
      </main>

      {openAdminModal && <AdminUserPasswordModal onClose={() => setOpenAdminModal(false)} />}
      {open2FA && <TwoFactorModal onClose={() => setOpen2FA(false)} />}
      {openSurvey && <SurveyModal onClose={() => setOpenSurvey(false)} />}
      {openDocs && <UserGuideModal onClose={() => setOpenDocs(false)} />}
      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
