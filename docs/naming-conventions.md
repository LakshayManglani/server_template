# 🔤 Naming Conventions

This project follows strict naming conventions to ensure consistency, clarity, and maintainability across the entire codebase.

## 📁 Folder & File Naming

| Target  | Convention   | Examples                       |
| ------- | ------------ | ------------------------------ |
| Folders | `kebab-case` | `user-service/`, `auth-utils/` |
| Files   | `kebab-case` | `get-user.ts`, `jwt-helper.ts` |

✅ Use `kebab-case` consistently for all folders and file names.

## 🧠 Variable Naming

| Type                  | Convention                  | Examples                    |
| --------------------- | --------------------------- | --------------------------- |
| Regular variables     | `camelCase`                 | `userId`, `accessToken`     |
| File-scoped constants | `camelCase`                 | `loggerOptions`, `dbConfig` |
| Global constants      | `UPPER_SNAKE_CASE`          | `JWT_SECRET`, `MAX_RETRIES` |
| Parameters            | `camelCase`                 | `user`, `token`, `_options` |
| Object properties     | `camelCase` or `snake_case` | `userData`, `api_response`  |

> 🔹 Use `UPPER_SNAKE_CASE` only for **true constants** like env vars or global settings.
>
> 🔹 `camelCase` is used for most identifiers.
>
> 🔹 `snake_case` is allowed in object properties for external APIs or DB mappings.

## ⚙️ Function Naming

| Type            | Convention  | Examples                         |
| --------------- | ----------- | -------------------------------- |
| Functions       | `camelCase` | `getUserData()`, `createOrder()` |
| Arrow functions | `camelCase` | `handleRequest = () => {}`       |
| Methods         | `camelCase` | `auth.login()`, `user.update()`  |

> 🔹 Name functions based on **what they do**, e.g. `getUserById()`, not `getData()`
>
> 🔹 Avoid ambiguous or overly short names like `doTask()` or `handle()`

## 📦 TypeScript Naming

| Type         | Convention   | Examples                     |
| ------------ | ------------ | ---------------------------- |
| Classes      | `PascalCase` | `UserService`, `AuthManager` |
| Interfaces   | `PascalCase` | `User`, `AuthContext`        |
| Type Aliases | `PascalCase` | `UserPayload`, `TokenData`   |
| Enums        | `PascalCase` | `UserRole`, `OrderStatus`    |
| Enum Members | `PascalCase` | `Admin`, `Customer`, `Guest` |

> ✳️ We **do not prefix** interfaces with `I` (e.g. `IUser`) unless integrating with external systems.

## 🛠 ESLint Enforcement

The following ESLint rules help enforce naming conventions:

| Area            | Tool/Rule                                                                                                              |
| --------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Variable naming | [`@typescript-eslint/naming-convention`](https://typescript-eslint.io/rules/naming-convention)                         |
| File naming     | [`unicorn/filename-case`](https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/filename-case.md) |

## 📝 Best Practices

- ❌ Avoid abbreviations like req (use request).
- ✅ Name things based on **intent and behavior** (`createToken`, `deleteSession`).
- ✅ Keep naming consistent across files and modules.
- ✅ Allow leading underscores (`_token`, `_options`) for unused parameters or internal use.
