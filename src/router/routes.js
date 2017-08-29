import hello from '../pages/Hello.vue';
import banks from '../pages/finance/banks/Banks.vue';
import banks_id from '../pages/finance/banks/_id.vue';
import banks_add from '../pages/finance/banks/_add.vue';
import bankaccounts from '../pages/finance/bank_accounts/Bank_accounts.vue';
import bankaccounts_id from '../pages/finance/bank_accounts/_id.vue';
import bankaccounts_add from '../pages/finance/bank_accounts/_add.vue';
import payaccounts from '../pages/finance/pay_accounts/Pay_accounts.vue';
import payaccounts_id from '../pages/finance/pay_accounts/_id.vue';
import payaccounts_add from '../pages/finance/pay_accounts/_add.vue';
import payhistory from '../pages/finance/pay_history/Pay_history.vue';
import payhistory_id from '../pages/finance/pay_history/_id.vue';
import payhistory_add from '../pages/finance/pay_history/_add.vue';

const routes = [
    // Example
    {
        path: '',
        component: hello,
        meta: {}
    },
    {
        path: 'banks',
        component: banks,
        meta: {}
    },
    {
        path: 'banks/:id',
        component: banks_id,
        meta: {}
    },
    {
        path: 'addbanks',
        component: banks_add,
        meta: {}
    },
    {
        path: 'bankaccounts',
        component: bankaccounts,
        meta: {}
    },
    {
        path: 'bankaccounts/:id',
        component: bankaccounts_id,
        meta: {}
    },
    {
        path: 'addbankaccounts',
        component: bankaccounts_add,
        meta: {}
    },
    {
        path: 'payaccounts',
        component: payaccounts,
        meta: {}
    },
    {
        path: 'payaccounts/:id',
        component: payaccounts_id,
        meta: {}
    },
    {
        path: 'addpayaccounts',
        component: payaccounts_add,
        meta: {}
    },
    {
        path: 'payhistory',
        component: payhistory,
        meta: {}
    },
    {
        path: 'payhistory/:id',
        component: payhistory_id,
        meta: {}
    },
    {
        path: 'addpayhistory',
        component: payhistory_add,
        meta: {}
    }
];

export default routes;
