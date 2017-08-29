import axios from 'axios';

// Import config variables
import * as config from './config.js';

// Axios configuration
axios.defaults.responseType = config.responseType;
axios.defaults.baseUrl = config.root;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

// Export configurated axios for another api modules
export { axios as http };

// Imported queries
import banksTp from './queries/banks.js';
import banksTpMutation from './mutations/banks.js';
import banksTpDelete from './mutations/banksDelete.js';

import statusBD from './queries/status.js';
import typesBD from './queries/types.js';
import currencyBD from './queries/currency.js';

import bankaccountsTp from './queries/bank_acoounts.js';
import bankaccountsTpMutation from './mutations/bankaccounts.js';
import bankaccountsTpDelete from './mutations/bankaccountsDelete.js';

import payaccountsTp from './queries/pay_accounts.js';
import payaccountsTpMutation from './mutations/payaccounts.js';
import payaccountsTpDelete from './mutations/payaccountsDelete.js';

import payhistoryTp from './queries/pay_history.js';

export const currency = (id) => {
    let variables = '';

    return axios.post(config.endPoint, JSON.stringify({
        query: currencyBD,
        variables
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.currency__pagination;
    })
};

export const banks = ({ id, filter = {}, page = 1, perPage = 30, order = 'id,desc' }) => {
    return axios.post(config.endPoint, JSON.stringify({
        query: banksTp,
        variables: {
            id,
            filter,
            page,
            perPage,
            order
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(data.errors);

        return data.data.banks__pagination;
    });
};
export const banksMutations = ({ id, bank_name, bank_bic, bank_corr_account, company_id, description, status_id }) => {
    return axios.post(config.endPoint, JSON.stringify({
        query: banksTpMutation,
        variables: {
            id,
            bank_name,
            bank_bic,
            bank_corr_account,
            company_id,
            description,
            status_id
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.admins__bank;
    })
};
export const banksDelete = (id) => {
    if (!id) return ;
    return axios.post(config.endPoint, JSON.stringify({
        query: banksTpDelete,
        variables: {
            id,
            removable: true
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.admins__bank;
    })
};
export const statuses = ( table ) => {
    let variables = {table: "banks"};
    // if (table) {
    //     variables.table = banks
    // }
    return axios.post(config.endPoint, JSON.stringify({
        query: statusBD,
        variables
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.status;
    })
};


export const bankaccounts = ({ id, filter = {}, page = 1, perPage = 30, order = 'id,desc' }) => {
    return axios.post(config.endPoint, JSON.stringify({
        query: bankaccountsTp,
        variables: {
            id,
            filter,
            page,
            perPage,
            order
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.bank_accounts__pagination;
    })
};
export const statusesBankAccounts = ( table ) => {
    let variables = {table: "bank_accounts"};
 
    return axios.post(config.endPoint, JSON.stringify({
        query: statusBD,
        variables
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.status;
    })
};
export const bankaccountsMutations = ({ id, name, account_number, bank_id, description, status_id, currency_id, legal_entity_id }) => {
    return axios.post(config.endPoint, JSON.stringify({
        query: bankaccountsTpMutation,
        variables: {
            id,
            name,
            account_number,
            bank_id,
            currency_id,
            legal_entity_id,
            description,
            status_id
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.admins__bank_account;
    })
};
export const bankaccountsDelete = (id) => {
    if (!id) return ;
    return axios.post(config.endPoint, JSON.stringify({
        query: bankaccountsTpDelete,
        variables: {
            id,
            removable: true
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.admins__bank_account;
    })
};

export const payaccounts = ({ id, filter = {}, page = 1, perPage = 30, order = 'id,desc' }) => {
    return axios.post(config.endPoint, JSON.stringify({
        query: payaccountsTp,
        variables: {
            id,
            filter,
            page,
            perPage,
            order
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.pay_accounts__pagination;
    })
};
export const statusesPayAccounts = ( table ) => {
    let variables = {table: "pay_accounts"};
 
    return axios.post(config.endPoint, JSON.stringify({
        query: statusBD,
        variables
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.status;
    })
};
export const payaccountsMutations = ({ id, status_id, currency_id, company_id }) => {
    return axios.post(config.endPoint, JSON.stringify({
        query: payaccountsTpMutation,
        variables: {
            id,
            currency_id,
            status_id,
            company_id
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.admins__pay_account_mutation;
    })
};
export const payaccountsDelete = (id) => {
    if (!id) return ;
    return axios.post(config.endPoint, JSON.stringify({
        query: payaccountsTpDelete,
        variables: {
            id,
            removable: true
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.admins__pay_account_mutation;
    })
};

export const payhistory = ({ id, filter = {}, page = 1, perPage = 30, order = 'id,desc' }) => {
    return axios.post(config.endPoint, JSON.stringify({
        query: payhistoryTp,
        variables: {
            id,
            filter,
            page,
            perPage,
            order
        }
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.pay_history__pagination;
    })
};
export const statusesPayHistory = ( table ) => {
    let variables = {table: "pay_history"};
 
    return axios.post(config.endPoint, JSON.stringify({
        query: statusBD,
        variables
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.status;
    })
};
export const typesPayHistory = ( table ) => {
    let variables = {table: "pay_history"};
 
    return axios.post(config.endPoint, JSON.stringify({
        query: typesBD,
        variables
    })).then(({ data }) => {
        if (data.errors) throw new Error(JSON.stringify(data.errors));
        return data.data.status;
    })
};