export type Language = 'bn' | 'en';
export type ThemeMode = 'classic' | 'modern' | 'dark';

export interface Doctor {
  id: string;
  code: string;
  name: string;
  degree: string;
  specialty: string;
  phone: string;
  roomNo: string;
  fee: number;
}

export interface SubTest {
  name: string;
  unit: string;
  normalRange: string;
  defaultValue?: string;
}

export interface LabTest {
  id: string;
  code: string;
  name: string;
  category: string;
  unit: string;
  normalRange: string;
  price: number;
  sampleType?: string;
  subTests?: SubTest[];
}

export interface TestResultItem {
  testName: string;
  result: string;
  unit: string;
  normalRange: string;
  status: 'Normal' | 'High' | 'Low';
}

export interface Patient {
  id: string;
  pId: string;
  invDate: string;
  billDate: string;
  patientName: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other';
  phone?: string;
  address?: string;
  drCode: string;
  drName: string;
  status: 'Printed' | 'Completed' | 'Pending';
  department: string;
  comments?: string;
  differentialCount?: number;
  autoPrint?: boolean;
  onlyHgb?: boolean;
  testResults: TestResultItem[];
  createdAt?: string;
}

export interface InvoiceItem {
  testId: string;
  testName: string;
  category: string;
  price: number;
}

export interface Invoice {
  id: string;
  invoiceNo: string;
  pId: string;
  patientName: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other';
  phone: string;
  drCode: string;
  drName: string;
  date: string;
  items: InvoiceItem[];
  subtotal: number;
  discountPercent: number;
  discountAmount: number;
  netTotal: number;
  paidAmount: number;
  dueAmount: number;
  paymentMethod: string;
  status: 'Paid' | 'Partial' | 'Due';
  createdAt?: string;
}

export interface OpdAppointment {
  id: string;
  tokenNo: number;
  patientName: string;
  phone: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other';
  doctorId: string;
  doctorName: string;
  specialty: string;
  roomNo: string;
  fee: number;
  status: 'Waiting' | 'In Consultation' | 'Completed' | 'Cancelled';
  time: string;
}

export interface PrescriptionMedicine {
  name: string;
  dosage: string;
  instruction: string;
  duration: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  age: string;
  sex: 'Male' | 'Female' | 'Other';
  phone: string;
  doctorId: string;
  doctorName: string;
  chiefComplaints: string;
  clinicalObservations: string;
  diagnosis: string;
  medicines: PrescriptionMedicine[];
  investigations: string[];
  advice: string;
  followUp: string;
  date: string;
}

export interface EcgReport {
  id: string;
  pId: string;
  patientName: string;
  age: string;
  sex: string;
  drCode: string;
  heartRate: number;
  rhythm: string;
  prInterval: string;
  qrsDuration: string;
  qtInterval: string;
  axis: string;
  stSegment: string;
  impression: string;
  cardiologist: string;
  date: string;
}

export interface XrayReport {
  id: string;
  pId: string;
  patientName: string;
  age: string;
  sex: string;
  drCode: string;
  investigation: string;
  lungFields: string;
  heartSize: string;
  costophrenicAngles: string;
  bonyCage: string;
  impression: string;
  radiologist: string;
  date: string;
}

export interface UsgReport {
  id: string;
  pId: string;
  patientName: string;
  age: string;
  sex: string;
  drCode: string;
  scanType: string;
  liver: string;
  gallBladder: string;
  kidneys: string;
  spleenPancreas: string;
  urinaryBladder: string;
  uterusAdnexa: string;
  impression: string;
  sonologist: string;
  date: string;
}

export interface ClinicConfig {
  clinicName: string;
  clinicNameBn: string;
  tagline: string;
  taglineBn: string;
  address: string;
  phone: string;
  email: string;
  regNo: string;
  vatRegNo?: string;
  currency?: string;
  pathologistName: string;
  pathologistDegree?: string;
  labInCharge: string;
  logoUrl?: string;
  hospitalBackgroundUrl?: string;
}

export interface SystemLog {
  id: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  module: string;
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderRole: 'Lab' | 'Doctor' | 'Reception' | 'Admin';
  message: string;
  timestamp: string;
  channel: 'lab' | 'opd' | 'billing' | 'general';
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warn' | 'error';
  timestamp: string;
  read: boolean;
}

export type AppModuleId =
  | 'pathology'
  | 'billing'
  | 'doctorVisit'
  | 'ecg'
  | 'xray'
  | 'ultrasound'
  | 'doctorPortal'
  | 'analytics'
  | 'chat'
  | 'settings';

export interface UserAccount {
  id: string;
  username: string;
  password: string;
  fullName: string;
  role: 'Admin' | 'Lab' | 'Xray' | 'Ultrasound' | 'Doctor' | 'Billing' | 'Staff';
  allowedModules: AppModuleId[];
  isActive: boolean;
  createdAt: string;
  phone?: string;
  avatarColor?: string;
}
