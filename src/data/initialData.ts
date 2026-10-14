// Extracted and preserved exactly from medicare-clinic-diagnostic-4082.ai.studio

export const initialClinicConfig = {
  "clinicName": "MEDICARE DIAGNOSTIC & CONSULTATION CENTER",
  "clinicNameBn": "\u09ae\u09c7\u09a1\u09bf\u0995\u09c7\u09af\u09bc\u09be\u09b0 \u09a1\u09be\u09af\u09bc\u09be\u0997\u09a8\u09b8\u09cd\u099f\u09bf\u0995 \u0993 \u0995\u09a8\u09b8\u09be\u09b2\u099f\u09c7\u09b6\u09a8 \u09b8\u09c7\u09a8\u09cd\u099f\u09be\u09b0",
  "tagline": "Modern Diagnostic Services & Specialized Consultation",
  "taglineBn": "\u0986\u09a7\u09c1\u09a8\u09bf\u0995 \u09a1\u09be\u09af\u09bc\u09be\u0997\u09a8\u09b8\u09cd\u099f\u09bf\u0995 \u09b8\u09c7\u09ac\u09be \u0993 \u09ac\u09bf\u09b6\u09c7\u09b7\u099c\u09cd\u099e \u099a\u09bf\u0995\u09bf\u09ce\u09b8\u09be \u09aa\u09b0\u09be\u09ae\u09b0\u09cd\u09b6",
  "address": "Plot-12, Main Road, Block-C, Medical Zone, Dhaka-1216",
  "phone": "+880 1712-345678, +880 1987-654321",
  "email": "info@medicarediagnostic.com",
  "regNo": "DGHS-REG-2024/78912",
  "currency": "\u09f3",
  "pathologistName": "Dr. Sharmin Akter, MBBS, MD (Pathology)",
  "pathologistDegree": "Senior Consultant & Lab Director",
  "labInCharge": "Medical Technologist (Lab In-Charge)",
  "logoUrl": "",
  "hospitalBackgroundUrl": "/hospital-bg.jpg"
};

export const initialDoctors = [
  {
    "id": "doc-1",
    "code": "DR01",
    "name": "Prof. Dr. M. A. Rahman",
    "degree": "MBBS, FCPS (Medicine), MACP (USA)",
    "specialty": "Internal Medicine & Diabetology",
    "phone": "+880 1711-112233",
    "roomNo": "201",
    "fee": 1000
  },
  {
    "id": "doc-2",
    "code": "DR02",
    "name": "Dr. Nusrat Jahan",
    "degree": "MBBS, DGO, FCPS (Obs & Gynae)",
    "specialty": "Gynaecology & Obstetrics Specialist",
    "phone": "+880 1812-334455",
    "roomNo": "203",
    "fee": 800
  },
  {
    "id": "doc-3",
    "code": "DR03",
    "name": "Dr. Tanvir Hossain",
    "degree": "MBBS, MD (Cardiology)",
    "specialty": "Cardiologist & Clinical Specialist",
    "phone": "+880 1913-556677",
    "roomNo": "104",
    "fee": 1200
  },
  {
    "id": "doc-4",
    "code": "DR04",
    "name": "Dr. Sabrina Farhana",
    "degree": "MBBS, D-Card, MD (Radiology)",
    "specialty": "Consultant Radiologist & Sonologist",
    "phone": "+880 1714-778899",
    "roomNo": "108",
    "fee": 900
  },
  {
    "id": "doc-5",
    "code": "DR05",
    "name": "Self / Direct Patient",
    "degree": "Self Requested Investigation",
    "specialty": "General Screening",
    "phone": "+880 1700-000000",
    "roomNo": "Lab Counter",
    "fee": 0
  }
];

