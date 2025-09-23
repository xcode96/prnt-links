import { Resource } from '../types';

const rawData = `
1- 3 Ways Extract Password Hashes from NTDS.dit: https://www.hackingarticles.in/3-ways-extract-password-hashes-from-ntds-dit
2- 3 ways to Capture HTTP Password in Network PC: https://www.hackingarticles.in/3-ways-to-capture-http-password-in-network-pc/
3- 3 Ways to Crack Wifi using Pyrit,oclHashcat and Cowpatty: www.hackingarticles.in/3-ways-crack-wifi-using-pyrit-oclhashcat-cowpatty/
4-BugBounty @ Linkedln-How I was able to bypass Open Redirection Protection: https://medium.com/p/2e143eb36941
5-BugBounty — “Let me reset your password and login into your account “-How I was able to Compromise any User Account via Reset Password Functionality: https://medium.com/p/a11bb5f863b3/share/twitter
6-“Journey from LFI to RCE!!!”-How I was able to get the same in one of the India’s popular property buy/sell company: https://medium.com/p/a69afe5a0899
7-BugBounty — “I don’t need your current password to login into your account” - How could I completely takeover any user’s account in an online classi ed ads company: https://medium.com/p/e51a945b083d
8-BugBounty — “How I was able to shop for free!”- Payment Price Manipulation: https://medium.com/p/b29355a8e68e
9-Recon — my way: https://medium.com/p/82b7e5f62e21
10-Reconnaissance: a eulogy in three acts: https://medium.com/p/7840824b9ef2
11-Red-Teaming-Toolkit: https://github.com/infosecn1nja/Red-Teaming-Toolkit
12-Red Team Tips: https://vincentyiu.co.uk/
13-Shellcode: A reverse shell for Linux in C with support for TLS/SSL: https://modexp.wordpress.com/2019/04/24/glibc-shellcode/
14-Shellcode: Encrypting traffic: https://modexp.wordpress.com/2018/08/17/shellcode-encrypting-traffic/
15-Penetration Testing of an FTP Server: https://medium.com/p/19afe538be4b
16-Reverse Engineering of the Anubis Malware — Part 1: https://medium.com/p/741e12f5a6bd
17-Privilege Escalation on Linux with Live examples: https://resources.infosecinstitute.com/privilege-escalation-linux-live-examples/
18-Pentesting Cheatsheets: https://ired.team/offensive-security-experiments/offensive-security-cheetsheets
19-Powershell Payload Delivery via DNS using Invoke-PowerCloud: https://ired.team/offensive-security-experiments/payload-delivery-via-dns-using-invoke-powercloud
20-SMART GOOGLE SEARCH QUERIES TO FIND VULNERABLE SITES – LIST OF 4500+ GOOGLE DORKS: https://sguru.org/ghdb-download-list-4500-google-dorks-free/
21-SQL Injection Cheat Sheet: https://www.netsparker.com/blog/web-security/sql-injection-cheat-sheet/
22-SQLmap’s os-shell + Backdooring website with Weevely: https://medium.com/p/8cb6dcf17fa4
23-SQLMap Tamper Scripts (SQL Injection and WAF bypass) Tips: https://medium.com/p/c5a3f5764cb3
24-Top 10 Essential NMAP Scripts for Web App Hacking: https://medium.com/p/c7829ff5ab7
25-BugBounty — How I was able to download the Source Code of India’s Largest Telecom Service Provider including dozens of more popular websites!: https://medium.com/p/52cf5c5640a1
26-Re ected XSS Bypass Filter: https://medium.com/p/de41d35239a3
27-XSS Payloads, getting past alert(1): https://medium.com/p/217ab6c6ead7
28-XS-Searching Google’s bug tracker to find out vulnerable source code Or how side-channel timing attacks aren’t that impractical: https://medium.com/p/50d8135b7549
29-Web Application Firewall (WAF) Evasion Techniques: https://medium.com/@themiddleblue/web-application-firewall-waf-evasion-techniques
30-OSINT Resources for 2019: https://medium.com/p/b15d55187c3f
31-The OSINT Toolkit: https://medium.com/p/3b9233d1cdf9
32-OSINT : Chasing Malware + C&C Servers: https://medium.com/p/3c893dc1e8cb
33-OSINT tool for visualizing relationships between domains, IPs and email addresses: https://medium.com/p/94377aa1f20a
34-From OSINT to Internal – Gaining Access from outside the perimeter: https://www.n00py.io/.../from-osint-to-internal-gaining-access-from-the-outside-the-perimeter
35-Week in OSINT #2018–35: https://medium.com/p/b2ab1765157b
36-Week in OSINT #2019–14: https://medium.com/p/df83f5b334b4
37-Instagram OSINT | What A Nice Picture: https://medium.com/p/8f4c7edfbcc6
38-awesome-osint: https://github.com/jivoi/awesome-osint
39-OSINT_Team_Links: https://github.com/IVMachiavelli/OSINT_Team_Links
40-Open-Source Intelligence (OSINT) Reconnaissance: https://medium.com/p/75edd7f7dada
41-Hacking Cryptocurrency Miners with OSINT Techniques: https://medium.com/p/677bbb3e0157
42-A penetration tester’s guide to sub- domain enumeration: https://blog.appsecco.com/a-penetration-testers-guide-to-sub-domain-enumeration-7d842d5570f6?gi=f44ec9d8f4b5
43-Packages that actively seeks vulnerable exploits in the wild. More of an umbrella group for similar packages: https://blackarch.org/recon.html
44-What tools I use for my recon during BugBounty: https://medium.com/p/ec25f7f12e6d
45-Command and Control – DNS: https://pentestlab.blog/2017/09/06/command-and-control-dns/
46-Command and Control – WebDAV: https://pentestlab.blog/2017/09/12/command-and-control-webdav/
47-Command and Control – Twitter: https://pentestlab.blog/2017/09/26/command-and-control-twitter/
48-Command and Control – Kernel: https://pentestlab.blog/2017/10/02/command-and-control-kernel/
49-Source code disclosure via exposed .git folder: https://pentester.land/tutorials/.../source-code-disclosure-via-exposed-git-folder.html
50-Pentesting Cheatsheet: https://hausec.com/pentesting-cheatsheet/
51-Windows Userland Persistence Fundamentals: https://www.fuzzysecurity.com/tutorials/19.html
52-A technique that a lot of SQL injection beginners don’t know | Atmanand Nagpure write-up: https://medium.com/p/abdc7c269dd5
53-awesome-bug-bounty: https://github.com/djadmin/awesome-bug-bounty
54-dostoevsky-pentest-notes: https://github.com/dostoevskylabs/dostoevsky-pentest-notes
55-awesome-pentest: https://github.com/enaqx/awesome-pentest
56-awesome-windows-exploitation: https://github.com/enddo/awesome-windows-exploitation
57-awesome-exploit-development: https://github.com/FabioBaroni/awesome-exploit-development
58-BurpSuit + SqlMap = One Love: https://medium.com/p/64451eb7b1e8
59-Crack WPA/WPA2 Wi-Fi Routers with Aircrack-ng and Hashcat: https://medium.com/p/a5a5d3ffea46
60-DLL Injection: https://pentestlab.blog/2017/04/04/dll-injection
61-DLL Hijacking: https://pentestlab.blog/2017/03/27/dll-hijacking
62-My Recon Process — DNS Enumeration: https://medium.com/p/d0e288f81a8a
63-Google Dorks for nding Emails, Admin users etc: https://d4msec.wordpress.com/2015/09/03/google-dorks-for-finding-emails-admin-users-etc
64-Google Dorks List 2018: https://medium.com/p/fb70d0cbc94
65-Hack your own NMAP with a BASH one-liner: https://medium.com/p/758352f9aece
66-UNIX / LINUX CHEAT SHEET: cheatsheetworld.com/programming/unix-linux-cheat-sheet/
67-Linux Capabilities Privilege Escalation via OpenSSL with SELinux Enabled and Enforced: https://medium.com/p/74d2bec02099
68- information gathering: https://pentestlab.blog/category/information-gathering/
69-post exploitation: https://pentestlab.blog/category/post-exploitation/
70-privilege escalation: https://pentestlab.blog/category/privilege-escalation/
71-red team: https://pentestlab.blog/category/red-team/
72-The Ultimate Penetration Testing Command Cheat Sheet for Linux: https://www.hackingloops.com/command-cheat-sheet-for-linux/
73-Web Application Penetration Testing Cheat Sheet: https://jdow.io/blog/2018/03/18/web-application-penetration-testing-methodology/
74-Windows Kernel Exploits: https://pentestlab.blog/2017/04/24/windows-kernel-exploits
75-Windows oneliners to download remote payload and execute arbitrary code: https://arno0x0x.wordpress.com/2017/11/20/windows-oneliners-to-download-remote-payload-and-execute-arbitrary-code/
76-Windows-Post-Exploitation: https://github.com/emilyanncr/Windows-Post-Exploitation
77-Windows Post Exploitation Shells and File Transfer with Netcat for Windows: https://medium.com/p/a2ddc3557403
78-Windows Privilege Escalation Fundamentals: https://www.fuzzysecurity.com/tutorials/16.html
79-Windows Privilege Escalation Guide: www.absolomb.com/2018-01-26-Windows-Privilege-Escalation-Guide/
80-Windows Active Directory Post Exploitation Cheatsheet: https://medium.com/p/48c2bd70388
81-Windows Exploitation Tricks: Abusing the User-Mode Debugger: https://googleprojectzero.blogspot.com/2019/04/windows-exploitation-tricks-abusing.html
82-VNC Penetration Testing (Port 5901): http://www.hackingarticles.in/vnc-penetration-testing
83- Big List Of Google Dorks Hacking: https://xspiyr.wordpress.com/2012/09/05/big-list-of-google-dorks-hacking
84-List of google dorks for sql injection: https://deadlyhacker.wordpress.com/2013/05/09/list-of-google-dorks-for-sql-injection/
85-Download Google Dorks List 2019: https://medium.com/p/323c8067502c
86-Comprehensive Guide to Sqlmap (Target Options): http://www.hackingarticles.in/comprehensive-guide-to-sqlmap-target-options15249-2
87-EMAIL RECONNAISSANCE AND PHISHING TEMPLATE GENERATION MADE SIMPLE: www.cybersyndicates.com/.../email-reconnaissance-phishing-template-generation-made-simple
88-Comprehensive Guide on Gobuster Tool: https://www.hackingarticles.in/comprehensive-guide-on-gobuster-tool/
89-My Top 5 Web Hacking Tools: https://medium.com/p/e15b3c1f21e8
90-[technical] Pen-testing resources: https://medium.com/p/cd01de9036ad
91-File System Access on Webserver using Sqlmap: http://www.hackingarticles.in/file-system-access-on-webserver-using-sqlmap
92-kali-linux-cheatsheet: https://github.com/NoorQureshi/kali-linux-cheatsheet
93-Pentesting Cheatsheet: https://anhtai.me/pentesting-cheatsheet/
94-Command Injection Exploitation through Sqlmap in DVWA (OS-cmd): http://www.hackingarticles.in/command-injection-exploitation-through-sqlmap-in-dvwa
95-XSS Payload List - Cross Site Scripting Vulnerability Payload List: https://www.kitploit.com/2018/05/xss-payload-list-cross-site-scripting.html
96-Analyzing CVE-2018-6376 – Joomla!, Second Order SQL Injection: https://www.notsosecure.com/analyzing-cve-2018-6376/
97-Exploiting Sql Injection with Nmap and Sqlmap: http://www.hackingarticles.in/exploiting-sql-injection-nmap-sqlmap
98-awesome-malware-analysis: https://github.com/rshipp/awesome-malware-analysis
99-Anatomy of UAC Attacks: https://www.fuzzysecurity.com/tutorials/27.html
100-awesome-cyber-skills: https://github.com/joe-shenouda/awesome-cyber-skills
101-5 ways to Banner Grabbing: http://www.hackingarticles.in/5-ways-banner-grabbing
102-6 Ways to Hack PostgresSQL Login: http://www.hackingarticles.in/6-ways-to-hack-postgressql-login
103-6 Ways to Hack SSH Login Password: http://www.hackingarticles.in/6-ways-to-hack-ssh-login-password
104-10 Free Ways to Find Someone’s Email Address: https://medium.com/p/e6f37f5fe10a
105-USING A SCF FILE TO GATHER HASHES: https://1337red.wordpress.com/using-a-scf-file-to-gather-hashes
106-Hack Remote Windows PC using DLL Files (SMB Delivery Exploit): http://www.hackingarticles.in/hack-remote-windows-pc-using-dll-files-smb-delivery-exploit
107-Hack Remote Windows PC using Office OLE Multiple DLL Hijack Vulnerabilities: http://www.hackingarticles.in/hack-remote-windows-pc-using-office-ole-multiple-dll-hijack-vulnerabilities
108-BUG BOUNTY HUNTING (METHODOLOGY , TOOLKIT , TIPS & TRICKS , Blogs): https://medium.com/p/ef6542301c65
109-How To Perform External Black-box Penetration Testing in Organization with “ZERO” Information: https://gbhackers.com/external-black-box-penetration-testing
110-A Complete Penetration Testing & Hacking Tools List for Hackers & Security Professionals: https://gbhackers.com/hacking-tools-list
111-Most Important Considerations with Malware Analysis Cheats And Tools list: https://gbhackers.com/malware-analysis-cheat-sheet-and-tools-list
112-Awesome-Hacking: https://github.com/Hack-with-Github/Awesome-Hacking
113-awesome-threat-intelligence: https://github.com/hslatman/awesome-threat-intelligence
114-awesome-yara: https://github.com/InQuest/awesome-yara
115-Red-Team-Infrastructure-Wiki: https://github.com/bluscreenofjeff/Red-Team-Infrastructure-Wiki
116-awesome-pentest: https://github.com/enaqx/awesome-pentest
117-awesome-cyber-skills: https://github.com/joe-shenouda/awesome-cyber-skills
118-pentest-wiki: https://github.com/nixawk/pentest-wiki
119-awesome-web-security: https://github.com/qazbnm456/awesome-web-security
120-Infosec_Reference: https://github.com/rmusser01/Infosec_Reference
121-awesome-iocs: https://github.com/sroberts/awesome-iocs
122-blackhat-arsenal-tools: https://github.com/toolswatch/blackhat-arsenal-tools
123-awesome-social-engineering: https://github.com/v2-dev/awesome-social-engineering
124-Penetration Testing Framework 0.59: www.vulnerabilityassessment.co.uk/Penetration%20Test.html
125-Penetration Testing Tools Cheat Sheet : https://highon.coffee/blog/penetration-testing-tools-cheat-sheet/
126-SN1PER – A Detailed Explanation of Most Advanced Automated Information Gathering & Penetration Testing Tool: https://gbhackers.com/sn1per-a-detailed-explanation-of-most-advanced-automated-information-gathering-penetration-testing-tool
127-Spear Phishing 101: https://blog.inspired-sec.com/archive/2017/05/07/Phishing.html
128-100 ways to discover (part 1): https://sylarsec.com/2019/01/11/100-ways-to-discover-part-1/
129-Comprehensive Guide to SSH Tunnelling: http://www.hackingarticles.in/comprehensive-guide-to-ssh-tunnelling/
130-Capture VNC Session of Remote PC using SetToolkit: http://www.hackingarticles.in/capture-vnc-session-remote-pc-using-settoolkit/
131-Hack Remote PC using PSEXEC Injection in SET Toolkit: http://www.hackingarticles.in/hack-remote-pc-using-psexec-injection-set-toolkit/
132-Denial of Service Attack on Network PC using SET Toolkit: http://www.hackingarticles.in/denial-of-service-attack-on-network-pc-using-set-toolkit/
133-Hack Gmail and Facebook of Remote PC using DNS Spoofing and SET Toolkit: http://www.hackingarticles.in/hack-gmail-and-facebook-of-remote-pc-using-dns-spoofing-and-set-toolkit/
134-Hack Any Android Phone with DroidJack (Beginner’s Guide): http://www.hackingarticles.in/hack-android-phone-droidjack-beginners-guide/
135-HTTP RAT Tutorial for Beginners: http://www.hackingarticles.in/http-rat-tutorial-beginners/
136-5 ways to Create Permanent Backdoor in Remote PC: http://www.hackingarticles.in/5-ways-create-permanent-backdoor-remote-pc/
137-How to Enable and Monitor Firewall Log in Windows PC: http://www.hackingarticles.in/enable-monitor-firewall-log-windows-pc/
138-EMPIRE TIPS AND TRICKS: https://enigma0x3.net/2015/08/26/empire-tips-and-tricks/
139-CSRF account takeover Explained Automated/Manual: https://medium.com/p/447e4b96485b
140-CSRF Exploitation using XSS: http://www.hackingarticles.in/csrf-exploitation-using-xss
141-Dumping Domain Password Hashes: https://pentestlab.blog/2018/07/04/dumping-domain-password-hashes/
142-Empire Post Exploitation – Unprivileged Agent to DA Walkthrough: https://bneg.io/2017/05/24/empire-post-exploitation/
143-Dropbox for the Empire: https://bneg.io/2017/05/13/dropbox-for-the-empire/
144-Empire without PowerShell.exe: https://bneg.io/2017/07/26/empire-without-powershell-exe/
145-REVIVING DDE: USING ONENOTE AND EXCEL FOR CODE EXECUTION: https://enigma0x3.net/2018/01/29/reviving-dde-using-onenote-and-excel-for-code-execution/
146-PHISHING WITH EMPIRE: https://enigma0x3.net/2016/03/15/phishing-with-empire/
146-BYPASSING UAC ON WINDOWS 10 USING DISK CLEANUP: https://enigma0x3.net/2016/07/22/bypassing-uac-on-windows-10-using-disk-cleanup/
147-“FILELESS” UAC BYPASS USING EVENTVWR.EXE AND REGISTRY HIJACKING: https://enigma0x3.net/2016/08/15/fileless-uac-bypass-using-eventvwr-exe-and-registry-hijacking/
148-“FILELESS” UAC BYPASS USING SDCLT.EXE: https://enigma0x3.net/2017/03/17/fileless-uac-bypass-using-sdclt-exe/
149-PHISHING AGAINST PROTECTED VIEW: https://enigma0x3.net/2017/07/13/phishing-against-protected-view/
150-LATERAL MOVEMENT USING EXCEL.APPLICATION AND DCOM: https://enigma0x3.net/2017/09/11/lateral-movement-using-excel-application-and-dcom/
151-enum4linux Cheat Sheet: https://highon.coffee/blog/enum4linux-cheat-sheet/
152-enumeration: https://technologyredefine.blogspot.com/2017/11/enumeration.html
153-Command and Control – WebSocket: https://pentestlab.blog/2017/12/06/command-and-control-websocket
154-Command and Control – WMI: https://pentestlab.blog/2017/11/20/command-and-control-wmi
155-Dangerous Virus For Windows Crashes Everything Hack window Using Virus: http://thelearninghacking.com/create-virus-hack-windows/
156-Comprehensive Guide to Nmap Port Status: http://www.hackingarticles.in/comprehensive-guide-nmap-port-status
157-Commix – Automated All-in-One OS Command Injection and Exploitation Tool: https://gbhackers.com/commix-automated-all-in-one-os-command-injection-and-exploitation-tool
158-Compromising Jenkins and extracting credentials: https://www.n00py.io/2017/01/compromising-jenkins-and-extracting-credentials/
159-footprinting: https://technologyredefine.blogspot.com/2017/09/footprinting_17.html
160-awesome-industrial-control-system-security: https://github.com/hslatman/awesome-industrial-control-system-security
161-xss-payload-list: https://github.com/ismailtasdelen/xss-payload-list
162-awesome-vehicle-security: https://github.com/jaredthecoder/awesome-vehicle-security
163-awesome-osint: https://github.com/jivoi/awesome-osint
164-awesome-python: https://github.com/vinta/awesome-python
165-Microsoft Windows - UAC Protection Bypass (Via Slui File Handler Hijack) (Metasploit): https://www.exploit-db.com/download/44830.rb
166-nbtscan Cheat Sheet: https://highon.coffee/blog/nbtscan-cheat-sheet/
167-neat-tricks-to-bypass-csrfprotection: www.slideshare.net/0ang3el/neat-tricks-to-bypass-csrfprotection
168-ACCESSING CLIPBOAR D FROM THE LOC K SC REEN IN WI NDOWS 10 #2: https://oddvar.moe/2017/01/27/access-clipboard-from-lock-screen-in-windows-10-2/
169-NMAP CHEAT-SHEET (Nmap Scanning Types, Scanning Commands , NSE Scripts): https://medium.com/p/868a7bd7f692
170-Nmap Cheat Sheet: https://highon.coffee/blog/nmap-cheat-sheet/
171-Powershell Without Powershell – How To Bypass Application Whitelisting, Environment Restrictions & AV: https://www.blackhillsinfosec.com/powershell-without-powershell-how-to-bypass-application-whitelisting-environment-restrictions-av/
172-Phishing with PowerPoint: https://www.blackhillsinfosec.com/phishing-with-powerpoint/
173-hide-payload-ms-office-document-properties: https://www.blackhillsinfosec.com/hide-payload-ms-office-document-properties/
174-How to Evade Application Whitelisting Using REGSVR32: https://www.blackhillsinfosec.com/evade-application-whitelisting-using-regsvr32/
175-How to Build a C2 Infrastructure with Digital Ocean – Part 1: https://www.blackhillsinfosec.com/build-c2-infrastructure-digital-ocean-part-1/
176-WordPress Penetration Testing using Symposium Plugin SQL Injection: http://www.hackingarticles.in/wordpress-penetration-testing-using-symposium-plugin-sql-injection
177-Manual SQL Injection Exploitation Step by Step: http://www.hackingarticles.in/manual-sql-injection-exploitation-step-step
178-MSSQL Penetration Testing with Metasploit: http://www.hackingarticles.in/mssql-penetration-testing-metasploit
179-Multiple Ways to Get root through Writable File: http://www.hackingarticles.in/multiple-ways-to-get-root-through-writable-file
180-MySQL Penetration Testing with Nmap: http://www.hackingarticles.in/mysql-penetration-testing-nmap
181-NetBIOS and SMB Penetration Testing on Windows: http://www.hackingarticles.in/netbios-and-smb-penetration-testing-on-windows
182-Network Packet Forensic using Wireshark: http://www.hackingarticles.in/network-packet-forensic-using-wireshark
183-Escape and Evasion Egressing Restricted Networks: https://www.optiv.com/blog/escape-and-evasion-egressing-restricted-networks/
183-Awesome-Hacking-Resources: https://github.com/vitalysim/Awesome-Hacking-Resources
184-Hidden directories and les as a source of sensitive information about web application: https://medium.com/p/84e5c534e5ad
185-Hiding Registry keys with PSRe ect: https://posts.specterops.io/hiding-registry-keys-with-psreflect-b18ec5ac8353
186-awesome-cve-poc: https://github.com/qazbnm456/awesome-cve-poc
187-Linux Capabilities Privilege Escalation via OpenSSL with SELinux Enabled and Enforced: https://medium.com/p/74d2bec02099
188-Post Exploitation in Windows using dir Command: http://www.hackingarticles.in/post-exploitation-windows-using-dir-command
189-Web Application Firewall (WAF) Evasion Techniques #2: https://medium.com/secjuice/web-application-firewall-waf-evasion-techniques-2-125995f3e7b0
190-Forensics Investigation of Remote PC (Part 1): http://www.hackingarticles.in/forensics-investigation-of-remote-pc-part-1
191-CloudFront Hijacking: https://www.mindpointgroup.com/blog/pen-test/cloudfront-hijacking/
192-PowerPoint and Custom Actions: https://cofense.com/powerpoint-and-custom-actions/
193-Privilege Escalation on Windows 7,8,10, Server 2008, Server 2012 using Potato: http://www.hackingarticles.in/privilege-escalation-on-windows-7810-server-2008-server-2012-using-potato
194-How to intercept TOR hidden service requests with Burp: https://medium.com/p/6214035963a0
195-How to Make a Captive Portal of Death: https://medium.com/p/48e82a1d81a/share/twitter
196-How to find any CEO’s email address in minutes: https://medium.com/p/70dcb96e02b0
197-Microsoft Windows 10 - Child Process Restriction Mitigation Bypass: https://www.exploit-db.com/download/44888.txt
198-Microsoft Windows - Token Process Trust SID Access Check Bypass Privilege Escalation: https://www.exploit-db.com/download/44630.txt
199-Microsoft Word upload to Stored XSS: https://www.n00py.io/2018/03/microsoft-word-upload-to-stored-xss/
200-MobileApp-Pentest-Cheatsheet: https://github.com/tanprathan/MobileApp-Pentest-Cheatsheet
201-awesome: https://github.com/sindresorhus/awesome
201-writing arm shellcode: https://azeria-labs.com/writing-arm-shellcode/
202-debugging with gdb introduction: https://azeria-labs.com/debugging-with-gdb-introduction/
203-emulate raspberrypi with qemu: https://azeria-labs.com/emulate-raspberry-pi-with-qemu/
204-Bash One-Liner to Check Your Password(s) via pwnedpasswords.com’s API Using the k-Anonymity Method: https://medium.com/p/a5807a9a8056
205-A Red Teamer's guide to pivoting: https://artkond.com/2017/03/23/pivoting-guide/
206-Using WebDAV features as a covert channel: https://arno0x0x.wordpress.com/2017/09/07/using-webdav-features-as-a-covert-channel/
207-A View of Persistence: https://rastamouse.me/2018/03/a-view-of-persistence/
208- pupy websocket transport: https://bitrot.sh/post/28-11-2017-pupy-websocket-transport/
209-Subdomains Enumeration Cheat Sheet: https://pentester.land/cheatsheets/2018/11/.../subdomains-enumeration-cheatsheet.html
210-DNS Reconnaissance – DNSRecon: https://pentestlab.blog/2012/11/13/dns-reconnaissance-dnsrecon/
211-Cheatsheets: https://bitrot.sh/cheatsheet
212-Understanding Guide to Nmap Firewall Scan (Part 2): http://www.hackingarticles.in/understanding-guide-nmap-firewall-scan-part-2
213-Exploit Office 2016 using CVE-2018-0802: https://technologyredefine.blogspot.com/2018/01/exploit-office-2016-using-cve-2018-0802.html
214-windows-exploit-suggester: https://technologyredefine.blogspot.com/2018/01/windows-exploit-suggester.html
215-INSTALLING PRESISTENCE BACKDOOR IN WINDOWS: https://technologyredefine.blogspot.com/2018/01/installing-presistence-backdoor-in.html
216-IDS, IPS AND FIREWALL EVASION USING NMAP: https://technologyredefine.blogspot.com/2017/09/ids-ips-and-firewall-evasion-using-nmap.html
217-Wireless Penetration Testing Checklist – A Detailed Cheat Sheet: https://gbhackers.com/wireless-penetration-testing-checklist-a-detailed-cheat-sheet
218-Most Important Web Application Security Tools & Resources for Hackers and Security Professionals: https://gbhackers.com/web-application-security-tools-resources
219-Web Application Penetration Testing Checklist – A Detailed Cheat Sheet: https://gbhackers.com/web-application-penetration-testing-checklist-a-detailed-cheat-sheet
220-Top 500 Most Important XSS Script Cheat Sheet for Web Application Penetration Testing: https://gbhackers.com/top-500-important-xss-cheat-sheet
221-USBStealer – Password Hacking Tool For Windows Machine Applications: https://gbhackers.com/pasword-hacking
222-Most Important Mobile Application Penetration Testing Cheat sheet with Tools & Resources for Security Professionals: https://gbhackers.com/mobile-application-penetration-testing
223-Metasploit Can Be Directly Used For Hardware Penetration Testing Now: https://gbhackers.com/metasploit-can-be-directly-used-for-hardware-vulnerability-testing-now
224-How to Perform Manual SQL Injection While Pentesting With Single quote Error Based Parenthesis Method: https://gbhackers.com/manual-sql-injection-2
225-Email Spoo ng – Exploiting Open Relay configured Public Mailservers: https://gbhackers.com/email-spoofing-exploiting-open-relay
226-Email Header Analysis – Received Email is Genuine or Spoofed: https://gbhackers.com/email-header-analysis
227-Most Important Cyber Threat Intelligence Tools List For Hackers and Security Professionals: https://gbhackers.com/cyber-threat-intelligence-tools
228-Creating and Analyzing a Malicious PDF File with PDF-Parser Tool: https://gbhackers.com/creating-and-analyzing-a-malicious-pdf-file-with-pdf-parser-tool
229-Commix – Automated All-in-One OS Command Injection and Exploitation Tool: https://gbhackers.com/commix-automated-all-in-one-os-command-injection-and-exploitation-tool
230-Advanced ATM Penetration Testing Methods: https://gbhackers.com/advanced-atm-penetration-testing-methods
231-A8-Cross-Site Request Forgery (CSRF): https://gbhackers.com/a8-cross-site-request-forgery-csrf
232-Fully undetectable backdooring PE File: https://haiderm.com/fully-undetectable-backdooring-pe-file/
233-backdooring exe files: https://haiderm.com/tag/backdooring-exe-files/
234-From PHP (s)HELL to Powershell Heaven: https://medium.com/p/da40ce840da8
235-Forensic Investigation of Nmap Scan using Wireshark: http://www.hackingarticles.in/forensic-investigation-of-nmap-scan-using-wireshark
236-Unleashing an Ultimate XSS Polyglot: https://github.com/0xsobky/HackVault/wiki
237-wifi-arsenal: https://github.com/0x90/wifi-arsenal
238-XXE_payloads: https://gist.github.com/staaldraad/01415b990939494879b4
239-xss_payloads_2016: https://github.com/7ioSecurity/XSS-Payloads/raw/master/xss_payloads_2016
240-A curated list of awesome command-line frameworks, toolkits, guides and gizmos. Inspired by awesome-php.: https://github.com/alebcay/awesome-shell
241-The goal of this repository is to document the most common techniques to bypass AppLocker.: https://github.com/api0cradle/UltimateAppLockerByPassList
242-A curated list of CTF frameworks, libraries, resources and softwares: https://github.com/apsdehal/awesome-ctf
243-A collection of android security related resources: https://github.com/ashishb/android-security-awesome
244-OSX and iOS related security tools: https://github.com/ashishb/osx-and-ios-security-awesome
245-regexp-security-cheatsheet: https://github.com/attackercan/regexp-security-cheatsheet
246-PowerView-2.0 tips and tricks: https://gist.github.com/HarmJ0y/3328d954607d71362e3c
247-A curated list of awesome awesomeness: https://github.com/bayandin/awesome-awesomeness
248-Android App Security Checklist: https://github.com/b-mueller/android_app_security_checklist
249-Crack WPA/WPA2 Wi-Fi Routers with Airodump-ng and Aircrack-ng/Hashcat: https://github.com/brannondorsey/wifi-cracking
250-My-Gray-Hacker-Resources: https://github.com/bt3gl/My-Gray-Hacker-Resources
251-A collection of tools developed by other researchers in the Computer Science area to process network traces: https://github.com/caesar0301/awesome-pcaptools
252-A curated list of awesome Hacking tutorials, tools and resources: https://github.com/carpedm20/awesome-hacking
253-RFSec-ToolKit is a collection of Radio Frequency Communication Protocol Hacktools.: https://github.com/cn0xroot/RFSec-ToolKit
254-Collection of the cheat sheets useful for pentesting: https://github.com/coreb1t/awesome-pentest-cheat-sheets
255-Collection of the cheat sheets useful for pentesting: https://github.com/coreb1t/awesome-pentest-cheat-sheets
256-Collection of the cheat sheets useful for pentesting: https://github.com/coreb1t/awesome-pentest-cheat-sheets
257-A curated list of awesome forensic analysis tools and resources: https://github.com/cugu/awesome-forensics
258-Open-Redirect-Payloads: https://github.com/cujanovic/Open-Redirect-Payloads
259-A Threat hunter's playbook to aid the development of techniques and hypothesis for hunting campaigns.: https://github.com/Cyb3rWard0g/ThreatHunter-Playbook
260-Windows memory hacking library: https://github.com/DarthTon/Blackbone
261-A collective list of public JSON APIs for use in security.: https://github.com/deralexxx/security-apis
262-An authoritative list of awesome devsecops tools with the help from community experiments and contributions.: https://github.com/devsecops/awesome-devsecops
263-List of Awesome Hacking places, organised by Country and City, listing if it features power and wifi: https://github.com/diasdavid/awesome-hacking-spots
264-A comprehensive curated list of available Bug Bounty & Disclosure Programs and Write-ups: https://github.com/djadmin/awesome-bug-bounty
265-Notes for taking the OSCP in 2097: https://github.com/dostoevskylabs/dostoevsky-pentest-notes
266-A curated list of awesome Windows Exploitation resources, and shiny things. Inspired by awesom: https://github.com/enddo/awesome-windows-exploitation
267-A curated list of resources (books, tutorials, courses, tools and vulnerable applications) for learning about Exploit Development: https://github.com/FabioBaroni/awesome-exploit-development
268-A curated list of awesome reversing resources: https://github.com/fdivrp/awesome-reversing
269-Git All the Payloads! A collection of web attack payloads: https://github.com/foospidy/payloads
270-GitHub Project Resource List: https://github.com/FuzzySecurity/Resource-List
271-Use your macOS terminal shell to do awesome things.: https://github.com/herrbischoff/awesome-macos-command-line
272-Defeating Windows User Account Control: https://github.com/hfiref0x/UACME
273-Free Security and Hacking eBooks: https://github.com/Hack-with-Github/Free-Security-eBooks
274-Universal Radio Hacker: investigate wireless protocols like a boss: https://github.com/jopohl/urh
275-A curated list of movies every hacker & cyberpunk must watch: https://github.com/k4m4/movies-for-hackers
276-Various public documents, whitepapers and articles about APT campaigns: https://github.com/kbandla/APTnotes
277-A database of common, interesting or useful commands, in one handy referable form: https://github.com/leostat/rtfm
278-A curated list of tools for incident response: https://github.com/meirwah/awesome-incident-response
279-A curated list of awesome guides, tools, and other resources related to the security and compromise of locks, safes, and keys: https://github.com/meitar/awesome-lockpicking
280-A curated list of static analysis tools, linters and code quality checkers for various programming languages: https://github.com/mre/awesome-static-analysis
281-A Collection of Hacks in IoT Space so that we can address them (hopefully): https://github.com/nebgnahz/awesome-iot-hacks
281-A Course on Intermediate Level Linux Exploitation: https://github.com/nnamon/linux-exploitation-course
282-Kali Linux Cheat Sheet for Penetration Testers: https://github.com/NoorQureshi/kali-linux-cheatsheet
283-A curated list of awesome infosec courses and training resources.: https://github.com/onlurking/awesome-infosec
284-A curated list of resources for learning about application security: https://github.com/paragonie/awesome-appsec
285-an awesome list of honeypot resources: https://github.com/paralax/awesome-honeypots
286-GitHub Enterprise SQL Injection: https://www.blogger.com/share-post.g?blogID=2987759532072489303&postID=6980097238231152493
287-A curated list of fuzzing resources ( Books, courses - free and paid, videos, tools, tutorials and vulnerable applications to practice on ) for learning Fuzzing and initial phases of Exploit Development like root cause analysis: https://github.com/secfigo/Awesome-Fuzzing
288-PHP htaccess injection cheat sheet: https://github.com/sektioneins/pcc/wiki
289-A curated list of the awesome resources about the Vulnerability Research: https://github.com/sergey-pronin/Awesome-Vulnerability-Research
290-A list of useful payloads and bypass for Web Application Security and Pentest/CTF: https://github.com/swisskyrepo/PayloadsAllTheThings
291-A collection of Red Team focused tools, scripts, and notes: https://github.com/threatexpress/red-team-scripts
292-Awesome XSS stuff: https://github.com/UltimateHackers/AwesomeXSS
293-A collection of hacking / penetration testing resources to make you better!: https://github.com/vitalysim/Awesome-Hacking-Resources
294-Docker Cheat Sheet: https://github.com/wsargent/docker-cheat-sheet
295-Decrypted content of eqgrp-auction-file.tar.xz: https://github.com/x0rz/EQGRP
296-A bunch of links related to Linux kernel exploitation: https://github.com/xairy/linux-kernel-exploitation
297-Penetration Testing 102 - Windows Privilege Escalation Cheatsheet: www.exumbraops.com/penetration-testing-102-windows-privilege-escalation-cheatsheet
298-Pentesting Cheatsheet: https://anhtai.me/pentesting-cheatsheet/
299-Windows Privilege Escalation Methods for Pentesters: https://pentest.blog/windows-privilege-escalation-methods-for-pentesters/
300-Penetration Testing Cheat Sheet For Windows Machine – Intrusion Detection:
301-Reading Your Way Around UAC (Part 1): https://tyranidslair.blogspot.co.uk/2017/05/reading-your-way-around-uac-part-1.html
302--Reading Your Way Around UAC (Part 2): https://tyranidslair.blogspot.co.uk/2017/05/reading-your-way-around-uac-part-2.html
303-Executing Metasploit & Empire Payloads from MS Office Document Properties (part 2 of 2): https://stealingthe.network/executing-metasploit-empire-payloads-from-ms-office-document-properties-part-2-of-2/
304-SSRF - Server Side Request Forgery (Types and ways to exploit it) Part-1: https://medium.com/p/29d034c27978
304-Automating Cobalt Strike,Aggressor Collection Scripts: https://github.com/bluscreenofjeff/AggressorScripts
305-Vi Cheat Sheet: https://highon.coffee/blog/vi-cheat-sheet/
306-Network Recon Cheat Sheet: https://www.cheatography.com/coffeefueled/cheat-sheets/network-recon/
307-LFI Cheat Sheet: https://highon.coffee/blog/lfi-cheat-sheet/
308-Systemd Cheat Sheet: https://highon.coffee/blog/systemd-cheat-sheet/
309-Aircrack-ng Cheatsheet: https://securityonline.info/aircrack-ng-cheatsheet/
310-Kali Linux Cheat Sheet for Penetration Testers: https://www.blackmoreops.com/?p=7212
311-Wifi Pentesting Command Cheatsheet: https://randomkeystrokes.com/2016/07/01/wifi-pentesting-cheatsheet/
312-Android Testing Environment Cheatsheet (Part 1): https://randomkeystrokes.com/2016/10/17/android-testing-environment-cheatsheet/
313-cheatsheet: https://randomkeystrokes.com/category/cheatsheet/
314-Reverse Shell Cheat Sheet: https://highon.coffee/blog/reverse-shell-cheat-sheet/
315-Linux Commands Cheat Sheet: https://highon.coffee/blog/linux-commands-cheat-sheet/
316-Linux Privilege Escalation using Sudo Rights: http://www.hackingarticles.in/linux-privilege-escalation-using-exploiting-sudo-rights
317-Linux Privilege Escalation using Misconfigured NFS: http://www.hackingarticles.in/linux-privilege-escalation-using-misconfigured-nfs/
318-Linux Privilege Escalation by Exploiting Cronjobs: http://www.hackingarticles.in/linux-privilege-escalation-by-exploiting-cron-jobs/
319-Web Penetration Testing: http://www.hackingarticles.in/web-penetration-testing/
320-Webshell to Meterpreter: http://www.hackingarticles.in/webshell-to-meterpreter
321-WordPress Penetration Testing using WPScan & Metasploit: http://www.hackingarticles.in/wordpress-penetration-testing-using-wpscan-metasploit
322-XSS Exploitation in DVWA (Bypass All Security): http://www.hackingarticles.in/xss-exploitation-dvwa-bypass-security
323-Linux Privilege Escalation Using PATH Variable: http://www.hackingarticles.in/linux-privilege-escalation-using-path-variable/
324-VNC tunneling over SSH: http://www.hackingarticles.in/vnc-tunneling-ssh
325-VNC Pivoting through Meterpreter: http://www.hackingarticles.in/vnc-pivoting-meterpreter
326-Week of Evading Microsoft ATA - Announcement and Day 1: https://www.labofapenetrationtester.com/2017/08/week-of-evading-microsoft-ata-day1.html
327-Abusing DNSAdmins privilege for escalation in Active Directory: https://www.labofapenetrationtester.com/2017/05/abusing-dnsadmins-privilege-for-escalation-in-active-directory.html
328-Using SQL Server for attacking a Forest Trust: https://www.labofapenetrationtester.com/2017/03/using-sql-server-for-attacking-forest-trust.html
329-Empire : http://www.harmj0y.net/blog/category/empire/
330-8 Deadly Commands You Should Never Run on Linux: https://www.howtogeek.com/125157/8-deadly-commands-you-should-never-run-on-linux/
331-External C2 framework for Cobalt Strike: https://www.insomniacsecurity.com/2018/01/11/externalc2.html
332-How to use Public IP on Kali Linux: http://www.hackingarticles.in/use-public-ip-kali-linux
333-Bypass Admin access through guest Account in windows 10: http://www.hackingarticles.in/bypass-admin-access-guest-account-windows-10
334-Bypass Firewall Restrictions with Metasploit (reverse_tcp_allports): http://www.hackingarticles.in/bypass-firewall-restrictions-metasploit-reverse_tcp_allports
335-Bypass SSH Restriction by Port Relay: http://www.hackingarticles.in/bypass-ssh-restriction-by-port-relay
336-Bypass UAC Protection of Remote Windows 10 PC (Via FodHelper Registry Key): http://www.hackingarticles.in/bypass-uac-protection-remote-windows-10-pc-via-fodhelper-registry-key
337-Bypass UAC in Windows 10 using bypass_comhijack Exploit: http://www.hackingarticles.in/bypass-uac-windows-10-using-bypass_comhijack-exploit
338-Bind Payload using SFX archive with Trojanizer: http://www.hackingarticles.in/bind-payload-using-sfx-archive-trojanizer
339-Capture NTLM Hashes using PDF (Bad-Pdf): http://www.hackingarticles.in/capture-ntlm-hashes-using-pdf-bad-pdf
340-Best of Post Exploitation Exploits & Tricks: http://www.hackingarticles.in/best-of-post-exploitation-exploits-tricks/
341-Detect SQL Injection Attack using Snort IDS: http://www.hackingarticles.in/detect-sql-injection-attack-using-snort-ids/
342-Beginner Guide to Website Footprinting: http://www.hackingarticles.in/beginner-guide-website-footprinting/
343-How to Enable and Monitor Firewall Log in Windows PC: http://www.hackingarticles.in/enable-monitor-firewall-log-windows-pc/
344-Wifi Post Exploitation on Remote PC: http://www.hackingarticles.in/wifi-post-exploitation-remote-pc/
335-Check Meltdown Vulnerability in CPU: http://www.hackingarticles.in/check-meltdown-vulnerability-cpu
336-XXE: https://phonexicum.github.io/infosec/xxe.html
337-[XSS] Re ected XSS Bypass Filter: https://medium.com/p/de41d35239a3
338-Engagement Tools Tutorial in Burp suite: http://www.hackingarticles.in/engagement-tools-tutorial-burp-suite
339-Wiping Out CSRF: https://medium.com/@jrozner/wiping-out-csrf-ded97ae7e83f
340-First entry: Welcome and fileless UAC bypass: https://winscripting.blog/2017/05/12/first-entry-welcome-and-uac-bypass/
341-Writing a Custom Shellcode Encoder: https://medium.com/p/31816e767611
342-Security Harden CentOS 7 : https://highon.coffee/blog/security-harden-centos-7/
343-THE BIG BAD WOLF - XSS AND MAINTAINING ACCESS: https://www.paulosyibelo.com/2018/06/the-big-bad-wolf-xss-and-maintaining.html
344-MySQL: https://websec.ca/kb/CHANGELOG.txt
345-Deobfuscation of VM based software protection: http://shell-storm.org/talks/SSTIC2017_Deobfuscation_of_VM_based_software_protection.pdf
346-Online Assembler and Disassembler: http://shell-storm.org/online/Online-Assembler-and-Disassembler/
347-Shellcodes database for study cases: http://shell-storm.org/shellcode/
348-Dynamic Binary Analysis and Obfuscated Codes: http://shell-storm.org/talks/sthack2016-rthomas-jsalwan.pdf
349-How Triton may help to analyse obfuscated binaries: http://triton.quarkslab.com/files/misc82-triton.pdf
350-Triton: A Concolic Execution Framework: http://shell-storm.org/talks/SSTIC2015_English_slide_detailed_version_Triton_Concolic_Execution_FrameWork_FSaudel_JSalwan.pdf
351-Automatic deobfuscation of the Tigress binary protection using symbolic execution and LLVM: https://github.com/JonathanSalwan/Tigress_protection
352-What kind of semantics information Triton can provide?: http://triton.quarkslab.com/blog/What-kind-of-semantics-information-Triton-can-provide/
353-Code coverage using a dynamic symbolic execution: http://triton.quarkslab.com/blog/Code-coverage-using-dynamic-symbolic-execution/
354-Triton (concolic execution framework) under the hood: http://triton.quarkslab.com/blog/first-approach-with-the-framework/
355-- Stack and heap overflow detection at runtime via behavior analysis and Pin: http://shell-storm.org/blog/Stack-and-heap-overflow-detection-at-runtime-via-behavior-analysis-and-PIN/
356-Binary analysis: Concolic execution with Pin and z3: http://shell-storm.org/blog/Binary-analysis-Concolic-execution-with-Pin-and-z3/
357-In-Memory fuzzing with Pin: http://shell-storm.org/blog/In-Memory-fuzzing-with-Pin/
358-Hackover 2015 r150 (outdated solving for Triton use cases): https://github.com/JonathanSalwan/Triton/blob/master/src/examples/python/ctf-writeups/hackover-ctf-2015-r150/solve.py
359-Skip sh – Web Application Security Scanner for XSS, SQL Injection, Shell injection: https://gbhackers.com/skipfish-web-application-security-scanner
360-Sublist3r – Tool for Penetration testers to Enumerate Sub-domains: https://gbhackers.com/sublist3r-penetration-testers
361-bypassing application whitelisting with bginfo: https://oddvar.moe/2017/05/18/bypassing-application-whitelisting-with-bginfo/
362-accessing-clipboard-from-the-lock-screen-in-windows-10: https://oddvar.moe/2017/01/24/accessing-clipboard-from-the-lock-screen-in-windows-10/
363-bypassing-device-guard-umci-using-chm-cve-2017-8625: https://oddvar.moe/2017/08/13/bypassing-device-guard-umci-using-chm-cve-2017-8625/
364-defense-in-depth-writeup: https://oddvar.moe/2017/09/13/defense-in-depth-writeup/
365-applocker-case-study-how-insecure-is-it-really-part-1: https://oddvar.moe/2017/12/13/applocker-case-study-how-insecure-is-it-really-part-1/
366-empires-cross-platform-office-macro: https://www.blackhillsinfosec.com/empires-cross-platform-office-macro/
367-recon tools: https://blackarch.org/recon.html
368-Black Hat 2018 tools list: https://medium.com/p/991fa38901da
369-Application Introspection & Hooking With Frida: https://www.fuzzysecurity.com/tutorials/29.html
370-And I did OSCP!: https://medium.com/p/589babbfea19
371-CoffeeMiner: Hacking WiFi to inject cryptocurrency miner to HTML requests: https://arnaucube.com/blog/coffeeminer-hacking-wifi-cryptocurrency-miner.html
372-Most Important Endpoint Security & Threat Intelligence Tools List for Hackers and Security Professionals: https://gbhackers.com/threat-intelligence-tools
373-Penetration Testing Cheat Sheet For Windows Machine – Intrusion Detection: https://techincidents.com/penetration-testing-cheat-sheet/
374-privilege escalation: https://toshellandback.com/category/privilege-escalation/
375-The Complete List of Windows Post-Exploitation Commands (No Powershell): https://medium.com/p/999b5433b61e
376-The Art of Subdomain Enumeration: https://blog.sweepatic.com/tag/subdomain-enumeration/
377-The Principles of a Subdomain Takeover: https://blog.sweepatic.com/subdomain-takeover-principles/
378-The journey of Web Cache + Firewall Bypass to SSRF to AWS credentials compromise!: https://medium.com/p/b250fb40af82
379-The Solution for Web for Pentester-I: https://medium.com/p/4c21b3ae9673
380-The Ultimate Penetration Testing Command Cheat Sheet for Linux: https://www.hackingloops.com/command-cheat-sheet-for-linux/
381-: Ethical Hacking, Hack Tools, Hacking Tricks, Information Gathering, Penetration Testing, Recommended: https://www.hackingloops.com/hacking-tricks/
383-Introduction to Exploitation, Part 1: Introducing Concepts and Terminology: https://www.hackingloops.com/exploitation-terminology/
384-How Hackers Kick Victims Off of Wireless Networks: https://www.hackingloops.com/kick-victims-off-of-wireless-networks/
385-Maintaining Access Part 1: Introduction and Metasploit Example: https://www.hackingloops.com/maintaining-access-metasploit/
386-How to Steal Windows Credentials with Mimikatz and Metasploit: https://www.hackingloops.com/mimikatz/
387-Evading Anti-virus Part 2: Obfuscating Payloads with Msfvenom: https://www.hackingloops.com/msfvenom/
388-Evading Anti-virus Part 1: Infecting EXEs with Shellter: https://www.hackingloops.com/evading-anti-virus-shellter/
389-Mobile Hacking Part 4: Fetching Payloads via USB Rubber Ducky: https://www.hackingloops.com/payloads-via-usb-rubber-ducky/
390-Ethical Hacking Practice Test 6 – Footprinting Fundamentals Level1: https://www.hackingloops.com/ethical-hacking-practice-test-6-footprinting-fundamentals-level1/
391-Skip Cracking Responder Hashes and Relay Them: https://threat.tevora.com/quick-tip-skip-cracking-responder-hashes-and-replay-them/
392-Cracking NTLMv1 Handshakes with Crack.sh: http://threat.tevora.com/quick-tip-crack-ntlmv1-handshakes-with-crack-sh/
393-Top 3 Anti-Forensic OpSec Tips for Linux & A New Dead Man’s Switch: https://medium.com/p/d5e92843e64a
394-VNC Penetration Testing (Port 5901): http://www.hackingarticles.in/vnc-penetration-testing
395-Windows Privilege Escalation: http://www.bhafsec.com/wiki/index.php/Windows_Privilege_Escalation
396-Removing Sender’s IP Address From Email’s Received: From Header: https://www.devside.net/wamp-server/removing-senders-ip-address-from-emails-received-from-header
397-Dump Cleartext Password in Linux PC using MimiPenguin: http://www.hackingarticles.in/dump-cleartext-password-linux-pc-using-mimipenguin
398-Embedded Backdoor with Image using FakeImageExploiter: http://www.hackingarticles.in/embedded-backdoor-image-using-fakeimageexploiter
399-Exploit Command Injection Vulnearbility with Commix and Netcat: http://www.hackingarticles.in/exploit-command-injection-vulnearbility-commix-netcat
400-Exploiting Form Based Sql Injection using Sqlmap: http://www.hackingarticles.in/exploiting-form-based-sql-injection-using-sqlmap
401-Beginner Guide to impacket Tool kit: http://www.hackingarticles.in/beginner-guide-to-impacket-tool-kit
402-Best of Post Exploitation Exploits & Tricks: http://www.hackingarticles.in/best-of-post-exploitation-exploits-tricks
403-Command Injection to Meterpreter using Commix: http://www.hackingarticles.in/command-injection-meterpreter-using-commix
404-Comprehensive Guide to Crunch Tool: http://www.hackingarticles.in/comprehensive-guide-to-crunch-tool
405-Compressive Guide to File Transfer (Post Exploitation): http://www.hackingarticles.in/compressive-guide-to-file-transfer-post-exploitation
406-Crack Wifi Password using Aircrack-Ng (Beginner’s Guide): http://www.hackingarticles.in/crack-wifi-password-using-aircrack-ng
407-How to Detect Meterpreter in Your PC: http://www.hackingarticles.in/detect-meterpreter-pc
408-Easy way to Hack Database using Wizard switch in Sqlmap: http://www.hackingarticles.in/easy-way-hack-database-using-wizard-switch-sqlmap
409-Exploiting the Webserver using Sqlmap and Metasploit (OS-Pwn): http://www.hackingarticles.in/exploiting-webserver-using-sqlmap-metasploit-os-pwn
410-Create SSL Certified Meterpreter Payload using MPM: http://www.hackingarticles.in/exploit-remote-pc-ssl-certified-meterpreter-payload-using-mpm
411-Port forwarding: A practical hands-on guide: https://www.abatchy.com/2017/01/port-forwarding-practical-hands-on-guide
412-Exploit Dev 101: Jumping to Shellcode: https://www.abatchy.com/2017/05/jumping-to-shellcode.html
413-Introduction to Manual Backdooring: https://www.abatchy.com/2017/05/introduction-to-manual-backdooring_24.html
414-Kernel Exploitation: https://www.abatchy.com/2018/01/kernel-exploitation-1
415-Exploit Dev 101: Bypassing ASLR on Windows: https://www.abatchy.com/2017/06/exploit-dev-101-bypassing-aslr-on.html
416-Shellcode reduction tips (x86): https://www.abatchy.com/2017/04/shellcode-reduction-tips-x86
417-OSCE Study Plan: https://www.abatchy.com/2017/03/osce-study-plan
418-[DefCamp CTF Qualification 2017] Don't net, kids! (Revexp 400): https://www.abatchy.com/2017/10/defcamp-dotnot
419-DRUPAL 7.X SERVICES MODULE UNSERIALIZE() TO RCE: https://www.ambionics.io/
420-SQL VULNERABLE WEBSITES LIST 2017 [APPROX 2500 FRESH SQL VULNERABLE SITES]: https://www.cityofhackerz.com/sql-vulnerable-websites-list-2017
421-Windows IR Live Forensics Cheat Sheet: https://www.cheatography.com/tag/forensics/
422-windows-kernel-logic-bug-class-access: https://googleprojectzero.blogspot.com/2019/03/windows-kernel-logic-bug-class-access.html
423-injecting-code-into-windows-protected: https://googleprojectzero.blogspot.com/2018/11/injecting-code-into-windows-protected.html
424-USING THE DDE ATTACK WITH POWERSHELL EMPIRE: https://1337red.wordpress.com/using-the-dde-attack-with-powershell-empire
425-Automated Derivative Administrator Search: https://wald0.com/?p=14
426-A Red Teamer’s Guide to GPOs and OUs: https://wald0.com/?p=179
427-Pen Testing and Active Directory, Part VI: The Final Case: https://blog.varonis.com/pen-testing-active-directory-part-vi-final-case/
428-Offensive Tools and Techniques: https://www.sec.uno/2017/03/01/offensive-tools-and-techniques/
429-Three penetration testing tips to out-hack hackers: http://infosechotspot.com/three-penetration-testing-tips-to-out-hack-hackers-betanews/
430-Introducing BloodHound: https://wald0.com/?p=68
431-Red + Blue = Purple: http://www.blackhillsinfosec.com/?p=5368
432-Active Directory Access Control List – Attacks and Defense – Enterprise Mobility and Security Blog: https://blogs.technet.microsoft.com/enterprisemobility/2017/09/18/active-directory-access-control-list-attacks-and-defense/
433-PrivEsc: Unquoted Service Path: https://www.gracefulsecurity.com/privesc-unquoted-service-path/
434-PrivEsc: Insecure Service Permissions: https://www.gracefulsecurity.com/privesc-insecure-service-permissions/
435-PrivEsc: DLL Hijacking: https://www.gracefulsecurity.com/privesc-dll-hijacking/
436-Android Reverse Engineering 101 – Part 1: http://www.fasteque.com/android-reverse-engineering-101-part-1/
437-Luckystrike: An Evil Office Document Generator: https://www.shellntel.com/blog/2016/9/13/luckystrike-a-database-backed-evil-macro-generator
438-the-number-one-pentesting-tool-youre-not-using: https://www.shellntel.com/blog/2016/8/3/the-number-one-pentesting-tool-youre-not-using
439-uac-bypass: http://www.securitynewspaper.com/tag/uac-bypass/
440-XSSer – Automated Framework Tool to Detect and Exploit XSS vulnerabilities: https://gbhackers.com/xsser-automated-framework-detectexploit-report-xss-vulnerabilities
441-Penetration Testing on X11 Server: http://www.hackingarticles.in/penetration-testing-on-x11-server
442-Always Install Elevated: https://pentestlab.blog/2017/02/28/always-install-elevated
443-Scanning for Active Directory Privileges & Privileged Accounts: https://adsecurity.org/?p=3658
444-Windows Server 2016 Active Directory Features: https://adsecurity.org/?p=3646
445-powershell: https://adsecurity.org/?tag=powershell
446-PowerShell Security: PowerShell Attack Tools, Mitigation, & Detection: https://adsecurity.org/?p=2921
447-DerbyCon 6 (2016) Talk – Attacking EvilCorp: Anatomy of a Corporate Hack: https://adsecurity.org/?p=3214
448-Real-World Example of How Active Directory Can Be Compromised (RSA Conference Presentation): https://adsecurity.org/?p=2085
449-Advanced ATM Penetration Testing Methods: https://gbhackers.com/advanced-atm-penetration-testing-methods
450-Background: Microsoft Ofice Exploitation: https://rhinosecuritylabs.com/research/abusing-microsoft-word-features-phishing-subdoc/
451-Automated XSS Finder: https://medium.com/p/4236ed1c6457
452-Application whitelist bypass using XLL and embedded shellcode: https://rileykidd.com/.../application-whitelist-bypass-using-XLL-and-embedded-shellc
453-AppLocker Bypass – Regsvr32: https://pentestlab.blog/2017/05/11/applocker-bypass-regsvr32
454-Nmap Scans using Hex Value of Flags: http://www.hackingarticles.in/nmap-scans-using-hex-value-flags
455-Nmap Scan with Timing Parameters: http://www.hackingarticles.in/nmap-scan-with-timing-parameters
456-OpenSSH User Enumeration Time- Based Attack with Osueta: http://www.hackingarticles.in/openssh-user-enumeration-time-based-attack-osueta
457-Penetration Testing: http://www.hackingarticles.in/web-penetration-testing/
458-Penetration Testing on Remote Desktop (Port 3389): http://www.hackingarticles.in/penetration-testing-remote-desktop-port-3389
459-Penetration Testing on Telnet (Port 23): http://www.hackingarticles.in/penetration-testing-telnet-port-23
460-Penetration Testing in Windows/Active Directory with Crackmapexec: http://www.hackingarticles.in/penetration-testing-windowsactive-directory-crackmapexec
461-Penetration Testing in WordPress Website using WordPress Exploit Framework: http://www.hackingarticles.in/penetration-testing-wordpress-website-using-wordpress-exploit-framework
462-Port Scanning using Metasploit with IPTables: http://www.hackingarticles.in/port-scanning-using-metasploit-iptables
463-Post Exploitation Using WMIC (System Command): http://www.hackingarticles.in/post-exploitation-using-wmic-system-command
464-Privilege Escalation in Linux using etc/passwd file: http://www.hackingarticles.in/privilege-escalation-in-linux-using-etc-passwd-file
465-RDP Pivoting with Metasploit: http://www.hackingarticles.in/rdp-pivoting-metasploit
466-A New Way to Hack Remote PC using Xerosploit and Metasploit: http://www.hackingarticles.in/new-way-hack-remote-pc-using-xerosploit-metasploit
467-Shell to Meterpreter using Session Command: http://www.hackingarticles.in/shell-meterpreter-using-session-command
468-SMTP Pentest Lab Setup in Ubuntu (Port 25): http://www.hackingarticles.in/smtp-pentest-lab-setup-ubuntu
469-SNMP Lab Setup and Penetration Testing: http://www.hackingarticles.in/snmp-lab-setup-and-penetration-testing
470-SQL Injection Exploitation in Multiple Targets using Sqlmap: http://www.hackingarticles.in/sql-injection-exploitation-multiple-targets-using-sqlmap
471-Sql Injection Exploitation with Sqlmap and Burp Suite (Burp CO2 Plugin): http://www.hackingarticles.in/sql-injection-exploitation-sqlmap-burp-suite-burp-co2-plugin
472-SSH Penetration Testing (Port 22): http://www.hackingarticles.in/ssh-penetration-testing-port-22
473-Manual Post Exploitation on Windows PC (System Command): http://www.hackingarticles.in/manual-post-exploitation-windows-pc-system-command
474-SSH Pivoting using Meterpreter: http://www.hackingarticles.in/ssh-pivoting-with-meterpreter
475-Bypassing AMSI with Obfuscation: https://amsi.fail/blog/amsi-bypass-methods-2023
476-Red Team Ops: A Guide to Credential Access: https://redops.wiki/credential-access
477-AD CS (Active Directory Certificate Services) Abuse: https://specterops.io/wp-content/uploads/sites/3/2022/6/Certified_Pre-Owned.pdf
478-C2 with Cloud Services (Azure, GCP): https://posts.redteaming.io/cloud-c2-infrastructure
479-Introduction to Hardware Hacking: https://hardware-hacking-101.com/introduction
480-Ghidra for Reverse Engineers: A Practical Guide: https://ghidra.re/guide-for-beginners
481-Advanced XXE Injection Techniques: https://websec.example.com/advanced-xxe
482-Hacking GraphQL APIs for Fun and Profit: https://medium.com/p/hacking-graphql-apis
483-Practical Deserialization Vulnerabilities: https://portswigger.example.net/web-security/deserialization
484-OAuth 2.0 Security Best Practices: https://oauth.example.net/security/
485-Dynamic Malware Analysis with Cuckoo Sandbox: https://cuckoosandbox.example.org/docs/introduction/
486-Reverse Engineering Android Apps with Jadx: https://github.com/skylot/jadx
487-Analyzing Ransomware Encryption Routines: https://malware.example.com/ransomware-encryption
488-Container Escape Techniques Explained: https://blog.kubernetes.example/container-escape
489-Introduction to eBPF for Security Monitoring: https://ebpf.example.io/what-is-ebpf
490-Hardening Docker Containers: https://docs.docker.example.com/engine/security/hardening/
491-Automating OSINT with SpiderFoot: https://www.spiderfoot.example.net/
492-Advanced Google Dorking for Pentesters: https://pentestbook.example.com/google-dorking
493-Social Media Intelligence (SOCMINT) Tools: https://github.com/awesome-socmint/tools
494-Hacking Bluetooth Low Energy (BLE): https://www.ble-hacking.example.com/guide
495-Zigbee Security Fundamentals: https://zigbee.example.org/security
496-Practical Evil Twin Attacks: https://wifihacks.example.com/evil-twin-attacks
497-Modern Binary Exploitation (ROP, Ret2libc): https://ropemporium.example.com/
498-A Guide to File Upload Vulnerabilities: https://book.hacktricks.example.xyz/pentesting-web/file-upload
499-IoT Pentesting Methodology: https://iotpentest.example.com/methodology
500-Cloud Pentesting Cheatsheet (AWS, GCP, Azure): https://cloudsec.example.com/cheatsheet
501-API Security Checklist: https://github.com/shieldfy/API-Security-Checklist
502-Mobile Security Testing Guide (MSTG): https://owasp.example.org/www-project-mobile-security-testing-guide/
503-Living Off The Land Binaries and Scripts (LOLBAS): https://lolbas-project.github.io/
504-GTFOBins - Bypassing Local Security Restrictions in Unix-like Systems: https://gtfobins.github.io/
505-WADComs - An interactive cheat sheet of Windows administrative tools: https://wadcoms.github.io/
506-MITRE ATT&CK Framework Explained: https://attack.mitre.org/
507-Payloads All The Things - A list of useful payloads and bypasses: https://github.com/swisskyrepo/PayloadsAllTheThings
508-HackTricks - A Massive Collection of Hacking Tricks: https://book.hacktricks.xyz/
509-The Hacker Recipes - A cookbook for hackers: https://www.thehacker.recipes/
510-Exploiting SUID/GUID Programs: https://www.hackingarticles.in/linux-privilege-escalation-using-suid-binaries/
511-Active Directory Kill Chain Attack & Defense: https://adsecurity.org/?p=2398
512-Getting Started with Frida for Dynamic Instrumentation: https://frida.re/docs/javascript-api/
513-Awesome Threat Intelligence: https://github.com/hslatman/awesome-threat-intelligence
514-YARA Rule Writing for Beginners: https://www.virustotal.com/docs/yara
515-Pentesting Active Directory: A Cheatsheet: https://ired.team/offensive-security-experiments/active-directory-offensive-security
516-Evading Antivirus with Shellcode Injection: https://www.ired.team/offensive-security-experiments/code-injection-process-injection/shellcode-execution-in-a-local-process-with-createthread-and-virtualallocex
517-Password Spraying Attack Techniques: https://www.blackhillsinfosec.com/password-spraying/
518-Kerberos Delegation Explained: https://posts.specterops.io/a-wheel-of-time-and-space-kerberos-delegation-in-active-directory-part-one-of-infinity-4b1798319f7e
519-How to use BloodHound for Active Directory Recon: https://hausec.com/2019/07/22/how-to-use-bloodhound/
520-Securing Jenkins for DevSecOps: https://www.practical-devsecops.com/securing-jenkins/
`;

