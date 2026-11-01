import { Server, Database, Lock } from 'lucide-react';

export const MODAL_CONTENT = {
  framework: {
    icon: Server,
    title: 'Federated Learning Architecture',
    color: '#ef4444',
    sections: [
      {
        heading: 'How It Works',
        body: 'Instead of uploading sensitive patient records to a central server, each hospital node trains a local model on its own data. Only the encrypted model weights — never raw data — are transmitted to the global aggregator.'
      },
      {
        heading: 'FedAvg Algorithm',
        body: 'The global model is updated by averaging the locally trained weight updates from all participating hospital nodes, weighted by their local dataset size. This is the core of the McMahan et al. (2017) Federated Averaging protocol.'
      },
      {
        heading: 'Fault Tolerance & Node Dropout',
        body: 'Nodes can join or leave mid-training without disrupting the global learning process. The aggregator continues with available nodes, making the system robust to hospital dropouts or network latency.'
      }
    ],
    link: { href: 'https://arxiv.org/abs/1602.05629', label: 'Read the Original FedAvg Research Paper' }
  },
  dataset: {
    icon: Database,
    title: 'Dataset & Biomarker Details',
    color: '#a78bfa',
    sections: [
      {
        heading: 'Source & Size',
        body: '10,000 anonymized patient records spanning 20 clinical, metabolic, and behavioral features, including resting blood pressure, cholesterol, BMI, triglycerides, hs-CRP, and homocysteine.'
      },
      {
        heading: 'Features Used',
        body: 'Age, Gender, Blood Pressure, Cholesterol Level, Exercise Habits, Smoking, Family Heart Disease History, Diabetes, BMI, High Blood Pressure, HDL/LDL Cholesterol markers, Alcohol, Stress, Sleep, Sugar Consumption, Triglycerides, Fasting Blood Sugar, CRP Level, Homocysteine.'
      },
      {
        heading: 'Privacy Processing',
        body: 'All normalization and feature engineering is performed locally in the browser. No data ever leaves the client device during the simulation.'
      }
    ]
  },
  privacy: {
    icon: Lock,
    title: 'Privacy & Security Model',
    color: '#10b981',
    sections: [
      {
        heading: 'Differential Privacy',
        body: "Statistical noise can be added to gradient updates before transmission, ensuring that no individual patient's data can be reverse-engineered from the model weights even if the global server is compromised."
      },
      {
        heading: 'Encrypted Communication',
        body: 'All weight transmissions between hospital nodes and the global aggregator are signed and encrypted. Man-in-the-middle attacks on gradient updates are prevented by protocol-level verification.'
      },
      {
        heading: 'Zero Data Centralization',
        body: 'At no point does raw patient data leave the originating hospital node. The global model converges entirely through the exchange of mathematical weight vectors, not health records.'
      }
    ],
    link: { href: 'https://arxiv.org/abs/1412.6980', label: 'Explore Differential Privacy Research' }
  }
};
