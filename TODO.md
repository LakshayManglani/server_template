# Todo

## 🛠️ Phase 1: Project Bootstrapping

> Goal: Get the basic scaffolding and standards in place to enable collaborative, scalable dev.

- [x] Setup basic Fastify setup
- [x] Setup CI to verify lint, types and test
- [x] Add commit-linting using commit-msg
- [x] Enforce naming conventions for files and variables
- [x] Add `/health` endpoint
- [x] Setup doc server using vitepress
- [x] Setup env with `.env.example`, `.env.test`, `.env`
- [ ] Setup centralized error-handling
- [ ] Setup logging
- [ ] Sanitize logs
- [ ] Add and propagate `reqId`

## 🧱 Phase 2: Security, Performance, and Standards

> Goal: Harden the server, enable structured error flow, and optimize basic performance.

- [ ] Secure HTTP headers
- [ ] Setup CORS
- [ ] Setup compression for JSON
- [ ] Setup rate-limiting
- [ ] Setup type-safe schema validation
- [ ] Setup metrics endpoint

## 📘 Phase 3: Docs and Developer Onboarding

> Goal: Make it easy for new contributors and teams to understand and work with the codebase.

- [ ] Add sections like `pre-commit` & `pre-push` in `CONTRIBUTING.md` once husky and type-checks are configured
- [ ] Setup docs for naming conventions, how-to-create-routes etc.
- [ ] Setup API documentation using Swagger, etc.

## 🚦 Phase 4: Production Readiness

> Goal: Final checks and signals for real-world deployments.

- [ ] Add `/ready` endpoint
- [ ] Add development extension in the `.vscode/extensions.json`
- [ ] Setup Docker
- [ ] Ensure testing to validate all core functionalities of the server template
- [ ] Add `author` info to `package.json` once company is finalized
- [ ] Update `repository.url` in `package.json` once company GitHub account is created
- [ ] Choose License
