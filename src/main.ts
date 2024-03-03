/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins';

// Components
import App from './App.vue';

// Composables
import { createApp } from 'vue';

import Toast, { PluginOptions } from "vue-toastification";
// Import the CSS or use your own!
import 'bootstrap-icons/font/bootstrap-icons.min.css';
import 'vue-toastification/dist/index.css';

const app = createApp(App)

const options: PluginOptions = {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
};

app.use(Toast, options);

registerPlugins(app)

app.mount('#app')
