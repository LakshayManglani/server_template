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
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/naming-conventions' },
    ],

    sidebar: [
      {
        text: 'Conventions',
        collapsed: true,
        items: [{ text: 'Naming Conventions', link: '/naming-conventions' }],
      },
    ],

    // TODO: uncomment the following line to add a footer
    // logo: '/assets/logo.png',

    socialLinks: [{ icon: 'github', link: 'https://github.com/LakshayManglani/server-template' }],
  },
});
