import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  ThemeMode,
  Doctor,
  LabTest,
  Patient,
  Invoice,
  Prescription,
  EcgReport,
  XrayReport,
  UsgReport,
  ClinicConfig,
  SystemLog,
  ChatMessage,
  NotificationItem,
  UserAccount,
  AppModuleId,
} from '../types';
import {
  initialClinicConfig,
  initialDoctors,
  initialLabTests,
  initialPatients,
  initialInvoices,
  initialUsers,
  translations,
} from '../data/initialData';

const PREFIX = 'medicare_clinic_v1_';

interface AppContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  t: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  users: UserAccount[];
  currentUser: UserAccount | null;
  setCurrentUser: (user: UserAccount | null) => void;
  loginUser: (username: string, pass: string) => { success: boolean; error?: string };
  logoutUser: () => void;
  addUser: (user: Omit<UserAccount, 'id' | 'createdAt'>) => UserAccount;
  updateUser: (id: string, user: Partial<UserAccount>) => void;
  deleteUser: (id: string) => boolean;
  hasAccessToModule: (moduleId: string) => boolean;
  getAllowedTabs: () => AppModuleId[];

  clinicConfig: ClinicConfig;
  updateClinicConfig: (config: Partial<ClinicConfig>) => void;

  doctors: Doctor[];
  addDoctor: (doc: Omit<Doctor, 'id'>) => Doctor;
  updateDoctor: (id: string, doc: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;

  labTests: LabTest[];
  addLabTest: (test: Omit<LabTest, 'id'>) => LabTest;
  updateLabTest: (id: string, test: Partial<LabTest>) => void;
  deleteLabTest: (id: string) => void;

  patients: Patient[];
  addPatient: (pat: Omit<Patient, 'id'>) => Patient;
  updatePatient: (id: string, pat: Partial<Patient>) => void;
  deletePatient: (id: string) => void;

  selectedPatientForReport: Patient | null;
  setSelectedPatientForReport: (p: Patient | null) => void;

  invoices: Invoice[];
  addInvoice: (inv: Omit<Invoice, 'id'>) => Invoice;

  prescriptions: Prescription[];
  addPrescription: (rx: Omit<Prescription, 'id'>) => Prescription;

  ecgReports: EcgReport[];
  addEcgReport: (ecg: Omit<EcgReport, 'id'>) => void;

  xrayReports: XrayReport[];
  addXrayReport: (xray: Omit<XrayReport, 'id'>) => void;

  usgReports: UsgReport[];
  addUsgReport: (usg: Omit<UsgReport, 'id'>) => void;

  is2FAEnabled: boolean;
  setIs2FAEnabled: (enabled: boolean) => void;
  is2FAVerified: boolean;
  setIs2FAVerified: (verified: boolean) => void;
  open2FAModal: boolean;
  setOpen2FAModal: (open: boolean) => void;

  notifications: NotificationItem[];
  addNotification: (title: string, message: string, type?: 'info' | 'success' | 'warn' | 'error') => void;
  markNotificationsAsRead: () => void;
  unreadCount: number;

  chatMessages: ChatMessage[];
  sendChatMessage: (message: string, channel: 'lab' | 'opd' | 'billing' | 'general', senderRole?: 'Lab' | 'Doctor' | 'Reception' | 'Admin') => void;

  cloudSyncStatus: 'synced' | 'syncing';
  lastSyncTime: string;
  triggerManualSync: () => void;

  systemLogs: SystemLog[];
  addLog: (level: 'info' | 'warn' | 'error', message: string, module: string) => void;
  resetToSampleData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Language>(() => (localStorage.getItem(`${PREFIX}lang`) as Language) || 'bn');
  const [theme, setTheme] = useState<ThemeMode>(() => (localStorage.getItem(`${PREFIX}theme`) as ThemeMode) || 'modern');
  const [activeTab, setActiveTab] = useState<string>('pathology');

  const ALL_MODULES: AppModuleId[] = [
    'pathology',
    'billing',
    'doctorVisit',
    'ecg',
    'xray',
    'ultrasound',
    'doctorPortal',
    'analytics',
    'chat',
    'settings',
  ];

  const [users, setUsers] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}users`);
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = sessionStorage.getItem(`${PREFIX}current_user`) || localStorage.getItem(`${PREFIX}current_user`);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    if (sessionStorage.getItem('adiba_session_auth') === 'true') {
      return initialUsers[0];
    }
    return null;
  });

  useEffect(() => {
    localStorage.setItem(`${PREFIX}users`, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem(`${PREFIX}current_user`, JSON.stringify(currentUser));
      localStorage.setItem(`${PREFIX}current_user`, JSON.stringify(currentUser));
      sessionStorage.setItem('adiba_session_auth', 'true');
      localStorage.setItem('adiba_app_auth', 'authenticated');
    } else {
      sessionStorage.removeItem(`${PREFIX}current_user`);
      localStorage.removeItem(`${PREFIX}current_user`);
      sessionStorage.removeItem('adiba_session_auth');
      localStorage.removeItem('adiba_app_auth');
    }
  }, [currentUser]);

  const hasAccessToModule = (moduleId: string): boolean => {
    if (!currentUser) return false;
    if (currentUser.role === 'Admin') return true;
    return currentUser.allowedModules.includes(moduleId as AppModuleId);
  };

  const getAllowedTabs = (): AppModuleId[] => {
    if (!currentUser) return ['pathology'];
    if (currentUser.role === 'Admin') return ALL_MODULES;
    return currentUser.allowedModules.length > 0 ? currentUser.allowedModules : ['pathology'];
  };

  const loginUser = (username: string, pass: string): { success: boolean; error?: string } => {
    const trimmedUser = username.trim().toLowerCase();
    const matched = users.find(
      (u) => u.username.toLowerCase() === trimmedUser && u.password === pass
    );

    if (!matched) {
      return {
        success: false,
        error:
          lang === 'bn'
            ? 'ইউজার নেইম বা পাসওয়ার্ড সঠিক নয়! দয়া করে সঠিক ইউজার আইডি ও পাসওয়ার্ড দিন।'
            : 'Invalid username or password! Please check credentials.',
      };
    }

    if (!matched.isActive) {
      return {
        success: false,
        error:
          lang === 'bn'
            ? 'এই ইউজার অ্যাকাউন্টটি বর্তমানে নিষ্ক্রিয় রয়েছে। অ্যাডমিনের সাথে যোগাযোগ করুন।'
            : 'This account has been deactivated. Please contact administrator.',
      };
    }

    setCurrentUser(matched);

    const allowed = matched.role === 'Admin' ? ALL_MODULES : matched.allowedModules;
    if (allowed.length > 0 && !allowed.includes(activeTab as AppModuleId)) {
      setActiveTab(allowed[0]);
    }

    return { success: true };
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  const addUser = (userData: Omit<UserAccount, 'id' | 'createdAt'>): UserAccount => {
    const newUser: UserAccount = {
      ...userData,
      id: `usr-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers((prev) => [...prev, newUser]);
    return newUser;
  };

  const updateUser = (id: string, updated: Partial<UserAccount>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
    );
    if (currentUser && currentUser.id === id) {
      setCurrentUser((prev) => (prev ? { ...prev, ...updated } : null));
    }
  };

  const deleteUser = (id: string): boolean => {
    const target = users.find((u) => u.id === id);
    if (!target) return false;
    if (target.username.toLowerCase() === 'adiba') {
      return false;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    return true;
  };

  const [clinicConfig, setClinicConfig] = useState<ClinicConfig>(() => {
    const saved = localStorage.getItem(`${PREFIX}config`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.labInCharge === 'Md. Tariqul Islam, B.Sc (Lab Tech)' || parsed.labInCharge === 'Md. Tariqul Islam') {
          parsed.labInCharge = initialClinicConfig.labInCharge;
        }
        return { ...initialClinicConfig, ...parsed };
      } catch {
        return initialClinicConfig;
      }
    }
    return initialClinicConfig;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}doctors`);
    return saved ? JSON.parse(saved) : initialDoctors;
  });

  const [labTests, setLabTests] = useState<LabTest[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}tests`);
    return saved ? JSON.parse(saved) : initialLabTests;
  });

  const [patients, setPatients] = useState<Patient[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}patients`);
    return saved ? JSON.parse(saved) : initialPatients;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}invoices`);
    return saved ? JSON.parse(saved) : initialInvoices;
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}rx`);
    return saved ? JSON.parse(saved) : [];
  });

  const [ecgReports, setEcgReports] = useState<EcgReport[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}ecg`);
    return saved ? JSON.parse(saved) : [];
  });

  const [xrayReports, setXrayReports] = useState<XrayReport[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}xray`);
    return saved ? JSON.parse(saved) : [];
  });

  const [usgReports, setUsgReports] = useState<UsgReport[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}usg`);
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedPatientForReport, setSelectedPatientForReport] = useState<Patient | null>(null);

  const [is2FAEnabled, setIs2FAEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(`${PREFIX}2fa_enabled`);
    return saved ? JSON.parse(saved) : false;
  });
  const [is2FAVerified, setIs2FAVerified] = useState<boolean>(true);
  const [open2FAModal, setOpen2FAModal] = useState<boolean>(false);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Lab Report Completed',
      message: 'Test report for Titly (PId: 26100294) generated and printed successfully.',
      type: 'success',
      timestamp: '10:50 AM',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Billing Receipt Generated',
      message: 'Invoice INV-2026-1001 for ৳950 processed.',
      type: 'info',
      timestamp: '10:15 AM',
      read: false,
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'Prof. Dr. M. A. Rahman',
      senderRole: 'Doctor',
      message: 'Please expedite the CBC report for patient PId: 26100294 (Titly).',
      timestamp: '10:30 AM',
      channel: 'lab',
    },
    {
      id: 'msg-2',
      sender: 'Lab Receptionist',
      senderRole: 'Reception',
      message: 'Noted Doctor Sir! Automated analyzer has completed the run, verification in progress.',
      timestamp: '10:32 AM',
      channel: 'lab',
    },
    {
      id: 'msg-3',
      sender: 'Lab Technologist',
      senderRole: 'Lab',
      message: 'Report verified and ready for print!',
      timestamp: '10:48 AM',
      channel: 'lab',
    },
  ]);

  const [cloudSyncStatus, setCloudSyncStatus] = useState<'synced' | 'syncing'>('synced');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([
    {
      id: 'log-1',
      level: 'info',
      message: 'Clinical Database initialized with fast local cache & 256-bit encryption layer.',
      timestamp: new Date().toLocaleTimeString(),
      module: 'Core System',
    },
    {
      id: 'log-2',
      level: 'info',
      message: 'Diagnostic test templates loaded for Pathology, ECG, X-Ray & Ultrasound.',
      timestamp: new Date().toLocaleTimeString(),
      module: 'Diagnostics',
    },
  ]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}lang`, lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}theme`, theme);
    document.documentElement.classList.remove('theme-classic', 'theme-modern', 'dark');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'classic') {
      document.documentElement.classList.add('theme-classic');
    } else {
      document.documentElement.classList.add('theme-modern');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}config`, JSON.stringify(clinicConfig));
  }, [clinicConfig]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}doctors`, JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}tests`, JSON.stringify(labTests));
  }, [labTests]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}patients`, JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}invoices`, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}rx`, JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}ecg`, JSON.stringify(ecgReports));
  }, [ecgReports]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}xray`, JSON.stringify(xrayReports));
  }, [xrayReports]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}usg`, JSON.stringify(usgReports));
  }, [usgReports]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}2fa_enabled`, JSON.stringify(is2FAEnabled));
  }, [is2FAEnabled]);

  const t = (translations as any)[lang] || (translations as any).bn;

  const updateClinicConfig = (config: Partial<ClinicConfig>) => {
    setClinicConfig((prev) => ({ ...prev, ...config }));
    addLog('info', 'Clinic configuration updated', 'Settings');
  };

  const addDoctor = (doc: Omit<Doctor, 'id'>): Doctor => {
    const newDoc: Doctor = { ...doc, id: `doc-${Date.now()}` };
    setDoctors((prev) => [...prev, newDoc]);
    addNotification('New Doctor Added', `${newDoc.name} (${newDoc.code}) was registered into the system.`, 'info');
    addLog('info', `Doctor ${newDoc.name} (${newDoc.code}) added`, 'Doctor Master');
    return newDoc;
  };

  const updateDoctor = (id: string, doc: Partial<Doctor>) => {
    setDoctors((prev) => prev.map((d) => (d.id === id ? { ...d, ...doc } : d)));
  };

  const deleteDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const addLabTest = (test: Omit<LabTest, 'id'>): LabTest => {
    const newTest: LabTest = { ...test, id: `test-${Date.now()}` };
    setLabTests((prev) => [...prev, newTest]);
    addLog('info', `Test ${newTest.name} added`, 'Lab Master');
    return newTest;
  };

  const updateLabTest = (id: string, test: Partial<LabTest>) => {
    setLabTests((prev) => prev.map((t) => (t.id === id ? { ...t, ...test } : t)));
  };

  const deleteLabTest = (id: string) => {
    setLabTests((prev) => prev.filter((t) => t.id !== id));
  };

  const addPatient = (pat: Omit<Patient, 'id'>): Patient => {
    const newPat: Patient = { ...pat, id: `pat-${Date.now()}`, createdAt: new Date().toISOString() };
    setPatients((prev) => [newPat, ...prev]);
    addNotification('New Patient Record', `Patient ${newPat.patientName} (PId: ${newPat.pId}) registered.`, 'info');
    addLog('info', `Patient ${newPat.patientName} (PId: ${newPat.pId}) created`, 'Pathology');
    return newPat;
  };

  const updatePatient = (id: string, pat: Partial<Patient>) => {
    setPatients((prev) => prev.map((p) => (p.id === id || p.pId === id ? { ...p, ...pat } : p)));
  };

  const deletePatient = (id: string) => {
    setPatients((prev) => prev.filter((p) => p.id !== id && p.pId !== id));
  };

  const addInvoice = (inv: Omit<Invoice, 'id'>): Invoice => {
    const newInv: Invoice = { ...inv, id: `inv-${Date.now()}`, createdAt: new Date().toISOString() };
    setInvoices((prev) => [newInv, ...prev]);
    addNotification('Payment Recorded', `Invoice ${newInv.invoiceNo} issued for ৳${newInv.paidAmount}.`, 'success');
    addLog('info', `Invoice ${newInv.invoiceNo} created for ${newInv.patientName}`, 'Billing');
    return newInv;
  };

  const addPrescription = (rx: Omit<Prescription, 'id'>): Prescription => {
    const newRx: Prescription = { ...rx, id: `rx-${Date.now()}` };
    setPrescriptions((prev) => [newRx, ...prev]);
    addNotification('Prescription Generated', `Rx created for ${newRx.patientName} by ${newRx.doctorName}`, 'info');
    return newRx;
  };

  const addEcgReport = (ecg: Omit<EcgReport, 'id'>) => {
    const newEcg: EcgReport = { ...ecg, id: `ecg-${Date.now()}` };
    setEcgReports((prev) => [newEcg, ...prev]);
    addNotification('ECG Report Completed', `ECG interpretation saved for PId: ${newEcg.pId}`, 'info');
  };

  const addXrayReport = (xray: Omit<XrayReport, 'id'>) => {
    const newXray: XrayReport = { ...xray, id: `xray-${Date.now()}` };
    setXrayReports((prev) => [newXray, ...prev]);
    addNotification('X-Ray Report Ready', `X-Ray findings recorded for PId: ${newXray.pId}`, 'info');
  };

  const addUsgReport = (usg: Omit<UsgReport, 'id'>) => {
    const newUsg: UsgReport = { ...usg, id: `usg-${Date.now()}` };
    setUsgReports((prev) => [newUsg, ...prev]);
    addNotification('Ultrasound Report Ready', `USG Scan recorded for PId: ${newUsg.pId}`, 'info');
  };

  const addNotification = (title: string, message: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') => {
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const sendChatMessage = (
    message: string,
    channel: 'lab' | 'opd' | 'billing' | 'general',
    senderRole: 'Lab' | 'Doctor' | 'Reception' | 'Admin' = 'Lab'
  ) => {
    const senderNames = {
      Lab: 'Lab Technologist',
      Doctor: 'Consultant Doctor',
      Reception: 'Front Desk',
      Admin: 'Clinic Director',
    };
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: senderNames[senderRole],
      senderRole,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      channel,
    };
    setChatMessages((prev) => [...prev, newMsg]);
    addLog('info', `Encrypted message transmitted on channel [${channel}]`, 'Secure Chat');
  };

  const addLog = (level: 'info' | 'warn' | 'error', message: string, module: string) => {
    const newLog: SystemLog = {
      id: `log-${Date.now()}`,
      level,
      message,
      timestamp: new Date().toLocaleTimeString(),
      module,
    };
    setSystemLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  const triggerManualSync = () => {
    setCloudSyncStatus('syncing');
    setTimeout(() => {
      setCloudSyncStatus('synced');
      setLastSyncTime(new Date().toLocaleTimeString());
      addNotification(
        'Cloud Data Synchronized',
        'All local patients, lab tests and billing records successfully pushed to encrypted cloud storage.',
        'success'
      );
      addLog('info', 'Cloud sync checkpoint completed successfully with zero latency', 'Cloud Storage');
    }, 800);
  };

  const resetToSampleData = () => {
    setClinicConfig(initialClinicConfig);
    setDoctors(initialDoctors);
    setLabTests(initialLabTests);
    setPatients(initialPatients as Patient[]);
    setInvoices(initialInvoices as Invoice[]);
    setUsers(initialUsers);
    addNotification('Demo Data Reset', 'Default clinics, tests, doctors, patient records and default users restored.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        theme,
        setTheme,
        t,
        activeTab,
        setActiveTab,
        users,
        currentUser,
        setCurrentUser,
        loginUser,
        logoutUser,
        addUser,
        updateUser,
        deleteUser,
        hasAccessToModule,
        getAllowedTabs,
        clinicConfig,
        updateClinicConfig,
        doctors,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        labTests,
        addLabTest,
        updateLabTest,
        deleteLabTest,
        patients,
        addPatient,
        updatePatient,
        deletePatient,
        selectedPatientForReport,
        setSelectedPatientForReport,
        invoices,
        addInvoice,
        prescriptions,
        addPrescription,
        ecgReports,
        addEcgReport,
        xrayReports,
        addXrayReport,
        usgReports,
        addUsgReport,
        is2FAEnabled,
        setIs2FAEnabled,
        is2FAVerified,
        setIs2FAVerified,
        open2FAModal,
        setOpen2FAModal,
        notifications,
        addNotification,
        markNotificationsAsRead,
        unreadCount,
        chatMessages,
        sendChatMessage,
        cloudSyncStatus,
        lastSyncTime,
        triggerManualSync,
        systemLogs,
        addLog,
        resetToSampleData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
