# 📋 Changelog

All notable changes to the **FedHeart** platform are documented in this file.

The project follows [Semantic Versioning](https://semver.org/) and [Conventional Commits](https://www.conventionalcommits.org/).

---

## [1.2.0] - 2026-11-01

### 🚀 Highlights & Architectural Refinements
- **Clinical Summary Export Engine**: Added one-click clinical report generation, formatted `.txt` downloads, clipboard export, and printable layout for physician consultations.
- **Model Comparison & Federated Analytics**: Added comparative telemetry metrics visualizing local hospital node accuracy vs. aggregated global FedAvg model, along with data transmission reduction metrics (99.92% bandwidth savings).
- **Automated Test Suite**: Added Vitest test coverage for evidence-based Framingham risk scoring, tensor weight averaging, and patient data partitioning.
- **Continuous Integration (CI)**: Configured GitHub Actions workflow for automated linting, test execution, and production build checks on pushes and PRs.

### 🎨 Architecture & UI
- Decomposed monolithic `App.jsx` (442 lines down to 184 lines) into modular components: `Navbar`, `Hero`, `Footer`, `InfoModal`, and `ModelComparison`.
- Added accessibility attributes (`htmlFor`, `id`, `role="log"`, `aria-live`, `aria-modal`).
- Updated Open Graph and meta description tags in `index.html`.

### 🧹 Repository Hygiene & Deduplication
- Removed duplicate 1.5MB CSV from repository root.
- Renamed `public/data set/` to safe `public/dataset/` URL path.
- Removed debug scratch files and committed build artifacts.
- Synchronized repository remote and footer links to `krithika-g05/Mini-project---FedHeart`.

---

## [1.0.0] - Initial Release
- Core client-side TensorFlow.js Federated Learning simulation across 3 hospital nodes.
- Framingham/AHA evidence-based cardiovascular risk prediction engine with 20 clinical biomarkers.
- Interactive learning curve and real-time terminal telemetry logs.
