// Import example mutation's types
import {
	SET_ITEMS,
    SET_ITEM,
	SET_PAGINATION,
    SET_PAGE,
    UPDATE_FILTER,
    UPDATE_FILTER_ID,
    UPDATE_FILTER_IN,
    UPDATE_FILTER_TOGGLE,
    DELETE_ITEM,
    GET_STATUS,
    UPDATE_NEW_ITEM,
    SET_FILTER_VALUE,
    SELECTED_STATUS,
    REMOVE_STATUS,
    SELECTED_CURRENCY,
    REMOVE_CURRENCY,
    ALL_STATUS,
    GET_CURRENCY
} from './types.js';

import { bankaccounts as getBanks } from '../../../api';
import { bankaccountsMutations as getBanksMutation } from '../../../api';
import { bankaccountsDelete as deleteBanks } from '../../../api';
import { statusesBankAccounts as getStatus } from '../../../api';
import { currency as getCurrency } from '../../../api';

// Api formaters
import { 
    formatContain,
    formatWhereHas
} from '../../../api/formaters.js';

import router from '../../../router';

const apiFormatFilters = (filters) => {
    let whereHas = formatWhereHas(filters, [
        {
            state: 'statuses',
            entity: 'status'
        }, 
        {
            state: 'currencys',
            entity: 'currency'
        }
    ], {
        field: 'id',
        where: 'whereIn'
    });
    let contains = formatContain(filters,['id', 'name', 'account_number', 'bank_id', 'description', 'legal_entity_id']);

    return Object.assign(whereHas, contains);
};

const actions = {
    getTableItems ({ commit, state, dispatch }) {
        let { page, perPage } = state;

    	getBanks({
    		page,
    		perPage,
    		filter: JSON.stringify(apiFormatFilters(state.FILTER)),
            order: 'id,asc'
    	}).then(result => {
            commit(SET_ITEMS, result.data);
            commit(SET_PAGINATION, {
                page: result.current_page,
                total: result.total,
                perPage: result.per_page,
                last: result.last_page
            });
        }).catch(errors => {
            console.error(errors);
        });
    },
    getTableItem ({ commit, state, dispatch }, payload) {
        getBanks({
            id: payload.id
        }).then(result => {
            let item = result.data ? result.data[0] : null;
            commit(SET_ITEM, item);
            dispatch('getCurrency');
            dispatch('getStatus');
        }).catch(errors => {
            console.error(errors);
        });
    },
    updateTableItem ({ commit, state, dispatch }, payload) {
        let { id, name, account_number, bank_id, description, status_id, currency_id, legal_entity_id } = state.ITEM;
        getBanksMutation({
            id,
            name,
            account_number,
            bank_id,
            description,
            status_id,
            currency_id,
            legal_entity_id
        }).then(result => {
            let item = result || null;
            commit(SET_ITEM, item);
            router.push('/bankaccounts')
        }).catch(errors => {
            console.error(errors);
        });
    },
    setFilterValue ({ commit, dispatch }, { name, value, push = false }) {
        commit(SET_FILTER_VALUE, { name, value, push });
        dispatch('getTableItems');        
    },
    addedTableItem ({ commit, state, dispatch }, { cb = false, cbError = false }) {
        let { id, name, account_number, bank_id, description, status_id, currency_id, legal_entity_id } = state.NEW_ITEM;

        getBanksMutation({
            id,
            name,
            account_number,
            bank_id,
            description,
            status_id,
            currency_id,
            legal_entity_id
        }).then(result => {
            let item = result || null;

            commit(SET_ITEM, item);

            if (cb) cb();
        }).catch(errors => {
            console.error(errors);

            if (cbError) cbError();
        });
    },
    deleteTableItem ({ commit, state, dispatch }, payload) {
        let { id } = payload;
        deleteBanks(id).then(result => {
            dispatch('getTableItems');
        }).catch(errors => {
            console.error(errors);
        });
    },
    setPage ({ commit, dispatch }, page) {
        commit(SET_PAGE, page);
        dispatch('getTableItems');
    },
    updateNewItem({commit, dispatch, state}, payload) {
        commit(UPDATE_NEW_ITEM, payload);
    },
    getStatus ({ commit, state, dispatch }, payload) {
        let table = '';
        getStatus(table).then(result => {
            commit(GET_STATUS, result);
        }).catch(errors => {
            console.log(errors);
        });
    },
    getCurrency ({ commit, state, dispatch }, payload) {
        getCurrency().then(result => {
            commit(GET_CURRENCY, result.data);
        }).catch(errors => {
            console.log(errors);
        });
    },
    selectStatus ({ dispatch, commit }, status) {
        commit(SELECTED_STATUS, status);
        dispatch('getTableItems');
    },
    addStatus ({ commit }, payload) {
        commit(ADD_STATUS, payload);
    },
    removeStatus ({ commit, dispatch }, status) {
        commit(REMOVE_STATUS, status);
        dispatch('getTableItems');
    },
    selectCurrency ({ dispatch, commit }, currency) {
        commit(SELECTED_CURRENCY, currency);
        dispatch('getTableItems');
    },
    addCurrency ({ commit }, payload) {
        commit(ADD_CURRENCY, payload);
    },
    removeCurrency ({ commit, dispatch }, currency) {
        commit(REMOVE_CURRENCY, currency);
        dispatch('getTableItems');
    }
};

export default actions;