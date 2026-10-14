import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Patient, TestResultItem, LabTest, Doctor } from '../../types';
import { PathologyReportModal } from './PathologyReportModal';
import { AddCustomTestModal } from './AddCustomTestModal';
import {
  RotateCcw,
  Search,
  Plus,
  Eye,
  Trash2,
  Printer,
  Save,
  UserPlus,
  FileText,
  CheckCircle,
} from 'lucide-react';

export const PathologyModule: React.FC = () => {
  const {
    patients,
    addPatient,
    updatePatient,
    doctors,
    addDoctor,
    labTests,
    addLabTest,
    t,
    lang,
    theme,
  } = useApp();

  const [billDate, setBillDate] = useState('13-10-2026');
  const [patientId, setPatientId] = useState('26100294');
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [drCode, setDrCode] = useState('DR01');
  const [comments, setComments] = useState('');
  const [autoPrint, setAutoPrint] = useState(true);
  const [testResults, setTestResults] = useState<TestResultItem[]>([]);
  const [testSearchInput, setTestSearchInput] = useState('');
  const [patientSearchInput, setPatientSearchInput] = useState('');
  const [showDoctorModal, setShowDoctorModal] = useState(false);
  const [showAddTestModal, setShowAddTestModal] = useState(false);
  const [showCustomTestModal, setShowCustomTestModal] = useState(false);
  const [selectedPatientForReport, setSelectedPatientForReport] = useState<Patient | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Doctor form state for modal
  const [newDocCode, setNewDocCode] = useState(`DR0${doctors.length + 1}`);
  const [newDocName, setNewDocName] = useState('');
  const [newDocDegree, setNewDocDegree] = useState('MBBS, FCPS');
  const [newDocSpecialty, setNewDocSpecialty] = useState('Specialist Physician');
  const [newDocPhone, setNewDocPhone] = useState('+880 17');
  const [newDocRoom, setNewDocRoom] = useState('201');
  const [newDocFee, setNewDocFee] = useState(800);

  const matchedDoctor = doctors.find(
    (d) => d.code.toUpperCase() === drCode.trim().toUpperCase()
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const capitalize = (str: string) => str.replace(/\b\w/g, (c) => c.toUpperCase());

  const handlePatientNameChange = (val: string) => {
    setPatientName(capitalize(val));
  };

  const generateNewPatient = () => {
    const newId = (26100295 + Math.floor(Math.random() * 80)).toString();
    setPatientId(newId);
    setPatientName('');
    setAge('');
    setComments('');
    setTestResults([]);
    setTestSearchInput('');
    showToast(lang === 'bn' ? `নতুন রোগী প্রস্তুত (আইডি: ${newId})` : `New patient ready (ID: ${newId})`);
  };

  const loadPatient = (pat: Patient) => {
    setPatientId(pat.pId);
    setPatientName(pat.patientName);
    setAge(pat.age);
    setSex(pat.sex as any);
    setDrCode(pat.drCode);
    setBillDate(pat.billDate || pat.invDate);
    setComments(pat.comments || '');
    if (pat.autoPrint !== undefined) setAutoPrint(pat.autoPrint);
    setTestResults(pat.testResults || []);
    showToast(lang === 'bn' ? `${pat.patientName} এর তথ্য লোড হয়েছে` : `Loaded data for ${pat.patientName}`);
  };

  const handleAddTestFromSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = testSearchInput.trim();
    if (!query) {
      setShowAddTestModal(true);
      return;
    }
    const match = labTests.find(
      (t) =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.code.toLowerCase() === query.toLowerCase()
    );

    if (match) {
      addTestToResults(match);
    } else {
      setShowAddTestModal(true);
    }
    setTestSearchInput('');
  };

  const addTestToResults = (test: LabTest) => {
    if (test.subTests && test.subTests.length > 0) {
      const items: TestResultItem[] = test.subTests.map((st) => ({
        testName: st.name,
        result: st.defaultValue || '',
        unit: st.unit,
        normalRange: st.normalRange,
        status: 'Normal',
      }));
      setTestResults((prev) => [...prev, ...items]);
      showToast(lang === 'bn' ? `${test.name} ফরম্যাট যোগ করা হয়েছে` : `Added ${test.name} panel`);
    } else {
      const item: TestResultItem = {
        testName: test.name,
        result: '',
        unit: test.unit || '',
        normalRange: test.normalRange || '',
        status: 'Normal',
      };
      setTestResults((prev) => [...prev, item]);
      showToast(lang === 'bn' ? `${test.name} যোগ করা হয়েছে` : `Added ${test.name}`);
    }
  };

  const addEmptyRow = () => {
    setTestResults((prev) => [
      ...prev,
      { testName: '', result: '', unit: '', normalRange: '', status: 'Normal' },
    ]);
  };

  const handleAddCustomTest = (
    item: TestResultItem,
    saveToCatalog: boolean,
    catalogDetails?: { category: string; price: number }
  ) => {
    setTestResults((prev) => [...prev, item]);
    if (saveToCatalog) {
      addLabTest({
        code: `CUST${Date.now().toString().slice(-4)}`,
        name: item.testName,
        unit: item.unit,
        normalRange: item.normalRange,
        category: catalogDetails?.category || 'Pathology',
        price: catalogDetails?.price || 300,
      });
      showToast(
        lang === 'bn'
          ? `${item.testName} টেস্ট ও মাস্টার ক্যাটালগে যুক্ত হয়েছে!`
          : `Added ${item.testName} to report & test catalog!`
      );
    } else {
      showToast(
        lang === 'bn'
          ? `${item.testName} টেস্ট যোগ করা হয়েছে!`
          : `Added ${item.testName} to report!`
      );
    }
  };

  const removeRow = (index: number) => {
    setTestResults((prev) => prev.filter((_, i) => i !== index));
    showToast(lang === 'bn' ? 'টেস্ট মুছে ফেলা হয়েছে' : 'Test row removed');
  };

  const updateRow = (index: number, field: keyof TestResultItem, value: string) => {
    const updated = [...testResults];
    updated[index] = { ...updated[index], [field]: value };

    // Automatic High/Low abnormal calculation
    if (field === 'result' && value.trim()) {
      const numVal = parseFloat(value);
      const range = updated[index].normalRange;
      if (!isNaN(numVal) && range.includes('-')) {
        const parts = range.split('-').map((p) => parseFloat(p.trim().replace(/[^0-9.]/g, '')));
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          if (numVal < parts[0]) {
            updated[index].status = 'Low';
          } else if (numVal > parts[1]) {
            updated[index].status = 'High';
          } else {
            updated[index].status = 'Normal';
          }
        }
      }
    }
    setTestResults(updated);
  };

  const savePatientReport = (isPrint: boolean = false) => {
    const name = patientName.trim() || `Patient-${patientId}`;
    if (!patientName.trim()) setPatientName(name);

    const existingIndex = patients.findIndex((p) => p.pId === patientId);
    let targetPatient: Patient;

    if (existingIndex >= 0) {
      updatePatient(patients[existingIndex].id, {
        patientName: name,
        age: age || 'N/A',
        sex,
        drCode,
        drName: matchedDoctor?.name || drCode,
        billDate,
        comments,
        autoPrint,
        testResults,
        status: isPrint ? 'Printed' : 'Completed',
      });
      targetPatient = {
        ...patients[existingIndex],
        patientName: name,
        age: age || 'N/A',
        sex,
        drCode,
        drName: matchedDoctor?.name || drCode,
        billDate,
        comments,
        autoPrint,
        testResults,
        status: isPrint ? 'Printed' : 'Completed',
      };
      showToast(lang === 'bn' ? `রোগী ${name} এর রিপোর্ট সংরক্ষণ হয়েছে` : `Patient ${name} saved successfully`);
    } else {
      targetPatient = addPatient({
        pId: patientId,
        invDate: billDate,
        billDate,
        patientName: name,
        age: age || 'N/A',
        sex,
        drCode,
        drName: matchedDoctor?.name || drCode,
        status: isPrint ? 'Printed' : 'Completed',
        department: 'Pathology',
        comments,
        autoPrint,
        testResults,
      });
      showToast(lang === 'bn' ? `নতুন রোগী ${name} সংরক্ষিত হয়েছে` : `New patient ${name} created`);
    }

    if (isPrint) {
      setSelectedPatientForReport(targetPatient);
    }
  };

  const previewReport = () => {
    const name = patientName.trim() || `Patient-${patientId}`;
    const previewData: Patient = {
      id: `preview-${Date.now()}`,
      pId: patientId,
      invDate: billDate,
      billDate,
      patientName: name,
      age: age || 'N/A',
      sex,
      drCode,
      drName: matchedDoctor?.name || drCode,
      status: 'Printed',
      department: 'Pathology',
      comments,
      autoPrint,
      testResults:
        testResults.length > 0
          ? testResults
          : [
              {
                testName: 'Hemoglobin (Hb)',
                result: '13.5',
                unit: 'g/dL',
                normalRange: '12.0 - 16.0',
                status: 'Normal',
              },
              {
                testName: 'Fasting Blood Sugar (FBS)',
                result: '5.4',
                unit: 'mmol/L',
                normalRange: '3.9 - 6.0',
                status: 'Normal',
              },
            ],
    };
    setSelectedPatientForReport(previewData);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.pId.toLowerCase().includes(patientSearchInput.toLowerCase()) ||
      p.patientName.toLowerCase().includes(patientSearchInput.toLowerCase())
  );

  const filteredTests = labTests.filter(
    (t) =>
      testSearchInput.trim() !== '' &&
      (t.name.toLowerCase().includes(testSearchInput.toLowerCase()) ||
        t.code.toLowerCase().includes(testSearchInput.toLowerCase()))
  );

  const isClassic = theme === 'classic';
  const isDark = theme === 'dark';

  return (
    <div
      className={`min-h-full p-2.5 sm:p-4 transition-colors ${
        isDark
          ? 'bg-slate-950 text-slate-100'
          : isClassic
          ? 'bg-[#e4d3e8] text-slate-950'
          : 'bg-slate-100 text-slate-950'
      }`}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="mb-3 bg-purple-900 text-white px-4 py-2.5 rounded-lg shadow-lg text-sm font-bold flex items-center justify-between border-2 border-purple-400">
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white hover:text-red-300 ml-4 font-bold text-lg">
            ×
          </button>
        </div>
      )}

      {/* Main 12-Column Container */}
      <div
        className={`border-2 rounded-xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 ${
          isDark
            ? 'bg-slate-900 border-slate-700'
            : isClassic
            ? 'bg-[#edddec] border-[#9f81a7]'
            : 'bg-white border-slate-300'
        }`}
      >
        {/* LEFT COLUMN: Data Entry Form & Test Table (8 COLS) */}
        <div
          className={`lg:col-span-8 p-3 sm:p-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r ${
            isDark ? 'border-slate-800' : 'border-[#9f81a7]'
          }`}
        >
          <div>
            {/* Top Form Group: Bill Date & Patient ID */}
            <div
              className={`p-3 rounded-lg border-2 mb-3 ${
                isDark
                  ? 'bg-slate-850 border-purple-900 text-slate-100'
                  : isClassic
                  ? 'bg-[#f7eff6] border-[#9f81a7] text-slate-950 shadow-xs'
                  : 'bg-white border-slate-300 text-slate-900 shadow-2xs'
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center mb-2.5">
                <div className="sm:col-span-2 font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200">
                  {t.billDate}
                </div>
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={billDate}
                    onChange={(e) => setBillDate(e.target.value)}
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 px-3 py-1.5 rounded-md text-xs font-bold text-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2 font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200">
                  {t.patientId}
                </div>
                <div className="sm:col-span-3">
                  <input
                    type="text"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    className="w-full bg-yellow-200 dark:bg-yellow-400 text-slate-950 font-black text-center text-sm tracking-widest border-2 border-slate-500 px-3 py-1.5 rounded-md shadow-inner focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={generateNewPatient}
                    className="w-full px-3 py-2 bg-[#b50f75] hover:bg-[#970c62] text-white font-black rounded-md shadow-md text-xs flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95"
                    title={t.refresh}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.refresh}</span>
                  </button>
                </div>
              </div>

              {/* Row 2: Patient Name, Age, Sex */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center mb-2.5">
                <div className="sm:col-span-2 font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200">
                  {t.ptName} *
                </div>
                <div className="sm:col-span-4">
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => handlePatientNameChange(e.target.value)}
                    placeholder={lang === 'bn' ? 'রোগীর নাম লিখুন...' : 'Enter Patient Name...'}
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 px-3 py-1.5 rounded-md text-xs font-black text-slate-950 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1 font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200">
                  {t.age}
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 25 Y"
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 px-3 py-1.5 rounded-md text-xs font-bold text-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-1 font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200">
                  {t.sex}
                </div>
                <div className="sm:col-span-2">
                  <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value as any)}
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 px-2 py-1.5 rounded-md text-xs font-bold text-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-purple-600 focus:outline-none cursor-pointer"
                  >
                    <option value="Female">{lang === 'bn' ? 'মহিলা' : 'Female'}</option>
                    <option value="Male">{lang === 'bn' ? 'পুরুষ' : 'Male'}</option>
                    <option value="Other">{lang === 'bn' ? 'অন্যান্য' : 'Other'}</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Dr. Code, Doctor Name, New Doctor Register */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
                <div className="sm:col-span-2 font-bold text-xs uppercase tracking-wide text-slate-800 dark:text-slate-200">
                  {t.drCode}
                </div>
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={drCode}
                    onChange={(e) => setDrCode(e.target.value)}
                    placeholder="DR01"
                    className="w-full bg-purple-50 dark:bg-slate-800 border-2 border-purple-400 dark:border-purple-600 px-3 py-1.5 rounded-md text-xs font-black uppercase text-purple-950 dark:text-purple-300 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-6">
                  <div className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 px-3 py-1.5 rounded-md text-xs font-bold text-slate-950 dark:text-slate-100 flex items-center justify-between">
                    <span className="truncate">
                      {matchedDoctor
                        ? `${matchedDoctor.name} (${matchedDoctor.specialty})`
                        : lang === 'bn'
                        ? 'ডাক্তার কোড লিখুন'
                        : 'Enter doctor code'}
                    </span>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => setShowDoctorModal(true)}
                    className="w-full px-2 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded-md text-xs font-black flex items-center justify-center gap-1 transition cursor-pointer shadow-sm active:scale-95"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>{t.addDoctorBtn}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Test Selection & Quick Search Bar */}
            <div
              className={`p-3 rounded-lg border-2 mb-3.5 ${
                isDark ? 'bg-slate-850 border-purple-900' : 'bg-white border-purple-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-purple-600 dark:text-purple-400" />
                  <input
                    type="text"
                    value={testSearchInput}
                    onChange={(e) => setTestSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTestFromSearch();
                      }
                    }}
                    placeholder={t.searchTestPlaceholder}
                    className="w-full pl-9 pr-3 py-2 bg-purple-50/60 dark:bg-slate-900 border-2 border-purple-400 dark:border-purple-600 rounded-lg text-xs font-bold text-slate-950 dark:text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-purple-600 focus:outline-none"
                  />

                  {/* Dropdown Suggestions */}
                  {filteredTests.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-800 border-2 border-purple-400 rounded-lg shadow-xl z-30 max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700 text-xs">
                      {filteredTests.map((test) => (
                        <div
                          key={test.id}
                          onClick={() => {
                            addTestToResults(test);
                            setTestSearchInput('');
                          }}
                          className="p-2.5 hover:bg-purple-100 dark:hover:bg-slate-700 cursor-pointer flex justify-between items-center"
                        >
                          <div>
                            <span className="font-black text-purple-950 dark:text-purple-200">{test.name}</span>
                            <span className="text-[11px] text-slate-500 ml-2">({test.category})</span>
                          </div>
                          <span className="text-[11px] font-bold text-purple-700 dark:text-purple-400">
                            + {lang === 'bn' ? 'যোগ করুন' : 'Add'}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddTestModal(true)}
                    className="px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white font-black rounded-lg text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md active:scale-95"
                    title={lang === 'bn' ? 'পপ-আপ ওপেন করে টেস্ট ও নরমাল ভ্যালু যোগ করুন' : 'Open popup to configure and add test'}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t.addTestButton}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCustomTestModal(true)}
                    className="px-3.5 py-2 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-800 hover:to-indigo-800 text-white font-black rounded-lg text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md active:scale-95"
                    title={lang === 'bn' ? 'কাস্টম টেস্ট ফর্ম ওপেন করে নতুন টেস্ট যুক্ত করুন' : 'Open form to add custom test'}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{t.addTestRow}</span>
                  </button>
                  <button
                    type="button"
                    onClick={previewReport}
                    className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1 transition cursor-pointer shadow-sm"
                    title="Print Preview"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{lang === 'bn' ? 'প্রিভিউ' : 'Preview'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Profile Shortcuts */}
              <div className="mt-2.5 flex items-center gap-1.5 flex-wrap text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300 text-[11px]">
                  {t.loadProfile}:
                </span>
                {labTests.slice(0, 7).map((test) => (
                  <button
                    key={test.id}
                    type="button"
                    onClick={() => addTestToResults(test)}
                    className="px-2.5 py-1 bg-white hover:bg-purple-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-purple-950 dark:text-purple-200 rounded-md font-bold text-[11px] border border-purple-300 dark:border-purple-800 transition cursor-pointer shadow-2xs"
                  >
                    + {test.name.split('(')[0].trim()}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Results Table */}
            <div className="border-2 border-slate-500 rounded-lg bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
              <div className="overflow-x-auto max-h-[360px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-100 sticky top-0 z-10 border-b-2 border-slate-400">
                    <tr>
                      <th className="py-2.5 px-3 font-black border-r border-slate-300 dark:border-slate-700 w-2/5">
                        {t.testName}
                      </th>
                      <th className="py-2.5 px-3 font-black border-r border-slate-300 dark:border-slate-700 w-1/5 text-center">
                        {t.result}
                      </th>
                      <th className="py-2.5 px-3 font-black border-r border-slate-300 dark:border-slate-700 w-1/6 text-center">
                        {t.unit}
                      </th>
                      <th className="py-2.5 px-3 font-black border-r border-slate-300 dark:border-slate-700 w-1/4 text-center">
                        {t.normalRange}
                      </th>
                      <th className="py-2.5 px-2 font-black text-center w-12">{t.action}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {testResults.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-8 text-slate-400 italic">
                          {t.noTestsAdded}
                        </td>
                      </tr>
                    ) : (
                      testResults.map((item, idx) => (
                        <tr
                          key={idx}
                          className={`hover:bg-purple-50/50 dark:hover:bg-slate-800/60 ${
                            item.status === 'High'
                              ? 'bg-red-50/60 dark:bg-red-950/20'
                              : item.status === 'Low'
                              ? 'bg-blue-50/60 dark:bg-blue-950/20'
                              : ''
                          }`}
                        >
                          <td className="py-1 px-2 border-r border-slate-200 dark:border-slate-800">
                            <input
                              type="text"
                              value={item.testName}
                              onChange={(e) => updateRow(idx, 'testName', e.target.value)}
                              className="w-full bg-transparent px-1.5 py-1 text-xs font-black text-slate-950 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:outline-none"
                            />
                          </td>
                          <td className="py-1 px-2 border-r border-slate-200 dark:border-slate-800 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <input
                                type="text"
                                value={item.result}
                                onChange={(e) => updateRow(idx, 'result', e.target.value)}
                                placeholder="-"
                                className={`w-24 text-center px-1.5 py-1 text-xs font-black rounded border ${
                                  item.status === 'High'
                                    ? 'bg-red-100 text-red-700 border-red-400 font-extrabold'
                                    : item.status === 'Low'
                                    ? 'bg-blue-100 text-blue-700 border-blue-400 font-extrabold'
                                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-950 dark:text-slate-100'
                                } focus:outline-none`}
                              />
                              {item.status !== 'Normal' && (
                                <span
                                  className={`text-[9px] px-1 py-0.2 rounded font-extrabold ${
                                    item.status === 'High' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'
                                  }`}
                                >
                                  {item.status}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-1 px-2 border-r border-slate-200 dark:border-slate-800 text-center">
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) => updateRow(idx, 'unit', e.target.value)}
                              placeholder="Unit"
                              className="w-full text-center bg-transparent px-1 py-1 text-xs text-slate-600 dark:text-slate-300 focus:bg-white dark:focus:bg-slate-800 focus:outline-none"
                            />
                          </td>
                          <td className="py-1 px-2 border-r border-slate-200 dark:border-slate-800 text-center">
                            <input
                              type="text"
                              value={item.normalRange}
                              onChange={(e) => updateRow(idx, 'normalRange', e.target.value)}
                              placeholder="Normal Range"
                              className="w-full text-center bg-transparent px-1 py-1 text-[11px] font-mono text-slate-600 dark:text-slate-300 focus:bg-white dark:focus:bg-slate-800 focus:outline-none"
                            />
                          </td>
                          <td className="py-1.5 px-2 text-center">
                            <button
                              type="button"
                              onClick={() => removeRow(idx)}
                              className="px-2.5 py-1 bg-red-100 hover:bg-red-600 text-red-700 hover:text-white rounded-md font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer mx-auto shadow-2xs border border-red-300"
                              title={t.deleteRow}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">{t.deleteRow}</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span className="font-semibold">
                {lang === 'bn' ? `মোট টেস্ট সংখ্যা: ${testResults.length} টি` : `Total Test Parameters: ${testResults.length}`}
              </span>
              <button
                type="button"
                onClick={() => setShowCustomTestModal(true)}
                className="text-purple-800 dark:text-purple-300 hover:underline font-black flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {t.addTestRow}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Saved Patients & Action Commands (4 COLS) */}
        <div
          className={`lg:col-span-4 p-3 sm:p-4 flex flex-col justify-between ${
            isDark ? 'bg-slate-900' : isClassic ? 'bg-[#e4d3e8]' : 'bg-slate-100'
          }`}
        >
          <div>
            {/* Search Patients Input */}
            <div className="mb-2 relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={patientSearchInput}
                onChange={(e) => setPatientSearchInput(e.target.value)}
                placeholder={t.searchPatients}
                className="w-full pl-9 pr-3 py-1.5 bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 rounded-lg text-xs font-bold text-slate-950 dark:text-slate-100 placeholder-slate-500 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            {/* Saved Patients Table */}
            <div className="border-2 border-slate-400 rounded-lg bg-white dark:bg-slate-900 overflow-hidden shadow-xs mb-3">
              <div className="max-h-[260px] overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-slate-200 dark:bg-slate-800 text-slate-950 dark:text-slate-100 border-b-2 border-slate-400 sticky top-0">
                    <tr>
                      <th className="py-2 px-2.5 font-black border-r border-slate-300 dark:border-slate-700">{t.pId}</th>
                      <th className="py-2 px-2 font-black border-r border-slate-300 dark:border-slate-700">{t.invDate}</th>
                      <th className="py-2 px-2.5 font-black border-r border-slate-300 dark:border-slate-700">{t.patientName}</th>
                      <th className="py-2 px-2 font-black text-center">{t.action}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {filteredPatients.map((p) => (
                      <tr
                        key={p.id}
                        className={`hover:bg-purple-100 dark:hover:bg-slate-800 cursor-pointer ${
                          p.pId === patientId ? 'bg-purple-200/60 dark:bg-purple-950/40 font-black' : ''
                        }`}
                        onClick={() => loadPatient(p)}
                      >
                        <td className="py-1.5 px-2.5 font-mono font-bold text-purple-950 dark:text-purple-300 border-r border-slate-200 dark:border-slate-800">
                          {p.pId}
                        </td>
                        <td className="py-1.5 px-2 text-[11px] text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                          {p.billDate || p.invDate}
                        </td>
                        <td className="py-1.5 px-2.5 font-bold truncate max-w-[110px] text-slate-900 dark:text-slate-100 border-r border-slate-200 dark:border-slate-800">
                          {p.patientName}
                        </td>
                        <td className="py-1.5 px-1.5 text-center">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedPatientForReport(p);
                            }}
                            className="p-1 bg-purple-700 hover:bg-purple-800 text-white rounded cursor-pointer"
                            title="Print / View"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Comments Field */}
            <div className="mb-3">
              <label className="block text-[11px] font-black uppercase text-slate-700 dark:text-slate-300 mb-1">
                {t.clinicalComments}
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder={lang === 'bn' ? 'ক্লিনিক্যাল মন্তব্য / স্পেসিমেন পর্যবেক্ষণ...' : 'Clinical comments / notes...'}
                rows={2}
                className="w-full bg-white dark:bg-slate-800 border-2 border-slate-400 dark:border-slate-600 p-2 rounded-lg text-xs font-medium text-slate-950 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            {/* Print Options */}
            <div className="flex items-center gap-4 mb-3">
              <label className="flex items-center gap-1.5 cursor-pointer font-bold text-slate-800 dark:text-slate-200 text-xs">
                <input
                  type="checkbox"
                  checked={autoPrint}
                  onChange={(e) => setAutoPrint(e.target.checked)}
                  className="accent-purple-700 w-3.5 h-3.5"
                />
                <span>{t.autoPrint}</span>
              </label>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="space-y-2 pt-2 border-t border-slate-300 dark:border-slate-800">
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => savePatientReport(false)}
                className="w-full py-2.5 px-3 bg-[#2a1768] hover:bg-[#1f1052] text-white font-black rounded-lg text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md active:scale-95"
              >
                <Save className="w-4 h-4" />
                <span>{t.saveRecord}</span>
              </button>

              <button
                type="button"
                onClick={() => savePatientReport(true)}
                className="w-full py-2.5 px-3 bg-[#0e7490] hover:bg-[#08556b] text-white font-black rounded-lg text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>{t.saveAndPrint}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={generateNewPatient}
                className="w-full py-2 px-3 bg-[#b50f75] hover:bg-[#970c62] text-white font-black rounded-lg text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.refresh}</span>
              </button>

              <button
                type="button"
                onClick={previewReport}
                className="w-full py-2 px-3 bg-[#15803d] hover:bg-[#166534] text-white font-black rounded-lg text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-md active:scale-95"
              >
                <Eye className="w-4 h-4" />
                <span>{t.printPreview}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pathology Report A4 Modal */}
      {selectedPatientForReport && (
        <PathologyReportModal
          patient={selectedPatientForReport}
          onClose={() => setSelectedPatientForReport(null)}
        />
      )}

      {/* Quick Add Doctor Modal */}
      {showDoctorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-5 border border-purple-300 dark:border-purple-800 text-xs">
            <h3 className="font-black text-base text-purple-950 dark:text-purple-200 mb-3 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-purple-600" />
              {t.addDoctor}
            </h3>

            <div className="space-y-2.5">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-0.5">Doctor Code:</label>
                <input
                  type="text"
                  value={newDocCode}
                  onChange={(e) => setNewDocCode(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-0.5">Doctor Name:</label>
                <input
                  type="text"
                  value={newDocName}
                  onChange={(e) => setNewDocName(e.target.value)}
                  placeholder="Prof. Dr. ..."
                  className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-0.5">Degree:</label>
                  <input
                    type="text"
                    value={newDocDegree}
                    onChange={(e) => setNewDocDegree(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-0.5">Specialty:</label>
                  <input
                    type="text"
                    value={newDocSpecialty}
                    onChange={(e) => setNewDocSpecialty(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-0.5">Phone:</label>
                  <input
                    type="text"
                    value={newDocPhone}
                    onChange={(e) => setNewDocPhone(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-0.5">Room & Fee:</label>
                  <div className="flex gap-1">
                    <input
                      type="text"
                      value={newDocRoom}
                      onChange={(e) => setNewDocRoom(e.target.value)}
                      placeholder="Room"
                      className="w-1/2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded"
                    />
                    <input
                      type="number"
                      value={newDocFee}
                      onChange={(e) => setNewDocFee(Number(e.target.value))}
                      placeholder="Fee"
                      className="w-1/2 bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 p-2 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowDoctorModal(false)}
                className="px-3 py-1.5 bg-slate-200 dark:bg-slate-700 font-bold rounded"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newDocName.trim()) return;
                  addDoctor({
                    code: newDocCode.trim().toUpperCase(),
                    name: newDocName.trim(),
                    degree: newDocDegree,
                    specialty: newDocSpecialty,
                    phone: newDocPhone,
                    roomNo: newDocRoom,
                    fee: newDocFee,
                  });
                  setDrCode(newDocCode.trim().toUpperCase());
                  setShowDoctorModal(false);
                  showToast(`Doctor ${newDocName} registered!`);
                }}
                className="px-4 py-1.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded"
              >
                {t.saveChanges}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Test Catalog Selector Modal */}
      {showAddTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden border border-purple-300 dark:border-purple-800 text-xs">
            <div className="p-3 bg-purple-900 text-white font-bold flex justify-between items-center">
              <span>{t.testsManagement}</span>
              <button onClick={() => setShowAddTestModal(false)} className="text-white hover:text-red-300 font-bold text-base">
                ✕
              </button>
            </div>
            <div className="p-3 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700 flex-1">
              {labTests.map((test) => (
                <div
                  key={test.id}
                  onClick={() => {
                    addTestToResults(test);
                    setShowAddTestModal(false);
                  }}
                  className="py-2.5 px-3 hover:bg-purple-50 dark:hover:bg-slate-700 cursor-pointer flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-purple-950 dark:text-purple-200 text-sm">{test.name}</p>
                    <p className="text-[11px] text-slate-500">
                      Code: {test.code} | {test.category} | {test.normalRange}
                    </p>
                  </div>
                  <span className="font-bold text-purple-700 dark:text-purple-300">+ {lang === 'bn' ? 'যোগ করুন' : 'Add'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Custom Test Form Modal */}
      {showCustomTestModal && (
        <AddCustomTestModal
          onClose={() => setShowCustomTestModal(false)}
          onAddTest={handleAddCustomTest}
          onAddEmptyRowDirectly={addEmptyRow}
        />
      )}
    </div>
  );
};