// Function to extract domain from a URL
const getDomain = (url: string): string => {
  try {
    let fullUrl = url.trim();
    if (!fullUrl.startsWith('http')) {
      fullUrl = `https://${fullUrl}`;
    }
    const domain = new URL(fullUrl).hostname;
    return domain.replace(/^www\./, '');
  } catch (error) {
    const parts = url.split('/');
    if (parts.length > 0 && parts[0].includes('.')) {
      return parts[0].replace(/^www\./, '');
    }
    console.error(`Could not parse domain from URL: ${url}`, error);
    return 'unknown domain';
  }
};

const getCategory = (title: string): string => {
  const lowerTitle = title.toLowerCase();

  const categoryKeywords: { [key: string]: string[] } = {
    'Recon & OSINT': ['recon', 'osint', 'enumeration', 'dork', 'footprinting', 'sub-domain', 'subdomain', 'information gathering'],
    'Exploitation & Pentesting': ['exploit', 'pentest', 'pentesting', 'penetration testing', 'vulnerability', 'injection', 'cve', 'rce', 'lfi', 'metasploit', 'privilege escalation'],
    'Web Security (WebSec)': ['xss', 'csrf', 'sql injection', 'ssrf', 'websec', 'web application', 'waf', 'burp', 'open redirection'],
    'Red Teaming & C2': ['red team', 'red-team', 'c2', 'command and control', 'cobalt strike', 'empire', 'pivoting', 'lateral movement', 'c&c'],
    'Windows Security': ['windows', 'active directory', 'powershell', 'uac', 'dll', 'ntds', 'regsvr32', 'applocker', 'wmic', 'wmi'],
    'Linux Security': ['linux', 'unix', 'selinux', 'kernel', 'sudo', 'cronjob'],
    'Malware Analysis & RE': ['malware', 'reverse engineering', 'reversing', 'shellcode', 'obfuscation', 'fuzzing', 'anubis', 'yara', 'backdoor'],
    'Wireless & Network': ['wifi', 'wi-fi', 'wireless', 'wpa', 'aircrack', 'network', 'wireshark', 'nmap', 'ssh', 'dns', 'smb', 'ftp', 'vnc'],
    'Cheatsheets & Resources': ['cheat sheet', 'cheatsheet', 'resources', 'list', 'awesome', 'guide', 'toolkit', 'wiki', 'payloads'],
  };
  
  const categoriesToCheck = [
    'Recon & OSINT',
    'Exploitation & Pentesting',
    'Web Security (WebSec)',
    'Red Teaming & C2',
    'Windows Security',
    'Linux Security',
    'Malware Analysis & RE',
    'Wireless & Network',
    'Cheatsheets & Resources',
  ];

  for (const category of categoriesToCheck) {
    if (categoryKeywords[category]) {
      for (const keyword of categoryKeywords[category]) {
        if (lowerTitle.includes(keyword)) {
          return category;
        }
      }
    }
  }

  return 'Other';
};

