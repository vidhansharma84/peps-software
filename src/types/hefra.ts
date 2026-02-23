export type ComplianceStatus = "compliant" | "non_compliant" | "partially_compliant" | "pending_review" | "expired";
export type ComplianceCategory = "personnel" | "premises" | "safety" | "equipment" | "licensing" | "documentation" | "waste_management" | "infection_control";
export type InspectionStatus = "scheduled" | "in_progress" | "completed" | "failed" | "passed";
export type LicenseType = "facility_license" | "department_license" | "equipment_certificate" | "personnel_registration" | "waste_disposal_permit" | "epa_clearance";
export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface ComplianceItem {
  id: string;
  category: ComplianceCategory;
  title: string;
  description: string;
  status: ComplianceStatus;
  riskLevel: RiskLevel;
  department: string;
  lastChecked: string;
  nextReview: string;
  assignedTo: string;
  notes: string;
  evidence?: string[];
}

export interface HeFRALicense {
  id: string;
  type: LicenseType;
  licenseNumber: string;
  issuedDate: string;
  expiryDate: string;
  status: "active" | "expired" | "suspended" | "pending";
  issuingAuthority: string;
  department: string;
  renewalFee: number;
  conditions: string[];
}

export interface PersonnelCompliance {
  id: string;
  staffName: string;
  staffId: string;
  role: string;
  department: string;
  professionalCouncil: string;
  registrationNumber: string;
  registrationExpiry: string;
  yearsExperience: number;
  qualifications: string[];
  status: ComplianceStatus;
  lastVerified: string;
  cpd_credits: number; // Continuing Professional Development
  cpd_required: number;
}

export interface PremisesCompliance {
  id: string;
  area: string;
  department: string;
  dimensions: string;
  hasAdequateVentilation: boolean;
  hasWashBasin: boolean;
  hasToiletFacilities: boolean;
  hasWaterSupply: boolean;
  hasElectricity: boolean;
  hasBackupPower: boolean;
  lastInspected: string;
  status: ComplianceStatus;
  issues: string[];
}

export interface EquipmentCompliance {
  id: string;
  equipmentName: string;
  serialNumber: string;
  department: string;
  category: string;
  calibrationDate: string;
  nextCalibration: string;
  maintenanceDate: string;
  nextMaintenance: string;
  certificationStatus: ComplianceStatus;
  manufacturer: string;
  condition: "excellent" | "good" | "fair" | "poor" | "non_functional";
}

export interface SafetyCompliance {
  id: string;
  area: string;
  department: string;
  fireExtinguishers: boolean;
  fireExtinguisherExpiry: string;
  emergencyExits: boolean;
  emergencyLighting: boolean;
  firstAidKit: boolean;
  spillKit: boolean;
  wasteDisposal: boolean;
  sharpsContainers: boolean;
  infectionControlProtocol: boolean;
  ppe_available: boolean;
  lastDrill: string;
  status: ComplianceStatus;
  issues: string[];
}

export interface InspectionRecord {
  id: string;
  inspectionDate: string;
  inspectorName: string;
  inspectorTitle: string;
  type: "routine" | "follow_up" | "complaint" | "pre_licensing" | "renewal";
  status: InspectionStatus;
  department: string;
  findings: string[];
  recommendations: string[];
  correctiveActions: string[];
  deadline: string;
  overallScore: number; // out of 100
  categories: {
    category: ComplianceCategory;
    score: number;
    status: ComplianceStatus;
    findings: string[];
  }[];
}

export interface ComplianceDocument {
  id: string;
  title: string;
  type: "policy" | "procedure" | "certificate" | "report" | "plan" | "register";
  category: ComplianceCategory;
  department: string;
  uploadDate: string;
  expiryDate: string | null;
  status: "current" | "expired" | "draft" | "under_review";
  uploadedBy: string;
  fileSize: string;
  version: string;
}

export interface ComplianceSummary {
  overallScore: number;
  totalItems: number;
  compliant: number;
  nonCompliant: number;
  partiallyCompliant: number;
  pendingReview: number;
  expired: number;
  criticalIssues: number;
  upcomingDeadlines: number;
}
