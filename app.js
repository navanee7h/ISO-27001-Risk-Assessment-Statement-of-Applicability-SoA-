// =============================================
// ISO 27001 Risk Assessment & SoA — App Logic
// =============================================

(function () {
    'use strict';

    // ============ SAMPLE DATA ============

    // Assets for NovaTech Solutions (fictional IT services company)
    const defaultAssets = [
        { id: 'A-001', name: 'Production Database Server', type: 'Hardware', owner: 'IT Operations', location: 'Primary Data Center', criticality: 'Very High' },
        { id: 'A-002', name: 'Employee Workstations', type: 'Hardware', owner: 'IT Support', location: 'Office Premises', criticality: 'Medium' },
        { id: 'A-003', name: 'Customer CRM System', type: 'Software', owner: 'Sales Department', location: 'Cloud (AWS)', criticality: 'High' },
        { id: 'A-004', name: 'Email & Collaboration Platform', type: 'Software', owner: 'IT Operations', location: 'Cloud (Microsoft 365)', criticality: 'High' },
        { id: 'A-005', name: 'Customer Personal Data', type: 'Data', owner: 'Data Protection Officer', location: 'Production Database', criticality: 'Very High' },
        { id: 'A-006', name: 'Financial Records', type: 'Data', owner: 'Finance Department', location: 'ERP System', criticality: 'Very High' },
        { id: 'A-007', name: 'Source Code Repository', type: 'Software', owner: 'Development Team', location: 'GitHub Enterprise', criticality: 'High' },
        { id: 'A-008', name: 'Network Infrastructure', type: 'Hardware', owner: 'Network Team', location: 'Server Room', criticality: 'Very High' },
        { id: 'A-009', name: 'Backup Storage System', type: 'Hardware', owner: 'IT Operations', location: 'Secondary Data Center', criticality: 'High' },
        { id: 'A-010', name: 'IT Staff', type: 'People', owner: 'HR Department', location: 'Office / Remote', criticality: 'High' },
        { id: 'A-011', name: 'Cloud Hosting Services', type: 'Service', owner: 'IT Operations', location: 'AWS / Azure', criticality: 'High' },
        { id: 'A-012', name: 'Office Building & Server Room', type: 'Facility', owner: 'Facilities Management', location: 'HQ Building', criticality: 'Medium' },
        { id: 'A-013', name: 'VPN Gateway', type: 'Hardware', owner: 'Network Team', location: 'DMZ', criticality: 'High' },
        { id: 'A-014', name: 'HR Management System', type: 'Software', owner: 'HR Department', location: 'On-Premise Server', criticality: 'Medium' },
        { id: 'A-015', name: 'API Gateway', type: 'Software', owner: 'Development Team', location: 'Cloud (AWS)', criticality: 'High' },
    ];

    // Risk Register
    const defaultRisks = [
        { id: 'R-001', assetId: 'A-001', asset: 'Production Database Server', threat: 'SQL Injection Attack', vulnerability: 'Unpatched database software', likelihood: 4, impact: 5, category: 'Cyber Attack' },
        { id: 'R-002', assetId: 'A-005', asset: 'Customer Personal Data', threat: 'Data Breach / Exfiltration', vulnerability: 'Weak access controls', likelihood: 4, impact: 5, category: 'Data Breach' },
        { id: 'R-003', assetId: 'A-008', asset: 'Network Infrastructure', threat: 'DDoS Attack', vulnerability: 'Insufficient DDoS mitigation', likelihood: 3, impact: 4, category: 'Cyber Attack' },
        { id: 'R-004', assetId: 'A-004', asset: 'Email & Collaboration Platform', threat: 'Phishing / Social Engineering', vulnerability: 'Lack of security awareness training', likelihood: 5, impact: 3, category: 'Human Factor' },
        { id: 'R-005', assetId: 'A-007', asset: 'Source Code Repository', threat: 'Unauthorized Code Access', vulnerability: 'Insufficient repository access controls', likelihood: 3, impact: 4, category: 'Unauthorized Access' },
        { id: 'R-006', assetId: 'A-002', asset: 'Employee Workstations', threat: 'Ransomware Infection', vulnerability: 'Outdated endpoint protection', likelihood: 4, impact: 4, category: 'Malware' },
        { id: 'R-007', assetId: 'A-006', asset: 'Financial Records', threat: 'Insider Threat / Fraud', vulnerability: 'No segregation of duties', likelihood: 2, impact: 5, category: 'Insider Threat' },
        { id: 'R-008', assetId: 'A-009', asset: 'Backup Storage System', threat: 'Backup Failure', vulnerability: 'Untested backup procedures', likelihood: 3, impact: 5, category: 'Operational' },
        { id: 'R-009', assetId: 'A-012', asset: 'Office Building & Server Room', threat: 'Physical Intrusion', vulnerability: 'Inadequate physical access controls', likelihood: 2, impact: 3, category: 'Physical' },
        { id: 'R-010', assetId: 'A-010', asset: 'IT Staff', threat: 'Key Personnel Departure', vulnerability: 'Single points of failure in knowledge', likelihood: 3, impact: 3, category: 'Human Factor' },
        { id: 'R-011', assetId: 'A-011', asset: 'Cloud Hosting Services', threat: 'Cloud Service Outage', vulnerability: 'Single cloud provider dependency', likelihood: 2, impact: 4, category: 'Operational' },
        { id: 'R-012', assetId: 'A-013', asset: 'VPN Gateway', threat: 'VPN Exploit / Bypass', vulnerability: 'Outdated VPN firmware', likelihood: 3, impact: 4, category: 'Cyber Attack' },
        { id: 'R-013', assetId: 'A-003', asset: 'Customer CRM System', threat: 'Privilege Escalation', vulnerability: 'Misconfigured role-based access', likelihood: 3, impact: 3, category: 'Unauthorized Access' },
        { id: 'R-014', assetId: 'A-015', asset: 'API Gateway', threat: 'API Abuse / Rate Limiting', vulnerability: 'Missing rate limiting & input validation', likelihood: 4, impact: 3, category: 'Cyber Attack' },
        { id: 'R-015', assetId: 'A-014', asset: 'HR Management System', threat: 'Unauthorized Data Access', vulnerability: 'Weak authentication mechanism', likelihood: 2, impact: 3, category: 'Unauthorized Access' },
        { id: 'R-016', assetId: 'A-001', asset: 'Production Database Server', threat: 'Hardware Failure', vulnerability: 'Aging server infrastructure', likelihood: 3, impact: 5, category: 'Operational' },
        { id: 'R-017', assetId: 'A-005', asset: 'Customer Personal Data', threat: 'GDPR Non-Compliance', vulnerability: 'Incomplete data processing records', likelihood: 3, impact: 4, category: 'Compliance' },
        { id: 'R-018', assetId: 'A-008', asset: 'Network Infrastructure', threat: 'Man-in-the-Middle Attack', vulnerability: 'Unencrypted internal traffic', likelihood: 2, impact: 4, category: 'Cyber Attack' },
    ];

    // Statement of Applicability — Annex A controls (ISO 27001:2013)
    const defaultSoA = [
        { controlId: 'A.5.1.1', domain: 'A.5 Information Security Policies', control: 'Policies for information security', applicable: 'Applicable', justification: 'Required to establish management direction for ISMS', implementation: 'Implemented', relatedRisks: 'All' },
        { controlId: 'A.5.1.2', domain: 'A.5 Information Security Policies', control: 'Review of the policies for information security', applicable: 'Applicable', justification: 'Policies must be reviewed at planned intervals', implementation: 'Implemented', relatedRisks: 'All' },
        { controlId: 'A.6.1.1', domain: 'A.6 Organization of Information Security', control: 'Information security roles and responsibilities', applicable: 'Applicable', justification: 'Clear allocation of security responsibilities is essential', implementation: 'Implemented', relatedRisks: 'R-007, R-010' },
        { controlId: 'A.6.1.2', domain: 'A.6 Organization of Information Security', control: 'Segregation of duties', applicable: 'Applicable', justification: 'Prevents unauthorized modification; reduces insider threat', implementation: 'Partially Implemented', relatedRisks: 'R-007' },
        { controlId: 'A.7.1.1', domain: 'A.7 Human Resource Security', control: 'Screening', applicable: 'Applicable', justification: 'Background verification for employees handling sensitive data', implementation: 'Implemented', relatedRisks: 'R-007, R-010' },
        { controlId: 'A.7.2.2', domain: 'A.7 Human Resource Security', control: 'Information security awareness, education and training', applicable: 'Applicable', justification: 'Critical to mitigate phishing and social engineering risks', implementation: 'Partially Implemented', relatedRisks: 'R-004' },
        { controlId: 'A.8.1.1', domain: 'A.8 Asset Management', control: 'Inventory of assets', applicable: 'Applicable', justification: 'All information assets must be identified and inventoried', implementation: 'Implemented', relatedRisks: 'All' },
        { controlId: 'A.8.1.3', domain: 'A.8 Asset Management', control: 'Acceptable use of assets', applicable: 'Applicable', justification: 'Usage policies required for organizational assets', implementation: 'Implemented', relatedRisks: 'R-006, R-013' },
        { controlId: 'A.9.1.1', domain: 'A.9 Access Control', control: 'Access control policy', applicable: 'Applicable', justification: 'Business requirements for access must be established', implementation: 'Implemented', relatedRisks: 'R-002, R-005, R-013, R-015' },
        { controlId: 'A.9.2.3', domain: 'A.9 Access Control', control: 'Management of privileged access rights', applicable: 'Applicable', justification: 'Privileged access must be restricted and monitored', implementation: 'Partially Implemented', relatedRisks: 'R-002, R-005, R-013' },
        { controlId: 'A.9.4.1', domain: 'A.9 Access Control', control: 'Information access restriction', applicable: 'Applicable', justification: 'Access to information must follow the access control policy', implementation: 'Implemented', relatedRisks: 'R-002, R-015' },
        { controlId: 'A.10.1.1', domain: 'A.10 Cryptography', control: 'Policy on the use of cryptographic controls', applicable: 'Applicable', justification: 'Encryption needed for data in transit and at rest', implementation: 'Partially Implemented', relatedRisks: 'R-002, R-018' },
        { controlId: 'A.11.1.1', domain: 'A.11 Physical and Environmental Security', control: 'Physical security perimeter', applicable: 'Applicable', justification: 'Server room and office building require physical perimeter security', implementation: 'Implemented', relatedRisks: 'R-009' },
        { controlId: 'A.11.1.2', domain: 'A.11 Physical and Environmental Security', control: 'Physical entry controls', applicable: 'Applicable', justification: 'Entry to secure areas must be controlled via badge/biometric', implementation: 'Partially Implemented', relatedRisks: 'R-009' },
        { controlId: 'A.12.1.1', domain: 'A.12 Operations Security', control: 'Documented operating procedures', applicable: 'Applicable', justification: 'Operational procedures must be documented and maintained', implementation: 'Implemented', relatedRisks: 'R-008, R-016' },
        { controlId: 'A.12.2.1', domain: 'A.12 Operations Security', control: 'Controls against malware', applicable: 'Applicable', justification: 'Anti-malware controls essential to prevent ransomware', implementation: 'Partially Implemented', relatedRisks: 'R-006' },
        { controlId: 'A.12.3.1', domain: 'A.12 Operations Security', control: 'Information backup', applicable: 'Applicable', justification: 'Regular backups to ensure business continuity', implementation: 'Implemented', relatedRisks: 'R-008' },
        { controlId: 'A.12.4.1', domain: 'A.12 Operations Security', control: 'Event logging', applicable: 'Applicable', justification: 'Logs needed to detect and investigate incidents', implementation: 'Implemented', relatedRisks: 'R-001, R-005, R-012' },
        { controlId: 'A.12.6.1', domain: 'A.12 Operations Security', control: 'Management of technical vulnerabilities', applicable: 'Applicable', justification: 'Timely patching essential to reduce attack surface', implementation: 'Partially Implemented', relatedRisks: 'R-001, R-006, R-012' },
        { controlId: 'A.13.1.1', domain: 'A.13 Communications Security', control: 'Network controls', applicable: 'Applicable', justification: 'Networks must be managed and controlled for protection', implementation: 'Implemented', relatedRisks: 'R-003, R-012, R-018' },
        { controlId: 'A.13.1.3', domain: 'A.13 Communications Security', control: 'Segregation in networks', applicable: 'Applicable', justification: 'Network segmentation to limit lateral movement', implementation: 'Partially Implemented', relatedRisks: 'R-003, R-006' },
        { controlId: 'A.14.1.1', domain: 'A.14 System Acquisition, Development and Maintenance', control: 'Information security requirements analysis', applicable: 'Applicable', justification: 'Security requirements must be part of new system development', implementation: 'Planned', relatedRisks: 'R-001, R-014' },
        { controlId: 'A.14.2.1', domain: 'A.14 System Acquisition, Development and Maintenance', control: 'Secure development policy', applicable: 'Applicable', justification: 'Secure SDLC practices to reduce application vulnerabilities', implementation: 'Partially Implemented', relatedRisks: 'R-001, R-014' },
        { controlId: 'A.15.1.1', domain: 'A.15 Supplier Relationships', control: 'Information security policy for supplier relationships', applicable: 'Applicable', justification: 'Third-party cloud providers must meet security requirements', implementation: 'Partially Implemented', relatedRisks: 'R-011' },
        { controlId: 'A.16.1.1', domain: 'A.16 Information Security Incident Management', control: 'Responsibilities and procedures', applicable: 'Applicable', justification: 'Incident response plan ensures quick mitigation', implementation: 'Implemented', relatedRisks: 'R-001, R-002, R-006' },
        { controlId: 'A.16.1.5', domain: 'A.16 Information Security Incident Management', control: 'Response to information security incidents', applicable: 'Applicable', justification: 'Defined response procedures for identified incidents', implementation: 'Implemented', relatedRisks: 'All' },
        { controlId: 'A.17.1.1', domain: 'A.17 Business Continuity Management', control: 'Planning information security continuity', applicable: 'Applicable', justification: 'BCP required for maintaining operations during disruptions', implementation: 'Partially Implemented', relatedRisks: 'R-008, R-011, R-016' },
        { controlId: 'A.17.1.2', domain: 'A.17 Business Continuity Management', control: 'Implementing information security continuity', applicable: 'Applicable', justification: 'Continuity processes need documented implementation', implementation: 'Planned', relatedRisks: 'R-008, R-011' },
        { controlId: 'A.18.1.1', domain: 'A.18 Compliance', control: 'Identification of applicable legislation', applicable: 'Applicable', justification: 'GDPR and industry regulations must be identified and complied with', implementation: 'Implemented', relatedRisks: 'R-017' },
        { controlId: 'A.18.1.3', domain: 'A.18 Compliance', control: 'Protection of records', applicable: 'Applicable', justification: 'Records must be protected from loss, destruction, or falsification', implementation: 'Implemented', relatedRisks: 'R-006, R-017' },
        { controlId: 'A.18.2.1', domain: 'A.18 Compliance', control: 'Independent review of information security', applicable: 'Applicable', justification: 'Periodic independent review ensures objective ISMS assessment', implementation: 'Planned', relatedRisks: 'All' },
    ];

    // Risk Treatment Plan
    const defaultTreatments = [
        { id: 'T-001', riskId: 'R-001', risk: 'SQL Injection on Database Server', action: 'Mitigate', description: 'Implement WAF, parameterized queries, regular patching schedule', owner: 'IT Security Manager', deadline: '2026-03-31', status: 'In Progress', residualRisk: 'Medium' },
        { id: 'T-002', riskId: 'R-002', risk: 'Customer Data Breach', action: 'Mitigate', description: 'Deploy DLP solution, enforce MFA, encrypt data at rest, access reviews', owner: 'Data Protection Officer', deadline: '2026-04-15', status: 'In Progress', residualRisk: 'Medium' },
        { id: 'T-003', riskId: 'R-003', risk: 'DDoS Attack on Network', action: 'Mitigate', description: 'Subscribe to DDoS protection service (e.g., Cloudflare), configure rate limiting', owner: 'Network Team Lead', deadline: '2026-03-15', status: 'Completed', residualRisk: 'Low' },
        { id: 'T-004', riskId: 'R-004', risk: 'Phishing Attacks on Staff', action: 'Mitigate', description: 'Mandatory security awareness training, phishing simulations, email filtering', owner: 'CISO', deadline: '2026-04-30', status: 'In Progress', residualRisk: 'Medium' },
        { id: 'T-005', riskId: 'R-005', risk: 'Unauthorized Code Access', action: 'Mitigate', description: 'Implement branch protection, mandatory code reviews, access audits', owner: 'Dev Team Lead', deadline: '2026-03-20', status: 'Completed', residualRisk: 'Low' },
        { id: 'T-006', riskId: 'R-006', risk: 'Ransomware on Workstations', action: 'Mitigate', description: 'Deploy EDR solution, network segmentation, regular patching, offline backups', owner: 'IT Security Manager', deadline: '2026-05-01', status: 'In Progress', residualRisk: 'Medium' },
        { id: 'T-007', riskId: 'R-007', risk: 'Insider Threat / Fraud', action: 'Mitigate', description: 'Implement segregation of duties, behavioral analytics, audit trails', owner: 'Finance Director', deadline: '2026-06-01', status: 'Planned', residualRisk: 'Medium' },
        { id: 'T-008', riskId: 'R-008', risk: 'Backup System Failure', action: 'Mitigate', description: 'Implement 3-2-1 backup strategy, automated backup testing, offsite replication', owner: 'IT Operations Manager', deadline: '2026-03-31', status: 'In Progress', residualRisk: 'Low' },
        { id: 'T-009', riskId: 'R-009', risk: 'Physical Intrusion', action: 'Accept', description: 'Current physical controls acceptable for risk appetite; enhance CCTV coverage', owner: 'Facilities Manager', deadline: '2026-06-30', status: 'Planned', residualRisk: 'Low' },
        { id: 'T-010', riskId: 'R-010', risk: 'Key Personnel Departure', action: 'Mitigate', description: 'Cross-training program, documented procedures, knowledge base development', owner: 'HR Manager', deadline: '2026-05-15', status: 'In Progress', residualRisk: 'Low' },
        { id: 'T-011', riskId: 'R-011', risk: 'Cloud Service Outage', action: 'Transfer', description: 'Multi-cloud architecture assessment, SLA enforcement, cloud insurance', owner: 'Cloud Architect', deadline: '2026-07-01', status: 'Planned', residualRisk: 'Low' },
        { id: 'T-012', riskId: 'R-012', risk: 'VPN Exploit', action: 'Mitigate', description: 'Firmware updates, migrate to zero-trust architecture, continuous monitoring', owner: 'Network Team Lead', deadline: '2026-04-15', status: 'In Progress', residualRisk: 'Low' },
        { id: 'T-013', riskId: 'R-013', risk: 'CRM Privilege Escalation', action: 'Mitigate', description: 'Reconfigure RBAC, periodic access reviews, least privilege enforcement', owner: 'IT Security Manager', deadline: '2026-03-31', status: 'Completed', residualRisk: 'Low' },
        { id: 'T-014', riskId: 'R-014', risk: 'API Abuse', action: 'Mitigate', description: 'Implement API rate limiting, input validation, API gateway security policies', owner: 'Dev Team Lead', deadline: '2026-04-01', status: 'In Progress', residualRisk: 'Low' },
        { id: 'T-015', riskId: 'R-015', risk: 'Unauthorized HR Data Access', action: 'Mitigate', description: 'Upgrade authentication to MFA, implement session management', owner: 'IT Support Lead', deadline: '2026-05-01', status: 'Planned', residualRisk: 'Low' },
        { id: 'T-016', riskId: 'R-016', risk: 'Database Server Hardware Failure', action: 'Mitigate', description: 'Server refresh program, implement HA clustering, hardware monitoring', owner: 'IT Operations Manager', deadline: '2026-06-01', status: 'Planned', residualRisk: 'Medium' },
        { id: 'T-017', riskId: 'R-017', risk: 'GDPR Non-Compliance', action: 'Mitigate', description: 'Complete data mapping, update privacy notices, implement DPIA process', owner: 'Data Protection Officer', deadline: '2026-04-30', status: 'In Progress', residualRisk: 'Low' },
        { id: 'T-018', riskId: 'R-018', risk: 'Man-in-the-Middle Attack', action: 'Mitigate', description: 'Deploy TLS 1.3 internally, implement certificate pinning, network encryption', owner: 'Network Team Lead', deadline: '2026-05-15', status: 'Planned', residualRisk: 'Low' },
    ];

    // ============ STATE ============
    let assets = JSON.parse(localStorage.getItem('iso27001_assets')) || [...defaultAssets];
    let risks = JSON.parse(localStorage.getItem('iso27001_risks')) || [...defaultRisks];
    let soaControls = JSON.parse(localStorage.getItem('iso27001_soa')) || [...defaultSoA];
    let treatments = JSON.parse(localStorage.getItem('iso27001_treatments')) || [...defaultTreatments];

    let currentTab = 'dashboard';
    let sortState = {};

    // ============ HELPERS ============

    function saveData() {
        localStorage.setItem('iso27001_assets', JSON.stringify(assets));
        localStorage.setItem('iso27001_risks', JSON.stringify(risks));
        localStorage.setItem('iso27001_soa', JSON.stringify(soaControls));
        localStorage.setItem('iso27001_treatments', JSON.stringify(treatments));
    }

    function getRiskLevel(score) {
        if (score >= 20) return 'Critical';
        if (score >= 12) return 'High';
        if (score >= 6) return 'Medium';
        return 'Low';
    }

    function getRiskScore(r) {
        return r.likelihood * r.impact;
    }

    function showToast(message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        const icons = { success: '✓', error: '✕', info: 'ℹ' };
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `<span class="toast-icon">${icons[type] || '✓'}</span><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = 'toastOut 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ============ TAB NAVIGATION ============

    const titles = {
        dashboard: ['Dashboard', 'ISO 27001:2013 ISMS Risk Overview'],
        assets: ['Asset Inventory', 'Information Assets Register — NovaTech Solutions'],
        'risk-assessment': ['Risk Assessment', 'Qualitative Risk Register — 5×5 Likelihood × Impact Matrix'],
        soa: ['Statement of Applicability', 'ISO 27001:2013 Annex A — Control Applicability & Justification'],
        treatment: ['Risk Treatment Plan', 'Risk Response Actions, Owners & Timelines'],
    };

    function switchTab(tab) {
        currentTab = tab;
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        const section = document.getElementById('tab-' + tab);
        if (section) section.classList.add('active');
        const navItem = document.querySelector(`.nav-item[data-tab="${tab}"]`);
        if (navItem) navItem.classList.add('active');
        const t = titles[tab] || ['', ''];
        document.getElementById('pageTitle').textContent = t[0];
        document.getElementById('pageSubtitle').textContent = t[1];

        // Render content
        if (tab === 'dashboard') renderDashboard();
        else if (tab === 'assets') renderAssetTable();
        else if (tab === 'risk-assessment') renderRiskTable();
        else if (tab === 'soa') renderSoATable();
        else if (tab === 'treatment') renderTreatmentTable();
    }

    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(item.dataset.tab);
            // Close sidebar on mobile
            document.getElementById('sidebar').classList.remove('open');
        });
    });

    // Mobile menu toggle
    document.getElementById('menuToggle').addEventListener('click', () => {
        document.getElementById('sidebar').classList.toggle('open');
    });

    // ============ DASHBOARD ============

    function renderDashboard() {
        // KPIs
        document.getElementById('kpiTotalRisks').textContent = risks.length;
        const criticalCount = risks.filter(r => getRiskLevel(getRiskScore(r)) === 'Critical').length;
        const highCount = risks.filter(r => getRiskLevel(getRiskScore(r)) === 'High').length;
        document.getElementById('kpiCritical').textContent = criticalCount;
        document.getElementById('kpiHigh').textContent = highCount;
        document.getElementById('kpiAssets').textContent = assets.length;
        document.getElementById('kpiControls').textContent = soaControls.filter(c => c.applicable === 'Applicable').length;
        const treatedPct = treatments.length > 0 ? Math.round((treatments.filter(t => t.status === 'Completed').length / treatments.length) * 100) : 0;
        document.getElementById('kpiTreated').textContent = treatedPct + '%';

        renderHeatMap();
        renderCategoryChart();
        renderDonutChart();
        renderTreatmentStatus();
    }

    function renderHeatMap() {
        const grid = document.getElementById('heatmapGrid');
        grid.innerHTML = '';
        // Count risks per (likelihood, impact) pair
        const counts = {};
        risks.forEach(r => {
            const key = `${r.likelihood}-${r.impact}`;
            counts[key] = (counts[key] || 0) + 1;
        });
        // Build 5x5 grid (likelihood rows 5→1 top to bottom, impact columns 1→5 left to right)
        for (let l = 5; l >= 1; l--) {
            // Row label
            const label = document.createElement('div');
            label.className = 'heatmap-label';
            label.textContent = l;
            grid.appendChild(label);
            for (let i = 1; i <= 5; i++) {
                const cell = document.createElement('div');
                const score = l * i;
                const level = getRiskLevel(score);
                cell.className = `heatmap-cell risk-${level.toLowerCase()}`;
                const count = counts[`${l}-${i}`] || 0;
                cell.textContent = count > 0 ? count : '';
                cell.title = `Likelihood: ${l}, Impact: ${i}, Score: ${score} (${level})${count > 0 ? ` — ${count} risk(s)` : ''}`;
                grid.appendChild(cell);
            }
        }
        // Bottom labels
        const spacer = document.createElement('div');
        spacer.className = 'heatmap-label';
        grid.appendChild(spacer);
        for (let i = 1; i <= 5; i++) {
            const label = document.createElement('div');
            label.className = 'heatmap-label';
            label.textContent = i;
            grid.appendChild(label);
        }
    }

    function renderCategoryChart() {
        const chart = document.getElementById('riskCategoryChart');
        chart.innerHTML = '';
        const categories = {};
        risks.forEach(r => {
            categories[r.category] = (categories[r.category] || 0) + 1;
        });
        const sorted = Object.entries(categories).sort((a, b) => b[1] - a[1]);
        const maxVal = Math.max(...sorted.map(s => s[1]), 1);
        const colors = ['bar-critical', 'bar-high', 'bar-medium', 'bar-info', 'bar-low'];
        sorted.forEach(([cat, count], idx) => {
            const pct = (count / maxVal) * 100;
            const item = document.createElement('div');
            item.className = 'bar-item';
            item.innerHTML = `
                <span class="bar-label">${cat}</span>
                <div class="bar-track">
                    <div class="bar-fill ${colors[idx % colors.length]}" style="width: 0%;">${count}</div>
                </div>
            `;
            chart.appendChild(item);
            // Animate
            setTimeout(() => {
                item.querySelector('.bar-fill').style.width = pct + '%';
            }, 100 + idx * 80);
        });
    }

    function renderDonutChart() {
        const chart = document.getElementById('riskDonutChart');
        const legend = document.getElementById('riskDonutLegend');
        const levels = { Critical: 0, High: 0, Medium: 0, Low: 0 };
        risks.forEach(r => { levels[getRiskLevel(getRiskScore(r))]++; });
        const total = risks.length || 1;
        const colors = { Critical: '#ef4444', High: '#f97316', Medium: '#eab308', Low: '#22c55e' };
        let gradientParts = [];
        let cumulative = 0;
        Object.entries(levels).forEach(([level, count]) => {
            const pct = (count / total) * 100;
            if (pct > 0) {
                gradientParts.push(`${colors[level]} ${cumulative}% ${cumulative + pct}%`);
            }
            cumulative += pct;
        });
        chart.style.background = `conic-gradient(${gradientParts.join(', ')})`;
        chart.innerHTML = `<div class="donut-center-text"><span class="donut-number">${risks.length}</span><span class="donut-label">Total Risks</span></div>`;

        legend.innerHTML = '';
        Object.entries(levels).forEach(([level, count]) => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `<span class="legend-dot" style="background:${colors[level]}"></span><span>${level}</span><span class="legend-count">${count}</span>`;
            legend.appendChild(item);
        });
    }

    function renderTreatmentStatus() {
        const container = document.getElementById('treatmentBars');
        container.innerHTML = '';
        const actions = { Mitigate: 0, Accept: 0, Transfer: 0, Avoid: 0 };
        treatments.forEach(t => { actions[t.action] = (actions[t.action] || 0) + 1; });
        const total = treatments.length || 1;
        const fills = { Mitigate: 'fill-mitigate', Accept: 'fill-accept', Transfer: 'fill-transfer', Avoid: 'fill-avoid' };
        Object.entries(actions).forEach(([action, count], idx) => {
            const pct = (count / total) * 100;
            const item = document.createElement('div');
            item.className = 'treatment-item';
            item.innerHTML = `
                <div class="treatment-header">
                    <span class="treatment-label">${action}</span>
                    <span class="treatment-value">${count} (${Math.round(pct)}%)</span>
                </div>
                <div class="treatment-track">
                    <div class="treatment-fill ${fills[action]}" style="width: 0%;"></div>
                </div>
            `;
            container.appendChild(item);
            setTimeout(() => {
                item.querySelector('.treatment-fill').style.width = pct + '%';
            }, 200 + idx * 100);
        });
    }

    // ============ ASSET TABLE ============

    function renderAssetTable(data) {
        const tbody = document.getElementById('assetTableBody');
        const filteredAssets = data || filterAssets();
        tbody.innerHTML = filteredAssets.map(a => `
            <tr>
                <td><strong>${a.id}</strong></td>
                <td>${a.name}</td>
                <td>${a.type}</td>
                <td>${a.owner}</td>
                <td>${a.location}</td>
                <td><span class="criticality-badge crit-${a.criticality.toLowerCase().replace(' ', '-')}">${a.criticality}</span></td>
                <td>
                    <div class="action-cell">
                        <button class="btn-icon" title="Edit" onclick="app.editAsset('${a.id}')">✎</button>
                        <button class="btn-icon" title="Delete" onclick="app.deleteAsset('${a.id}')">✕</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function filterAssets() {
        const search = (document.getElementById('assetSearch')?.value || '').toLowerCase();
        const typeFilter = document.getElementById('assetTypeFilter')?.value || '';
        return assets.filter(a => {
            const matchesSearch = !search || Object.values(a).some(v => String(v).toLowerCase().includes(search));
            const matchesType = !typeFilter || a.type === typeFilter;
            return matchesSearch && matchesType;
        });
    }

    document.getElementById('assetSearch')?.addEventListener('input', () => renderAssetTable());
    document.getElementById('assetTypeFilter')?.addEventListener('change', () => renderAssetTable());

    // ============ RISK TABLE ============

    function renderRiskTable(data) {
        const tbody = document.getElementById('riskTableBody');
        const filteredRisks = data || filterRisks();
        tbody.innerHTML = filteredRisks.map(r => {
            const score = getRiskScore(r);
            const level = getRiskLevel(score);
            return `
                <tr>
                    <td><strong>${r.id}</strong></td>
                    <td>${r.asset}</td>
                    <td>${r.threat}</td>
                    <td>${r.vulnerability}</td>
                    <td style="text-align:center;font-weight:600;">${r.likelihood}</td>
                    <td style="text-align:center;font-weight:600;">${r.impact}</td>
                    <td style="text-align:center;"><span class="risk-score score-${level.toLowerCase()}">${score}</span></td>
                    <td><span class="risk-badge badge-${level.toLowerCase()}">${level}</span></td>
                    <td>
                        <div class="action-cell">
                            <button class="btn-icon" title="Edit" onclick="app.editRisk('${r.id}')">✎</button>
                            <button class="btn-icon" title="Delete" onclick="app.deleteRisk('${r.id}')">✕</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function filterRisks() {
        const search = (document.getElementById('riskSearch')?.value || '').toLowerCase();
        const levelFilter = document.getElementById('riskLevelFilter')?.value || '';
        return risks.filter(r => {
            const matchesSearch = !search || Object.values(r).some(v => String(v).toLowerCase().includes(search));
            const level = getRiskLevel(getRiskScore(r));
            const matchesLevel = !levelFilter || level === levelFilter;
            return matchesSearch && matchesLevel;
        });
    }

    document.getElementById('riskSearch')?.addEventListener('input', () => renderRiskTable());
    document.getElementById('riskLevelFilter')?.addEventListener('change', () => renderRiskTable());

    // ============ SOA TABLE ============

    function renderSoATable(data) {
        const tbody = document.getElementById('soaTableBody');
        const filteredSoA = data || filterSoA();
        tbody.innerHTML = filteredSoA.map(c => {
            const implClass = c.implementation === 'Implemented' ? 'status-implemented' :
                c.implementation === 'Partially Implemented' ? 'status-partial' :
                    c.implementation === 'Planned' ? 'status-planned' : 'status-not-implemented';
            return `
                <tr>
                    <td><strong>${c.controlId}</strong></td>
                    <td style="font-size:0.75rem;">${c.domain}</td>
                    <td>${c.control}</td>
                    <td><span class="status-badge status-${c.applicable === 'Applicable' ? 'applicable' : 'not-applicable'}">${c.applicable}</span></td>
                    <td style="font-size:0.78rem;color:var(--text-muted);max-width:220px;">${c.justification}</td>
                    <td><span class="status-badge ${implClass}">${c.implementation}</span></td>
                    <td style="font-size:0.78rem;">${c.relatedRisks}</td>
                </tr>
            `;
        }).join('');

        // Populate domain filter
        populateSoADomainFilter();
    }

    function populateSoADomainFilter() {
        const filter = document.getElementById('soaDomainFilter');
        const domains = [...new Set(soaControls.map(c => c.domain))];
        const currentVal = filter.value;
        filter.innerHTML = '<option value="">All Domains</option>';
        domains.forEach(d => {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = d;
            filter.appendChild(opt);
        });
        filter.value = currentVal;
    }

    function filterSoA() {
        const search = (document.getElementById('soaSearch')?.value || '').toLowerCase();
        const domainFilter = document.getElementById('soaDomainFilter')?.value || '';
        const statusFilter = document.getElementById('soaStatusFilter')?.value || '';
        return soaControls.filter(c => {
            const matchesSearch = !search || Object.values(c).some(v => String(v).toLowerCase().includes(search));
            const matchesDomain = !domainFilter || c.domain === domainFilter;
            const matchesStatus = !statusFilter || c.applicable === statusFilter;
            return matchesSearch && matchesDomain && matchesStatus;
        });
    }

    document.getElementById('soaSearch')?.addEventListener('input', () => renderSoATable());
    document.getElementById('soaDomainFilter')?.addEventListener('change', () => renderSoATable());
    document.getElementById('soaStatusFilter')?.addEventListener('change', () => renderSoATable());

    // ============ TREATMENT TABLE ============

    function renderTreatmentTable(data) {
        const tbody = document.getElementById('treatmentTableBody');
        const filtered = data || filterTreatments();
        tbody.innerHTML = filtered.map(t => {
            const actionClass = `action-${t.action.toLowerCase()}`;
            const statusClass = `treat-${t.status.toLowerCase().replace(' ', '-')}`;
            const residualClass = `badge-${t.residualRisk.toLowerCase()}`;
            return `
                <tr>
                    <td><strong>${t.id}</strong></td>
                    <td><strong>${t.riskId}</strong></td>
                    <td>${t.risk}</td>
                    <td><span class="action-badge ${actionClass}">${t.action}</span></td>
                    <td style="font-size:0.78rem;max-width:250px;">${t.description}</td>
                    <td>${t.owner}</td>
                    <td>${t.deadline}</td>
                    <td><span class="treatment-badge ${statusClass}">${t.status}</span></td>
                    <td><span class="risk-badge ${residualClass}">${t.residualRisk}</span></td>
                    <td>
                        <div class="action-cell">
                            <button class="btn-icon" title="Edit" onclick="app.editTreatment('${t.id}')">✎</button>
                            <button class="btn-icon" title="Delete" onclick="app.deleteTreatment('${t.id}')">✕</button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    function filterTreatments() {
        const search = (document.getElementById('treatmentSearch')?.value || '').toLowerCase();
        const actionFilter = document.getElementById('treatmentActionFilter')?.value || '';
        const statusFilter = document.getElementById('treatmentStatusFilter')?.value || '';
        return treatments.filter(t => {
            const matchesSearch = !search || Object.values(t).some(v => String(v).toLowerCase().includes(search));
            const matchesAction = !actionFilter || t.action === actionFilter;
            const matchesStatus = !statusFilter || t.status === statusFilter;
            return matchesSearch && matchesAction && matchesStatus;
        });
    }

    document.getElementById('treatmentSearch')?.addEventListener('input', () => renderTreatmentTable());
    document.getElementById('treatmentActionFilter')?.addEventListener('change', () => renderTreatmentTable());
    document.getElementById('treatmentStatusFilter')?.addEventListener('change', () => renderTreatmentTable());

    // ============ TABLE SORTING ============

    document.querySelectorAll('.data-table th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const table = th.closest('table');
            const key = th.dataset.sort;
            const tableId = table.id;
            if (!sortState[tableId]) sortState[tableId] = { key: null, asc: true };
            if (sortState[tableId].key === key) {
                sortState[tableId].asc = !sortState[tableId].asc;
            } else {
                sortState[tableId].key = key;
                sortState[tableId].asc = true;
            }
            const dir = sortState[tableId].asc ? 1 : -1;

            let dataArr;
            let renderFn;
            if (tableId === 'assetTable') { dataArr = filterAssets(); renderFn = renderAssetTable; }
            else if (tableId === 'riskTable') { dataArr = filterRisks(); renderFn = renderRiskTable; }
            else if (tableId === 'soaTable') { dataArr = filterSoA(); renderFn = renderSoATable; }
            else if (tableId === 'treatmentTable') { dataArr = filterTreatments(); renderFn = renderTreatmentTable; }
            else return;

            dataArr.sort((a, b) => {
                let va = a[key], vb = b[key];
                if (key === 'score') { va = getRiskScore(a); vb = getRiskScore(b); }
                if (key === 'level') { va = getRiskScore(a); vb = getRiskScore(b); }
                if (typeof va === 'number' && typeof vb === 'number') return (va - vb) * dir;
                return String(va).localeCompare(String(vb)) * dir;
            });
            renderFn(dataArr);
        });
    });

    // ============ MODAL SYSTEM ============

    const overlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    const modalTitle = document.getElementById('modalTitle');
    let modalSaveCallback = null;

    function openModal(title, formHTML, onSave) {
        modalTitle.textContent = title;
        modalBody.innerHTML = formHTML;
        modalSaveCallback = onSave;
        overlay.classList.add('active');
    }

    function closeModal() {
        overlay.classList.remove('active');
        modalSaveCallback = null;
    }

    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.getElementById('modalSave').addEventListener('click', () => {
        if (modalSaveCallback) modalSaveCallback();
    });

    // ============ ADD / EDIT ASSET ============

    function assetForm(data = {}) {
        return `
            <div class="form-group">
                <label>Asset ID</label>
                <input type="text" id="formAssetId" value="${data.id || ''}" ${data.id ? 'readonly' : ''} placeholder="e.g., A-016">
            </div>
            <div class="form-group">
                <label>Asset Name</label>
                <input type="text" id="formAssetName" value="${data.name || ''}" placeholder="e.g., Web Application Server">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Type</label>
                    <select id="formAssetType">
                        ${['Hardware', 'Software', 'Data', 'People', 'Service', 'Facility'].map(t =>
            `<option value="${t}" ${data.type === t ? 'selected' : ''}>${t}</option>`
        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Criticality</label>
                    <select id="formAssetCriticality">
                        ${['Very High', 'High', 'Medium', 'Low'].map(c =>
            `<option value="${c}" ${data.criticality === c ? 'selected' : ''}>${c}</option>`
        ).join('')}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Owner</label>
                <input type="text" id="formAssetOwner" value="${data.owner || ''}" placeholder="e.g., IT Operations">
            </div>
            <div class="form-group">
                <label>Location</label>
                <input type="text" id="formAssetLocation" value="${data.location || ''}" placeholder="e.g., Cloud (AWS)">
            </div>
        `;
    }

    document.getElementById('addAssetBtn').addEventListener('click', () => {
        openModal('Add New Asset', assetForm(), () => {
            const newAsset = {
                id: document.getElementById('formAssetId').value.trim(),
                name: document.getElementById('formAssetName').value.trim(),
                type: document.getElementById('formAssetType').value,
                owner: document.getElementById('formAssetOwner').value.trim(),
                location: document.getElementById('formAssetLocation').value.trim(),
                criticality: document.getElementById('formAssetCriticality').value,
            };
            if (!newAsset.id || !newAsset.name) { showToast('ID and Name are required', 'error'); return; }
            if (assets.find(a => a.id === newAsset.id)) { showToast('Asset ID already exists', 'error'); return; }
            assets.push(newAsset);
            saveData();
            renderAssetTable();
            closeModal();
            showToast('Asset added successfully');
        });
    });

    window.app = window.app || {};

    window.app.editAsset = function (id) {
        const asset = assets.find(a => a.id === id);
        if (!asset) return;
        openModal('Edit Asset', assetForm(asset), () => {
            asset.name = document.getElementById('formAssetName').value.trim();
            asset.type = document.getElementById('formAssetType').value;
            asset.owner = document.getElementById('formAssetOwner').value.trim();
            asset.location = document.getElementById('formAssetLocation').value.trim();
            asset.criticality = document.getElementById('formAssetCriticality').value;
            saveData();
            renderAssetTable();
            closeModal();
            showToast('Asset updated successfully');
        });
    };

    window.app.deleteAsset = function (id) {
        if (!confirm('Delete this asset?')) return;
        assets = assets.filter(a => a.id !== id);
        saveData();
        renderAssetTable();
        showToast('Asset deleted', 'info');
    };

    // ============ ADD / EDIT RISK ============

    function riskForm(data = {}) {
        return `
            <div class="form-group">
                <label>Risk ID</label>
                <input type="text" id="formRiskId" value="${data.id || ''}" ${data.id ? 'readonly' : ''} placeholder="e.g., R-019">
            </div>
            <div class="form-group">
                <label>Asset</label>
                <select id="formRiskAsset">
                    ${assets.map(a => `<option value="${a.id}" ${data.assetId === a.id ? 'selected' : ''}>${a.id} — ${a.name}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Threat</label>
                <input type="text" id="formRiskThreat" value="${data.threat || ''}" placeholder="e.g., Brute Force Attack">
            </div>
            <div class="form-group">
                <label>Vulnerability</label>
                <input type="text" id="formRiskVuln" value="${data.vulnerability || ''}" placeholder="e.g., Weak password policy">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Likelihood (1-5)</label>
                    <select id="formRiskLikelihood">
                        ${[1, 2, 3, 4, 5].map(v => `<option value="${v}" ${data.likelihood === v ? 'selected' : ''}>${v} — ${['Very Low', 'Low', 'Medium', 'High', 'Very High'][v - 1]}</option>`).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Impact (1-5)</label>
                    <select id="formRiskImpact">
                        ${[1, 2, 3, 4, 5].map(v => `<option value="${v}" ${data.impact === v ? 'selected' : ''}>${v} — ${['Negligible', 'Minor', 'Moderate', 'Major', 'Catastrophic'][v - 1]}</option>`).join('')}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Category</label>
                <input type="text" id="formRiskCategory" value="${data.category || ''}" placeholder="e.g., Cyber Attack">
            </div>
        `;
    }

    document.getElementById('addRiskBtn').addEventListener('click', () => {
        openModal('Add New Risk', riskForm(), () => {
            const assetSel = document.getElementById('formRiskAsset');
            const selectedAsset = assets.find(a => a.id === assetSel.value);
            const newRisk = {
                id: document.getElementById('formRiskId').value.trim(),
                assetId: assetSel.value,
                asset: selectedAsset ? selectedAsset.name : '',
                threat: document.getElementById('formRiskThreat').value.trim(),
                vulnerability: document.getElementById('formRiskVuln').value.trim(),
                likelihood: parseInt(document.getElementById('formRiskLikelihood').value),
                impact: parseInt(document.getElementById('formRiskImpact').value),
                category: document.getElementById('formRiskCategory').value.trim(),
            };
            if (!newRisk.id || !newRisk.threat) { showToast('ID and Threat are required', 'error'); return; }
            if (risks.find(r => r.id === newRisk.id)) { showToast('Risk ID already exists', 'error'); return; }
            risks.push(newRisk);
            saveData();
            renderRiskTable();
            closeModal();
            showToast('Risk added successfully');
        });
    });

    window.app.editRisk = function (id) {
        const risk = risks.find(r => r.id === id);
        if (!risk) return;
        openModal('Edit Risk', riskForm(risk), () => {
            const assetSel = document.getElementById('formRiskAsset');
            const selectedAsset = assets.find(a => a.id === assetSel.value);
            risk.assetId = assetSel.value;
            risk.asset = selectedAsset ? selectedAsset.name : '';
            risk.threat = document.getElementById('formRiskThreat').value.trim();
            risk.vulnerability = document.getElementById('formRiskVuln').value.trim();
            risk.likelihood = parseInt(document.getElementById('formRiskLikelihood').value);
            risk.impact = parseInt(document.getElementById('formRiskImpact').value);
            risk.category = document.getElementById('formRiskCategory').value.trim();
            saveData();
            renderRiskTable();
            closeModal();
            showToast('Risk updated successfully');
        });
    };

    window.app.deleteRisk = function (id) {
        if (!confirm('Delete this risk?')) return;
        risks = risks.filter(r => r.id !== id);
        saveData();
        renderRiskTable();
        showToast('Risk deleted', 'info');
    };

    // ============ EDIT / DELETE TREATMENT ============

    function treatmentForm(data = {}) {
        return `
            <div class="form-row">
                <div class="form-group">
                    <label>Treatment ID</label>
                    <input type="text" id="formTreatId" value="${data.id || ''}" readonly>
                </div>
                <div class="form-group">
                    <label>Risk ID</label>
                    <input type="text" id="formTreatRiskId" value="${data.riskId || ''}" readonly>
                </div>
            </div>
            <div class="form-group">
                <label>Risk Description</label>
                <input type="text" id="formTreatRisk" value="${data.risk || ''}">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Treatment Action</label>
                    <select id="formTreatAction">
                        ${['Mitigate', 'Accept', 'Transfer', 'Avoid'].map(a =>
            `<option value="${a}" ${data.action === a ? 'selected' : ''}>${a}</option>`
        ).join('')}
                    </select>
                </div>
                <div class="form-group">
                    <label>Status</label>
                    <select id="formTreatStatus">
                        ${['Not Started', 'Planned', 'In Progress', 'Completed'].map(s =>
            `<option value="${s}" ${data.status === s ? 'selected' : ''}>${s}</option>`
        ).join('')}
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea id="formTreatDesc">${data.description || ''}</textarea>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Responsible Owner</label>
                    <input type="text" id="formTreatOwner" value="${data.owner || ''}">
                </div>
                <div class="form-group">
                    <label>Deadline</label>
                    <input type="date" id="formTreatDeadline" value="${data.deadline || ''}">
                </div>
            </div>
            <div class="form-group">
                <label>Residual Risk</label>
                <select id="formTreatResidual">
                    ${['Low', 'Medium', 'High', 'Critical'].map(r =>
            `<option value="${r}" ${data.residualRisk === r ? 'selected' : ''}>${r}</option>`
        ).join('')}
                </select>
            </div>
        `;
    }

    window.app.editTreatment = function (id) {
        const treatment = treatments.find(t => t.id === id);
        if (!treatment) return;
        openModal('Edit Treatment', treatmentForm(treatment), () => {
            treatment.risk = document.getElementById('formTreatRisk').value.trim();
            treatment.action = document.getElementById('formTreatAction').value;
            treatment.status = document.getElementById('formTreatStatus').value;
            treatment.description = document.getElementById('formTreatDesc').value.trim();
            treatment.owner = document.getElementById('formTreatOwner').value.trim();
            treatment.deadline = document.getElementById('formTreatDeadline').value;
            treatment.residualRisk = document.getElementById('formTreatResidual').value;
            saveData();
            renderTreatmentTable();
            closeModal();
            showToast('Treatment updated successfully');
        });
    };

    window.app.deleteTreatment = function (id) {
        if (!confirm('Delete this treatment?')) return;
        treatments = treatments.filter(t => t.id !== id);
        saveData();
        renderTreatmentTable();
        showToast('Treatment deleted', 'info');
    };

    // ============ CSV EXPORT ============

    document.getElementById('exportBtn').addEventListener('click', () => {
        let csvContent = '';
        let filename = '';

        if (currentTab === 'dashboard' || currentTab === 'risk-assessment') {
            csvContent = 'Risk ID,Asset,Threat,Vulnerability,Likelihood,Impact,Risk Score,Risk Level\n';
            risks.forEach(r => {
                const score = getRiskScore(r);
                csvContent += `"${r.id}","${r.asset}","${r.threat}","${r.vulnerability}",${r.likelihood},${r.impact},${score},"${getRiskLevel(score)}"\n`;
            });
            filename = 'risk_register.csv';
        } else if (currentTab === 'assets') {
            csvContent = 'ID,Asset Name,Type,Owner,Location,Criticality\n';
            assets.forEach(a => {
                csvContent += `"${a.id}","${a.name}","${a.type}","${a.owner}","${a.location}","${a.criticality}"\n`;
            });
            filename = 'asset_inventory.csv';
        } else if (currentTab === 'soa') {
            csvContent = 'Control ID,Domain,Control,Applicable,Justification,Implementation Status,Related Risks\n';
            soaControls.forEach(c => {
                csvContent += `"${c.controlId}","${c.domain}","${c.control}","${c.applicable}","${c.justification}","${c.implementation}","${c.relatedRisks}"\n`;
            });
            filename = 'statement_of_applicability.csv';
        } else if (currentTab === 'treatment') {
            csvContent = 'ID,Risk ID,Risk Description,Treatment Action,Description,Responsible Owner,Deadline,Status,Residual Risk\n';
            treatments.forEach(t => {
                csvContent += `"${t.id}","${t.riskId}","${t.risk}","${t.action}","${t.description}","${t.owner}","${t.deadline}","${t.status}","${t.residualRisk}"\n`;
            });
            filename = 'risk_treatment_plan.csv';
        }

        if (csvContent) {
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            URL.revokeObjectURL(link.href);
            showToast(`Exported ${filename}`, 'success');
        }
    });

    // ============ INIT ============
    switchTab('dashboard');

})();
