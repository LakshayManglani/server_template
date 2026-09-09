# Todo

## 🛠️ Phase 1: Project Bootstrapping

> Goal: Get the basic scaffolding and standards in place to enable collaborative, scalable dev.

- [x] Set up basic Fastify
- [x] Set up CI to verify lint, types and test
- [x] Add commit-linting using commit-msg
- [x] Enforce naming conventions for files and variables
- [x] Add `/health` endpoint
- [x] Set up doc server using vitepress
- [x] Set up env with `.env.example`, `.env.test`, `.env`
- [x] Set up centralized error-handling
- [x] Sanitize logs
- [x] Add and propagate `reqId`

## 🧱 Phase 2: Security, Performance, and Standards

> Goal: Harden the server, enable structured error flow, and optimize basic performance.

- [x] Secure HTTP headers
- [x] Set up CORS
- [x] Set up rate-limiting
- [x] Set up consistent api-response
- [x] Set up type-safe schema validation
- [x] Set up API documentation using Swagger, etc.

## 📘 Phase 3: Core Set up & Developer Environment

> Goal: Establish a working local development set up and baseline documentation for contributors.

- [x] Set up database
- [x] Add `/ready` endpoint
- [x] Set up Docker on the `feat/docker` branch
- [x] Add testing to validate all core functionalities of the server template
- [x] Add development extension in the `.vscode/extensions.json`
- [x] Set up docs

## 🚦 Phase 4: App Features

> Goal: Add minimal features and metadata required to make the project usable and publishable.

- [ ] Set up metrics endpoint
- [ ] Set up example auth
- [x] Add `author` info to `package.json`
- [x] Set `repository.url` in `package.json` to the project's GitHub repo
- [x] Choose License (MIT)

## 🛠️ Phase 5: Deployment & Observability

> Goal: Enable production-grade deployments with logging, compression, and CI/CD setup.

- [ ] Set up logging
  - Docker captures the stdout
  - Write docker config to rotate logs. (Eg. max-size: 10m, max-file: 5)
  - Use filebeat or similar tool to centralize the logs
- [ ] Set up compression for JSON
  - Set up this in nginx
  - reason: nginx is multithreaded
- [ ] Set up CD GitHub-workflow
