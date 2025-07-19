# Scripts

This project uses a variety of `package.json` scripts to automate development, build, testing, formatting, and database tasks. Below is a categorized breakdown of all available commands.

## Development

| Script  | Description                                                   |
| ------- | ------------------------------------------------------------- |
| `dev`   | Starts the development server with file watching using `tsx`. |
| `start` | Runs the production server from the `dist` folder.            |

> [!NOTE]
>
> `dev` script uses `.env` file to load environment variables.
>
> `start` script does **not** load any `.env` file by default.

## Build & Clean

| Script  | Description                                                             |
| ------- | ----------------------------------------------------------------------- |
| `clean` | Deletes the `dist` folder.                                              |
| `build` | Runs `clean`, then builds the project using TypeScript and `tsc-alias`. |

## Type Checking

| Script      | Description                                                  |
| ----------- | ------------------------------------------------------------ |
| `typecheck` | Used to typecheck the entire project without emitting files. |

## Linting & Formatting

| Script         | Description                           |
| -------------- | ------------------------------------- |
| `lint`         | Runs ESLint to check code quality.    |
| `lint:fix`     | Runs ESLint and fixes fixable issues. |
| `format`       | Formats all code using Prettier.      |
| `format:check` | Checks formatting without writing.    |

## Testing

| Script          | Description                       |
| --------------- | --------------------------------- |
| `test`          | Runs all tests using `vitest`.    |
| `test:dev`      | Runs tests in watch mode.         |
| `test:ui`       | Opens the Vitest UI.              |
| `test:coverage` | Runs tests and collects coverage. |

> [!NOTE]
>
> **Testing** related scripts uses `.env.test` file to load environment variables.

## Documentation

| Script         | Description                           |
| -------------- | ------------------------------------- |
| `docs:dev`     | Starts the VitePress docs dev server. |
| `docs:build`   | Builds the documentation.             |
| `docs:preview` | Previews the built docs.              |

## Database

| Script      | Description                                     |
| ----------- | ----------------------------------------------- |
| `db:format` | Formats the Prisma schema file.                 |
| `db:gen`    | Generates Prisma client from schema.            |
| `db:ui`     | Opens Prisma Studio (GUI for DB).               |
| `db:reset`  | Resets DB and applies migrations (interactive). |
| `db:dev`    | Applies migrations in dev and generates client. |
| `db:deploy` | Applies migrations in production.               |
| `db:status` | Shows the current status of migrations.         |

> [!NOTE]
>
> **Database** related scripts uses `.env` file to load environment variables.

## Git Hooks

| Script    | Description                  |
| --------- | ---------------------------- |
| `prepare` | Initializes Husky git hooks. |
