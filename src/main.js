import Vue from 'vue';
import Router from './router';
import Store from './store';
import Lang from './lang';

// UI
import Element from '../node_modules/element-ui/';
import lang from 'element-ui/lib/locale/lang/ru-RU'
import locale from 'element-ui/lib/locale'
// Bootstrap component
import App from './App.vue';

Vue.use(Element);
locale.use(lang)


// Create vue instance
new Vue({
    el: '#app',
    router: Router,
    store: Store,
    i18n: Lang,
    render: h => h(App)
});
