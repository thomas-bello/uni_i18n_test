import { createSSRApp } from 'vue'

import { initI18n } from '@/plugins/i18n'

// import { createPinia } from 'pinia';

// const store = createPinia();

import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  // app.use(store);

  app.use(initI18n())

  return {
    app
  }
}
