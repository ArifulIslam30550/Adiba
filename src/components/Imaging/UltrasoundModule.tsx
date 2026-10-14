import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Waves, Printer, Save, CheckCircle, X } from 'lucide-react';

export const UltrasoundModule: React.FC = () => {
  const { clinicConfig, lang, t } = useApp();

  const [pId, setPId] = useState('26100294');
  const [patientName, setPatientName] = useState('Titly');
  const [age, setAge] = useState('24 Y');
  const [sex, setSex] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [drCode, setDrCode] = useState('DR02');
  const [scanType, setScanType] = useState('Whole Abdomen');

  const [liver, setLiver] = useState(
    'Normal in size (13.2 cm). Normal parenchymal echotexture. No focal lesion or IHBR dilatation.'
  );
  const [gallBladder, setGallBladder] = useState(
    'Well distended, wall thickness normal (< 3mm). No calculus or sludge detected.'
  );
  const [kidneys, setKidneys] = useState(
    'Both kidneys are normal in size, shape and bipolar position. Good cortico-medullary differentiation. No calculus or hydronephrosis.'
  );
  const [spleenPancreas, setSpleenPancreas] = useState(
    'Spleen is normal in size (9.8 cm). Pancreas appears homogeneous with normal caliber.'
  );
  const [urinaryBladder, setUrinaryBladder] = useState(
    'Well distended, regular wall. No intravesical lesion or mass.'
  );
  const [uterusAdnexa, setUterusAdnexa] = useState(
    'Uterus is anteverted, normal in size and myometrial echotexture. Both adnexae appear clear.'
  );
  const [impression, setImpression] = useState(
    'ULTRASONOGRAPHY OF WHOLE ABDOMEN REVEALS NORMAL SCAN. No significant sonological abnormality detected.'
  );
  const [sonologist, setSonologist] = useState(
    'Dr. Nusrat Jahan, MBBS, PGT (Ultrasonography)'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [padMode, setPadMode] = useState(true);

  const handleScanTypeChange = (type: string) => {
    setScanType(type);
    if (type === 'Whole Abdomen') {
      setLiver('Normal in size (13.2 cm). Normal parenchymal echotexture. No focal lesion.');
      setGallBladder('Well distended. No calculus or sludge.');
      setImpression('ULTRASONOGRAPHY OF WHOLE ABDOMEN REVEALS NORMAL SCAN.');
    } else if (type === 'KUB with Prostate') {
      setLiver('Not evaluated in focused KUB protocol.');
      setKidneys('Both kidneys normal in size and cortical thickness. No calculus or backpressure changes.');
      setUrinaryBladder('Pre-void volume adequate, post-void residue insignificant.');
      setImpression('NORMAL SONOGRAPHIC EVALUATION OF KUB REGION.');
    } else if (type === 'Pelvic Profile') {
      setUterusAdnexa('Uterus normal in dimensions. Endometrial stripe central. Bilateral ovaries normal in volume.');
      setImpression('NORMAL PELVIC ULTRASONOGRAM.');
    }
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-6xl mx-auto">
      {savedSuccess && (
        <div className="bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex justify-between items-center shadow-md">
          <span>USG scan report for {patientName} (PId: {pId}) saved successfully!</span>
          <button onClick={() => setSavedSuccess(false)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-purple-950 dark:text-purple-200 flex items-center gap-2">
            <Waves className="w-6 h-6 text-cyan-600" />
            {t.usgTitle}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Organ-by-organ echotexture analysis, pregnancy biometric evaluations and standardized sonography impressions.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPrintModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-cyan-700 hover:bg-cyan-800 text-white rounded-lg text-xs font-bold shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            {t.printReport}
          </button>
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700 space-y-5 text-xs">
        {/* Patient Details */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-cyan-50/50 dark:bg-gray-900/40 p-4 rounded-lg border border-cyan-100 dark:border-gray-700">
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
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Scan Type:</label>
            <select
              value={scanType}
              onChange={(e) => handleScanTypeChange(e.target.value)}
              className="w-full bg-cyan-50 dark:bg-gray-800 border border-cyan-300 dark:border-cyan-700 p-2 rounded font-bold text-cyan-950 dark:text-cyan-300"
            >
              <option value="Whole Abdomen">USG of Whole Abdomen</option>
              <option value="KUB with Prostate">USG of KUB & Prostate</option>
              <option value="Pelvic Profile">USG of Female Pelvis</option>
              <option value="Pregnancy Profile">Obstetric / Pregnancy Scan</option>
            </select>
          </div>
        </div>

        {/* Organ Findings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Liver & Biliary Tree:</label>
            <textarea
              value={liver}
              onChange={(e) => setLiver(e.target.value)}
              rows={2}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Gall Bladder:</label>
            <textarea
              value={gallBladder}
              onChange={(e) => setGallBladder(e.target.value)}
              rows={2}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Kidneys (Bilateral):</label>
            <textarea
              value={kidneys}
              onChange={(e) => setKidneys(e.target.value)}
              rows={2}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Spleen & Pancreas:</label>
            <textarea
              value={spleenPancreas}
              onChange={(e) => setSpleenPancreas(e.target.value)}
              rows={2}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Urinary Bladder:</label>
            <input
              type="text"
              value={urinaryBladder}
              onChange={(e) => setUrinaryBladder(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Uterus & Adnexae:</label>
            <input
              type="text"
              value={uterusAdnexa}
              onChange={(e) => setUterusAdnexa(e.target.value)}
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.impression}:</label>
          <textarea
            value={impression}
            onChange={(e) => setImpression(e.target.value)}
            rows={2}
            className="w-full bg-cyan-50/60 dark:bg-gray-900 border border-cyan-200 dark:border-cyan-800 p-2.5 rounded font-bold text-cyan-950 dark:text-cyan-200"
          />
        </div>

        <div>
          <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Reporting Sonologist:</label>
          <input
            type="text"
            value={sonologist}
            onChange={(e) => setSonologist(e.target.value)}
            className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded font-semibold"
          />
        </div>

        {/* Buttons */}
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
            className="px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold rounded-lg flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            {t.printReport}
          </button>
        </div>
      </div>

      {/* Printable USG Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white text-gray-900 rounded-xl shadow-2xl max-w-3xl w-full max-h-[96vh] flex flex-col overflow-hidden border border-gray-300">
            <div className="flex justify-between items-center px-6 py-3 bg-cyan-900 text-white print:hidden">
              <span className="font-bold">Ultrasound (USG) Report — {pId} ({scanType})</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-xs text-cyan-200 cursor-pointer">
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

            <div className="p-8 bg-white flex-1 overflow-y-auto print:p-0" id="printable-usg">
              {/* Header */}
              {padMode ? (
                <div className="h-16 flex flex-col justify-end items-center border-b-2 border-cyan-800 pb-2 mb-4">
                  <div className="inline-block px-4 py-1 bg-cyan-900 text-white font-bold rounded text-xs uppercase">
                    ULTRASONOGRAPHY REPORT
                  </div>
                </div>
              ) : (
                <div className="text-center border-b-2 border-cyan-800 pb-3 mb-4">
                  <h1 className="text-2xl font-black text-cyan-950 font-serif">{clinicConfig.clinicName}</h1>
                  <p className="text-xs text-gray-600">{clinicConfig.address} | Hotline: {clinicConfig.phone}</p>
                  <div className="mt-2 inline-block px-4 py-1 bg-cyan-100 text-cyan-900 font-bold rounded text-xs">
                    ULTRASONOGRAPHY REPORT
                  </div>
                </div>
              )}

              {/* Patient Bar */}
              <div className="grid grid-cols-4 gap-2 bg-gray-50 p-3 rounded border border-gray-300 text-xs mb-6">
                <div><span className="text-gray-500 font-bold block">Patient ID:</span> <span className="font-bold">{pId}</span></div>
                <div><span className="text-gray-500 font-bold block">Patient Name:</span> <span className="font-bold">{patientName}</span></div>
                <div><span className="text-gray-500 font-bold block">Age / Sex:</span> {age} / {sex}</div>
                <div><span className="text-gray-500 font-bold block">Examination:</span> <span className="font-bold text-purple-900">{scanType}</span></div>
              </div>

              {/* Findings */}
              <div className="space-y-3 text-xs mb-8">
                <h4 className="font-bold text-gray-900 text-sm border-b border-gray-200 pb-1 mb-2">SONOGRAPHIC FINDINGS:</h4>
                <p className="text-gray-700 leading-relaxed">• <strong>Liver:</strong> {liver}</p>
                <p className="text-gray-700 leading-relaxed">• <strong>Gall Bladder:</strong> {gallBladder}</p>
                <p className="text-gray-700 leading-relaxed">• <strong>Kidneys:</strong> {kidneys}</p>
                <p className="text-gray-700 leading-relaxed">• <strong>Spleen & Pancreas:</strong> {spleenPancreas}</p>
                <p className="text-gray-700 leading-relaxed">• <strong>Urinary Bladder:</strong> {urinaryBladder}</p>
                <p className="text-gray-700 leading-relaxed">• <strong>Uterus & Adnexa:</strong> {uterusAdnexa}</p>

                <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-lg mt-4">
                  <span className="font-bold text-cyan-950 block text-sm mb-1">SONOLOGICAL IMPRESSION:</span>
                  <p className="font-bold text-gray-900 leading-relaxed">{impression}</p>
                </div>
              </div>

              {/* Signature */}
              <div className="mt-12 pt-6 border-t border-gray-300 text-right">
                <div className="inline-block text-center">
                  <div className="border-t border-gray-400 pt-1 font-bold text-xs text-gray-900 w-56">{sonologist}</div>
                  <p className="text-[10px] text-gray-500">Consultant Sonologist</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
