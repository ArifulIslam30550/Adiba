import { jsPDF } from 'jspdf';
import { Patient, ClinicConfig } from '../types';

export const generatePathologyPdf = (
  patient: Patient,
  clinic: ClinicConfig,
  reportTitle: string = 'PATHOLOGY INVESTIGATION REPORT',
  includeClinicName: boolean = false
) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  let yPos = 14;

  if (includeClinicName) {
    // Header Box
    doc.setFillColor(245, 243, 255);
    doc.rect(14, 10, pageWidth - 28, 26, 'F');
    doc.setDrawColor(124, 58, 237);
    doc.setLineWidth(0.4);
    doc.rect(14, 10, pageWidth - 28, 26, 'D');

    // Clinic Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.setTextColor(76, 29, 149);
    doc.text(clinic.clinicName, pageWidth / 2, 17, { align: 'center' });

    // Subtitles
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);
    doc.text(clinic.tagline, pageWidth / 2, 22, { align: 'center' });
    doc.text(`${clinic.address} | Phone: ${clinic.phone}`, pageWidth / 2, 27, { align: 'center' });
    doc.text(`Govt Reg No: ${clinic.regNo} | Email: ${clinic.email}`, pageWidth / 2, 32, { align: 'center' });

    // Report Title Badge
    doc.setFillColor(109, 40, 217);
    doc.roundedRect(pageWidth / 2 - 40, 39, 80, 7, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(reportTitle, pageWidth / 2, 44, { align: 'center' });
    yPos = 50;
  } else {
    // Official Pad Paper Mode: Top margin for hospital letterhead
    yPos = 36;
    doc.setFillColor(109, 40, 217);
    doc.roundedRect(pageWidth / 2 - 45, yPos - 8, 90, 7, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(reportTitle, pageWidth / 2, yPos - 3, { align: 'center' });
    yPos = 40;
  }

  doc.setFillColor(250, 250, 250);
  doc.rect(14, yPos, pageWidth - 28, 22, 'F');
  doc.setDrawColor(209, 213, 219);
  doc.rect(14, yPos, pageWidth - 28, 22, 'D');

  doc.setFontSize(8.5);
  doc.setTextColor(17, 24, 39);

  // Left Column
  doc.setFont('helvetica', 'bold');
  doc.text('Patient ID:', 18, yPos + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(patient.pId, 40, yPos + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Patient Name:', 18, yPos + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(patient.patientName, 40, yPos + 12);

  doc.setFont('helvetica', 'bold');
  doc.text('Age / Sex:', 18, yPos + 18);
  doc.setFont('helvetica', 'normal');
  doc.text(`${patient.age || 'N/A'} / ${patient.sex || 'N/A'}`, 40, yPos + 18);

  // Right Column
  const rightCol = pageWidth / 2 + 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Bill Date:', rightCol, yPos + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(patient.billDate || patient.invDate, rightCol + 22, yPos + 6);

  doc.setFont('helvetica', 'bold');
  doc.text('Ref. Doctor:', rightCol, yPos + 12);
  doc.setFont('helvetica', 'normal');
  doc.text(patient.drName ? `${patient.drName} (${patient.drCode})` : patient.drCode, rightCol + 22, yPos + 12);

  doc.setFont('helvetica', 'bold');
  doc.text('Sample Type:', rightCol, yPos + 18);
  doc.setFont('helvetica', 'normal');
  doc.text('EDTA Whole Blood / Serum', rightCol + 22, yPos + 18);

  // Test Results Table Header
  yPos = 77;
  doc.setFillColor(76, 29, 149);
  doc.rect(14, yPos, pageWidth - 28, 7.5, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text('Test Parameter', 18, yPos + 5.2);
  doc.text('Result', 89, yPos + 5.2);
  doc.text('Unit', 119, yPos + 5.2);
  doc.text('Normal Reference Interval', 144, yPos + 5.2);

  // Test Results Rows
  yPos += 7.5;
  doc.setTextColor(31, 41, 55);

  patient.testResults.forEach((test, idx) => {
    if (idx % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(14, yPos, pageWidth - 28, 6.8, 'F');
    }
    doc.setDrawColor(229, 231, 235);
    doc.line(14, yPos + 6.8, pageWidth - 14, yPos + 6.8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(test.testName, 18, yPos + 4.8);

    doc.setFont('helvetica', 'bold');
    if (test.status === 'High') {
      doc.setTextColor(220, 38, 38);
    } else if (test.status === 'Low') {
      doc.setTextColor(37, 99, 235);
    } else {
      doc.setTextColor(17, 24, 39);
    }
    doc.text(test.result || '-', 89, yPos + 4.8);

    doc.setTextColor(75, 85, 99);
    doc.setFont('helvetica', 'normal');
    doc.text(test.unit || '-', 119, yPos + 4.8);
    doc.text(test.normalRange || '-', 144, yPos + 4.8);

    yPos += 6.8;
  });

  // Clinical Comments
  yPos += 6;
  doc.setDrawColor(209, 213, 219);
  doc.setFillColor(254, 252, 232);
  doc.roundedRect(14, yPos, pageWidth - 28, 14, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(133, 77, 14);
  doc.text('Clinical Comments / Remarks:', 18, yPos + 5);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(75, 85, 99);
  const comments = patient.comments || 'Results correlate with clinical picture. Verified with automated standard analyzer.';
  doc.text(comments, 18, yPos + 9.5);

  // Signatures
  doc.setDrawColor(156, 163, 175);
  doc.line(24, 250, 79, 250);
  doc.line(pageWidth - 14 - 65, 250, pageWidth - 14 - 10, 250);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(17, 24, 39);
  doc.text(clinic.labInCharge, 24, 254);
  doc.text(clinic.pathologistName, pageWidth - 14 - 65, 254);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(107, 114, 128);
  doc.text('Medical Lab Technologist', 24, 258);
  doc.text(clinic.pathologistDegree || 'Consultant Pathologist', pageWidth - 14 - 65, 258);

  // Footer Disclaimer
  doc.setFontSize(6.5);
  doc.setTextColor(156, 163, 175);
  doc.text(
    `* This is a computerized laboratory report. Generated on ${new Date().toLocaleString()} | PId: ${patient.pId}`,
    14,
    285
  );

  doc.save(`Lab_Report_${patient.pId}_${patient.patientName.replace(/\s+/g, '_')}.pdf`);
};
