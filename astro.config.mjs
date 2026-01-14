// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom'

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
      starlight({
          plugins: [starlightImageZoom()],
          favicon: '/src/assets/logo.jpg',
            customCss: [
                './src/styles/global.css',
            ],
          title: 'Documentación',
          defaultLocale: 'es',
          locales: {
              root: {
              label: 'Español',
              lang: 'es', // Código de idioma
              },
          },
          credits: false,
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/Virtual-Office-Group' }],
          sidebar: [
              {
                  label: 'Introducción',
                  link: 'introduction',
              },
              {
                label: 'Business Central',
                collapsed: true,
                autogenerate: { directory: 'businessCentral' }
              },
              {
                label: 'AL (Aplication Language)',
                collapsed: true,
                autogenerate: { directory: 'al' }
              },
              {
                label: 'CRM 365',
                collapsed: true,
                autogenerate: { directory: 'crm' }  
              }
          ],
      }),
	],

  site: 'https://ProgramadorVOG.github.io',
  base: '',
});