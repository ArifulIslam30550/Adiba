import React from 'react';
import { Invoice } from '../../types';
import { useApp } from '../../context/AppContext';
import { Printer, Download, X } from 'lucide-react';

interface CashMemoModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export const CashMemoModal: React.FC<CashMemoModalProps> = ({ invoice, onClose }) => {
  const { clinicConfig, lang } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-purple-200 dark:border-gray-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Action Bar */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 px-5 py-3 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm">
              {lang === 'bn' ? 'বিলিং রশিদ / ক্যাশ মেমো' : 'Billing Invoice & Cash Memo'}
            </h3>
            <span className="font-mono text-xs bg-purple-800 px-2 py-0.5 rounded text-purple-200">
              #{invoice.invoiceNo}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'bn' ? 'প্রিন্ট' : 'Print'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div id="printable-receipt" className="p-6 overflow-y-auto flex-1 bg-white text-slate-900 text-xs space-y-4">
          {/* Clinic Header */}
          <div className="flex items-center justify-between pb-3 border-b-2 border-purple-900 gap-3">
            {clinicConfig.logoUrl ? (
              <img
                src={clinicConfig.logoUrl}
                alt="Clinic Logo"
                className="w-12 h-12 object-contain shrink-0"
              />
            ) : null}
            <div className="text-center flex-1">
              <h2 className="text-xl font-black text-purple-950 uppercase tracking-tight">
                {clinicConfig.clinicName}
              </h2>
              <p className="text-[11px] text-slate-600 font-medium">
                {clinicConfig.address} · Phone: {clinicConfig.phone}
              </p>
              <div className="inline-block mt-1 px-3 py-0.5 bg-purple-100 text-purple-900 font-bold rounded uppercase tracking-wider text-[10px]">
                {lang === 'bn' ? 'ক্যাশ মেমো ও ডায়াগনস্টিক বিলিং রশিদ' : 'Cash Memo & Diagnostic Billing Receipt'}
              </div>
            </div>
            {clinicConfig.logoUrl ? <div className="w-12 shrink-0 hidden sm:block" /> : null}
          </div>

          {/* Invoice & Patient Meta */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
            <div className="space-y-1">
              <div>Invoice No: <strong className="font-mono text-purple-900">{invoice.invoiceNo}</strong></div>
              <div>Patient ID: <strong className="font-mono">{invoice.pId}</strong></div>
              <div>Patient Name: <strong className="text-slate-900">{invoice.patientName}</strong></div>
              <div>Age / Sex: <span>{invoice.age} Y / {invoice.sex}</span></div>
            </div>
            <div className="space-y-1 text-right">
              <div>Date: <strong className="font-mono">{invoice.date}</strong></div>
              <div>Phone: <span>{invoice.phone || 'N/A'}</span></div>
              <div>Doctor: <strong className="text-purple-900">{invoice.drName || invoice.drCode}</strong></div>
              <div>Status: <span className="font-bold text-emerald-700 uppercase">{invoice.status}</span></div>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full text-left border-collapse border border-slate-200">
            <thead>
              <tr className="bg-purple-900 text-white font-bold text-[11px]">
                <th className="p-2 border border-purple-800 w-10 text-center">#</th>
                <th className="p-2 border border-purple-800">Test / Service Description</th>
                <th className="p-2 border border-purple-800 w-28 text-center">Category</th>
                <th className="p-2 border border-purple-800 w-24 text-right">Fee (৳)</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="p-2 text-center text-slate-400 font-mono">{idx + 1}</td>
                  <td className="p-2 font-semibold text-slate-900">{item.testName}</td>
                  <td className="p-2 text-center text-slate-500 text-[10px]">{item.category}</td>
                  <td className="p-2 text-right font-mono font-bold">৳{item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary */}
          <div className="flex justify-end pt-2">
            <div className="w-64 space-y-1 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Subtotal:</span>
                <span className="font-mono font-bold">৳{invoice.subtotal.toFixed(2)}</span>
              </div>
              {invoice.discountAmount > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-200 text-emerald-700">
                  <span>Discount ({invoice.discountPercent}%):</span>
                  <span className="font-mono font-bold">-৳{invoice.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-1.5 border-b-2 border-purple-900 font-bold text-sm text-purple-950">
                <span>Net Total:</span>
                <span className="font-mono">৳{invoice.netTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span>Paid Amount:</span>
                <span className="font-mono font-bold text-emerald-700">৳{invoice.paidAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 font-bold text-slate-900">
                <span>Due Amount:</span>
                <span className={`font-mono ${invoice.dueAmount > 0 ? 'text-red-600' : 'text-slate-500'}`}>
                  ৳{invoice.dueAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Signatures */}
          <div className="pt-8 flex justify-between items-end text-center text-[10px] text-slate-500">
            <div>
              <div className="w-36 border-t border-slate-400 pt-1 font-bold text-slate-700">
                Prepared By (Cashier)
              </div>
            </div>
            <div>
              <div className="w-36 border-t border-slate-400 pt-1 font-bold text-slate-700">
                Authorized Signature
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
