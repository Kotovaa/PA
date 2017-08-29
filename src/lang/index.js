import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

// Import i18n configuration
import * as config from './config.js';

Vue.config.lang = config.defaultLocale;
Vue.config.fallbackLang = config.fallbackLocale;

// Import locales
import messages from './locales';

// Create i18n instance
const i18n = new VueI18n({
    locale: config.fallbackLocale,
    messages
});

export default i18n;
