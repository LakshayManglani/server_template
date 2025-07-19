# Git Hooks

Git hooks are managed using **Husky** to enforce code quality and safety at various stages of the Git workflow.

## `pre-commit`

Runs `lint-staged` to ensure the following on **staged files** before a commit is made:

- Format code using **Prettier**
- Auto-fix issues with **ESLint**
- Format Prisma schema using **Prisma Format**

## ✅ `commit-msg`

Ensures the commit message follows a consistent convention using **Commitlint**.

- If the message doesn't match the expected format, the commit is rejected.
- Configuration is defined in `commitlint.config.js`.

## ✅ `pre-push`

Runs checks before pushing code to a remote branch:

- 🧪 Type checks the codebase using `tsc --noEmit`
- 🔍 Lints the project with ESLint
- ✅ Runs all tests using Vitest

## Notes

- All hooks are automatically configured when you run `pnpm install` (via the `prepare` script).
- You can find the hook scripts under `.husky/` directory.
- It's recommended to perform Git operations through the terminal so you can view real-time output from the hooks.
