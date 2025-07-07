// @ts-check

import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Apply unicorn plugin (recommended + custom rules)
  {
    extends: [eslintPluginUnicorn.configs.recommended],
    rules: {
      'unicorn/better-regex': 'warn',
      'unicorn/no-null': 'off',
    },
  },

  {
    rules: {
      '@typescript-eslint/require-await': 'off',

      // Enforces variable and function naming conventions
      '@typescript-eslint/naming-convention': [
        'error',
        // Variable names: use camelCase
        {
          selector: 'variable',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },

        // Constants: use camelCase or UPPER_CASE based on the code
        {
          selector: 'variable',
          modifiers: ['const'],
          format: ['camelCase', 'UPPER_CASE'],
        },

        // Function names
        {
          selector: 'function',
          format: ['camelCase'],
        },

        // Class and interface names
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },

        // Parameters
        {
          selector: 'parameter',
          format: ['camelCase'],
          leadingUnderscore: 'allow',
        },

        // Properties: allow camelCase and snake_case (for API data)
        {
          selector: 'property',
          format: ['camelCase', 'snake_case', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        // Skip validation for literal keys like "200"
        {
          selector: 'property',
          modifiers: ['requiresQuotes'],
          format: null,
        },

        // Enum members: PascalCase
        {
          selector: 'enumMember',
          format: ['PascalCase'],
        },
      ],
    },
  },

  // Prettier config last (disables formatting conflicts)
  eslintConfigPrettier,

  // Override for plain JS files (disable type-checking)
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    ignores: ['dist', 'node_modules', 'coverage', 'docs/.vitepress/dist', 'docs/.vitepress/cache'],
  },
);
