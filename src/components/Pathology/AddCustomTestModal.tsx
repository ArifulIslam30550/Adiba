import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { TestResultItem } from '../../types';
import { PlusCircle, X, Check, FlaskConical, Sparkles, Plus } from 'lucide-react';

interface AddCustomTestModalProps {
  onClose: () => void;
  onAddTest: (item: TestResultItem, saveToCatalog: boolean, catalogDetails?: { category: string; price: number }) => void;
  onAddEmptyRowDirectly: () => void;
}

const COMMON_PRESETS = [
  { name: 'Serum Creatinine', unit: 'mg/dL', normalRange: '0.7 - 1.3', category: 'Biochemistry', price: 350 },
  { name: 'Hemoglobin (Hb%)', unit: 'g/dL', normalRange: '12.0 - 16.0', category: 'Hematology', price: 200 },
  { name: 'Fasting Blood Sugar (FBS)', unit: 'mmol/L', normalRange: '3.9 - 6.0', category: 'Biochemistry', price: 150 },
  { name: 'SGPT / ALT', unit: 'U/L', normalRange: '0 - 45', category: 'Biochemistry', price: 350 },
  { name: 'Serum Bilirubin (Total)', unit: 'mg/dL', normalRange: '0.2 - 1.2', category: 'Biochemistry', price: 300 },
  { name: 'Serum Uric Acid', unit: 'mg/dL', normalRange: '3.5 - 7.2', category: 'Biochemistry', price: 350 },
  { name: 'Blood Urea', unit: 'mg/dL', normalRange: '15 - 45', category: 'Biochemistry', price: 300 },
  { name: 'Lipid Profile (Cholesterol)', unit: 'mg/dL', normalRange: '130 - 200', category: 'Biochemistry', price: 800 },
  { name: 'Platelet Count', unit: '/cumm', normalRange: '150,000 - 450,000', category: 'Hematology', price: 300 },
  { name: 'ESR (Westergren)', unit: 'mm in 1st hr', normalRange: '0 - 20', category: 'Hematology', price: 200 },
  { name: 'Widal Test', unit: 'Titre', normalRange: '< 1:80 (Negative)', category: 'Serology', price: 400 },
  { name: 'HBsAg (Screening)', unit: 'Qualitative', normalRange: 'Negative', category: 'Serology', price: 400 },
  { name: 'Urine R/E (Protein)', unit: 'Qualitative', normalRange: 'Nil', category: 'Clinical Pathology', price: 200 },
  { name: 'TSH (Thyroid)', unit: 'uIU/mL', normalRange: '0.4 - 4.2', category: 'Hormone', price: 600 },
];

const COMMON_UNITS = ['mg/dL', 'g/dL', 'mmol/L', '%', 'U/L', '/cumm', 'mm/hr', 'uIU/mL', 'sec', 'Qualitative'];