export const initialLabTests = [
  {
    "id": "t-cbc",
    "code": "CBC",
    "name": "Complete Blood Count (CBC with ESR)",
    "category": "Hematology",
    "unit": "Panel",
    "normalRange": "See sub-tests",
    "price": 450,
    "sampleType": "EDTA Whole Blood",
    "subTests": [
      {
        "name": "Hemoglobin (Hb)",
        "unit": "g/dL",
        "normalRange": "12.0 - 16.0 (F), 13.5 - 18.0 (M)"
      },
      {
        "name": "ESR (Westergren)",
        "unit": "mm/1st hr",
        "normalRange": "0 - 20 (F), 0 - 15 (M)"
      },
      {
        "name": "Total WBC Count",
        "unit": "/cumm",
        "normalRange": "4,000 - 11,000"
      },
      {
        "name": "Neutrophils",
        "unit": "%",
        "normalRange": "40 - 75"
      },
      {
        "name": "Lymphocytes",
        "unit": "%",
        "normalRange": "20 - 45"
      },
      {
        "name": "Monocytes",
        "unit": "%",
        "normalRange": "2 - 10"
      },
      {
        "name": "Eosinophils",
        "unit": "%",
        "normalRange": "1 - 6"
      },
      {
        "name": "Basophils",
        "unit": "%",
        "normalRange": "0 - 1"
      },
      {
        "name": "Total RBC Count",
        "unit": "mil/cumm",
        "normalRange": "4.0 - 5.5"
      },
      {
        "name": "Platelet Count",
        "unit": "lakh/cumm",
        "normalRange": "1.5 - 4.5"
      },
      {
        "name": "PCV / Hematocrit",
        "unit": "%",
        "normalRange": "36 - 48"
      },
      {
        "name": "MCV",
        "unit": "fL",
        "normalRange": "80 - 96"
      }
    ]
  },
  {
    "id": "t-rbs",
    "code": "RBS",
    "name": "Random Blood Sugar (RBS)",
    "category": "Biochemistry",
    "unit": "mmol/L",
    "normalRange": "< 7.8 mmol/L",
    "price": 150,
    "sampleType": "Fluoride Plasma"
  },
  {
    "id": "t-fbs",
    "code": "FBS",
    "name": "Fasting Blood Sugar (FBS)",
    "category": "Biochemistry",
    "unit": "mmol/L",
    "normalRange": "3.9 - 6.0 mmol/L",
    "price": 150,
    "sampleType": "Fluoride Plasma"
  },
  {
    "id": "t-hba1c",
    "code": "HBA1C",
    "name": "Glycated Hemoglobin (HbA1c)",
    "category": "Biochemistry",
    "unit": "%",
    "normalRange": "4.5 - 5.7 % (Normal), 5.7 - 6.4 % (Prediabetes)",
    "price": 800,
    "sampleType": "EDTA Whole Blood"
  },
  {
    "id": "t-creatinine",
    "code": "S_CREAT",
    "name": "Serum Creatinine",
    "category": "Biochemistry",
    "unit": "mg/dL",
    "normalRange": "0.6 - 1.2 mg/dL (Female: 0.5 - 1.1)",
    "price": 350,
    "sampleType": "Clotted Blood (Serum)"
  },
  {
    "id": "t-sgpt",
    "code": "SGPT",
    "name": "Serum ALT / SGPT",
    "category": "Biochemistry",
    "unit": "U/L",
    "normalRange": "Up to 45 U/L (Male), Up to 34 U/L (Female)",
    "price": 350,
    "sampleType": "Serum"
  },
  {
    "id": "t-sgot",
    "code": "SGOT",
    "name": "Serum AST / SGOT",
    "category": "Biochemistry",
    "unit": "U/L",
    "normalRange": "Up to 38 U/L",
    "price": 350,
    "sampleType": "Serum"
  },
  {
    "id": "t-bilirubin",
    "code": "S_BILI",
    "name": "Serum Bilirubin (Total)",
    "category": "Biochemistry",
    "unit": "mg/dL",
    "normalRange": "0.2 - 1.2 mg/dL",
    "price": 300,
    "sampleType": "Serum"
  },
  {
    "id": "t-lipid",
    "code": "LIPID",
    "name": "Lipid Profile",
    "category": "Biochemistry",
    "unit": "Panel",
    "normalRange": "See sub-tests",
    "price": 900,
    "sampleType": "Fasting Serum (12 hrs)",
    "subTests": [
      {
        "name": "S. Cholesterol (Total)",
        "unit": "mg/dL",
        "normalRange": "< 200"
      },
      {
        "name": "S. Triglycerides (TG)",
        "unit": "mg/dL",
        "normalRange": "< 150"
      },
      {
        "name": "S. HDL Cholesterol",
        "unit": "mg/dL",
        "normalRange": "> 40 (M), > 50 (F)"
      },
      {
        "name": "S. LDL Cholesterol",
        "unit": "mg/dL",
        "normalRange": "< 100"
      }
    ]
  },
  {
    "id": "t-uric-acid",
    "code": "URIC",
    "name": "Serum Uric Acid",
    "category": "Biochemistry",
    "unit": "mg/dL",
    "normalRange": "3.5 - 7.2 (Male), 2.6 - 6.0 (Female)",
    "price": 350,
    "sampleType": "Serum"
  },
  {
    "id": "t-urine-re",
    "code": "U_RE",
    "name": "Urine Routine & Microscopic (R/M/E)",
    "category": "Microbiology",
    "unit": "Panel",
    "normalRange": "Pus: 0-2, RBC: Nil, Albumin: Nil",
    "price": 200,
    "sampleType": "Clean Catch Midstream Urine",
    "subTests": [
      {
        "name": "Color & Appearance",
        "unit": "",
        "normalRange": "Straw / Clear"
      },
      {
        "name": "Specific Gravity",
        "unit": "",
        "normalRange": "1.010 - 1.025"
      },
      {
        "name": "pH",
        "unit": "",
        "normalRange": "5.0 - 7.0"
      },
      {
        "name": "Albumin / Protein",
        "unit": "",
        "normalRange": "Nil"
      },
      {
        "name": "Sugar / Glucose",
        "unit": "",
        "normalRange": "Nil"
      },
      {
        "name": "Pus Cells",
        "unit": "/HPF",
        "normalRange": "0 - 4"
      },
      {
        "name": "R.B.C",
        "unit": "/HPF",
        "normalRange": "Nil - 1"
      },
      {
        "name": "Epithelial Cells",
        "unit": "/HPF",
        "normalRange": "Occasional"
      }
    ]
  },
  {
    "id": "t-widal",
    "code": "WIDAL",
    "name": "Widal Test (Enteric Fever)",
    "category": "Pathology",
    "unit": "Titre",
    "normalRange": "TO: <1:80, TH: <1:80",
    "price": 300,
    "sampleType": "Serum"
  },
  {
    "id": "t-tsh",
    "code": "TSH",
    "name": "Thyroid Stimulating Hormone (TSH)",
    "category": "Pathology",
    "unit": "\u03bcIU/mL",
    "normalRange": "0.35 - 4.94 \u03bcIU/mL",
    "price": 600,
    "sampleType": "Serum"
  },
  {
    "id": "t-ecg",
    "code": "ECG_12",
    "name": "Electrocardiogram (12-Lead ECG)",
    "category": "ECG",
    "unit": "Graph Report",
    "normalRange": "Normal Sinus Rhythm",
    "price": 400
  },
  {
    "id": "t-xray-chest",
    "code": "XR_CHEST",
    "name": "Digital X-Ray Chest PA View",
    "category": "X-Ray",
    "unit": "Digital Film",
    "normalRange": "Clear lung fields, normal cardiothoracic ratio",
    "price": 600
  },
  {
    "id": "t-xray-cervical",
    "code": "XR_CERV",
    "name": "Digital X-Ray Cervical Spine (B/V)",
    "category": "X-Ray",
    "unit": "Digital Film",
    "normalRange": "Normal curvature and intervertebral spaces",
    "price": 800
  },
  {
    "id": "t-usg-whole-abd",
    "code": "USG_WA",
    "name": "USG of Whole Abdomen",
    "category": "Ultrasound",
    "unit": "Color Doppler Scan",
    "normalRange": "Normal parenchymal architecture of organs",
    "price": 1500
  },
  {
    "id": "t-usg-kub",
    "code": "USG_KUB",
    "name": "USG of KUB & Prostate / Pelvis",
    "category": "Ultrasound",
    "unit": "Color Doppler Scan",
    "normalRange": "Normal kidneys, urinary bladder & pelvic organs",
    "price": 1200
  }
];

