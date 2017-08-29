import Vue from 'vue';
import VueRouter from 'vue-router';

// Register vue-router
Vue.use(VueRouter);

// Import router's variables and routes
import * as config from './config.js';
import routes from './routes.js';

// Add prefix to each route
routes.forEach(route => {
    route.path = config.root + route.path;
});

// Create router instance
const router = new VueRouter({
    mode: 'history',
    root: config.root,
    routes
});

// TODO: Register scrollBehavior

export default router;
