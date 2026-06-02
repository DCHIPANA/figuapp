import { defineConfig } from '#q-app/wrappers'

export default defineConfig((/* ctx */) => {
  return {

    // ── Boot files ──────────────────────────────────────────────────────────
    boot: [
      'axios'
    ],

    // ── CSS global ──────────────────────────────────────────────────────────
    css: [
      'app.scss'
    ],

    // ── Iconos / fuentes ────────────────────────────────────────────────────
    extras: [
      'roboto-font',
      'material-icons'
    ],

    // ── Build ───────────────────────────────────────────────────────────────
    build: {
      publicPath: '/figuapp/',
      target: {
        browser: 'baseline-widely-available',
        node: 'node22'
      },

      typescript: {
        strict: true,
        vueShim: true
      },

      vueRouterMode: 'hash',

      vitePlugins: [
        [
          'vite-plugin-checker',
          {
            vueTsc: true,
            eslint: {
              lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
              useFlatConfig: true
            }
          },
          { server: false }
        ]
      ]
    },

    // ── Dev server ──────────────────────────────────────────────────────────
    devServer: {
      open: true
    },

    // ── Framework ───────────────────────────────────────────────────────────
    framework: {
      config: {
        dark: true,
        notify: {
          position: 'top',
          timeout: 2500,
          progress: true
        }
      },

      plugins: [
        'LocalStorage',   // store/album.ts
        'Notify',         // $q.notify() en todas las páginas
        'Dialog',         // AlbumPage dialogs
        'BottomSheet',    // IntercambioPage
        'Loading'         // loading global
      ]
    },

    // ── Animaciones ─────────────────────────────────────────────────────────
    animations: [],

    // ── SSR ─────────────────────────────────────────────────────────────────
    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false
    },

    // ── PWA ─────────────────────────────────────────────────────────────────
    pwa: {
      workboxMode: 'GenerateSW'
    },

    // ── Capacitor ───────────────────────────────────────────────────────────
    capacitor: {
      hideSplashscreen: true
    },

    // ── Electron ────────────────────────────────────────────────────────────
    electron: {
      preloadScripts: ['electron-preload'],
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'daste.dev.figuapp'
      }
    },

    // ── BEX ─────────────────────────────────────────────────────────────────
    bex: {
      extraScripts: []
    }
  }
})
