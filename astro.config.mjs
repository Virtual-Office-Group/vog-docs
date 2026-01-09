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
          social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/ProgramadorVOG' }],
          sidebar: [
              {
                  label: 'Introducción',
                  link: 'introduction',
              },
              {
                  label: 'Business Central',
                  collapsed: true,
                  items:[
                    {
                          label: 'Integraciones',
                          collapsed: true,
                          items:[
                              {
                                  label: 'Excel con Business Central',
                                  link: 'business/integration/excel'
                              }
                          ]
                    },
                    {
                          label: 'Listado de proyectos',
                          link: 'proyects/general'
                    },
                  ]
              },
              {
                  label: 'AL (Aplication Language)',
                  collapsed: true,
                  items:[
                      {
                          label: 'Inicio',
                          collapsed: true,
                          items:[
                              {
                                  label: 'Instalar ambiente de desarrollo',
                                  link: 'al/documentation/starting/install'
                              },
                              {
                                  label: 'Crear una nueva extensión',
                                  link: 'al/documentation/starting/create_extension'
                              },
                              {
                                  label: 'Crear aplicación para producción',
                                  link: 'al/documentation/starting/create_app'
                              },
                          ]
                      },
                      {
                          label: 'Documentación',
                          collapsed: true,
                          items:[
                              {
                                  label: 'Conceptos Basicos',
                                  autogenerate: { directory: 'al/documentation/basic' }
                              },
                              {
                                  label: 'Instrucciones (Iteradores)',
                                  link: 'al/documentation/interation'
                              },
                              {
                                  label: 'Instrucciones (Condicionales)',
                                  link: 'al/documentation/condition'
                              },
                              {
                                  label: 'Metodos de Interacción',
                                  link: 'al/documentation/input'
                              },
                              {
                                  label: 'Funciones de Cadena de texto',
                                  link: 'al/documentation/string'
                              },
                              {
                                  label: 'Fechas',
                                  link: 'al/documentation/date'
                              },
                              {
                                  label: 'Funciones Numericas',
                                  link: 'al/documentation/numeric'
                              },
                              {
                                  label: 'Funciones de Arreglos',
                                  link: 'al/documentation/array'
                              },
                              {
                                  label: 'Funciones de Listas',
                                  link: 'al/documentation/list'
                              },
                              {
                                  label: 'Funciones de Sistema',
                                  link: 'al/documentation/system'
                              },
                              {
                                  label: 'Funciones de Variables',
                                  link: 'al/documentation/variable'
                              },
                              {
                                  label: 'Gestión de errores',
                                  link: 'al/documentation/errors'
                              },
                              {
                                  label: 'Procedimientos (Funciones)',
                                  link: 'al/documentation/procedure'
                              },
                              {
                                  label: 'Codeunit',
                                  link: 'al/documentation/codeunit'
                              },
                              {
                                  label: 'Eventos y desencadenadores',
                                  link: 'al/documentation/events'
                              },
                              {
                                  label: 'Interfaces',
                                  link: 'al/documentation/interfaces'
                              },
                              {
                                  label: 'Manipular datos',
                                  link: 'al/documentation/data'
                              },
                              {
                                  label: 'Idiomas',
                                  link: 'al/documentation/language'
                              },
                              {
                                  label: 'Servicios web',
                                  link: 'al/documentation/webservices'
                              },
                              {
                                  label: 'Manejo de JSON',
                                  link: 'al/documentation/json'
                              },
                              {
                                  label: 'Funciones Extras',
                                  collapsed: true,
                                  autogenerate: { directory: 'al/documentation/procedureInternal' }
                              },
                          ]
                      },
                      {
                          label: 'Guia de desarrollo',
                          collapsed: true,
                          autogenerate: { directory: 'al/guides' }
                      },
                      {
                          label: 'Publicar en AppSource',
                          collapsed: true,
                          autogenerate: { directory: 'al/publish' },
                      },
                      {
                          label: 'Referencias',
                          collapsed: true,
                          autogenerate: { directory: 'al/reference' },
                      }
                  ]
              },
              {
                  label: 'CRM 365',
                  collapsed: true,
                  items:[
                      {
                          label: 'Configuración',
                          collapsed: true,
                          items:[
                              {
                                  label: 'Ventas',
                                  link: 'crm/configuration/sales'
                              },
                              {
                                  label: 'Atención al Cliente',
                                  link: 'crm/configuration/customerservice'
                              },
                          ]
                      },
                      {
                          label: 'Integración',
                          collapsed: true,
                          items:[
                              {
                                  label: 'Ventas Con Business Central',
                                  link: 'crm/integration/sales'
                              }
                          ]
                      },
                      {
                          label:'Flujo de proceso',
                          link: 'crm/flow'
                      }
                  ]
              }
          ],
      }),
	],

  site: 'https://ProgramadorVOG.github.io',
  base: '',
});