const parseResources = (data: string): Resource[] => {
  const lines = data.trim().split('\n');
  const resources: Resource[] = [];
  const seenIds = new Set<number>();

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;
    
    const match = trimmedLine.match(/^(\d+)-{1,2}\s?/);
    if (!match) {
        console.warn(`Line does not start with a number-hyphen pattern: "${trimmedLine}"`);
        continue;
    }
    
    const id = parseInt(match[1], 10);
    if (seenIds.has(id)) {
        // Skip duplicate IDs to avoid key errors in React
        continue;
    }
    seenIds.add(id);

    const content = trimmedLine.substring(match[0].length).trim();
    
    // Improved split logic: find the last occurrence of ':', but check if it's part of a URL scheme
    let splitIndex = content.lastIndexOf(':');
    while(splitIndex > -1) {
        const afterColon = content.substring(splitIndex + 1).trim();
        const potentialProtocol = content.substring(0, splitIndex).trim().slice(-5).toLowerCase();
        
        // If "http" is right before the colon, it's likely part of a URL. Keep searching.
        if (potentialProtocol.includes('http') || afterColon.length < 5) {
            splitIndex = content.lastIndexOf(':', splitIndex - 1);
        } else {
            break;
        }
    }

    if (splitIndex === -1) {
        console.warn(`Could not reliably split title and URL: "${trimmedLine}"`);
        continue;
    }
    
    let title = content.substring(0, splitIndex).trim();
    let url = content.substring(splitIndex + 1).trim();

    if (title.startsWith(':')) {
      title = title.substring(1).trim();
    }
    if (!url) continue;

    const fullUrl = url.startsWith('http') || url.startsWith('//') ? url : `https://${url}`;

    const resource: Resource = {
      id,
      title,
      url: fullUrl,
      domain: getDomain(url),
      category: getCategory(title),
    };
    resources.push(resource);
  }

  return resources;
};

const allResources: Resource[] = parseResources(rawData);

export default allResources;