export const initialPatients = [
  {
    "id": "p-1",
    "pId": "26100294",
    "invDate": "13-10-2026",
    "billDate": "13-10-2026",
    "patientName": "Titly",
    "age": "24 Y",
    "sex": "Female",
    "phone": "01712000001",
    "address": "Mirpur, Dhaka",
    "drCode": "DR01",
    "drName": "Prof. Dr. M. A. Rahman",
    "status": "Printed",
    "department": "Pathology",
    "comments": "Sample collected in fasting state. All tests verified with automated analyzer.",
    "differentialCount": 100,
    "autoPrint": true,
    "onlyHgb": false,
    "testResults": [
      {
        "testName": "Hemoglobin (Hb)",
        "result": "13.2",
        "unit": "g/dL",
        "normalRange": "12.0 - 16.0",
        "status": "Normal"
      },
      {
        "testName": "ESR (Westergren)",
        "result": "14",
        "unit": "mm/1st hr",
        "normalRange": "0 - 20",
        "status": "Normal"
      },
      {
        "testName": "Total WBC Count",
        "result": "7,800",
        "unit": "/cumm",
        "normalRange": "4,000 - 11,000",
        "status": "Normal"
      },
      {
        "testName": "Neutrophils",
        "result": "62",
        "unit": "%",
        "normalRange": "40 - 75",
        "status": "Normal"
      },
      {
        "testName": "Lymphocytes",
        "result": "30",
        "unit": "%",
        "normalRange": "20 - 45",
        "status": "Normal"
      },
      {
        "testName": "Monocytes",
        "result": "4",
        "unit": "%",
        "normalRange": "2 - 10",
        "status": "Normal"
      },
      {
        "testName": "Eosinophils",
        "result": "4",
        "unit": "%",
        "normalRange": "1 - 6",
        "status": "Normal"
      },
      {
        "testName": "Basophils",
        "result": "0",
        "unit": "%",
        "normalRange": "0 - 1",
        "status": "Normal"
      },
      {
        "testName": "Platelet Count",
        "result": "2.8",
        "unit": "lakh/cumm",
        "normalRange": "1.5 - 4.5",
        "status": "Normal"
      },
      {
        "testName": "Serum Creatinine",
        "result": "0.8",
        "unit": "mg/dL",
        "normalRange": "0.5 - 1.1",
        "status": "Normal"
      },
      {
        "testName": "Fasting Blood Sugar (FBS)",
        "result": "5.2",
        "unit": "mmol/L",
        "normalRange": "3.9 - 6.0",
        "status": "Normal"
      }
    ],
    "totalBill": 1250,
    "paidAmount": 1250,
    "dueAmount": 0,
    "createdAt": "2026-10-13T09:15:00"
  },
  {
    "id": "p-2",
    "pId": "26100293",
    "invDate": "13-10-2026",
    "billDate": "13-10-2026",
    "patientName": "Pitam",
    "age": "32 Y",
    "sex": "Male",
    "phone": "01712000002",
    "address": "Dhanmondi, Dhaka",
    "drCode": "DR03",
    "drName": "Dr. Tanvir Hossain",
    "status": "Printed",
    "department": "Pathology",
    "comments": "Lipid profile and Blood Glucose checked.",
    "differentialCount": 100,
    "autoPrint": false,
    "onlyHgb": false,
    "testResults": [
      {
        "testName": "S. Cholesterol (Total)",
        "result": "228",
        "unit": "mg/dL",
        "normalRange": "< 200",
        "status": "High"
      },
      {
        "testName": "S. Triglycerides (TG)",
        "result": "185",
        "unit": "mg/dL",
        "normalRange": "< 150",
        "status": "High"
      },
      {
        "testName": "S. HDL Cholesterol",
        "result": "42",
        "unit": "mg/dL",
        "normalRange": "> 40",
        "status": "Normal"
      },
      {
        "testName": "S. LDL Cholesterol",
        "result": "149",
        "unit": "mg/dL",
        "normalRange": "< 100",
        "status": "High"
      },
      {
        "testName": "Random Blood Sugar (RBS)",
        "result": "6.9",
        "unit": "mmol/L",
        "normalRange": "< 7.8",
        "status": "Normal"
      }
    ],
    "totalBill": 1050,
    "paidAmount": 1050,
    "dueAmount": 0,
    "createdAt": "2026-10-13T09:40:00"
  },
  {
    "id": "p-3",
    "pId": "26100290",
    "invDate": "13-10-2026",
    "billDate": "13-10-2026",
    "patientName": "Masud Shikder",
    "age": "48 Y",
    "sex": "Male",
    "phone": "01812000003",
    "address": "Uttara, Dhaka",
    "drCode": "DR01",
    "drName": "Prof. Dr. M. A. Rahman",
    "status": "Printed",
    "department": "Pathology",
    "comments": "Routine checkup requested.",
    "differentialCount": 100,
    "autoPrint": false,
    "onlyHgb": false,
    "testResults": [
      {
        "testName": "Fasting Blood Sugar (FBS)",
        "result": "8.4",
        "unit": "mmol/L",
        "normalRange": "3.9 - 6.0",
        "status": "High"
      },
      {
        "testName": "Glycated Hemoglobin (HbA1c)",
        "result": "7.8",
        "unit": "%",
        "normalRange": "4.5 - 5.7",
        "status": "High"
      },
      {
        "testName": "Serum Creatinine",
        "result": "1.1",
        "unit": "mg/dL",
        "normalRange": "0.6 - 1.2",
        "status": "Normal"
      }
    ],
    "totalBill": 1300,
    "paidAmount": 1000,
    "dueAmount": 300,
    "createdAt": "2026-10-13T10:05:00"
  },
  {
    "id": "p-4",
    "pId": "26100289",
    "invDate": "13-10-2026",
    "billDate": "13-10-2026",
    "patientName": "Abul Kalam",
    "age": "55 Y",
    "sex": "Male",
    "phone": "01912000004",
    "address": "Gulshan, Dhaka",
    "drCode": "DR02",
    "drName": "Dr. Nusrat Jahan",
    "status": "Printed",
    "department": "Pathology",
    "comments": "Liver Enzymes and Electrolytes normal.",
    "differentialCount": 100,
    "autoPrint": false,
    "onlyHgb": false,
    "testResults": [
      {
        "testName": "Serum ALT / SGPT",
        "result": "32",
        "unit": "U/L",
        "normalRange": "Up to 45",
        "status": "Normal"
      },
      {
        "testName": "Serum AST / SGOT",
        "result": "28",
        "unit": "U/L",
        "normalRange": "Up to 38",
        "status": "Normal"
      },
      {
        "testName": "Serum Bilirubin (Total)",
        "result": "0.9",
        "unit": "mg/dL",
        "normalRange": "0.2 - 1.2",
        "status": "Normal"
      }
    ],
    "totalBill": 1000,
    "paidAmount": 1000,
    "dueAmount": 0,
    "createdAt": "2026-10-13T10:15:00"
  },
  {
    "id": "p-5",
    "pId": "26100286",
    "invDate": "13-10-2026",
    "billDate": "13-10-2026",
    "patientName": "Minara",
    "age": "29 Y",
    "sex": "Female",
    "phone": "01712000005",
    "address": "Mohammadpur, Dhaka",
    "drCode": "DR02",
    "drName": "Dr. Nusrat Jahan",
    "status": "Printed",
    "department": "Pathology",
    "comments": "Antenatal Profile & Urine R/E check.",
    "differentialCount": 100,
    "autoPrint": false,
    "onlyHgb": false,
    "testResults": [
      {
        "testName": "Hemoglobin (Hb)",
        "result": "10.8",
        "unit": "g/dL",
        "normalRange": "12.0 - 16.0",
        "status": "Low"
      },
      {
        "testName": "Random Blood Sugar (RBS)",
        "result": "5.8",
        "unit": "mmol/L",
        "normalRange": "< 7.8",
        "status": "Normal"
      },
      {
        "testName": "Albumin / Protein",
        "result": "Trace",
        "unit": "",
        "normalRange": "Nil",
        "status": "Abnormal"
      },
      {
        "testName": "Pus Cells",
        "result": "6 - 8",
        "unit": "/HPF",
        "normalRange": "0 - 4",
        "status": "High"
      }
    ],
    "totalBill": 800,
    "paidAmount": 800,
    "dueAmount": 0,
    "createdAt": "2026-10-13T10:30:00"
  },
  {
    "id": "p-6",
    "pId": "26100285",
    "invDate": "13-10-2026",
    "billDate": "13-10-2026",
    "patientName": "Sumaiya",
    "age": "19 Y",
    "sex": "Female",
    "phone": "01612000006",
    "address": "Badda, Dhaka",
    "drCode": "DR01",
    "drName": "Prof. Dr. M. A. Rahman",
    "status": "Printed",
    "department": "Pathology",
    "comments": "Thyroid screening completed.",
    "differentialCount": 100,
    "autoPrint": false,
    "onlyHgb": false,
    "testResults": [
      {
        "testName": "Thyroid Stimulating Hormone (TSH)",
        "result": "3.12",
        "unit": "\u03bcIU/mL",
        "normalRange": "0.35 - 4.94",
        "status": "Normal"
      },
      {
        "testName": "Hemoglobin (Hb)",
        "result": "12.4",
        "unit": "g/dL",
        "normalRange": "12.0 - 16.0",
        "status": "Normal"
      }
    ],
    "totalBill": 1050,
    "paidAmount": 1050,
    "dueAmount": 0,
    "createdAt": "2026-10-13T10:45:00"
  }
];

