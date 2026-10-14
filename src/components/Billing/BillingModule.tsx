import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Invoice, InvoiceItem } from '../../types';
import { CashMemoModal } from './CashMemoModal';
import {
  Receipt,
  Plus,
  Trash2,
  Printer,
  Search,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const BillingModule: React.FC = () => {
  const { invoices, addInvoice, labTests, doctors, clinicConfig, t } = useApp();

  const [pId, setPId] = useState(`26100${Math.floor(100 + Math.random() * 900)}`);
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [phone, setPhone] = useState('+880 17');
  const [drCode, setDrCode] = useState('DR01');
  const [items, setItems] = useState<InvoiceItem[]>([
    {
      testId: 't-cbc',
      testName: 'Complete Blood Count (CBC with ESR)',
      category: 'Hematology',
      price: 450,
    },
  ]);
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [paidAmount, setPaidAmount] = useState<number>(450);
  const [paymentMethod, setPaymentMethod] = useState<string>('Cash');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [alertMsg, setAlertMsg] = useState<string | null>(null);

  const matchedDoctor = doctors.find(
    (d) => d.code.toUpperCase() === drCode.toUpperCase()
  );

  const subtotal = items.reduce((acc, it) => acc + it.price, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const netTotal = subtotal - discountAmount;
  const dueAmount = Math.max(0, netTotal - paidAmount);

  const handleAddTest = (testId: string) => {
    const found = labTests.find((t) => t.id === testId);
    if (found && !items.some((i) => i.testId === testId)) {
      const newItems = [
        ...items,
        {
          testId: found.id,
          testName: found.name,
          category: found.category,
          price: found.price,
        },
      ];
      setItems(newItems);
      const newSub = newItems.reduce((acc, it) => acc + it.price, 0);
      const newNet = newSub - Math.round((newSub * discountPercent) / 100);
      setPaidAmount(newNet);
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, idx) => idx !== index);
    setItems(newItems);
    const newSub = newItems.reduce((acc, it) => acc + it.price, 0);
    const newNet = newSub - Math.round((newSub * discountPercent) / 100);
    setPaidAmount(newNet);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) {
      setAlertMsg('Please enter patient name.');
      return;
    }
    if (items.length === 0) {
      setAlertMsg('Please select at least one test or service.');
      return;
    }

    const invoiceNo = `INV-2026-${1000 + invoices.length + 1}`;
    const status: 'Paid' | 'Partial' | 'Due' =
      dueAmount <= 0 ? 'Paid' : paidAmount > 0 ? 'Partial' : 'Due';

    const newInv = addInvoice({
      invoiceNo,
      pId,
      patientName: patientName.trim(),
      age: age || '25 Y',
      sex,
      phone,
      drCode,
      drName: matchedDoctor?.name || drCode,
      date: '13-10-2026',
      items,
      subtotal,
      discountPercent,
      discountAmount,
      netTotal,
      paidAmount,
      dueAmount,
      paymentMethod,
      status,
    });

    setSelectedInvoice(newInv);
    setAlertMsg(`Invoice ${invoiceNo} created successfully!`);
    setPId(`26100${Math.floor(100 + Math.random() * 900)}`);
    setPatientName('');
    setAge('');
    setItems([]);
    setDiscountPercent(0);
    setPaidAmount(0);
  };

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.pId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Alert Banner */}
      {alertMsg && (
        <div className="bg-emerald-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex justify-between items-center shadow-md">
          <span>{alertMsg}</span>
          <button onClick={() => setAlertMsg(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-purple-950 dark:text-purple-200 flex items-center gap-2">
            <Receipt className="w-6 h-6 text-purple-700" />
            {t.billing}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Instant billing, itemized investigation receipt, cash memos and payment collection.
          </p>
        </div>
      </div>

      {/* Grid: Left Entry Form (7 cols) + Right Invoices List (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700 space-y-4">
          <h3 className="font-bold text-sm text-purple-950 dark:text-purple-200 border-b border-gray-100 dark:border-gray-700 pb-2">
            {t.newBill}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Row 1: Patient ID, Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.patientId}:</label>
                <input
                  type="text"
                  value={pId}
                  onChange={(e) => setPId(e.target.value)}
                  className="w-full bg-purple-50 dark:bg-gray-900 border border-purple-200 dark:border-purple-800 p-2 rounded text-xs font-bold text-purple-950 dark:text-purple-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.billDate}:</label>
                <input
                  type="text"
                  defaultValue="13-10-2026"
                  className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-2 rounded text-xs text-gray-700 dark:text-gray-300 focus:outline-none"
                />
              </div>
            </div>

            {/* Row 2: Name, Phone */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.ptName} *:</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Titly"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded text-xs font-semibold focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded text-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Row 3: Age, Sex, Dr Code */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.age}:</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="24 Y"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.sex}:</label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value as any)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded text-xs focus:outline-none"
                >
                  <option value="Female">{t.female}</option>
                  <option value="Male">{t.male}</option>
                  <option value="Other">{t.other}</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.drCode}:</label>
                <input
                  type="text"
                  value={drCode}
                  onChange={(e) => setDrCode(e.target.value)}
                  placeholder="DR01"
                  className="w-full bg-purple-50 dark:bg-gray-900 border border-purple-200 dark:border-purple-800 p-2 rounded text-xs font-bold text-purple-900 dark:text-purple-200 focus:outline-none uppercase"
                />
              </div>
            </div>

            {/* Test Selector Dropdown */}
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.selectTests}:</label>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddTest(e.target.value);
                    e.target.value = '';
                  }
                }}
                className="w-full bg-white dark:bg-gray-900 border border-purple-300 dark:border-purple-700 p-2 rounded text-xs font-medium focus:outline-none"
              >
                <option value="">-- Click to add investigation / test --</option>
                {labTests.map((lt) => (
                  <option key={lt.id} value={lt.id}>
                    {lt.name} — ৳{lt.price} ({lt.category})
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Investigations Table */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-purple-50 dark:bg-gray-900 text-purple-950 dark:text-purple-200 font-bold border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="p-2 border-r border-gray-200 dark:border-gray-700">Investigation</th>
                    <th className="p-2 border-r border-gray-200 dark:border-gray-700">Dept</th>
                    <th className="p-2 border-r border-gray-200 dark:border-gray-700 text-right">Fee (৳)</th>
                    <th className="p-2 text-center w-10">✕</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-750">
                  {items.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="text-center py-4 text-gray-400 italic">
                        No tests selected. Choose from dropdown above.
                      </td>
                    </tr>
                  ) : (
                    items.map((it, idx) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                        <td className="p-2 font-medium border-r border-gray-100 dark:border-gray-700">{it.testName}</td>
                        <td className="p-2 text-gray-500 border-r border-gray-100 dark:border-gray-700">{it.category}</td>
                        <td className="p-2 text-right font-mono font-bold border-r border-gray-100 dark:border-gray-700">
                          ৳{it.price}
                        </td>
                        <td className="p-2 text-center">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="text-red-500 hover:text-red-700 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5 mx-auto" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Financial Summary Calculation */}
            <div className="bg-purple-50/60 dark:bg-gray-900/40 p-3 rounded-lg border border-purple-100 dark:border-gray-700 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-gray-600 dark:text-gray-400">{t.subtotal}:</span>
                <span className="font-bold text-sm">৳{subtotal}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-medium text-gray-600 dark:text-gray-400">{t.discount} (%):</span>
                <div className="flex items-center gap-1.5">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountPercent}
                    onChange={(e) => {
                      const disc = Math.min(100, Math.max(0, Number(e.target.value)));
                      setDiscountPercent(disc);
                      const n = subtotal - Math.round((subtotal * disc) / 100);
                      setPaidAmount(n);
                    }}
                    className="w-16 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 p-1 text-right rounded font-bold"
                  />
                  <span className="font-semibold text-emerald-700">-৳{discountAmount}</span>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm font-bold border-t border-purple-200 dark:border-gray-700 pt-2 text-purple-950 dark:text-purple-200">
                <span>{t.netTotal}:</span>
                <span>৳{netTotal}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-0.5">{t.paidAmount}:</label>
                  <input
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(Number(e.target.value))}
                    className="w-full bg-white dark:bg-gray-800 border border-emerald-400 dark:border-emerald-700 p-1.5 rounded font-bold text-emerald-800 dark:text-emerald-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-0.5">{t.dueAmount}:</label>
                  <div className={`p-1.5 rounded font-black text-sm ${dueAmount > 0 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    ৳{dueAmount}
                  </div>
                </div>
              </div>
              <div className="pt-1">
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-0.5">{t.paymentMethod}:</label>
                <div className="flex gap-2">
                  {['Cash', 'bKash', 'Nagad', 'Card'].map((pm) => (
                    <button
                      key={pm}
                      type="button"
                      onClick={() => setPaymentMethod(pm)}
                      className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer border ${
                        paymentMethod === pm
                          ? 'bg-purple-900 text-white border-purple-900'
                          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700'
                      }`}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Create Invoice Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-800 to-indigo-900 hover:from-purple-900 hover:to-indigo-950 text-white font-black rounded-lg text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition active:scale-98"
            >
              <Printer className="w-4 h-4" />
              {t.createInvoice}
            </button>
          </form>
        </div>

        {/* Right Invoices Archive Column */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2 mb-3">
              <h3 className="font-bold text-sm text-purple-950 dark:text-purple-200">{t.invoicesList}</h3>
              <span className="text-xs text-gray-400 font-mono">{filteredInvoices.length} bills</span>
            </div>

            <div className="relative mb-3">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchInvoices}
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-xs"
              />
            </div>

            <div className="space-y-2 max-h-[520px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
              {filteredInvoices.map((inv) => (
                <div key={inv.id} className="pt-2 hover:bg-purple-50/50 dark:hover:bg-gray-750 p-2 rounded-lg transition">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-purple-950 dark:text-purple-300 text-xs">{inv.invoiceNo}</span>
                      <p className="font-bold text-gray-900 dark:text-gray-100 text-sm">{inv.patientName}</p>
                      <p className="text-[11px] text-gray-500">
                        PId: {inv.pId} | {inv.date} | Ref: {inv.drCode}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          inv.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : inv.status === 'Partial'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {inv.status}
                      </span>
                      <p className="font-bold text-sm text-gray-900 dark:text-gray-100 mt-1">৳{inv.netTotal}</p>
                      {inv.dueAmount > 0 && <p className="text-[10px] font-bold text-red-600">Due: ৳{inv.dueAmount}</p>}
                    </div>
                  </div>

                  <div className="mt-2 flex justify-between items-center pt-1 border-t border-gray-100 dark:border-gray-700 text-xs">
                    <span className="text-gray-500 text-[11px]">{inv.items.length} items</span>
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="flex items-center gap-1 text-purple-700 dark:text-purple-300 font-bold hover:underline cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      Print Receipt
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cash Memo Modal */}
      {selectedInvoice && (
        <CashMemoModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  );
};
