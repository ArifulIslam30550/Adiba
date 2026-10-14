import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Activity, Printer, Save, FileText, CheckCircle, X } from 'lucide-react';

export const EcgModule: React.FC = () => {
  const { doctors, clinicConfig, lang, t } = useApp();

  const [pId, setPId] = useState('26100294');
  const [patientName, setPatientName] = useState('Titly');
  const [age, setAge] = useState('24 Y');
  const [sex, setSex] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [drCode, setDrCode] = useState('DR01');

  const [heartRate, setHeartRate] = useState(76);
  const [rhythm, setRhythm] = useState('Normal Sinus Rhythm');
  const [prInterval, setPrInterval] = useState('0.16 sec (Normal: 0.12 - 0.20s)');
  const [qrsDuration, setQrsDuration] = useState('0.08 sec (Normal: 0.06 - 0.10s)');
  const [qtInterval, setQtInterval] = useState('0.38 sec (Normal: < 0.44s)');
  const [axis, setAxis] = useState('Normal Axis (+60°)');
  const [stSegment, setStSegment] = useState('No significant ST-T segment elevation or depression.');
  const [impression, setImpression] = useState(
    'Normal 12-Lead Electrocardiogram (ECG). No evidence of ischemia or arrhythmia.'
  );
  const [cardiologist, setCardiologist] = useState('Dr. Tanvir Hossain, MBBS, MD (Cardiology)');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [padMode, setPadMode] = useState(true);

  const matchedDoctor = doctors.find(
    (d) => d.code.toUpperCase() === drCode.toUpperCase()
  );

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {savedSuccess && (
        <div className="bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex justify-between items-center shadow-md">
          <span>ECG report for {patientName} (PId: {pId}) saved successfully!</span>
          <button onClick={() => setSavedSuccess(false)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-purple-950 dark:text-purple-200 flex items-center gap-2">
            <Activity className="w-6 h-6 text-rose-600" />
            {t.ecgTitle}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Standard 12-lead electrocardiogram analysis, PR/QRS metrics, clinical cardiologic impressions & printable report.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPrintModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            {t.printReport}
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700 space-y-5 text-xs">
        {/* Patient Details */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-rose-50/50 dark:bg-gray-900/40 p-4 rounded-lg border border-rose-100 dark:border-gray-700">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.patientId}:</label>
            <input
              type="text"
              value={pId}
              onChange={(e) => setPId(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded font-bold text-purple-950 dark:text-purple-300"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.ptName}:</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded font-bold"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.age} / {t.sex}:</label>
            <div className="flex gap-1">
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded"
              />
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as any)}
                className="w-1/2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded"
              >
                <option value="Female">{t.female}</option>
                <option value="Male">{t.male}</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Ref. Doctor:</label>
            <input
              type="text"
              value={drCode}
              onChange={(e) => setDrCode(e.target.value)}
              className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-2 rounded font-bold uppercase"
            />
          </div>
        </div>

        {/* ECG Lead Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Ventricular Heart Rate (bpm):</label>
            <input
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(Number(e.target.value))}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded font-bold text-rose-700 dark:text-rose-400"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Cardiac Rhythm:</label>
            <input
              type="text"
              value={rhythm}
              onChange={(e) => setRhythm(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded font-bold"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Electrical Axis:</label>
            <input
              type="text"
              value={axis}
              onChange={(e) => setAxis(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">P-R Interval:</label>
            <input
              type="text"
              value={prInterval}
              onChange={(e) => setPrInterval(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded font-mono"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">QRS Duration:</label>
            <input
              type="text"
              value={qrsDuration}
              onChange={(e) => setQrsDuration(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded font-mono"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Q-T / QTc Interval:</label>
            <input
              type="text"
              value={qtInterval}
              onChange={(e) => setQtInterval(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded font-mono"
            />
          </div>
        </div>

        {/* ST Segment & Impression */}
        <div>
          <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">ST-T Segment Morphology:</label>
          <input
            type="text"
            value={stSegment}
            onChange={(e) => setStSegment(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.impression}:</label>
          <textarea
            value={impression}
            onChange={(e) => setImpression(e.target.value)}
            rows={2}
            className="w-full bg-purple-50/60 dark:bg-gray-900 border border-purple-200 dark:border-purple-800 p-2.5 rounded font-bold text-purple-950 dark:text-purple-200"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Reporting Cardiologist:</label>
          <input
            type="text"
            value={cardiologist}
            onChange={(e) => setCardiologist(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded font-semibold"
          />
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-purple-900 hover:bg-purple-950 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            {t.saveRecord}
          </button>
          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            {t.printReport}
          </button>
        </div>
      </div>

      {/* Printable ECG Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white text-gray-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[96vh] flex flex-col overflow-hidden border border-gray-300">
            <div className="flex justify-between items-center px-6 py-3 bg-rose-900 text-white print:hidden">
              <span className="font-bold">12-Lead ECG Report — {pId} ({patientName})</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-rose-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={padMode}
                    onChange={(e) => setPadMode(e.target.checked)}
                    className="accent-white"
                  />
                  <span>{lang === 'bn' ? 'প্যাড প্রিন্ট (নাম ছাড়া)' : 'Pad Print (Hide Clinic Name)'}</span>
                </label>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1 bg-emerald-600 text-white font-bold rounded text-xs cursor-pointer"
                >
                  Print Report
                </button>
                <button onClick={() => setShowPrintModal(false)} className="text-white hover:text-red-300">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-8 bg-white flex-1 overflow-y-auto print:p-0" id="printable-ecg">
              {/* Header */}
              {padMode ? (
                <div className="h-16 flex flex-col justify-end items-center border-b-2 border-rose-900 pb-2 mb-4">
                  <div className="inline-block px-4 py-1 bg-rose-900 text-white font-bold rounded text-xs uppercase">
                    ELECTROCARDIOGRAM (ECG) REPORT
                  </div>
                </div>
              ) : (
                <div className="text-center border-b-2 border-rose-900 pb-3 mb-4">
                  <h1 className="text-2xl font-black text-rose-950 font-serif">{clinicConfig.clinicName}</h1>
                  <p className="text-xs text-gray-600">{clinicConfig.address} | Hotline: {clinicConfig.phone}</p>
                  <div className="mt-2 inline-block px-4 py-1 bg-rose-100 text-rose-900 font-bold rounded text-xs">
                    ELECTROCARDIOGRAM (ECG) REPORT
                  </div>
                </div>
              )}

              {/* Patient Bar */}
              <div className="grid grid-cols-4 gap-2 bg-gray-50 p-3 rounded border border-gray-300 text-xs mb-6">
                <div><span className="text-gray-500 font-bold block">Patient ID:</span> <span className="font-bold">{pId}</span></div>
                <div><span className="text-gray-500 font-bold block">Patient Name:</span> <span className="font-bold">{patientName}</span></div>
                <div><span className="text-gray-500 font-bold block">Age / Sex:</span> {age} / {sex}</div>
                <div><span className="text-gray-500 font-bold block">Ref. Doctor:</span> {matchedDoctor?.name || drCode}</div>
              </div>

              {/* Parameters Table */}
              <table className="w-full text-xs border border-gray-300 mb-6">
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-gray-50"><td className="p-2 font-bold w-1/3">Heart Rate:</td><td className="p-2 font-bold text-rose-700">{heartRate} bpm</td></tr>
                  <tr><td className="p-2 font-bold">Rhythm:</td><td className="p-2">{rhythm}</td></tr>
                  <tr className="bg-gray-50"><td className="p-2 font-bold">P-R Interval:</td><td className="p-2 font-mono">{prInterval}</td></tr>
                  <tr><td className="p-2 font-bold">QRS Duration:</td><td className="p-2 font-mono">{qrsDuration}</td></tr>
                  <tr className="bg-gray-50"><td className="p-2 font-bold">Q-T / QTc:</td><td className="p-2 font-mono">{qtInterval}</td></tr>
                  <tr><td className="p-2 font-bold">Axis:</td><td className="p-2">{axis}</td></tr>
                  <tr className="bg-gray-50"><td className="p-2 font-bold">ST-T Changes:</td><td className="p-2">{stSegment}</td></tr>
                </tbody>
              </table>

              {/* Impression */}
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-lg text-xs mb-10">
                <span className="font-bold text-rose-950 block text-sm mb-1">CLINICAL IMPRESSION:</span>
                <p className="font-bold text-gray-900 leading-relaxed">{impression}</p>
              </div>

              {/* Signature */}
              <div className="mt-12 pt-6 border-t border-gray-300 text-right">
                <div className="inline-block text-center">
                  <div className="border-t border-gray-400 pt-1 font-bold text-xs text-gray-900 w-56">{cardiologist}</div>
                  <p className="text-[10px] text-gray-500">Consultant Cardiologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
