// EDIT ME: your real progress. Everything on /journey is driven from this file.
// progress is 0–100.

export const CURRENT_CERT = {
  name: 'GCFA',
  full: 'GIAC Certified Forensic Analyst',
  course: 'SANS FOR508: Advanced Incident Response, Threat Hunting & Digital Forensics',
  target: 'TBD', // e.g. '2027-02'
};

export const DOMAINS = [
  { id: '508.1', name: 'Advanced IR & threat hunting', progress: 40, notes: 'Hunting methodology, PowerShell remoting, credential theft & lateral movement' },
  { id: '508.2', name: 'Intrusion analysis', progress: 25, notes: 'Evidence of execution, persistence, event logs, WMI, lateral movement artifacts' },
  { id: '508.3', name: 'Memory forensics', progress: 15, notes: 'Volatility 3, process anomalies, code injection, rootkits' },
  { id: '508.4', name: 'Timeline analysis', progress: 10, notes: 'Plaso / log2timeline, MFT, super-timelines, filtering noise' },
  { id: '508.5', name: 'Anti-forensics & adversary detection', progress: 0, notes: 'Timestomping, VSS, file system journaling, recovering deleted data' },
  { id: '508.6', name: 'Capstone / index building', progress: 0, notes: 'Build the index, practice exams, full-scope lab' },
];

// Milestones shown as a vertical log on /journey. Newest first.
export const MILESTONES = [
  { date: '2026-10-14', title: 'Launched this site', detail: 'Notebook goes public — every lab and study session gets written up here.' },
  { date: '2024-08', title: 'Cyber Security Analyst', detail: 'Moved into a full-time SOC role: alert triage, phishing and malware investigations, IR and forensics.' },
  { date: '2023-01', title: 'IT apprenticeship', detail: 'Started in IT as an apprentice while finishing my B.S. in Cybersecurity & Information Assurance.' },
];

// Certs & training. status: 'done' | 'in-progress' | 'planned'
export const CERTS = [
  { name: 'GCFA', status: 'in-progress' },
  { name: 'SSCP', status: 'done' },
  { name: 'CySA+', status: 'done' },
  { name: 'PenTest+', status: 'done' },
  { name: 'Security+', status: 'done' },
] as const;

// Toolbox — things you've used hands-on.
export const TOOLS = [
  'Volatility 3', 'KAPE', 'Eric Zimmerman tools', 'Plaso / log2timeline', 'Velociraptor',
  'Timeline Explorer', 'RegRipper', 'Sysinternals', 'Wireshark', 'YARA', 'Sigma', 'SIFT Workstation',
];
