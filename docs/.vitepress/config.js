import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Server Template',
  description:
    'A scalable, opinionated Fastify + TypeScript server template with modern tooling (ESLint, Prettier, Vitest, Pino, Docker, CI/CD, API docs, and more).',
  // TODO: uncomment the following line to add a favicon
  // head: [
  //   [
  //     'link',
  //     {
  //       rel: 'icon',
  //       href: '/assets/favicon.ico',
  //     },
  //   ],
  // ],
  themeConfig: {
    search: {
      provider: 'local',
    },

    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: 'Docs', link: '/getting-started/installation' }],

    sidebar: [
      {
        text: 'Getting Started',
        base: '/getting-started',
        items: [
          { text: 'Installation', link: '/installation' },
          { text: 'Folder Structure', link: '/folder-structure' },
          { text: 'Contributing', link: '/contributing' },
          { text: 'VSCode Setup', link: '/vscode' },
        ],
      },
      // {
      //   text: 'Tutorials',
      //   base: '/tutorials',
      //   items: [
      //     { text: 'Create a Todo routes', link: '/todo' },
      //     { text: 'How to Document endpoints', link: '/documenting-endpoints' },
      //     { text: 'How to Write tests', link: '/write-tests' },
      //     { text: 'Schema Design & Modeling', link: '/schema-design' },
      //   ],
      // },
      {
        text: 'Project Architecture',
        base: '/architecture',
        items: [
          { text: 'Scripts', link: '/scripts' },
          { text: 'Environment Config', link: '/environment' },
          { text: 'Routes', link: '/routes' },
          { text: 'Services', link: '/services' },
          { text: 'Plugins', link: '/plugins' },
          { text: 'Validation', link: '/validation' },
          { text: 'Error Handling', link: '/error-handling' },
        ],
      },
      {
        text: 'Code Standards & Automation',
        base: '/standards',
        items: [
          { text: 'Naming Conventions', link: '/naming-conventions' },
          { text: 'Git Hooks & Checks', link: '/git-hooks' },
        ],
      },
    ],

    // TODO: uncomment the following line to add a footer
    // logo: '/assets/logo.png',

    socialLinks: [{ icon: 'github', link: 'https://github.com/LakshayManglani/server-template' }],
  },
});
