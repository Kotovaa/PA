// Import all module's parts
import state from './state.js';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

// Example module
const module = {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
};

export default module;
