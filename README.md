# 🛡️ ISO 27001 Risk Assessment & Statement of Applicability (SoA)

An interactive web application that simulates a complete **ISO 27001:2013** risk assessment workflow, including asset identification, threat analysis, risk scoring, Annex A control mapping, and risk treatment planning.

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📋 Project Overview

This project demonstrates a simulated ISO 27001:2013 risk assessment for **NovaTech Solutions**, a fictional mid-size IT services company. It showcases:

- **Risk Assessment** using a qualitative 5×5 risk methodology (Likelihood × Impact)
- **Asset Identification** across 6 asset categories (Hardware, Software, Data, People, Services, Facilities)
- **Annex A Control Mapping** with applicability status and justification
- **Risk Treatment Planning** aligned with ISMS best practices

---

## ✨ Features

### 📊 Dashboard
- 6 KPI cards (Total Risks, Critical, High, Assets, Controls, Treatment %)
- Interactive **5×5 Risk Heat Map** with color-coded cells
- Risk distribution by category (animated bar chart)
- Risk level donut chart (Critical / High / Medium / Low)
- Treatment action progress bars (Mitigate / Accept / Transfer / Avoid)

### 🖥️ Asset Inventory
- 15 sample information assets with type, owner, location, and criticality
- Search, filter by asset type, sortable columns
- Add / Edit / Delete via modal forms

### ⚠️ Risk Assessment Register
- 18 realistic risks with threat-vulnerability-asset mapping
- Auto-calculated risk scores with color-coded risk levels
- Filter by risk level, full-text search, sortable columns
- CRUD operations via modals

### 📋 Statement of Applicability (SoA)
- 31 Annex A controls across all 14 ISO 27001:2013 domains
- Applicability status with justification for each control
- Implementation status tracking (Implemented / Partially / Planned)
- Filter by domain and applicability status

### ✅ Risk Treatment Plan
- 18 treatment actions mapped to identified risks
- Treatment types: Mitigate, Accept, Transfer, Avoid
- Responsible owner, deadline, and status tracking
- Residual risk assessment after treatment
- Editable status via modal (Not Started → Planned → In Progress → Completed)

### 🔧 Additional Features
- **CSV Export** — Download any tab's data as a CSV file
- **LocalStorage Persistence** — All changes saved across browser sessions
- **Responsive Design** — Works on desktop, tablet, and mobile
- **Dark Premium Theme** — Glassmorphism, animations, and modern aesthetics

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Edge, Firefox, Safari)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/navanee7h/ISO-27001-Risk-Assessment-Statement-of-Applicability-SoA-.git
   cd iso27001-risk-assessment
   ```

2. **Open in browser**
   ```bash
   # Simply open the HTML file
   open index.html
   # Or on Windows
   start index.html
   ```

No build tools, dependencies, or server required — it's a pure HTML/CSS/JS application.

---

## 📁 Project Structure

```
├── index.html      # Main page — sidebar navigation, 5 tab sections, modals
├── styles.css      # Dark theme, glassmorphism, animations, responsive layout
├── app.js          # Application logic, sample data, charts, CRUD, export
└── README.md       # Project documentation
```

---

## 🔍 Risk Methodology

| Score Range | Risk Level | Color  |
|:-----------:|:----------:|:------:|
| 20 – 25     | Critical   | 🔴 Red    |
| 12 – 19     | High       | 🟠 Orange |
| 6 – 11      | Medium     | 🟡 Yellow |
| 1 – 5       | Low        | 🟢 Green  |

**Risk Score** = Likelihood (1–5) × Impact (1–5)

### Likelihood Scale
| Value | Label     | Description                        |
|:-----:|:---------:|------------------------------------|
| 1     | Very Low  | Rare / Unlikely to occur           |
| 2     | Low       | Could occur but not expected       |
| 3     | Medium    | Possible under certain conditions  |
| 4     | High      | Likely to occur                    |
| 5     | Very High | Almost certain to occur            |

### Impact Scale
| Value | Label        | Description                          |
|:-----:|:------------:|--------------------------------------|
| 1     | Negligible   | Minimal impact on operations         |
| 2     | Minor        | Limited impact, easily recoverable   |
| 3     | Moderate     | Noticeable impact, requires response |
| 4     | Major        | Significant impact on business       |
| 5     | Catastrophic | Severe impact, potential business failure |

---

## 🏢 Simulated Business Environment

**NovaTech Solutions** — A mid-size IT services company with:
- On-premise and cloud infrastructure (AWS, Azure)
- Customer-facing CRM and API systems
- Remote workforce using VPN and Microsoft 365
- Development team using GitHub Enterprise
- Compliance requirements (GDPR)

---

## 📜 ISO 27001:2013 Annex A Domains Covered

| Domain | Description |
|--------|-------------|
| A.5  | Information Security Policies |
| A.6  | Organization of Information Security |
| A.7  | Human Resource Security |
| A.8  | Asset Management |
| A.9  | Access Control |
| A.10 | Cryptography |
| A.11 | Physical and Environmental Security |
| A.12 | Operations Security |
| A.13 | Communications Security |
| A.14 | System Acquisition, Development and Maintenance |
| A.15 | Supplier Relationships |
| A.16 | Information Security Incident Management |
| A.17 | Business Continuity Management |
| A.18 | Compliance |

---

## 🛠️ Technologies Used

- **HTML5** — Semantic structure
- **CSS3** — Custom properties, flexbox, grid, animations, glassmorphism
- **JavaScript (ES6+)** — Vanilla JS, no frameworks or libraries
- **LocalStorage API** — Client-side data persistence
- **Google Fonts** — Inter typeface

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

---

IMAGES

<img width="1902" height="878" alt="image" src="https://github.com/user-attachments/assets/dcde6a23-bd77-4fdc-a003-4232377b7863" />
<img width="1906" height="801" alt="image" src="https://github.com/user-attachments/assets/07b70e8c-d25d-4987-b943-a5760120906f" />
<img width="1899" height="802" alt="image" src="https://github.com/user-attachments/assets/74edfeeb-f4d5-4078-a29a-f127a1cc3cbb" />
<img width="1908" height="794" alt="image" src="https://github.com/user-attachments/assets/94961647-b423-4513-b897-7e5a759e3d71" />
<img width="1900" height="804" alt="image" src="https://github.com/user-attachments/assets/98175960-1c42-4b10-9262-5d34b068baf3" />




## 👤 Author

**NovaTech Solutions ISMS Team** — Simulated project for educational purposes.

---

> **Disclaimer**: This is a simulated risk assessment for educational and portfolio purposes. It does not represent a real organization's security posture or a certified ISMS implementation.