export const initialInvoices = [
  {
    "id": "inv-1",
    "invoiceNo": "INV-2026-1001",
    "pId": "26100294",
    "patientName": "Titly",
    "age": "24 Y",
    "sex": "Female",
    "phone": "01712000001",
    "drCode": "DR01",
    "drName": "Prof. Dr. M. A. Rahman",
    "date": "13-10-2026",
    "items": [
      {
        "testId": "t-cbc",
        "testName": "Complete Blood Count (CBC with ESR)",
        "category": "Hematology",
        "price": 450
      },
      {
        "testId": "t-creatinine",
        "testName": "Serum Creatinine",
        "category": "Biochemistry",
        "price": 350
      },
      {
        "testId": "t-fbs",
        "testName": "Fasting Blood Sugar (FBS)",
        "category": "Biochemistry",
        "price": 150
      }
    ],
    "subtotal": 950,
    "discountPercent": 0,
    "discountAmount": 0,
    "netTotal": 950,
    "paidAmount": 950,
    "dueAmount": 0,
    "paymentMethod": "Cash",
    "status": "Paid",
    "createdAt": "2026-10-13T09:10:00"
  },
  {
    "id": "inv-2",
    "invoiceNo": "INV-2026-1002",
    "pId": "26100290",
    "patientName": "Masud Shikder",
    "age": "48 Y",
    "sex": "Male",
    "phone": "01812000003",
    "drCode": "DR01",
    "drName": "Prof. Dr. M. A. Rahman",
    "date": "13-10-2026",
    "items": [
      {
        "testId": "t-fbs",
        "testName": "Fasting Blood Sugar (FBS)",
        "category": "Biochemistry",
        "price": 150
      },
      {
        "testId": "t-hba1c",
        "testName": "Glycated Hemoglobin (HbA1c)",
        "category": "Biochemistry",
        "price": 800
      },
      {
        "testId": "t-creatinine",
        "testName": "Serum Creatinine",
        "category": "Biochemistry",
        "price": 350
      }
    ],
    "subtotal": 1300,
    "discountPercent": 0,
    "discountAmount": 0,
    "netTotal": 1300,
    "paidAmount": 1000,
    "dueAmount": 300,
    "paymentMethod": "bKash/Nagad",
    "status": "Partial",
    "createdAt": "2026-10-13T10:00:00"
  }
];

