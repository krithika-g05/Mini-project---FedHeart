# 🫀 FedHeart — Privacy-Preserving Federated Cardiovascular Risk Diagnostic System

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.22-FF6F00?logo=tensorflow&logoColor=white)](https://www.tensorflow.org/js)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

**FedHeart** is a decentralized, privacy-preserving cardiovascular disease risk prediction and analytics platform powered by **Federated Learning (FL)** and client-side machine learning. 

In traditional clinical AI, patient health records must be aggregated onto a central server, introducing significant privacy, compliance, and regulatory hurdles (HIPAA/GDPR). FedHeart implements the **Federated Averaging (FedAvg)** protocol: multiple healthcare nodes train models locally on isolated patient datasets, transmitting only mathematical model weight updates (gradients) to a global aggregator. **Raw patient records never leave the local node or client device.**

---

## 🌟 Key Highlights

- **🔒 Zero Data Centralization**: Raw clinical and lifestyle biomarkers are processed strictly in-browser. Zero patient records are transmitted or stored remotely.
- **⚡ Client-Side Federated Simulation**: Visual simulation of multi-hospital collaborative model training across 3 decentralized nodes using TensorFlow.js.
- **🩺 Comprehensive 20-Biomarker Risk Engine**: Evidence-based cardiovascular risk assessment combining Framingham Risk Criteria, ACC/AHA guidelines, lipid profiles, and clinical inflammation markers.
- **📊 Real-time Convergence Analytics**: Dynamic learning curves, per-hospital accuracy tracking, terminal telemetry logs, and convergence monitoring.
- **📄 Report Export**: Instant clinical summary generation and risk report export for healthcare consultations.

---

## 🏗️ Architecture & Federated Averaging (FedAvg)

```
                     ┌───────────────────────────────┐
                     │   Global Model Aggregator     │
                     │  (Federated Averaging Engine) │
                     └───────────────▲───────────────┘
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           │ Encrypted Weights (W_1) │ Encrypted Weights (W_2) │ Encrypted Weights (W_3)
           │                         │                         │
┌──────────┴──────────┐   ┌──────────┴──────────┐   ┌──────────┴──────────┐
│  Hospital Node A    │   │  Hospital Node B    │   │  Hospital Node C    │
│  City General       │   │  St. Mary Trust     │   │  North Regional     │
│ ┌─────────────────┐ │   │ ┌─────────────────┐ │   │ ┌─────────────────┐ │
│ │ Local Dataset   │ │   │ │ Local Dataset   │ │   │ │ Local Dataset   │ │
│ │ (Isolated Data) │ │   │ │ (Isolated Data) │ │   │ │ (Isolated Data) │ │
│ └─────────────────┘ │   │ └─────────────────┘ │   │ └─────────────────┘ │
└─────────────────────┘   └─────────────────────┘   └─────────────────────┘
```

### Federated Averaging (McMahan et al.)
In each communication round $t$:
1. The global model parameter vector $w_t$ is synchronized across all active hospital nodes.
2. Each hospital node $k$ trains locally on its partition $\mathcal{D}_k$ for $E$ epochs using stochastic gradient descent:
   $$w_{t+1}^k \leftarrow w_t - \eta \nabla L(w_t; \mathcal{D}_k)$$
3. The server aggregates the local updates weighted by each node's sample count $n_k$:
   $$w_{t+1} \leftarrow \sum_{k=1}^{K} \frac{n_k}{n} w_{t+1}^k$$
4. The synchronized global model updates without ever exposing patient-level records.

---

## 📋 Clinical Features & Biomarkers

FedHeart processes 20 clinical, metabolic, and behavioral indicators:

| Category | Features |
|---|---|
| **Demographics & Vitals** | Age, Gender, Resting Blood Pressure (mmHg), BMI, Sleep Duration |
| **Lipid Panel** | Total Cholesterol (mg/dL), Triglycerides (mg/dL), Low HDL Flag, High LDL Flag |
| **Metabolic & Blood Markers** | Fasting Blood Sugar (mg/dL), Diagnosed Diabetes |
| **Systemic Inflammation** | High-Sensitivity C-Reactive Protein (hs-CRP), Homocysteine Level |
| **Clinical History** | Family Heart Disease History, Hypertension Diagnosis |
| **Lifestyle & Behavioral** | Physical Exercise Habits, Tobacco Smoking, Alcohol Intake, Stress Levels, Sugar Consumption |

---

## 📂 Project Structure

```
fed-heart/
├── .github/
│   ├── workflows/
│   │   └── ci.yml               # Automated CI (lint, test, build)
│   └── PULL_REQUEST_TEMPLATE.md # PR guidelines template
├── public/
│   ├── dataset/
│   │   └── heart_disease.csv    # 10,000 anonymized clinical records
│   ├── model/
│   │   └── pretrained_weights.json
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Analytics/           # Dataset insights, learning curves & model comparison
│   │   ├── Dashboard/           # Hospital node cards & global telemetry stats
│   │   ├── Layout/              # Navbar, Hero, Footer
│   │   ├── Prediction/          # 20-biomarker patient diagnostic form & risk cards
│   │   └── UI/                  # Modal, Splash screen, Heart animations
│   ├── constants/               # Architectural & privacy modal configurations
│   ├── hooks/                   # useFederatedLearning orchestration hook
│   ├── lib/
│   │   ├── data/                # CSV parsing, min-max normalization, dataset partitioning
│   │   └── ml/                  # TensorFlow.js models, FedAvg aggregator, Framingham risk scoring
│   ├── pages/                   # Home and About/Architecture pages
│   ├── App.jsx                  # Main application routing and state coordination
│   ├── index.css                # Dark-mode medical UI styling
│   └── main.jsx
├── scripts/
│   ├── analyze_features.js      # Feature distribution inspection
│   └── train_offline.js         # Offline benchmark trainer
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0.0 or higher recommended)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/krithika-g05/Mini-project---FedHeart.git
   cd Mini-project---FedHeart
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🧪 Testing

To run unit tests verifying the machine learning models, weight aggregation, and risk scoring algorithms:

```bash
npm run test
```

---

## 🛡️ Privacy & Medical Disclaimer

> [!NOTE]  
> **Differential Privacy & Client Isolation**: FedHeart performs all normalization, gradient computation, and evaluation locally. When simulating multi-node federated rounds, only mathematical weight tensors are exchanged.

> [!WARNING]  
> **Medical Disclaimer**: FedHeart is an academic research demonstration and educational platform. The risk scores generated are derived from statistical associations (including Framingham Heart Study and ACC/AHA cardiovascular guidelines) and are **not** substitutes for professional clinical diagnoses, medical advice, or physician evaluations.

---

## 📜 References

1. **McMahan, B., Moore, E., Ramage, D., Hampson, S., & y Arcas, B. A.** (2017). *Communication-Efficient Learning of Deep Networks from Decentralized Data*. Artificial Intelligence and Statistics (AISTATS). [arXiv:1602.05629](https://arxiv.org/abs/1602.05629)
2. **Dwork, C., & Roth, A.** (2014). *The Algorithmic Foundations of Differential Privacy*. Foundations and Trends in Theoretical Computer Science. [DOI: 10.1561/0400000042](https://doi.org/10.1561/0400000042)
3. **Grundy, S. M., et al.** (2019). *2018 AHA/ACC/AACVPR/AAPA/ABC/ACPM/ADA/AGS/APhA/ASPC/NLA/PCNA Guideline on the Management of Blood Cholesterol*. Circulation, 139(25), e1082-e1143.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

---

## 👩‍💻 Author & Contributor

This project was developed and maintained solely by:

**Krithika G** ([@krithika-g05](https://github.com/krithika-g05))  
Repository: [Mini-project---FedHeart](https://github.com/krithika-g05/Mini-project---FedHeart)
