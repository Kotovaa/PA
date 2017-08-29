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
    SELECTED_STATUS,
    SET_FILTER_VALUE,
    REMOVE_STATUS,
    ALL_STATUS
} from './types.js';

import { banks as getBanks } from '../../../api';
import { banksMutations as getBanksMutation } from '../../../api';
import { banksDelete as deleteBanks } from '../../../api';
import { statuses as getStatus } from '../../../api';


// Api formaters
import { 
    formatContain,
    formatWhereHas
} from '../../../api/formaters.js';

const apiFormatFilters = (filters) => {
    let whereHas = formatWhereHas(filters, [
        {
            state: 'statuses',
            entity: 'status'
        }
    ], {
        field: 'id',
        where: 'whereIn'
    });
    let contains = formatContain(filters,['bank_bic','bank_corr_account','bank_name','description','id']);

    return Object.assign(whereHas, contains);
};

import router from '../../../router';

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
            dispatch('getStatus');
        }).catch(errors => {
            console.error(errors);
        });
    },
    updateTableItem ({ commit, state, dispatch }, payload) {
        let { id, bank_name, bank_bic, bank_corr_account, company_id, description, status_id} = state.ITEM;
        getBanksMutation({
            id,
            bank_name,
            bank_bic,
            bank_corr_account,
            company_id,
            description,
            status_id
        }).then(result => {
            let item = result || null;
            commit(SET_ITEM, item);
            router.push('/banks')
        }).catch(errors => {
            console.error(errors);
        });
    },
    setFilterValue ({ commit, dispatch }, { name, value, push = false }) {
        commit(SET_FILTER_VALUE, { name, value, push });
        dispatch('getTableItems');        
    },
    addedTableItem ({ commit, state, dispatch }, { cb = false, cbError = false }) {
        let { id, bank_name, bank_bic, bank_corr_account, company_id, description, status_id } = state.NEW_ITEM;
        
        getBanksMutation({
            id,
            bank_name,
            bank_bic,
            bank_corr_account,
            company_id,
            description,
            status_id
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
    selectStatus ({ dispatch, commit }, status) {
        commit(SELECTED_STATUS, status);

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
    addStatus ({ commit }, payload) {
        commit(ADD_STATUS, payload);
    },
    removeStatus ({ commit, dispatch }, status) {
        commit(REMOVE_STATUS, status);

        dispatch('getTableItems');
    }
};

export default actions;
