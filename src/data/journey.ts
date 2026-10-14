// Everything on /journey is driven from this file.

export const CURRENT_CERT = {
  name: 'GCFA',
  full: 'GIAC Certified Forensic Analyst',
  course: 'SANS FOR508: Advanced Incident Response, Threat Hunting & Digital Forensics',
  target: 'December 2026',
  // SANS live class (dates drive the countdown on the home page)
  classStart: '2026-10-17',
  classEnd: '2026-10-22',
};

// FOR508 sections. Add `progress: 0–100` to any of them when you want a bar to show;
// sections without it display as "studying".
export const DOMAINS: { id: string; name: string; notes: string; progress?: number }[] = [
  { id: '508.1', name: 'Advanced IR & threat hunting', notes: 'IR process, threat intel, credential theft, persistence' },
  { id: '508.2', name: 'Intrusion analysis', notes: 'Evidence of execution, event logs, lateral movement artifacts' },
  { id: '508.3', name: 'Memory forensics', notes: 'Volatility, rogue processes, code injection, rootkits' },
  { id: '508.4', name: 'Timeline analysis', notes: 'MACB timestamps, filesystem vs. super timelines, Plaso' },
  { id: '508.5', name: 'Anti-forensics & NTFS', notes: '$MFT, $UsnJrnl, $LogFile, deleted file recovery, wipers' },
  { id: '508.6', name: 'Capstone & index', notes: 'Build the index, practice exams' },
];

// Milestones shown as a vertical log on /journey. Newest first.
// `upcoming: true` shows as an open dot until you flip it.
export const MILESTONES: { date: string; title: string; detail: string; upcoming?: boolean }[] = [
  { date: '2026-12', title: 'GCFA exam (goal)', detail: 'Target: sit the GIAC Certified Forensic Analyst exam in December.', upcoming: true },
  { date: '2026-10-17', title: 'SANS FOR508 live class', detail: 'Six days of Advanced Incident Response, Threat Hunting & Digital Forensics, October 17–22.', upcoming: true },
  { date: '2026-10-14', title: 'Launched this site', detail: 'Started publishing write-ups on brendorobo.com.' },
  { date: '2026-09-29', title: 'B.S. Cybersecurity & Information Assurance', detail: 'Graduated from Western Governors University, earned while working full-time in the SOC.' },
  { date: '2026-09-21', title: 'First CTF: HTB Holmes 2026', detail: 'Team FirstEnergy TSOC placed 476th of 5,637 teams, solving 42/111 challenges for 3,925 points.' },
  { date: '2025-12-27', title: 'Passed the ISC2 SSCP', detail: 'Systems Security Certified Practitioner, earned as part of my WGU degree.' },
  { date: '2025-05', title: 'A.A.S. from Stark State College', detail: 'Computer Network Administration & Security Technology, completed through my IT apprenticeship.' },
  { date: '2024-08', title: 'Cybersecurity Analyst', detail: 'Moved into a full-time SOC role: incident response, digital forensics, threat hunting and detection content.' },
  { date: '2023-01', title: 'Junior Systems & Network Administrator', detail: 'Started an IT apprenticeship while working on my associate degree.' },
];

// Certs. status: 'done' | 'in-progress' | 'planned'
export const CERTS = [
  { name: 'GCFA', status: 'in-progress' },
  { name: 'SSCP', status: 'done' },
  { name: 'CySA+', status: 'done' },
  { name: 'PenTest+', status: 'done' },
  { name: 'Security+', status: 'done' },
  { name: 'Network+', status: 'done' },
  { name: 'A+', status: 'done' },
  { name: 'Project+', status: 'done' },
] as const;

// Toolbox: what I use hands-on.
export const TOOLS = [
  'Splunk Enterprise Security', 'Microsoft Sentinel', 'Microsoft Defender', 'SentinelOne', 'XSOAR',
  'Anomali ThreatStream', 'EclecticIQ', 'Microsoft 365 / Entra ID', 'Active Directory', 'MITRE ATT&CK',
  'PowerShell', 'Bash',
];
