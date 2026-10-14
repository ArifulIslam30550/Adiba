import React, { useState } from 'react';
import { Patient } from '../../types';
import { useApp } from '../../context/AppContext';
import { Printer, Download, X, FileText, Check, Pencil } from 'lucide-react';
import { generatePathologyPdf } from '../../utils/pdfGenerator';
import { EditTechnologistModal } from '../Modals/EditTechnologistModal';

interface PathologyReportModalProps {
  patient: Patient;
  onClose: () => void;
}

export const PathologyReportModal: React.FC<PathologyReportModalProps> = ({ patient, onClose }) => {
  const { clinicConfig, lang } = useApp();

  // User specifically requested: in report print page, NO institution name needed!
  // padMode is true by default so institution name is not rendered on printable report!
  const [padMode, setPadMode] = useState(true);
  const [padGapMm, setPadGapMm] = useState<number>(30); // Top space (mm) for pre-printed letterhead
  const [showEditTechModal, setShowEditTechModal] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    generatePathologyPdf(
      patient,
      clinicConfig,
      'PATHOLOGY INVESTIGATION REPORT',
      !padMode
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-purple-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[94vh]">
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-950 px-4 sm:px-6 py-3 text-white flex flex-wrap items-center justify-between gap-3 no-print border-b border-purple-800">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-pink-300" />
            <h3 className="font-bold text-sm">
              {lang === 'bn' ? 'প্যাথলজি টেস্ট রিপোর্ট (A4)' : 'Pathology Investigation Report (A4)'}
            </h3>
            <span className="font-mono text-xs bg-purple-800 px-2 py-0.5 rounded text-purple-200">
              PID: {patient.pId}
            </span>
          </div>

          {/* Quick Options */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs">
            {/* Pad Mode Toggle (Institution Name Hidden) */}
            <label className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-850 hover:bg-purple-800 rounded-md cursor-pointer border border-purple-700 text-[11px] font-semibold text-purple-200 select-none">
              <input
                type="checkbox"
                checked={padMode}
                onChange={(e) => setPadMode(e.target.checked)}
                className="accent-pink-500 w-3.5 h-3.5 rounded cursor-pointer"
              />
              <span>
                {lang === 'bn' ? 'প্যাড প্রিন্ট (প্রতিষ্ঠানের নাম ছাড়া)' : 'Pad Print (Hide Clinic Name)'}
              </span>
            </label>

            {padMode && (
              <div className="hidden sm:flex items-center gap-1 text-[11px] text-purple-300">
                <span>{lang === 'bn' ? 'প্যাড ফাঁকা:' : 'Pad Gap:'}</span>
                <select
                  value={padGapMm}
                  onChange={(e) => setPadGapMm(Number(e.target.value))}
                  className="bg-purple-900 border border-purple-700 text-white rounded px-1.5 py-0.5 text-[10px] cursor-pointer"
                >
                  <option value={15}>15 mm</option>
                  <option value={25}>25 mm</option>
                  <option value={30}>30 mm (Normal)</option>
                  <option value={40}>40 mm (Large)</option>
                </select>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowEditTechModal(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-pink-700 hover:bg-pink-600 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-xs active:scale-95"
              title={lang === 'bn' ? 'মেডিকেল টেকনোলজিস্ট এর নাম ইডিট করুন' : 'Edit Medical Technologist Name'}
            >
              <Pencil className="w-3 h-3" />
              <span>{lang === 'bn' ? 'টেকনোলজিস্ট ইডিট' : 'Edit Tech'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-black transition cursor-pointer shadow-sm active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'প্রিন্ট করুন' : 'Print'}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg text-xs font-bold transition cursor-pointer"
              title="Download PDF"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Report Area */}
        <div
          id="printable-report"
          className="p-6 sm:p-8 overflow-y-auto flex-1 bg-white text-slate-900 text-xs space-y-4"
        >
          {/* Pad Header Gap (when padMode is enabled, no institution name is shown) */}
          {padMode ? (
            <div
              style={{ height: `${padGapMm}mm` }}
              className="flex flex-col justify-end items-center pb-2 border-b-2 border-purple-900/80"
            >
              <div className="px-4 py-1 bg-purple-900 text-white font-black rounded uppercase tracking-wider text-[11px] shadow-2xs">
                Clinical Pathology &amp; Diagnostic Report
              </div>
            </div>
          ) : (
            /* Digital Header (Only if user explicitly unchecks pad mode) */
            <div className="flex items-center justify-between pb-3 border-b-2 border-purple-900 gap-3">
              {clinicConfig.logoUrl ? (
                <img
                  src={clinicConfig.logoUrl}
                  alt="Clinic Logo"
                  className="w-14 h-14 object-contain shrink-0"
                />
              ) : (
                <div className="w-12 h-12 rounded-xl bg-purple-900 text-white flex items-center justify-center font-bold text-lg shrink-0">
                  +
                </div>
              )}
              <div className="text-center flex-1">
                <h1 className="text-xl sm:text-2xl font-black text-purple-950 uppercase tracking-tight">
                  {clinicConfig.clinicName}
                </h1>
                <p className="text-[11px] text-slate-600 font-medium">
                  {clinicConfig.address} · Hotline: {clinicConfig.phone} · Reg: {clinicConfig.regNo}
                </p>
                <div className="inline-block mt-1 px-4 py-0.5 bg-purple-900 text-white font-bold rounded uppercase tracking-wider text-[11px]">
                  Clinical Pathology &amp; Diagnostic Report
                </div>
              </div>
              <div className="w-12 shrink-0 hidden sm:block" />
            </div>
          )}

          {/* Patient Details Table */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-slate-50 rounded-xl border border-slate-300 text-slate-700">
            <div className="space-y-1">
              <div>
                Patient ID: <strong className="font-mono text-purple-900">{patient.pId}</strong>
              </div>
              <div>
                Patient Name: <strong className="text-slate-900 font-bold">{patient.patientName}</strong>
              </div>
              <div>
                Age / Sex: <strong>{patient.age} Y / {patient.sex}</strong>
              </div>
              <div>
                Address: <span>{patient.address || 'Dhaka, Bangladesh'}</span>
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div>
                Reporting Date: <strong className="font-mono">{patient.invDate}</strong>
              </div>
              <div>
                Bill Date: <span className="font-mono">{patient.billDate}</span>
              </div>
              <div>
                Referred By: <strong className="text-purple-900">{patient.drName} ({patient.drCode})</strong>
              </div>
              <div>
                Status: <span className="font-bold text-emerald-700 uppercase">{patient.status}</span>
              </div>
            </div>
          </div>

          {/* Investigation Results Table */}
          <table className="w-full text-left border-collapse border border-slate-300">
            <thead>
              <tr className="bg-purple-900 text-white font-bold text-[11px]">
                <th className="p-2 border border-purple-800">Test Parameter</th>
                <th className="p-2 border border-purple-800 w-28 text-center">Result</th>
                <th className="p-2 border border-purple-800 w-24 text-center">Unit</th>
                <th className="p-2 border border-purple-800 w-36 text-center">Biological Reference</th>
                <th className="p-2 border border-purple-800 w-24 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {patient.testResults.map((tr, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="p-2 font-bold text-slate-900">{tr.testName}</td>
                  <td className="p-2 text-center font-bold font-mono text-purple-950 text-sm">{tr.result}</td>
                  <td className="p-2 text-center text-slate-600 font-mono text-[11px]">{tr.unit}</td>
                  <td className="p-2 text-center text-slate-600 font-mono text-[11px]">{tr.normalRange}</td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        tr.status === 'High'
                          ? 'bg-red-100 text-red-700 font-black'
                          : tr.status === 'Low'
                          ? 'bg-amber-100 text-amber-700 font-black'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {tr.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Comments if any */}
          {patient.comments && (
            <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-200">
              <strong className="text-purple-950 font-bold block mb-0.5">Clinical Remarks / Note:</strong>
              <p className="text-slate-700 text-xs">{patient.comments}</p>
            </div>
          )}

          {/* Signatures */}
          <div className="pt-16 flex justify-between items-end text-center text-[11px] text-slate-600">
            <div>
              <div className="w-52 border-t border-slate-400 pt-1 font-bold text-slate-800 flex items-center justify-center gap-1.5">
                <span>{clinicConfig.labInCharge}</span>
                <button
                  type="button"
                  onClick={() => setShowEditTechModal(true)}
                  className="no-print p-0.5 text-purple-700 hover:text-pink-600 hover:bg-purple-100 rounded transition cursor-pointer"
                  title={lang === 'bn' ? 'মেডিকেল টেকনোলজিস্ট এর নাম ইডিট করুন' : 'Edit Medical Technologist Name'}
                >
                  <Pencil className="w-3 h-3 text-pink-600" />
                </button>
              </div>
              <p className="text-[10px] text-slate-500">Medical Technologist (Lab)</p>
            </div>
            <div>
              <div className="w-52 border-t border-slate-400 pt-1 font-bold text-slate-800">
                {clinicConfig.pathologistName}
              </div>
              <p className="text-[10px] text-slate-500">{clinicConfig.pathologistDegree}</p>
            </div>
          </div>
        </div>
      </div>

      {showEditTechModal && (
        <EditTechnologistModal onClose={() => setShowEditTechModal(false)} />
      )}
    </div>
  );
};
