import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OpdAppointment } from '../../types';
import {
  UserCheck,
  Ticket,
  Clock,
  Printer,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
} from 'lucide-react';

export const DoctorVisitModule: React.FC = () => {
  const { doctors, clinicConfig, t } = useApp();

  const [appointments, setAppointments] = useState<OpdAppointment[]>([
    {
      id: 'opd-1',
      tokenNo: 1,
      patientName: 'Titly',
      phone: '01712000001',
      age: '24 Y',
      sex: 'Female',
      doctorId: 'doc-1',
      doctorName: 'Prof. Dr. M. A. Rahman',
      specialty: 'Internal Medicine & Diabetology',
      roomNo: '201',
      fee: 1000,
      status: 'In Consultation',
      time: '09:30 AM',
    },
    {
      id: 'opd-2',
      tokenNo: 2,
      patientName: 'Masud Shikder',
      phone: '01812000003',
      age: '48 Y',
      sex: 'Male',
      doctorId: 'doc-1',
      doctorName: 'Prof. Dr. M. A. Rahman',
      specialty: 'Internal Medicine & Diabetology',
      roomNo: '201',
      fee: 1000,
      status: 'Waiting',
      time: '10:00 AM',
    },
    {
      id: 'opd-3',
      tokenNo: 3,
      patientName: 'Minara',
      phone: '01712000005',
      age: '29 Y',
      sex: 'Female',
      doctorId: 'doc-2',
      doctorName: 'Dr. Nusrat Jahan',
      specialty: 'Gynaecology & Obstetrics Specialist',
      roomNo: '203',
      fee: 800,
      status: 'Waiting',
      time: '10:30 AM',
    },
  ]);

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('+880 17');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState<'Male' | 'Female' | 'Other'>('Female');
  const [doctorId, setDoctorId] = useState(doctors[0]?.id || '');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const selectedDoctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim()) return;

    const tokenNo = appointments.length + 1;
    const newAppointment: OpdAppointment = {
      id: `opd-${Date.now()}`,
      tokenNo,
      patientName: patientName.trim(),
      phone: phone.trim(),
      age: age || '25 Y',
      sex,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      roomNo: selectedDoctor.roomNo || '101',
      fee: selectedDoctor.fee || 600,
      status: 'Waiting',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAppointments([...appointments, newAppointment]);
    setToastMsg(`Token #${tokenNo} issued for ${patientName} to ${selectedDoctor.name}`);
    setPatientName('');
    setAge('');
    setTimeout(() => setToastMsg(null), 3000);
  };

  const updateStatus = (id: string, newStatus: OpdAppointment['status']) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="bg-purple-900 text-white px-4 py-2 rounded-lg text-sm font-medium flex justify-between items-center shadow-md">
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} className="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700">
        <div>
          <h2 className="text-xl font-bold text-purple-950 dark:text-purple-200 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-blue-700" />
            {t.doctorVisit}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            OPD Chamber queue, token issue, patient serial management, and consultation fees.
          </p>
        </div>
      </div>

      {/* 2 Columns: Form Left, Queue Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Booking Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700 space-y-4">
          <h3 className="font-bold text-sm text-purple-950 dark:text-purple-200 border-b border-gray-100 dark:border-gray-700 pb-2">
            {t.newAppointment}
          </h3>

          <form onSubmit={handleBookAppointment} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.ptName} *:</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Patient Full Name"
                className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded text-xs font-semibold focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">{t.age}:</label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25 Y"
                  className="w-full bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 p-2 rounded text-xs focus:outline-none"
                />
              </div>
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
              <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1">Consultant Doctor:</label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
                className="w-full bg-purple-50 dark:bg-gray-900 border border-purple-200 dark:border-purple-800 p-2 rounded text-xs font-bold text-purple-950 dark:text-purple-200 focus:outline-none"
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — Room {d.roomNo} (Fee: ৳{d.fee})
                  </option>
                ))}
              </select>
            </div>

            {/* Doctor Info Pill */}
            {selectedDoctor && (
              <div className="bg-purple-50 dark:bg-gray-900/40 p-3 rounded-lg border border-purple-200 dark:border-gray-700 text-xs space-y-1">
                <p className="font-bold text-purple-950 dark:text-purple-300">{selectedDoctor.name}</p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">{selectedDoctor.specialty}</p>
                <div className="flex justify-between items-center pt-1 font-semibold text-purple-900 dark:text-purple-200">
                  <span>Room: {selectedDoctor.roomNo}</span>
                  <span className="font-bold text-sm text-emerald-700">Fee: ৳{selectedDoctor.fee}</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-black rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition active:scale-98"
            >
              <Ticket className="w-4 h-4" />
              Issue OPD Calling Token
            </button>
          </form>
        </div>

        {/* Live Queue Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-xs border border-purple-100 dark:border-gray-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-2 mb-3">
              <h3 className="font-bold text-sm text-purple-950 dark:text-purple-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-purple-600" />
                {t.opdQueue}
              </h3>
              <span className="text-xs text-purple-700 dark:text-purple-300 font-bold">
                {appointments.filter((a) => a.status === 'Waiting').length} Waiting
              </span>
            </div>

            <div className="space-y-2.5 max-h-[500px] overflow-y-auto">
              {appointments.map((a) => (
                <div
                  key={a.id}
                  className={`p-3 rounded-xl border transition ${
                    a.status === 'In Consultation'
                      ? 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-300 dark:border-blue-700'
                      : a.status === 'Completed'
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 opacity-75'
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-900 text-white flex flex-col items-center justify-center font-black">
                        <span className="text-[9px] uppercase tracking-wider text-purple-300">Token</span>
                        <span className="text-sm leading-none">#{a.tokenNo}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100">{a.patientName}</h4>
                        <p className="text-[11px] text-gray-500">
                          {a.age} | {a.sex} | Phone: {a.phone}
                        </p>
                        <p className="text-[11px] font-semibold text-purple-800 dark:text-purple-300 mt-0.5">
                          Dr. {a.doctorName} (Room {a.roomNo})
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          a.status === 'In Consultation'
                            ? 'bg-blue-100 text-blue-800'
                            : a.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : a.status === 'Cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {a.status}
                      </span>
                      <p className="text-[11px] text-gray-400 mt-1">{a.time}</p>
                    </div>
                  </div>

                  {/* Quick Action Status Changer */}
                  <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs">
                    <span className="text-gray-400 font-mono text-[11px]">Fee: ৳{a.fee} (Paid)</span>
                    <div className="flex items-center gap-1.5">
                      {a.status === 'Waiting' && (
                        <button
                          onClick={() => updateStatus(a.id, 'In Consultation')}
                          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded text-[11px] cursor-pointer"
                        >
                          Call In
                        </button>
                      )}
                      {a.status === 'In Consultation' && (
                        <button
                          onClick={() => updateStatus(a.id, 'Completed')}
                          className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[11px] cursor-pointer"
                        >
                          Mark Done
                        </button>
                      )}
                      {a.status !== 'Completed' && (
                        <button
                          onClick={() => updateStatus(a.id, 'Cancelled')}
                          className="px-2 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded text-[11px] cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
