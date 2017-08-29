// Import mutation's types
import { 
	SET_PAGINATION, 
	SET_ITEMS,
    SET_ITEM,
    SET_PAGE,
    UPDATE_FILTER,
    UPDATE_FILTER_ID,
    UPDATE_FILTER_IN,
    UPDATE_FILTER_TOGGLE,
    DELETE_ITEM,
    GET_STATUS,
    UPDATE_NEW_ITEM,
    SELECTED_STATUS,
    SET_FILTER_VALUE,
    REMOVE_STATUS
} from './types.js';

const mutations = {
    [SET_ITEMS](state, payload) {
    	state.ITEMS = payload;
    },
    [SET_ITEM](state, payload) {
        state.ITEM = payload;
    },
    [SET_PAGINATION](state, { page, total, perPage, last }) {
    	state.page = page;
    	state.total = total;
    	state.perPage = perPage;
    	state.last = last;
    },
    [SET_PAGE](state, page) {
        state.page = page;
    },
    [GET_STATUS](state, payload) {
        state.STATUSES = payload;
    },
    [UPDATE_NEW_ITEM](state, {name, value}) {
        state.NEW_ITEM[name] = value
    },
    [SELECTED_STATUS] (state, payload) {
        let result = state.FILTER.statuses.find(item => item.name == payload.name)
        if (result) return
        state.FILTER.statuses.push(payload);
    },
    [SET_FILTER_VALUE] (state, { name, value, push = false }) {
        if (push) {
            state.FILTER[name].push(value);
        } else {
            state.FILTER[name] = value;
        }
    },
    [REMOVE_STATUS] (state, payload) {
        state.FILTER.statuses.splice(state.FILTER.statuses.indexOf(payload), 1);
    }
};

export default mutations;
