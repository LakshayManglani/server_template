# Contributing Guide

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://www.conventionalcommits.org/en/v1.0.0/)

## How to Contribute

1. Fork the repository.
2. Create a new branch:
   - For features: `git checkout -b feat/your-feature-name`
   - For bug fixes: `git checkout -b fix/your-bug-fix-name`
3. Make your changes and commit them using **Conventional Commits**.
4. Push your changes to your forked repository.
5. Open a Pull Request and briefly explain your changes.

## Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.

### Format

```text
<type>(optional scope): short description

optional body

optional footer
```

### Common Types

| Type     | Description                                                        |
| -------- | ------------------------------------------------------------------ |
| feat     | A new feature                                                      |
| fix      | A bug fix                                                          |
| docs     | Documentation-only changes                                         |
| style    | Code style changes (whitespace, formatting, etc — no logic change) |
| refactor | Code changes that neither fix a bug nor add a feature              |
| perf     | Performance improvement                                            |
| test     | Adding or updating tests                                           |
| build    | Changes that affect the build system or external dependencies      |
| ci       | Changes to CI configuration or scripts                             |
| chore    | Other changes that don’t modify `src` or test files                |
| revert   | Reverts a previous commit                                          |

📌 For a complete guide, visit [conventionalcommits.org](https://www.conventionalcommits.org/en/v1.0.0/).
