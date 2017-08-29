const initialState = {
    ITEMS: [],
    ITEM: {},
    NEW_ITEM: {},
    FILTER: {
    	id: '',
        bank_bic: '',
        bank_name: '',
        bank_corr_account: '',
        description: '',
        statuses: []
    },
    STATUSES: [],
    page: 1,
    perPage: 20,
    total: 0,
    last: 1,
};

const state = { ...initialState };

export default state;
