// Source for /resume and the experience section on /about.
// Email and home town are intentionally left off the public site.

export const SUMMARY =
  'Cybersecurity analyst with over two years of hands-on experience in incident response, digital forensics and security operations at a regional electric utility. I investigate incidents across endpoint, identity, email and cloud environments, and write incident documentation that maps attacker activity to MITRE ATT&CK for technical teams and stakeholders. Experienced with SIEM, EDR, SOAR, threat intelligence and threat hunting. Working toward the GIAC Certified Forensic Analyst (GCFA) with a goal of specializing in digital forensics.';

export const EXPERIENCE = [
  {
    role: 'Cybersecurity Analyst',
    org: 'FirstEnergy',
    where: 'Akron, OH',
    when: 'Aug 2024 – present',
    points: [
      'Triage, investigate and respond to security incidents across endpoint, identity, email, network and cloud environments using SIEM and EDR tooling.',
      'Conduct digital forensics on compromised endpoints and accounts, including Azure and Entra ID investigations, to determine scope, impact and root cause.',
      'Investigate business email compromise and adversary-in-the-middle phishing in Microsoft 365 and Entra ID, and recommend containment and remediation.',
      'Write incident response documentation and investigation reports that map attacker activity to MITRE ATT&CK.',
      'Follow chain-of-custody procedures for evidence handling, with ongoing training in formal forensic evidence practices.',
      'Perform static and dynamic malware analysis and analyze threat actor TTPs to support the threat intelligence team.',
      'Create detection content and run proactive threat hunts for activity that evaded existing detections.',
      'Respond to alerts with SOAR automation, including playbooks and integrations that reduce manual work.',
      'Participate in ransomware tabletop exercises, and mentor new analysts on SOC tools, triage and investigation processes.',
    ],
  },
  {
    role: 'Junior Systems & Network Administrator',
    org: 'Clampco Products',
    where: 'Wadsworth, OH',
    when: 'Jan 2023 – Aug 2024',
    points: [
      'Monitored devices with RMM and EDR tooling, investigating endpoint alerts and anomalies to remediate issues.',
      'Configured and maintained Fortinet infrastructure (FortiGate, FortiSwitch, FortiAP), Active Directory and servers.',
      'Resolved helpdesk tickets and deployed new systems while completing an associate degree through the apprenticeship.',
    ],
  },
  {
    role: 'Technology Assistant Intern',
    org: 'Barberton City School District',
    where: 'Barberton, OH',
    when: 'May 2022 – Oct 2022',
    points: ['Configured Cisco switchports, deployed and maintained IT infrastructure, and resolved helpdesk issues.'],
  },
];

export const EDUCATION = [
  { name: 'B.S. Cybersecurity & Information Assurance', org: 'Western Governors University', when: '2025 – 2026' },
  { name: 'A.A.S. Computer Network Administration & Security Technology', org: 'Stark State College', when: '2023 – 2025' },
  { name: 'Eagle Scout', org: 'Scouting America (Boy Scouts of America)', when: '' },
];

export const SKILLS = [
  'Incident Response', 'Digital Forensics', 'Threat Hunting', 'MITRE ATT&CK', 'Cyber Kill Chain',
  'SIEM (Splunk ES, Microsoft Sentinel)', 'EDR (Microsoft Defender, SentinelOne)', 'SOAR (XSOAR)',
  'Threat Intel (Anomali ThreatStream, EclecticIQ)', 'Malware Analysis', 'Detection Engineering',
  'Microsoft 365 & Entra ID', 'Active Directory', 'Network Security', 'PowerShell / Bash', 'Technical Writing',
];
