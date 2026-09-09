---
layout: home

hero:
  name: Server Template
  tagline: Scalable, opinionated Fastify + TypeScript backend template.
  # TODO: uncomment the following line to add a footer
  # image:
  #   src: /assets/logo.png
  #   alt: Server Template
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: Architecture
      link: /architecture/scripts

features:
  - title: Batteries Included
    details: Comes with ESLint, Prettier, testing, Docker, and CI/CD presets out of the box.
  - title: TypeScript First
    details: Fully typed backend with clear conventions and DX-focused setup.
  - title: Production Ready
    details: Logging with Pino, validation, API docs, testing, and deploy-ready structure.
---

## ✅ What’s Included

A quick overview of the key features implemented in this template:

### 🧩 Core Architecture

- Modular file/folder structure with clear naming conventions
- Domain-driven design for routes, services, and plugins
- Typed route handlers using Fastify + TypeBox

### 🛡 Code Quality

- TypeScript with strict mode
- ESLint + Prettier setup
- Git hooks via Husky with lint-staged
- Commit message linting (`commitlint`)

### 🧪 Testing

- Unit + integration testing with Vitest
- Custom test environment with `.env.test`

### 🛠 Dev & Tooling

- VSCode workspace config (extensions, tasks, launch/debug)
- Custom scripts (`pnpm`, `db:`, `test:` etc.)
- CI with GitHub Actions (typecheck, lint, test on push)

### ⚙️ Backend Features

- Prisma ORM with PostgreSQL
- Environment management and `app.secrets` abstraction
- Request and response validation with TypeBox
- Global error handling and standard API error format
- Swagger documentation with OpenAPI
- Secure defaults: rate-limit, CORS, helmet, etc.
- Logging using Pino with requestId tracing

## 🚧 What’s Not Implemented Yet

Some areas are Work In Progress:

- Docker Support
  - implemented in a separate branch named `feat/docker`
- Example Authentication
  - work in progress on the `feat/auth` branch, not yet merged
- Metrics Endpoint
  - planned, not yet implemented
- Image/Asset Processing
- Tutorial Docs
