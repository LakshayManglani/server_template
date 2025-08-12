# Installation Guide

This project requires the following tools to be installed before getting started:

## Prerequisites

- [Node.js (v22 or higher)](https://nodejs.org/en/download)
- [pnpm (v10+)](https://pnpm.io/installation)
- [PostgreSQL (v17.5 recommended)](https://www.postgresql.org/download/)
- [Git](https://git-scm.com/downloads)
- [VSCode](https://code.visualstudio.com/)

## 1. Clone the Repository

Make sure you have [SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) and [GPG](https://docs.github.com/en/authentication/managing-commit-signature-verification) setup for Git.

```bash
git clone git@github.com:{your-username}/server-template.git
```

> Replace `{your-username}` with your actual GitHub username.

## 2. Open the Project in VSCode

Open the folder in VSCode:

```bash
cd server-template
code .
```

Install the recommended extensions when prompted (or see [VSCode Setup](./vscode)).

## 3. Install Dependencies

Run the following command to install all project dependencies using pnpm:

```bash
pnpm install
```

## 4. Set Up Environment Variables

1. Copy the example env file:

```bash
cp .env.example .env
```

2. Fill in your environment-specific values in the new `.env` file.

See [Environment Config](../architecture//environment) for full details.

## 5. Migrate the database

```bash
pnpm db:dev
```

## 6. Start the Development Server

```bash
pnpm dev
```

Your Fastify server should now be running at `http://localhost:3000`.

See [scripts](../architecture//scripts) for full details.

## You're Ready!

You can now explore the codebase, follow the [Project Architecture](../architecture/scripts.md).
