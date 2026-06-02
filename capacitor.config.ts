import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId:   'daste.dev.figuapp',
  appName: 'FigüApp',

  // webDir apunta al output del build de Quasar para Capacitor
  webDir: 'dist/capacitor',

  server: {
    androidScheme: 'https'
  },

  plugins: {
    StatusBar: {
      style: 'Dark',
      backgroundColor: '#00000000',
      overlaysWebView: true
    },

    SplashScreen: {
      launchShowDuration: 1500,
      backgroundColor: '#0A0E1A',
      showSpinner: false,
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP'
    }
  }
}

export default config
