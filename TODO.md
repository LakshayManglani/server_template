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
- [x] Setup centralized error-handling
- [x] Sanitize logs
- [x] Add and propagate `reqId`

## 🧱 Phase 2: Security, Performance, and Standards

> Goal: Harden the server, enable structured error flow, and optimize basic performance.

- [x] Secure HTTP headers
- [x] Setup CORS
- [x] Setup rate-limiting
- [x] Setup consistent api-response
- [x] Setup type-safe schema validation
- [x] Setup API documentation using Swagger, etc.

## 📘 Phase 3: Core Setup & Developer Environment

> Goal: Establish a working local development setup and baseline documentation for contributors.

- [ ] Setup database
- [ ] Add `/ready` endpoint
- [ ] Setup Docker
- [ ] Add testing to validate all core functionalities of the server template
- [ ] Add development extension in the `.vscode/extensions.json`
- [ ] Setup docs

## 🚦 Phase 4: App Features

> Goal: Add minimal features and metadata required to make the project usable and publishable.

- [ ] Setup metrics endpoint
- [ ] Setup example auth
- [ ] Add `author` info to `package.json` once company is finalized
- [ ] Update `repository.url` in `package.json` once company GitHub account is created
- [ ] Choose License

## 🛠️ Phase 5: Deployment & Observability

> Goal: Enable production-grade deployments with logging, compression, and CI/CD setup.

- [ ] Setup logging
  - Docker captures the stdout
  - Write docker config to rotate logs. (Eg. max-size: 10m, max-file: 5)
  - Use filebeat or similar tool to centralize the logs
- [ ] Setup compression for JSON
  - Setup this in nginx
  - reason: nginx is multithreaded
- [ ] Setup CD GitHub-workflow