export const AddCustomTestModal: React.FC<AddCustomTestModalProps> = ({
  onClose,
  onAddTest,
  onAddEmptyRowDirectly,
}) => {
  const { lang, t } = useApp();

  const [testName, setTestName] = useState('');
  const [result, setResult] = useState('');
  const [unit, setUnit] = useState('mg/dL');
  const [normalRange, setNormalRange] = useState('');
  const [status, setStatus] = useState<'Normal' | 'High' | 'Low'>('Normal');
  const [category, setCategory] = useState('Biochemistry');
  const [price, setPrice] = useState(300);
  const [saveToCatalog, setSaveToCatalog] = useState(true);

  // Auto calculate abnormal status if numeric
  useEffect(() => {
    if (!result.trim() || !normalRange.trim()) return;
    const num = parseFloat(result);
    if (!isNaN(num) && normalRange.includes('-')) {
      const parts = normalRange.split('-').map((p) => parseFloat(p.trim().replace(/[^0-9.]/g, '')));
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        if (num < parts[0]) {
          setStatus('Low');
        } else if (num > parts[1]) {
          setStatus('High');
        } else {
          setStatus('Normal');
        }
      }
    }
  }, [result, normalRange]);

  const handleSelectPreset = (preset: (typeof COMMON_PRESETS)[0]) => {
    setTestName(preset.name);
    setUnit(preset.unit);
    setNormalRange(preset.normalRange);
    setCategory(preset.category);
    setPrice(preset.price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testName.trim()) return;

    onAddTest(
      {
        testName: testName.trim(),
        result: result.trim(),
        unit: unit.trim(),
        normalRange: normalRange.trim(),
        status,
      },
      saveToCatalog,
      { category, price }
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border-2 border-purple-400 dark:border-purple-700 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 px-5 py-3.5 text-white flex items-center justify-between border-b border-purple-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-600/30 border border-purple-400/30 flex items-center justify-center">
              <FlaskConical className="w-4 h-4 text-purple-300" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base leading-tight">
                {lang === 'bn' ? 'নতুন কাস্টম টেস্ট যোগ করুন' : 'Add New Custom Test Parameter'}
              </h3>
              <p className="text-[11px] text-purple-300">
                {lang === 'bn'
                  ? 'ফরম পূরণ করে টেস্টের নাম, ফলাফল ও নরমাল রেঞ্জ যুক্ত করুন'
                  : 'Fill the form to configure test parameter, result & reference range'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-3.5 text-xs">
          {/* Quick Preset Chips */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>{lang === 'bn' ? 'কুইক টেস্ট প্রিসেট (এক ক্লিকে লোড করুন):' : 'Quick Presets (Click to autofill):'}</span>
              </label>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto p-1 bg-purple-50/50 dark:bg-slate-800/60 rounded-lg border border-purple-200 dark:border-slate-700">
              {COMMON_PRESETS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition cursor-pointer border ${
                    testName === preset.name
                      ? 'bg-purple-700 text-white border-purple-800'
                      : 'bg-white dark:bg-slate-700 hover:bg-purple-100 text-purple-900 dark:text-purple-200 border-purple-200 dark:border-slate-600'
                  }`}
                >
                  + {preset.name}
                </button>
              ))}
            </div>
          </div>

          {/* Test Name */}
          <div>
            <label className="block font-black text-slate-800 dark:text-slate-200 mb-1">
              {lang === 'bn' ? 'টেস্টের নাম (Test Name)' : 'Test Name'} *
            </label>
            <input
              type="text"
              required
              autoFocus
              value={testName}
              onChange={(e) => setTestName(e.target.value)}
              placeholder="e.g. Serum Creatinine, Uric Acid, Bilirubin..."
              className="w-full bg-purple-50/50 dark:bg-slate-800 border-2 border-purple-300 dark:border-purple-600 px-3 py-2 rounded-lg text-sm font-black text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
          </div>

          {/* Result & Unit */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6">
              <label className="block font-black text-slate-800 dark:text-slate-200 mb-1">
                {lang === 'bn' ? 'টেস্ট ফলাফল (Result)' : 'Test Result'}
              </label>
              <input
                type="text"
                value={result}
                onChange={(e) => setResult(e.target.value)}
                placeholder="যেমন: 1.2 বা Negative বা 140"
                className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 px-3 py-2 rounded-lg text-sm font-black text-purple-950 dark:text-purple-200 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-6">
              <label className="block font-black text-slate-800 dark:text-slate-200 mb-1">
                {lang === 'bn' ? 'ইউনিট (Unit)' : 'Unit'}
              </label>
              <input
                type="text"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                placeholder="e.g. mg/dL, mmol/L..."
                className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 px-3 py-2 rounded-lg text-xs font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {COMMON_UNITS.slice(0, 6).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnit(u)}
                    className="px-1.5 py-0.5 bg-slate-100 hover:bg-purple-100 text-[10px] text-slate-700 dark:text-slate-300 rounded border border-slate-200 dark:border-slate-700 cursor-pointer"
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Normal Range & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-7">
              <label className="block font-black text-slate-800 dark:text-slate-200 mb-1">
                {lang === 'bn' ? 'নরমাল রেফারেন্স রেঞ্জ (Normal Range)' : 'Biological Reference Range'}
              </label>
              <input
                type="text"
                value={normalRange}
                onChange={(e) => setNormalRange(e.target.value)}
                placeholder="যেমন: 0.7 - 1.3 বা 12.0 - 16.0"
                className="w-full bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 px-3 py-2 rounded-lg text-xs font-bold text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-600 focus:outline-none font-mono"
              />
            </div>

            <div className="sm:col-span-5">
              <label className="block font-black text-slate-800 dark:text-slate-200 mb-1">
                {lang === 'bn' ? 'স্ট্যাটাস (Status)' : 'Status'}
              </label>
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => setStatus('Normal')}
                  className={`py-1.5 rounded text-xs font-bold transition cursor-pointer border ${
                    status === 'Normal'
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  Normal
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('High')}
                  className={`py-1.5 rounded text-xs font-bold transition cursor-pointer border ${
                    status === 'High'
                      ? 'bg-red-600 text-white border-red-700 shadow-xs'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  High
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('Low')}
                  className={`py-1.5 rounded text-xs font-bold transition cursor-pointer border ${
                    status === 'Low'
                      ? 'bg-blue-600 text-white border-blue-700 shadow-xs'
                      : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  Low
                </button>
              </div>
            </div>
          </div>

          {/* Category & Price (Optional Catalog) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'bn' ? 'ক্যাটাগরি (Category)' : 'Category'}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              >
                <option value="Biochemistry">Biochemistry (বায়োকেমিস্ট্রি)</option>
                <option value="Hematology">Hematology (হেমাটোলজি)</option>
                <option value="Clinical Pathology">Clinical Pathology (ক্লিনিক্যাল)</option>
                <option value="Serology">Serology (সেরোলজি)</option>
                <option value="Microbiology">Microbiology (মাইক্রোবায়োলজি)</option>
                <option value="Hormone">Hormone / Thyroid (হরমোন)</option>
                <option value="Immunology">Immunology (ইমিউনোলজি)</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'bn' ? 'টেস্ট ফি / মূল্য (টাকা)' : 'Test Fee (BDT)'}
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="300"
                className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Checkbox: Save into Master Database */}
          <div className="p-2.5 bg-purple-50/60 dark:bg-slate-800/80 rounded-xl border border-purple-200 dark:border-slate-700 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-purple-950 dark:text-purple-200">
              <input
                type="checkbox"
                checked={saveToCatalog}
                onChange={(e) => setSaveToCatalog(e.target.checked)}
                className="w-4 h-4 accent-purple-700 rounded cursor-pointer"
              />
              <span>
                {lang === 'bn'
                  ? 'ল্যাব টেস্ট ডাটাবেজেও সংরক্ষণ করুন (পরবর্তীতে সরাসরি সিলেক্ট করা যাবে)'
                  : 'Save permanently to Lab Test master catalog for future reuse'}
              </span>
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                onAddEmptyRowDirectly();
                onClose();
              }}
              className="text-slate-600 dark:text-slate-400 hover:text-purple-700 font-bold text-[11px] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'অথবা ফাঁকা রো যোগ করুন' : 'Or add empty row'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg font-bold text-xs transition cursor-pointer"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md active:scale-95"
              >
                <PlusCircle className="w-4 h-4" />
                <span>{lang === 'bn' ? 'টেস্ট যোগ করুন' : 'Add Test'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
