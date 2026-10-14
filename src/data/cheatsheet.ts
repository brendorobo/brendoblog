// GCFA / FOR508 cheat sheet, rendered on /cheatsheet.
// Cells allow simple inline HTML (<code>, <strong>, <em>).

export type Block =
  | { type: 'steps'; items: { title: string; sub?: string; body: string; flag?: string }[]; note?: string }
  | { type: 'table'; title?: string; head: string[]; rows: string[][]; note?: string }
  | { type: 'cards'; title?: string; items: { title: string; body: string }[] }
  | { type: 'kv'; title?: string; items: [string, string][]; note?: string }
  | { type: 'list'; title?: string; items: string[]; ordered?: boolean }
  | { type: 'note'; text: string };

export interface Section { id: string; num: string; title: string; blocks: Block[] }

export const CHEATSHEET: Section[] = [
  {
    id: 'ir-process',
    num: '01',
    title: 'The six-step IR process',
    blocks: [
      {
        type: 'steps',
        items: [
          { title: 'Preparation', sub: 'Before anything happens', body: 'Methodology, playbooks, tools staged (EDR, KAPE, Velociraptor, memory capture), logging turned on and centralized, team roles defined.' },
          { title: 'Identification and scoping', sub: 'Is it real, and how big?', body: 'Confirm the incident from an alert, hunt, or tip. Find every affected host and account. One alert is almost never the full scope.' },
          { title: 'Containment and intelligence development', sub: 'Learn before you act', flag: 'longest step', body: 'Limit the attacker <strong>without tipping them off</strong> while you learn how they work: initial access, persistence, C2, lateral movement, and which credentials they hold. Every finding becomes an IOC you hunt across the enterprise.' },
          { title: 'Eradication and remediation', sub: 'One coordinated event', body: 'Block IOCs, remove persistence, rebuild hosts, reset credentials (KRBTGT twice if Golden Tickets are possible), close the entry point. Do it all at once.' },
          { title: 'Recovery', sub: 'Back to business', body: 'Restore operations with new controls in place and closer monitoring to catch a return.' },
          { title: 'Lessons learned and threat intel', sub: 'Feeds back into step 1', body: 'Update the playbook, turn TTPs into detections, map them to ATT&CK, and fix the logging gaps the incident exposed.' },
        ],
        note: '<strong>Steps 2 and 3 are a loop.</strong> New IOCs from containment find more infected hosts, which sends you back to scoping. Keep cycling until new hunts stop finding victims, and only then move to eradication.',
      },
      {
        type: 'list',
        title: 'Rules FOR508 drills in',
        items: [
          '<strong>Don’t start with eradication.</strong> Wiping or unplugging early destroys evidence (especially memory) and warns the attacker.',
          '<strong>Remediation needs full scope.</strong> Clean 80% and the attacker keeps the other 20%.',
          '<strong>Don’t whack-a-mole.</strong> Cleaning hosts one at a time lets the attacker adapt and switch to backup access.',
          '<strong>Hunt, don’t just react.</strong> Reactive teams wait for alerts. Proactive teams assume breach and look.',
        ],
      },
      {
        type: 'kv',
        title: 'What takes the longest, at a glance',
        items: [
          ['IR process', 'Containment and intel development'],
          ['Super timeline method', 'Kitchen sink (everything) vs. targeted at ~5–30 min'],
          ['String search setup', 'Indexed search is slow to build, then fast to query'],
          ['NTFS journal history', '<code>$UsnJrnl</code> keeps days–weeks; <code>$LogFile</code> only hours on busy systems'],
          ['Hardest to detect', 'Living off the land (no malware dropped)'],
        ],
      },
    ],
  },
  {
    id: 'threat-intel',
    num: '02',
    title: 'Threat intelligence',
    blocks: [
      {
        type: 'table',
        title: 'FOR508 attack lifecycle',
        head: ['Phase', 'What’s happening'],
        rows: [
          ['Initial compromise', 'Access is fragile and easy to disrupt'],
          ['Low-privilege lateral movement', 'Persistence, privilege escalation, backdoors'],
          ['High-privilege lateral movement', 'Domain-level access, staging the objective'],
          ['Asset access and exfiltration', 'Collecting and removing data; leaves footprints'],
        ],
        note: 'Attackers spend most of their time in the two lateral movement cycles, so that’s where defenders get the most chances to catch them.',
      },
      {
        type: 'table',
        title: 'Indicator types',
        head: ['Type', 'Examples', 'Value'],
        rows: [
          ['Atomic', 'IP, domain, hash', 'Easy to change, noisy'],
          ['Computed', 'YARA rule, regex, derived data', 'Stronger signal'],
          ['Behavioral (TTPs)', '“PsExec, then LSASS dump, then WMI consumer”', 'Hardest to change'],
        ],
        note: 'Kill chain: Recon → Weaponization → Delivery → Exploitation → Installation → C2 → Actions on Objectives.',
      },
      {
        type: 'cards',
        items: [
          { title: 'MITRE ATT&CK', body: '14 tactics, focused on post-compromise behavior, platform-agnostic. Use Navigator to map what you can and can’t detect.' },
          { title: 'IOC formats', body: '<strong>STIX</strong> standard, machine and human readable. <strong>YARA</strong> text/binary patterns + boolean logic. <strong>OpenIOC</strong> Mandiant, declining.' },
          { title: 'Platforms', body: '<strong>MISP</strong> and <strong>CRITs</strong> manage IOCs and support those formats.' },
        ],
      },
    ],
  },
  {
    id: 'credential-theft',
    num: '03',
    title: 'Credential theft',
    blocks: [
      {
        type: 'table',
        head: ['Attack', 'How it works', 'Mitigation'],
        rows: [
          ['Pass-the-hash', 'Reuse NT hash pulled from LSASS (Mimikatz) instead of the password', 'Credential Guard, disable WDigest, no admin in RDP sessions'],
          ['Pass-the-ticket', 'Steal a Kerberos ticket from memory and reuse it', 'Credential Guard, Remote Credential Guard'],
          ['Overpass-the-hash', 'Use the NT hash to request Kerberos tickets', 'Credential Guard, Protected Users, disable RC4'],
          ['Kerberoasting', 'Request service tickets for SPN accounts, crack offline', 'Long, complex service passwords; managed service accounts'],
          ['Golden Ticket', 'Forged TGT signed with the KRBTGT hash; survives password resets', 'Protect DA accounts; rotate KRBTGT'],
          ['Silver Ticket', 'Forged service ticket for one service; skips the DC', 'Regular computer account password updates'],
          ['Skeleton Key', 'Patches LSASS on a DC so one master password works for any account', 'Protect DA accounts; smart cards for privileged users'],
          ['DCSync', 'Pretends to be a DC and replicates password hashes', 'Audit and limit accounts with replication rights'],
        ],
      },
      {
        type: 'kv',
        title: 'Where credentials live',
        items: [
          ['Local hashes', 'SAM: <code>C:\\Windows\\System32\\config\\SAM</code>'],
          ['Domain hashes', 'NTDS.DIT: <code>C:\\Windows\\NTDS\\NTDS.DIT</code> (ntdsutil, VSS)'],
          ['Tokens, tickets', 'LSASS process memory'],
          ['Cached creds', '<code>HKLM\\SECURITY\\Cache</code> (limit with cachedlogonscount)'],
          ['LSA secrets', '<code>HKLM\\SECURITY\\Policy\\Secrets</code> (use gMSA)'],
        ],
        note: '<strong>Detection:</strong> privileged account use (4672), new accounts (4720), after-hours or workstation-to-workstation logons, failed logons (4625). Avoid shared local admin passwords and limit RID 500. BloodHound maps AD privilege paths and is hard to detect because it uses normal LDAP queries.',
      },
    ],
  },
  {
    id: 'persistence',
    num: '04',
    title: 'Persistence to check first',
    blocks: [
      {
        type: 'cards',
        items: [
          { title: 'Run keys and ASEPs', body: '<code>HKLM/HKCU\\...\\CurrentVersion\\Run</code> and RunOnce. Tools: Autoruns, RegRipper, Registry Explorer, Kansa.' },
          { title: 'Services', body: 'New service, replaced binary, or failure recovery set to run malware. <code>sc qc</code>, Get-SvcFail.ps1.' },
          { title: 'Scheduled tasks', body: '<code>at.exe</code> (old) and <code>schtasks.exe</code>, which can run remotely. Used for persistence and lateral movement.' },
          { title: 'DLL hijacking', body: 'Search order, phantom (e.g., fxsst.dll), side-loading (SxS), relative path.' },
          { title: 'WMI event consumers', body: 'Filter + Consumer + FilterToConsumerBinding in <code>root\\subscription</code>. Event 5861.' },
          { title: 'Context is the tell', body: 'svchost.exe running from <code>\\Temp</code> or <code>$Recycle.Bin</code>. Prioritize unsigned code, but signed malware exists.' },
        ],
      },
    ],
  },
  {
    id: 'execution',
    num: '05',
    title: 'Evidence of execution',
    blocks: [
      {
        type: 'table',
        head: ['', 'Prefetch', 'ShimCache (AppCompatCache)', 'Amcache'],
        rows: [
          ['Location', '<code>C:\\Windows\\Prefetch\\*.pf</code>', '<code>SYSTEM hive ...\\Session Manager\\AppCompatCache</code>', '<code>C:\\Windows\\AppCompat\\Programs\\Amcache.hve</code>'],
          ['Proves execution?', '<strong>Yes</strong>', 'Not on its own', 'Not on its own'],
          ['Key data', 'Run count, first and last run, files touched in the first 10 seconds', 'Full path, last modified time, file size; newest entry first', 'SHA1, path, size, publisher, install date, drivers'],
          ['Gotchas', '1,024 file limit (Win8+) deletes old entries, so “first run” can be wrong. Hash = path, except svchost, dllhost, rundll32, backgroundtaskhost (path + command line)', 'Lives in memory and is written to disk only at shutdown or reboot. Volatility <code>shimcachemem</code> can read it live', 'InventoryApplicationFile, InventoryApplication, InventoryDriverBinary. Good for files dropped without installation'],
          ['Tool', 'PECmd (<code>-f</code> file, <code>-d</code> folder)', 'AppCompatCacheParser, ShimCacheParser.py', 'AmcacheParser; AppCompatProcessor.py for both'],
        ],
        note: 'Prefetch creation date ≈ first run, modified date ≈ last run. Two Prefetch files with the same name but different hashes = the program ran from two paths.',
      },
    ],
  },
  {
    id: 'lateral-movement',
    num: '06',
    title: 'Lateral movement: source vs. destination',
    blocks: [
      {
        type: 'table',
        head: ['Technique', 'Source host', 'Destination host'],
        rows: [
          ['PsExec', 'psexec.exe in Prefetch; 4648', '4624 type 3; 7045 / 4697 service PSEXESVC (or random); 5140 ADMIN$'],
          ['RDP', '4648; mstsc.exe', '4624 type 10; 4778 / 4779 reconnect and disconnect (client name + IP); 1149'],
          ['Admin shares', 'net use; 4648', '4624 type 3; 5140 share accessed; 5145 file-level detail'],
          ['Scheduled tasks', 'schtasks.exe / at.exe; 4648', '4624 type 3; 4698 created (Task Scheduler 106); 200 / 201 run'],
          ['WMI', 'wmic.exe; 4648', '4624 type 3; children of WmiPrvSE.exe; 5861 if a consumer was made'],
          ['PowerShell', '4648; 4104 script blocks', '4624 type 3; wsmprovhost.exe; 4104 script blocks'],
          ['make_token / PTH', '4624 <strong>type 9</strong> (new credentials); 4648', '4624 type 3 with the stolen account'],
        ],
      },
    ],
  },
  {
    id: 'event-ids',
    num: '07',
    title: 'Event IDs worth memorizing',
    blocks: [
      {
        type: 'table',
        head: ['ID', 'Meaning'],
        rows: [
          ['4624 / 4625', 'Logon success / failure (check Logon Type)'],
          ['4634 / 4647', 'Logoff / user-initiated logoff (match Logon ID for session length)'],
          ['4648', 'Logon with explicit credentials (RunAs, remote with alt creds)'],
          ['4672', 'Special (admin) privileges assigned'],
          ['4720 → 4732', 'Account created → added to local group'],
          ['4768 / 4769 / 4771', 'TGT request / service ticket / failed pre-auth'],
          ['4776', 'NTLM credential validation'],
          ['4778 / 4779', 'RDP session reconnect / disconnect'],
          ['4798 / 4799', 'User / group enumeration (recon)'],
          ['4688 / 4689', 'Process created / exited (command line if audited)'],
          ['7045 / 4697', 'Service installed (System / Security)'],
          ['7034 / 7036 / 7040', 'Service crashed / started-stopped / start type changed'],
          ['4698 / 4699 / 4702', 'Task created / deleted / updated'],
          ['5140 / 5145', 'Share accessed / file-level share check'],
          ['1102', 'Security log cleared (logged in Security)'],
          ['104', 'Any other log cleared (logged in System)'],
          ['4104', 'PowerShell script block logging'],
          ['5861', 'WMI permanent event consumer registered'],
        ],
      },
      {
        type: 'kv',
        title: 'Logon types',
        items: [
          ['2', 'Console (interactive)'], ['3', 'Network'], ['4', 'Batch'], ['5', 'Service'], ['7', 'Unlock'],
          ['8', 'Network cleartext'], ['9', 'New credentials (RunAs)'], ['10', 'RDP (remote interactive)'], ['11', 'Cached'],
        ],
        note: 'PowerShell history: <code>%APPDATA%\\Microsoft\\Windows\\PowerShell\\PSReadLine\\ConsoleHost_history.txt</code>',
      },
    ],
  },
  {
    id: 'memory',
    num: '08',
    title: 'Memory forensics',
    blocks: [
      {
        type: 'cards',
        items: [
          { title: 'Why memory', body: 'Fileless malware, injected code, rootkits, and in-memory C2 often leave little or nothing on disk. Some attacks are nearly impossible to unravel without it.' },
          { title: 'Where memory lives', body: 'Live capture: DumpIt, WinPMEM, FTK Imager, F-Response, Redline. Also <code>hiberfil.sys</code>, <code>pagefile.sys</code>, <code>swapfile.sys</code>, <code>MEMORY.DMP</code>. VMs: suspend, then grab <code>.vmem</code> (VMware), <code>.bin/.vsv</code> (Hyper-V), <code>.sav</code> (VirtualBox, partial).' },
        ],
      },
      {
        type: 'table',
        title: 'Six-step analysis with Volatility',
        head: ['#', 'Step', 'Plugins', 'Looking for'],
        rows: [
          ['1', 'Identify rogue processes', '<code>pslist, psscan, pstree, psxview -R</code>', 'Wrong parent, wrong path, misspelled names, hidden or unlinked processes'],
          ['2', 'Analyze DLLs and handles', '<code>dlllist, cmdline, getsids, handles, mutantscan</code>', 'Odd DLLs, suspicious arguments, SYSTEM where it shouldn’t be, known mutexes'],
          ['3', 'Review network artifacts', '<code>netscan</code> (Vista+); <code>connections, connscan, sockets</code> (XP/2003)', 'Non-browsers on 80/443, direct-to-IP, odd listeners, workstation-to-workstation'],
          ['4', 'Look for code injection', '<code>malfind, ldrmodules, hollowfind</code>', 'RWX pages, DLLs missing from PEB lists, hollowed images'],
          ['5', 'Check for rootkits', '<code>ssdt | egrep -v \'(ntos|win32k)\', psxview, modscan, modules, apihooks, idt</code>', 'Hooks pointing outside ntoskrnl/win32k, hidden drivers'],
          ['6', 'Dump suspicious items', '<code>procdump, memdump, dlldump, moddump, filescan + dumpfiles, cmdscan, consoles</code>', 'Pull samples for strings, YARA, AV, or reversing'],
        ],
        note: 'Start with <code>imageinfo</code> or <code>kdbgscan</code> to pick the profile (Volatility 3: <code>windows.info.Info</code>, no profile needed). KDBG gives Volatility the process list (_EPROCESS), loaded modules, and VADs.',
      },
      {
        type: 'table',
        title: 'Code injection types',
        head: ['Type', 'How it works', 'Catch it with'],
        rows: [
          ['DLL injection', 'OpenProcess → VirtualAllocEx → WriteProcessMemory → CreateRemoteThread → LoadLibrary', 'dlllist, ldrmodules'],
          ['Process hollowing', 'Start legit process suspended, unmap its code, write malware, resume', 'hollowfind, malfind'],
          ['Reflective DLL', 'DLL carries its own loader and skips the Windows loader', 'malfind, ldrmodules'],
        ],
      },
      {
        type: 'kv',
        title: 'Pairs people mix up',
        items: [
          ['pslist vs psscan', 'Walks the linked list vs. scans for signatures (finds unlinked and exited)'],
          ['cmdscan vs consoles', 'Commands only vs. commands <em>and</em> output'],
          ['procdump vs memdump', 'Rebuilt executable vs. all process memory'],
          ['modules vs modscan', 'Linked list overview vs. signature scan for hidden drivers'],
          ['baseline -U vs -K', 'Not in clean image (unknown) vs. in it (known)'],
        ],
      },
    ],
  },
  {
    id: 'timeline',
    num: '09',
    title: 'Timeline analysis',
    blocks: [
      {
        type: 'kv',
        title: 'NTFS timestamps (MACB)',
        items: [
          ['M', 'Modified: content last changed'],
          ['A', 'Accessed: last read'],
          ['C', 'MFT Changed: metadata changed (not creation)'],
          ['B', 'Born: created'],
        ],
        note: 'Stored in UTC. <strong>SMB copy rule:</strong> modified time comes over from the source, creation time is set when the file lands. Modified older than created = copied file, a lateral movement clue. Timestamps can also change from Office/WinZip, archives (ZIP/RAR keep modified time), AV scans, and timestomping.',
      },
      {
        type: 'list',
        title: 'Five-step timeline process',
        ordered: true,
        items: [
          '<strong>Determine scope:</strong> the questions and the timeframe',
          '<strong>Narrow pivot points:</strong> alert time, bad URL/DNS, process, file name, account, lateral movement, anti-forensic tools',
          '<strong>Choose the method:</strong> filesystem or super timeline',
          '<strong>Filter:</strong> cut noise to the pivot points',
          '<strong>Analyze:</strong> read context before and after each pivot',
        ],
      },
      {
        type: 'table',
        head: ['', 'Filesystem timeline', 'Super timeline'],
        rows: [
          ['Tools', 'MFTECmd or fls → <code>mactime</code>', 'log2timeline → pinfo → psort'],
          ['Data', 'Filesystem metadata only', 'Filesystem + artifacts + registry + logs'],
          ['Use', 'Fast triage, many filesystems', 'Full, detailed picture'],
        ],
      },
      {
        type: 'kv',
        title: 'Plaso tools',
        items: [
          ['log2timeline', 'Extracts events into a Plaso storage file'],
          ['pinfo', 'Shows storage metadata, parsers, errors'],
          ['psort', 'Filters, sorts, dedupes, sets time zone, outputs'],
        ],
        note: '<strong>Kitchen sink</strong> = all parsers on the full image, slowest and biggest. <strong>Targeted</strong> = parser lists, filter files, or KAPE triage images, ~5–30 min.',
      },
    ],
  },
  {
    id: 'anti-forensics',
    num: '10',
    title: 'Anti-forensics and NTFS',
    blocks: [
      {
        type: 'table',
        head: ['', '$LogFile', '$UsnJrnl'],
        rows: [
          ['Analogy', 'Flight data recorder', 'Cockpit voice recorder'],
          ['Detail', 'Low-level transactions', 'High-level changes (create, rename, delete)'],
          ['Keeps', 'Hours on busy systems', 'Days to weeks'],
          ['Tool', 'LogFileParser', 'MFTECmd (<code>--vss</code> for snapshots)'],
        ],
      },
      {
        type: 'list',
        title: 'MFT facts',
        items: [
          'Each entry is 1,024 bytes: header, <code>$STANDARD_INFORMATION</code>, <code>$FILE_NAME</code>, <code>$DATA</code>',
          'Small files are resident (data inside the MFT entry)',
          'Entries are allocated in order, so neighbors were likely created together',
          '<code>$I30</code> directory index slack can hold names of deleted files (Indx2Csv, Velociraptor)',
          'Alternate Data Streams can hide data',
        ],
      },
      {
        type: 'cards',
        title: 'What happens when a file is deleted',
        items: [
          { title: 'Data layer', body: 'Clusters marked free in <code>$Bitmap</code>. Data stays until reused.' },
          { title: 'Metadata layer', body: 'A bit flips in the MFT record. Metadata stays until the record is reused.' },
          { title: 'Filename layer', body: '<code>$FILE_NAME</code> and the parent’s <code>$I30</code> entry stay until reuse.' },
        ],
      },
      {
        type: 'list',
        title: 'Recovery',
        items: [
          '<strong>Metadata method</strong> (MFT entry intact): icat, tsk_recover, FTK Imager',
          '<strong>Carving</strong> (entry reused): PhotoRec, 300+ types; bulk_extractor-rec for MFT, $I30, $UsnJrnl, $LogFile, EVTX records',
          '<strong>Deleted VSS:</strong> vss_carver.py. Mount VSCs with vshadowmount, Arsenal Image Mounter, F-Response',
          '<strong>Registry:</strong> Registry Explorer recovers deleted keys and finds large or Base64 values hiding fileless malware',
        ],
      },
      {
        type: 'cards',
        title: 'Wipers still leave traces',
        items: [
          { title: 'SDelete', body: 'Repeated renames in <code>$UsnJrnl</code>, its own Prefetch, <code>$I30</code> slack, Search index logs.' },
          { title: 'BCWipe, Eraser, Cipher', body: '<code>$UsnJrnl</code>, <code>$LogFile</code>, <code>$I30</code> slack, MFT records. <strong>Countermeasures:</strong> bigger journals, VSS on with ScopeSnapshots off, central log forwarding, Sysmon.' },
        ],
      },
    ],
  },
];

export const CHEATSHEET_SOURCE =
  'Built from “A Guide to GIAC Certified Forensic Analyst” (Ishrag Hamid) plus standard Windows references for a few items (RDP 1149, wsmprovhost, netscan OS support, ShimCache execution caveat). Verify against your SANS FOR508 books when indexing.';

// Flat Event ID lookup for the terminal's `eventid` command.
export const EVENT_IDS: Record<string, string> = Object.fromEntries(
  (CHEATSHEET.find((s) => s.id === 'event-ids')!.blocks[0] as Extract<Block, { type: 'table' }>).rows.flatMap(([ids, meaning]) => {
    const parts = ids.split(/\s*(?:\/|→)\s*/);
    return parts.map((id) => [id.trim(), `${meaning} (${ids})`]);
  })
);