export const translations = {
  "en": {
    "appTitle": "MediCare Clinical & Diagnostic Management",
    "tagline": "Modern, Fast & Reliable Clinical Software",
    "dashboard": "Dashboard",
    "billing": "Billing & Cash Memo",
    "doctorVisit": "Doctor Visit / OPD",
    "pathology": "Pathology Lab",
    "ecg": "ECG Reports",
    "xray": "X-Ray Imaging",
    "ultrasound": "Ultrasound (USG)",
    "doctorPortal": "Doctor Portal (Rx)",
    "analytics": "Analytics & Logs",
    "encryptedChat": "Encrypted Chat",
    "settings": "Settings & Master Data",
    "userGuide": "User Guide & Docs",
    "language": "Language",
    "theme": "Theme",
    "classicTheme": "Diagnostic Soft Lilac",
    "modernTheme": "Clinical Bright Light (High Contrast)",
    "darkTheme": "High-Contrast Dark",
    "twoFactor": "2FA Security",
    "twoFactorActive": "2FA Enabled",
    "twoFactorDisabled": "2FA Disabled",
    "cloudSync": "Cloud Sync",
    "online": "Online",
    "offline": "Offline Mode",
    "notifications": "Notifications",
    "markAllRead": "Mark all as read",
    "noNotifications": "No notifications",
    "billDate": "Bill Date",
    "patientId": "Patient ID",
    "ptName": "Patient Name",
    "age": "Age",
    "sex": "Sex",
    "drCode": "Doctor Code",
    "drName": "Doctor Name",
    "refresh": "New Patient / Refresh",
    "testName": "Test Name",
    "result": "Result",
    "unit": "Unit",
    "normalRange": "Normal Range",
    "status": "Status",
    "comments": "Comments",
    "defaultComment": "Default",
    "differentialCount": "Differential Count",
    "autoPrint": "Auto Print",
    "onlyHgb": "Only HGB",
    "save": "Save",
    "saveAndPrint": "Save & Print",
    "exit": "Clear Form",
    "pId": "Patient ID",
    "invDate": "Invoice Date",
    "patientName": "Patient Name",
    "printed": "Printed",
    "pending": "Pending",
    "completed": "Completed",
    "draft": "Draft",
    "addDoctorBtn": "+ Add Doctor",
    "addTestRow": "+ Add Custom Row",
    "loadProfile": "Quick Groups",
    "searchPatients": "Search patient by ID or name...",
    "searchTestPlaceholder": "Type test name (e.g. CBC, Hemoglobin, RBS, Creatinine, SGPT)...",
    "addTestButton": "+ Add Test",
    "deleteRow": "Delete",
    "noTestsAdded": "No tests added yet. Search above or select a test to add its format.",
    "quickFillSample": "Load Sample Patient",
    "labReportTitle": "PATHOLOGY INVESTIGATION REPORT",
    "invoiceReceiptTitle": "CASH MEMO & BILLING INVOICE",
    "printReport": "Print Report",
    "downloadPdf": "Download PDF",
    "close": "Close",
    "specimen": "Specimen",
    "referredBy": "Referred By",
    "reportingDate": "Reporting Date",
    "deliveryDate": "Delivery Date",
    "pathologistSignature": "Medical Technologist / Pathologist",
    "inChargeSignature": "Consultant Pathologist",
    "newBill": "New Invoice",
    "invoicesList": "Recent Invoices",
    "searchInvoices": "Search Invoices...",
    "patientInfo": "Patient Information",
    "selectTests": "Select Tests / Services",
    "subtotal": "Subtotal",
    "discount": "Discount",
    "netTotal": "Net Total",
    "paidAmount": "Paid Amount",
    "dueAmount": "Due Amount",
    "paymentMethod": "Payment Method",
    "createInvoice": "Generate & Print Invoice",
    "allTests": "All Tests",
    "price": "Fee",
    "opdQueue": "OPD Patient Queue",
    "newAppointment": "Book OPD Visit",
    "serialNo": "Token No",
    "chamber": "Chamber / Room",
    "consultationFee": "Consult Fee",
    "rxPortal": "Doctor Prescription Studio",
    "chiefComplaints": "Chief Complaints",
    "diagnosis": "Provisional Diagnosis",
    "clinicalNotes": "Clinical Notes",
    "medicine": "Medicine",
    "dosage": "Dosage (e.g. 1+0+1)",
    "instruction": "Instruction",
    "duration": "Duration",
    "addMedicine": "+ Add Medicine",
    "prescribeInvestigations": "Advised Investigations",
    "advice": "General Advice",
    "printPrescription": "Print Prescription (Rx)",
    "ecgTitle": "Electrocardiogram (ECG) Module",
    "xrayTitle": "Digital X-Ray Reporting Module",
    "usgTitle": "Ultrasonography (USG) Module",
    "impression": "Clinical Impression / Diagnosis",
    "findings": "Detailed Findings",
    "doctorsManagement": "Doctors Master List",
    "testsManagement": "Diagnostic Tests & Normal Ranges",
    "clinicProfile": "Clinic Header & Profile",
    "dataBackup": "Data Backup & Cloud Sync",
    "addDoctor": "Add New Doctor",
    "addTest": "Add New Test Parameter",
    "exportBackup": "Export Data (JSON)",
    "importBackup": "Restore Backup",
    "resetDefaultData": "Reset Demo Data",
    "male": "Male",
    "female": "Female",
    "other": "Other",
    "saveChanges": "Save Changes",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit",
    "action": "Action",
    "success": "Success",
    "search": "Search",
    "filter": "Filter"
  },
  "bn": {
    "appTitle": "\u09ae\u09c7\u09a1\u09bf\u0995\u09c7\u09af\u09bc\u09be\u09b0 \u0995\u09cd\u09b2\u09bf\u09a8\u09bf\u0995\u09cd\u09af\u09be\u09b2 \u0993 \u09a1\u09be\u09af\u09bc\u09be\u0997\u09a8\u09b8\u09cd\u099f\u09bf\u0995 \u09ae\u09cd\u09af\u09be\u09a8\u09c7\u099c\u09ae\u09c7\u09a8\u09cd\u099f",
    "tagline": "\u09b8\u09b9\u099c, \u09a6\u09cd\u09b0\u09c1\u09a4 \u0993 \u09a8\u09bf\u09b0\u09cd\u09ad\u09b0\u09af\u09cb\u0997\u09cd\u09af \u0995\u09cd\u09b2\u09bf\u09a8\u09bf\u0995\u09cd\u09af\u09be\u09b2 \u09b8\u09ab\u099f\u0993\u09af\u09bc\u09cd\u09af\u09be\u09b0",
    "dashboard": "\u09a1\u09cd\u09af\u09be\u09b6\u09ac\u09cb\u09b0\u09cd\u09a1",
    "billing": "\u09ac\u09bf\u09b2\u09bf\u0982 \u0993 \u0995\u09cd\u09af\u09be\u09b6 \u09ae\u09c7\u09ae\u09cb",
    "doctorVisit": "\u09a1\u0995\u09cd\u099f\u09b0 \u09ad\u09bf\u099c\u09bf\u099f \u0993 \u0993\u09aa\u09bf\u09a1\u09bf",
    "pathology": "\u09aa\u09cd\u09af\u09be\u09a5\u09cb\u09b2\u099c\u09bf \u09b2\u09cd\u09af\u09be\u09ac",
    "ecg": "\u0987\u09b8\u09bf\u099c\u09bf \u09b0\u09bf\u09aa\u09cb\u09b0\u09cd\u099f",
    "xray": "\u098f\u0995\u09cd\u09b8-\u09b0\u09c7 \u0987\u09ae\u09c7\u099c\u09bf\u0982",
    "ultrasound": "\u0986\u09b2\u09cd\u099f\u09cd\u09b0\u09be\u09b8\u09be\u0989\u09a8\u09cd\u09a1 (\u0987\u0989\u098f\u09b8\u099c\u09bf)",
    "doctorPortal": "\u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0 \u09aa\u09cb\u09b0\u09cd\u099f\u09be\u09b2 (\u09aa\u09cd\u09b0\u09c7\u09b8\u0995\u09cd\u09b0\u09bf\u09aa\u09b6\u09a8)",
    "analytics": "\u0985\u09cd\u09af\u09be\u09a8\u09be\u09b2\u09bf\u099f\u09bf\u0995\u09cd\u09b8 \u0993 \u09b8\u09bf\u09b8\u09cd\u099f\u09c7\u09ae \u09b2\u0997",
    "encryptedChat": "\u098f\u09a8\u0995\u09cd\u09b0\u09bf\u09aa\u099f\u09c7\u09a1 \u099a\u09cd\u09af\u09be\u099f",
    "settings": "\u09b8\u09c7\u099f\u09bf\u0982\u09b8 \u0993 \u09ae\u09be\u09b8\u09cd\u099f\u09be\u09b0 \u09a1\u09be\u099f\u09be",
    "userGuide": "\u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u09a8\u09bf\u09b0\u09cd\u09a6\u09c7\u09b6\u09bf\u0995\u09be",
    "language": "\u09ad\u09be\u09b7\u09be",
    "theme": "\u09a5\u09bf\u09ae",
    "classicTheme": "\u09a1\u09be\u09df\u09be\u0997\u09a8\u09b8\u09cd\u099f\u09bf\u0995 \u09b8\u09ab\u09cd\u099f (\u09aa\u09be\u09b0\u09cd\u09aa\u09b2)",
    "modernTheme": "\u0995\u09cd\u09b2\u09bf\u09a8\u09bf\u0995\u09cd\u09af\u09be\u09b2 \u09b2\u09be\u0987\u099f (\u0989\u099c\u09cd\u099c\u09cd\u09ac\u09b2 \u09b8\u09be\u09a6\u09be)",
    "darkTheme": "\u09b9\u09be\u0987-\u0995\u09a8\u09cd\u099f\u09cd\u09b0\u09be\u09b8\u09cd\u099f \u09a1\u09be\u09b0\u09cd\u0995 (\u0989\u099c\u09cd\u099c\u09cd\u09ac\u09b2 \u09b2\u09c7\u0996\u09be)",
    "twoFactor": "\u099f\u09c1-\u09ab\u09cd\u09af\u09be\u0995\u09cd\u099f\u09b0 \u09a8\u09bf\u09b0\u09be\u09aa\u09a4\u09cd\u09a4\u09be (2FA)",
    "twoFactorActive": "2FA \u09b8\u0995\u09cd\u09b0\u09bf\u09df",
    "twoFactorDisabled": "2FA \u09a8\u09bf\u09b7\u09cd\u0995\u09cd\u09b0\u09bf\u09df",
    "cloudSync": "\u0995\u09cd\u09b2\u09be\u0989\u09a1 \u09b8\u09bf\u0999\u09cd\u0995",
    "online": "\u0985\u09a8\u09b2\u09be\u0987\u09a8",
    "offline": "\u0985\u09ab\u09b2\u09be\u0987\u09a8 \u09ae\u09cb\u09a1",
    "notifications": "\u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8",
    "markAllRead": "\u09b8\u09ac \u09aa\u09dc\u09be \u09b9\u09df\u09c7\u099b\u09c7",
    "noNotifications": "\u09a8\u09a4\u09c1\u09a8 \u0995\u09cb\u09a8 \u09a8\u09cb\u099f\u09bf\u09ab\u09bf\u0995\u09c7\u09b6\u09a8 \u09a8\u09c7\u0987",
    "billDate": "\u09ac\u09bf\u09b2 \u09a4\u09be\u09b0\u09bf\u0996",
    "patientId": "\u09aa\u09c7\u09b6\u09c7\u09a8\u09cd\u099f \u0986\u0987\u09a1\u09bf",
    "ptName": "\u09b0\u09cb\u0997\u09c0\u09b0 \u09a8\u09be\u09ae",
    "age": "\u09ac\u09df\u09b8",
    "sex": "\u09b2\u09bf\u0999\u09cd\u0997",
    "drCode": "\u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0 \u0995\u09cb\u09a1",
    "drName": "\u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0\u09c7\u09b0 \u09a8\u09be\u09ae",
    "refresh": "\u09a8\u09a4\u09c1\u09a8 \u09b0\u09cb\u0997\u09c0 / \u09b0\u09bf\u09ab\u09cd\u09b0\u09c7\u09b6",
    "testName": "\u099f\u09c7\u09b8\u09cd\u099f\u09c7\u09b0 \u09a8\u09be\u09ae",
    "result": "\u09ab\u09b2\u09be\u09ab\u09b2",
    "unit": "\u0987\u0989\u09a8\u09bf\u099f",
    "normalRange": "\u09a8\u09b0\u09ae\u09be\u09b2 \u09b0\u09c7\u099e\u09cd\u099c",
    "status": "\u0985\u09ac\u09b8\u09cd\u09a5\u09be",
    "comments": "\u09ae\u09a8\u09cd\u09a4\u09ac\u09cd\u09af",
    "defaultComment": "\u09a1\u09bf\u09ab\u09b2\u09cd\u099f \u09a8\u09cb\u099f",
    "differentialCount": "\u09a1\u09bf\u09ab\u09be\u09b0\u09c7\u09a8\u09b6\u09bf\u09af\u09bc\u09be\u09b2 \u0995\u09be\u0989\u09a8\u09cd\u099f",
    "autoPrint": "\u0985\u099f\u09cb\u09aa\u09cd\u09b0\u09bf\u09a8\u09cd\u099f",
    "onlyHgb": "\u09b6\u09c1\u09a7\u09c1 \u098f\u0987\u099a\u099c\u09bf\u09ac\u09bf",
    "save": "\u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3",
    "saveAndPrint": "\u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3 \u0993 \u09aa\u09cd\u09b0\u09bf\u09a8\u09cd\u099f",
    "exit": "\u09ab\u09b0\u09cd\u09ae \u0995\u09cd\u09b2\u09bf\u09df\u09be\u09b0 \u0995\u09b0\u09c1\u09a8",
    "pId": "\u09aa\u09c7\u09b6\u09c7\u09a8\u09cd\u099f \u0986\u0987\u09a1\u09bf",
    "invDate": "\u0987\u09a8\u09ad\u09df\u09c7\u09b8 \u09a4\u09be\u09b0\u09bf\u0996",
    "patientName": "\u09b0\u09cb\u0997\u09c0\u09b0 \u09a8\u09be\u09ae",
    "printed": "\u09aa\u09cd\u09b0\u09bf\u09a8\u09cd\u099f \u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8",
    "pending": "\u0985\u09aa\u09c7\u0995\u09cd\u09b7\u09ae\u09be\u09a3",
    "completed": "\u09b8\u09ae\u09cd\u09aa\u09a8\u09cd\u09a8",
    "draft": "\u0996\u09b8\u09dc\u09be",
    "addDoctorBtn": "+ \u09a8\u09a4\u09c1\u09a8 \u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0 \u09af\u09cb\u0997",
    "addTestRow": "+ \u09a8\u09a4\u09c1\u09a8 \u0995\u09be\u09b8\u09cd\u099f\u09ae \u09b0\u09cb",
    "loadProfile": "\u0995\u09c1\u0987\u0995 \u09aa\u09cd\u09b0\u09cb\u09ab\u09be\u0987\u09b2",
    "searchPatients": "\u09b0\u09cb\u0997\u09c0\u09b0 \u0986\u0987\u09a1\u09bf \u09ac\u09be \u09a8\u09be\u09ae \u0996\u09c1\u0981\u099c\u09c1\u09a8...",
    "searchTestPlaceholder": "\u099f\u09c7\u09b8\u09cd\u099f\u09c7\u09b0 \u09a8\u09be\u09ae \u09b2\u09bf\u0996\u09c1\u09a8 (\u09af\u09c7\u09ae\u09a8: CBC, Hemoglobin, RBS, Creatinine, SGPT)...",
    "addTestButton": "+ \u099f\u09c7\u09b8\u09cd\u099f \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8",
    "deleteRow": "\u09ae\u09c1\u099b\u09c1\u09a8",
    "noTestsAdded": "\u0995\u09cb\u09a8 \u099f\u09c7\u09b8\u09cd\u099f \u09af\u09cb\u0997 \u0995\u09b0\u09be \u09b9\u09df\u09a8\u09bf\u0964 \u0989\u09aa\u09b0\u09c7\u09b0 \u09b8\u09be\u09b0\u09cd\u099a\u09ac\u09be\u09b0 \u09a5\u09c7\u0995\u09c7 \u099f\u09c7\u09b8\u09cd\u099f \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8 \u0995\u09b0\u09c1\u09a8 \u09ac\u09be \u09b2\u09bf\u0996\u09c1\u09a8\u0964",
    "quickFillSample": "\u09a8\u09ae\u09c1\u09a8\u09be \u09b0\u09cb\u0997\u09c0 \u09b2\u09cb\u09a1 \u0995\u09b0\u09c1\u09a8",
    "labReportTitle": "\u09aa\u09cd\u09af\u09be\u09a5\u09b2\u099c\u09bf \u0987\u09a8\u09ad\u09c7\u09b8\u09cd\u099f\u09bf\u0997\u09c7\u09b6\u09a8 \u09b0\u09bf\u09aa\u09cb\u09b0\u09cd\u099f",
    "invoiceReceiptTitle": "\u0995\u09cd\u09af\u09be\u09b6 \u09ae\u09c7\u09ae\u09cb \u0993 \u09ac\u09bf\u09b2\u09bf\u0982 \u09b0\u09b6\u09bf\u09a6",
    "printReport": "\u09aa\u09cd\u09b0\u09bf\u09a8\u09cd\u099f \u0995\u09b0\u09c1\u09a8",
    "downloadPdf": "\u09aa\u09bf\u09a1\u09bf\u098f\u09ab \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1",
    "close": "\u09ac\u09a8\u09cd\u09a7 \u0995\u09b0\u09c1\u09a8",
    "specimen": "\u09a8\u09ae\u09c1\u09a8\u09be \u09a7\u09b0\u09a8",
    "referredBy": "\u09b0\u09c7\u09ab\u09be\u09b0\u09cd\u09a1 \u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0",
    "reportingDate": "\u09b0\u09bf\u09aa\u09cb\u09b0\u09cd\u099f\u09c7\u09b0 \u09a4\u09be\u09b0\u09bf\u0996",
    "deliveryDate": "\u09a1\u09c7\u09b2\u09bf\u09ad\u09be\u09b0\u09bf\u09b0 \u09b8\u09ae\u09df",
    "pathologistSignature": "\u09ae\u09c7\u09a1\u09bf\u0995\u09c7\u09b2 \u099f\u09c7\u0995\u09a8\u09cb\u09b2\u099c\u09bf\u09b8\u09cd\u099f / \u09aa\u09cd\u09af\u09be\u09a5\u09b2\u099c\u09bf\u09b8\u09cd\u099f",
    "inChargeSignature": "\u0995\u09a8\u09b8\u09be\u09b2\u099f\u09cd\u09af\u09be\u09a8\u09cd\u099f \u09aa\u09cd\u09af\u09be\u09a5\u09b2\u099c\u09bf\u09b8\u09cd\u099f",
    "newBill": "\u09a8\u09a4\u09c1\u09a8 \u09ac\u09bf\u09b2 \u09a4\u09c8\u09b0\u09bf",
    "invoicesList": "\u09b8\u09be\u09ae\u09cd\u09aa\u09cd\u09b0\u09a4\u09bf\u0995 \u0987\u09a8\u09ad\u09af\u09bc\u09c7\u09b8 \u09a4\u09be\u09b2\u09bf\u0995\u09be",
    "searchInvoices": "\u09ac\u09bf\u09b2 \u0996\u09c1\u0981\u099c\u09c1\u09a8...",
    "patientInfo": "\u09b0\u09cb\u0997\u09c0\u09b0 \u09a4\u09a5\u09cd\u09af",
    "selectTests": "\u099f\u09c7\u09b8\u09cd\u099f / \u09b8\u09c7\u09ac\u09be \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09a8",
    "subtotal": "\u09ae\u09cb\u099f \u099f\u09be\u0995\u09be",
    "discount": "\u09a1\u09bf\u09b8\u0995\u09be\u0989\u09a8\u09cd\u099f / \u099b\u09be\u09dc",
    "netTotal": "\u09b8\u09b0\u09cd\u09ac\u09ae\u09cb\u099f \u09aa\u09cd\u09b0\u09a6\u09c7\u09df",
    "paidAmount": "\u09aa\u09b0\u09bf\u09b6\u09cb\u09a7\u09bf\u09a4 \u099f\u09be\u0995\u09be",
    "dueAmount": "\u09ac\u0995\u09c7\u09df\u09be \u099f\u09be\u0995\u09be",
    "paymentMethod": "\u09aa\u09c7\u09ae\u09c7\u09a8\u09cd\u099f \u09ae\u09be\u09a7\u09cd\u09af\u09ae",
    "createInvoice": "\u0987\u09a8\u09ad\u09df\u09c7\u09b8 \u09a4\u09c8\u09b0\u09bf \u0993 \u09aa\u09cd\u09b0\u09bf\u09a8\u09cd\u099f",
    "allTests": "\u09b8\u0995\u09b2 \u099f\u09c7\u09b8\u09cd\u099f",
    "price": "\u09ab\u09bf / \u09ae\u09c2\u09b2\u09cd\u09af",
    "opdQueue": "\u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0 \u0985\u09cd\u09af\u09be\u09aa\u09af\u09bc\u09c7\u09a8\u09cd\u099f\u09ae\u09c7\u09a8\u09cd\u099f \u09a4\u09be\u09b2\u09bf\u0995\u09be",
    "newAppointment": "\u09a8\u09a4\u09c1\u09a8 \u09ad\u09bf\u099c\u09bf\u099f \u09ac\u09c1\u0995\u09bf\u0982",
    "serialNo": "\u099f\u09cb\u0995\u09c7\u09a8 \u09a8\u0982",
    "chamber": "\u099a\u09c7\u09ae\u09cd\u09ac\u09be\u09b0 / \u09b0\u09c1\u09ae \u09a8\u0982",
    "consultationFee": "\u09ad\u09bf\u099c\u09bf\u099f \u09ab\u09bf",
    "rxPortal": "\u09a1\u09bf\u099c\u09bf\u099f\u09be\u09b2 \u09aa\u09cd\u09b0\u09c7\u09b8\u0995\u09cd\u09b0\u09bf\u09aa\u09b6\u09a8 \u09aa\u09cb\u09b0\u09cd\u099f\u09be\u09b2",
    "chiefComplaints": "\u09aa\u09cd\u09b0\u09a7\u09be\u09a8 \u09b8\u09ae\u09b8\u09cd\u09af\u09be (Chief Complaints)",
    "diagnosis": "\u09b8\u09ae\u09cd\u09ad\u09be\u09ac\u09cd\u09af \u09b0\u09cb\u0997 \u09a8\u09bf\u09b0\u09cd\u09a3\u09af\u09bc (Diagnosis)",
    "clinicalNotes": "\u0995\u09cd\u09b2\u09bf\u09a8\u09bf\u0995\u09cd\u09af\u09be\u09b2 \u09a8\u09cb\u099f",
    "medicine": "\u0993\u09b7\u09c1\u09a7\u09c7\u09b0 \u09a8\u09be\u09ae",
    "dosage": "\u09a1\u09cb\u099c (\u09af\u09c7\u09ae\u09a8: \u09e7+\u09e6+\u09e7)",
    "instruction": "\u0996\u09be\u0993\u09af\u09bc\u09be\u09b0 \u09a8\u09bf\u09af\u09bc\u09ae (\u0986\u0997\u09c7/\u09aa\u09b0\u09c7)",
    "duration": "\u09ae\u09c7\u09af\u09bc\u09be\u09a6 (\u09a6\u09bf\u09a8/\u09ae\u09be\u09b8)",
    "addMedicine": "+ \u09a8\u09a4\u09c1\u09a8 \u0993\u09b7\u09c1\u09a7 \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8",
    "prescribeInvestigations": "\u09aa\u09cd\u09b0\u09df\u09cb\u099c\u09a8\u09c0\u09df \u099f\u09c7\u09b8\u09cd\u099f\u09b8\u09ae\u09c2\u09b9",
    "advice": "\u09b8\u09be\u09a7\u09be\u09b0\u09a3 \u09aa\u09b0\u09be\u09ae\u09b0\u09cd\u09b6",
    "printPrescription": "\u09aa\u09cd\u09b0\u09c7\u09b8\u0995\u09cd\u09b0\u09bf\u09aa\u09b6\u09a8 \u09aa\u09cd\u09b0\u09bf\u09a8\u09cd\u099f (Rx)",
    "ecgTitle": "\u0987\u09b8\u09bf\u099c\u09bf (ECG) \u09b0\u09bf\u09aa\u09cb\u09b0\u09cd\u099f \u09ae\u09a1\u09bf\u0989\u09b2",
    "xrayTitle": "\u09a1\u09bf\u099c\u09bf\u099f\u09be\u09b2 \u098f\u0995\u09cd\u09b8-\u09b0\u09c7 (X-Ray) \u09b0\u09bf\u09aa\u09cb\u09b0\u09cd\u099f \u09ae\u09a1\u09bf\u0989\u09b2",
    "usgTitle": "\u0986\u09b2\u09cd\u099f\u09cd\u09b0\u09be\u09b8\u09a8\u09cb\u0997\u09cd\u09b0\u09be\u09ab\u09bf (USG) \u09ae\u09a1\u09bf\u0989\u09b2",
    "impression": "\u0995\u09cd\u09b2\u09bf\u09a8\u09bf\u0995\u09cd\u09af\u09be\u09b2 \u09ab\u09b2\u09be\u09ab\u09b2 / \u09b0\u09cb\u0997 \u09a8\u09bf\u09b0\u09cd\u09a3\u09af\u09bc",
    "findings": "\u09ac\u09bf\u09b8\u09cd\u09a4\u09be\u09b0\u09bf\u09a4 \u09aa\u09b0\u09cd\u09af\u09ac\u09c7\u0995\u09cd\u09b7\u09a3",
    "doctorsManagement": "\u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0\u09a6\u09c7\u09b0 \u09a4\u09be\u09b2\u09bf\u0995\u09be \u0993 \u0995\u09cb\u09a1",
    "testsManagement": "\u09b2\u09cd\u09af\u09be\u09ac \u099f\u09c7\u09b8\u09cd\u099f \u0993 \u09a8\u09b0\u09ae\u09be\u09b2 \u09b0\u09c7\u099e\u09cd\u099c \u09ae\u09cd\u09af\u09be\u09a8\u09c7\u099c\u09ae\u09c7\u09a8\u09cd\u099f",
    "clinicProfile": "\u0995\u09cd\u09b2\u09bf\u09a8\u09bf\u0995 \u0993 \u09aa\u09cd\u09b0\u09a4\u09bf\u09b7\u09cd\u09a0\u09be\u09a8\u09c7\u09b0 \u09a4\u09a5\u09cd\u09af",
    "dataBackup": "\u09a1\u09be\u099f\u09be \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa \u0993 \u0995\u09cd\u09b2\u09be\u0989\u09a1 \u09b8\u09bf\u0999\u09cd\u0995",
    "addDoctor": "\u09a8\u09a4\u09c1\u09a8 \u09a1\u09be\u0995\u09cd\u09a4\u09be\u09b0 \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8",
    "addTest": "\u09a8\u09a4\u09c1\u09a8 \u099f\u09c7\u09b8\u09cd\u099f \u09aa\u09cd\u09af\u09be\u09b0\u09be\u09ae\u09bf\u099f\u09be\u09b0 \u09af\u09cb\u0997 \u0995\u09b0\u09c1\u09a8",
    "exportBackup": "\u09a1\u09be\u099f\u09be \u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1 (JSON)",
    "importBackup": "\u09ac\u09cd\u09af\u09be\u0995\u0986\u09aa \u09ab\u09be\u0987\u09b2 \u09b0\u09bf\u09b8\u09cd\u099f\u09cb\u09b0",
    "resetDefaultData": "\u09a1\u09c7\u09ae\u09cb \u09a1\u09be\u099f\u09be \u09b0\u09bf\u09b8\u09c7\u099f",
    "male": "\u09aa\u09c1\u09b0\u09c1\u09b7 (Male)",
    "female": "\u09ae\u09b9\u09bf\u09b2\u09be (Female)",
    "other": "\u0985\u09a8\u09cd\u09af\u09be\u09a8\u09cd\u09af (Other)",
    "saveChanges": "\u09b8\u0982\u09b0\u0995\u09cd\u09b7\u09a3 \u0995\u09b0\u09c1\u09a8",
    "cancel": "\u09ac\u09be\u09a4\u09bf\u09b2",
    "delete": "\u09ae\u09c1\u099b\u09c1\u09a8",
    "edit": "\u09b8\u09ae\u09cd\u09aa\u09be\u09a6\u09a8\u09be",
    "action": "\u0985\u09cd\u09af\u09be\u0995\u09b6\u09a8",
    "success": "\u09b8\u09ab\u09b2 \u09b9\u09df\u09c7\u099b\u09c7",
    "search": "\u0985\u09a8\u09c1\u09b8\u09a8\u09cd\u09a7\u09be\u09a8",
    "filter": "\u09ab\u09bf\u09b2\u09cd\u099f\u09be\u09b0",
    "userManagement": "ইউজার ও পারমিশন কন্ট্রোল",
    "userManagementDesc": "নতুন ইউজার আইডি তৈরি করুন এবং কে কোন মডিউল দেখতে পাবে তা নির্ধারণ করুন (যেমন শুধু ল্যাব বা শুধু এক্স-রে)।"
  }
};

