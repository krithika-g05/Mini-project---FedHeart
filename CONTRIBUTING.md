# Contributing to FedHeart

Thank you for your interest in contributing to **FedHeart**! Collaborative development helps ensure healthcare AI systems remain robust, ethical, transparent, and privacy-preserving.

---

## 🧭 Code of Conduct

Please maintain an inclusive, constructive, and respectful environment for all contributors and researchers.

---

## 🛠️ Development Workflow

1. **Fork or Clone the Repository**:
   ```bash
   git clone https://github.com/krithika-g05/Mini-project---FedHeart.git
   cd Mini-project---FedHeart
   ```

2. **Create a Dedicated Feature Branch**:
   Please follow descriptive branch naming:
   - `feat/feature-name` (e.g. `feat/differential-privacy-noise`)
   - `fix/bug-fix-description` (e.g. `fix/normalization-bounds`)
   - `refactor/component-name` (e.g. `refactor/prediction-form`)
   - `docs/documentation-update` (e.g. `docs/architecture-guide`)
   - `test/test-scope` (e.g. `test/federated-averaging`)

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Install Dependencies & Test**:
   ```bash
   npm install
   npm run dev
   ```

4. **Verify Code Quality**:
   ```bash
   npm run lint
   npm run test
   ```

---

## 📝 Commit Conventions

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature or user-facing enhancement
- `fix:` A bug fix
- `docs:` Documentation changes only
- `refactor:` Code restructuring without changing functional behavior
- `test:` Adding or updating tests
- `chore:` Changes to build scripts, configurations, or dependencies
- `ci:` CI/CD pipeline modifications

**Examples:**
- `feat(ml): add local differential privacy gradient clipping`
- `fix(data): address zero-division edge case in min-max scaler`
- `docs(readme): add detailed biomarker definitions and references`

---

## 📬 Submitting a Pull Request

1. Ensure your branch is up to date with `main`.
2. Push your branch to GitHub.
3. Open a Pull Request against `main`.
4. Fill out the PR template with a summary of changes, motivation, and verification steps.
5. Once reviewed and approved, merge your contribution!
