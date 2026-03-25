const labTests = [
  {
    id: 1,
    patientId: "P001",
    testName: "Blood Count (CBC)",
    result: "Normal",
    status: "completed",
    date: "2026-03-20",
    technicianName: "Dr. Perera"
  },
  {
    id: 2,
    patientId: "P002",
    testName: "Blood Sugar (Fasting)",
    result: "140 mg/dL",
    status: "completed",
    date: "2026-03-21",
    technicianName: "Dr. Silva"
  },
  {
    id: 3,
    patientId: "P003",
    testName: "Urine Analysis",
    result: "",
    status: "pending",
    date: "2026-03-25",
    technicianName: "Dr. Fernando"
  },
  {
    id: 4,
    patientId: "P004",
    testName: "Cholesterol Panel",
    result: "",
    status: "processing",
    date: "2026-03-25",
    technicianName: "Dr. Perera"
  }
];

module.exports = labTests;