export const initialUsers = [
  {
    id: 'user-admin',
    username: 'Adiba',
    password: 'Adiba512022',
    fullName: 'আদিবা অ্যাডমিন (Super Admin)',
    role: 'Admin' as const,
    allowedModules: ['pathology', 'billing', 'doctorVisit', 'ecg', 'xray', 'ultrasound', 'doctorPortal', 'analytics', 'chat', 'settings'] as any[],
    isActive: true,
    createdAt: '2025-01-01',
    phone: '+880 1712-345678',
    avatarColor: 'from-purple-600 to-pink-600',
  },
  {
    id: 'user-lab',
    username: 'lab1',
    password: 'lab123',
    fullName: 'মেডিকেল টেকনোলজিস্ট (ল্যাব ইন-চার্জ)',
    role: 'Lab' as const,
    allowedModules: ['pathology'] as any[],
    isActive: true,
    createdAt: '2025-01-10',
    phone: '+880 1812-345678',
    avatarColor: 'from-indigo-600 to-purple-600',
  },
  {
    id: 'user-xray',
    username: 'xray1',
    password: 'xray123',
    fullName: 'মো: রফিকুল ইসলাম (এক্স-রে টেকনিশিয়ান)',
    role: 'Xray' as const,
    allowedModules: ['xray'] as any[],
    isActive: true,
    createdAt: '2025-01-15',
    phone: '+880 1912-345678',
    avatarColor: 'from-slate-600 to-zinc-700',
  },
  {
    id: 'user-usg',
    username: 'usg1',
    password: 'usg123',
    fullName: 'ডা: সাবরিনা ফারহানা (সনোলজিস্ট - USG)',
    role: 'Ultrasound' as const,
    allowedModules: ['ultrasound'] as any[],
    isActive: true,
    createdAt: '2025-01-18',
    phone: '+880 1714-778899',
    avatarColor: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'user-doctor',
    username: 'doctor1',
    password: 'doc123',
    fullName: 'প্রফেসর ডা: এম. এ. রহমান (মেডিসিন)',
    role: 'Doctor' as const,
    allowedModules: ['doctorVisit', 'doctorPortal'] as any[],
    isActive: true,
    createdAt: '2025-01-20',
    phone: '+880 1711-112233',
    avatarColor: 'from-violet-600 to-purple-700',
  },
  {
    id: 'user-billing',
    username: 'billing1',
    password: 'bill123',
    fullName: 'হাসপাতাল রিসেপশন ও ক্যাশ কাউন্টার',
    role: 'Billing' as const,
    allowedModules: ['billing', 'doctorVisit'] as any[],
    isActive: true,
    createdAt: '2025-01-22',
    phone: '+880 1612-345678',
    avatarColor: 'from-emerald-600 to-teal-700',
  },
];
