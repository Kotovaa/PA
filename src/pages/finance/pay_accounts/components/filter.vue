<template>
	<div class="filter__container">
		<router-link to="addpayaccounts"><el-button type="primary" class="create_button">Создать</el-button></router-link>
		<div class="filter__group">
			<div class="form-group">
			 	<label class="ui-label">ID</label>
				<el-input v-model="id" @focus="focus"></el-input>
			 </div>
			<div class="form-group">
				<label class="ui-label">Номер счета в А24</label>
				<el-input v-model="account_number_in_a24" @focus="focus"></el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Последняя операция</label>
				<el-input v-model="last_pay_history_id" @focus="focus"></el-input>
			</div>	
			<div class="form-group">
				<label class="ui-label">Баланс счета</label>
				<el-input v-model="end_balance" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Выберите компанию</label>
				<ui_select v-model="company_id" multiple :options="getAllCompanies" @input="selectCompanies"></ui_select>
			</div>
			<div class="form-group">
				<label class="ui-label">Выберите валюту</label>
				<ui_input_suggest
	                v-model="searchTextCurrency"
	                :results="resultCurrency"
	                @input="searchCurrency"
	                icon="uikit-chevron-down"
	            >
	                <ui-select-option
	                    v-for="(currency, key) in resultCurrency"
	                    slot="dropdown"
	                    :key="key"
	                    :value="currency"
	                    @select="selectCurrency"
	                >
	                    {{ currency.name }}
	                </ui-select-option>
	            </ui_input_suggest>
	
	            <ui-chip
	                v-for="(currency, key) in currencys"
	                :key="key"
	                removable
	                remove-by-callback
	                @delete="removeCurrency(currency)"
	            >
	                {{ currency.name }}
	            </ui-chip>
			</div>

			<div class="form-group">
				<label class="ui-label">Выберите статус</label>
				<ui_input_suggest
	                v-model="searchText"
	                :results="result"
	                @input="search"
	                icon="uikit-chevron-down"
	            >
	                <ui-select-option
	                    v-for="(status, key) in result"
	                    slot="dropdown"
	                    :key="key"
	                    :value="status"
	                    @select="selectStatus"
	                >
	                    {{ status.name }}
	                </ui-select-option>
	            </ui_input_suggest>
	
	            <ui-chip
	                v-for="(status, key) in statuses"
	                :key="key"
	                removable
	                remove-by-callback
	                @delete="removeStatus(status)"
	            >
	                {{ status.name }}
	            </ui-chip>
			</div>
		</div>
	</div>
</template>

<script>
	import ui_chip from 'uikit-agro24/components/ui-chip.vue';
	import ui_input_suggest from 'uikit-agro24/components/ui-input-suggest.vue';
	import ui_select from 'uikit-agro24/components/ui-select.vue';
	import { statusesPayAccounts } from '../../../../api/';
	import { currency } from '../../../../api/';

	import _ from 'lodash';
	
	export default {
		data() {
			return {
				searchText: '',
				searchTextCurrency: '',
				result: [],
				resultCurrency: [],
				company_id: []
			}
		},
		computed: {
			id: {
				get () {
					return this.$store.getters['payaccounts/getId'];
				},
				set (value) {
					this.$store.dispatch('payaccounts/setFilterValue', { name: 'id', value });
				}
			},
			account_number_in_a24: {
				get () {
					return this.$store.getters['payaccounts/getAccountNumberInA24'];
				},
				set (value) {
					this.$store.dispatch('payaccounts/setFilterValue', { name: 'account_number_in_a24', value });
				}
			},
			last_pay_history_id: {
				get () {
					return this.$store.getters['payaccounts/getLastPayHistoryId'];
				},
				set (value) {
					this.$store.dispatch('payaccounts/setFilterValue', { name: 'last_pay_history_id', value });
				}
			},
			end_balance: {
				get () {
					return this.$store.getters['payaccounts/getEndBalance'];
				},
				set (value) {
					this.$store.dispatch('payaccounts/setFilterValue', { name: 'end_balance', value });
				}
			},
			statuses: {
				get() {
					return this.$store.getters['payaccounts/getStatuses'];
				}
			},
			currencys: {
				get() {
					return this.$store.getters['payaccounts/getCurrencys'];
				}
			},
			companies: {
				get() {
					return this.$store.getters['payaccounts/getCompanies'];
				}
			},
			getAllCompanies() {
                let arr = {}
                let companies = this.$store.getters['payaccounts/getAllCompanies'];
                companies.map(function(item) {
                    arr[item.id] = item.name
                })
                return arr
            }
		},
		components: {
			ui_chip,
			ui_input_suggest,
			ui_select
		},
		methods: {
			search () {
                statusesPayAccounts({
                    search: this.searchText,
                }).then((statuses) => {
                    this.result = statuses;
                }).catch((err) => {
                    console.log(err);
                });
            },
            searchCurrency () {
                currency({
                    search: this.searchTextCurrency,
                }).then((currencys) => {
                    this.resultCurrency = currencys.data;
                }).catch((err) => {
                    console.log(err);
                });
            },
			focus() {
				this.$store.dispatch('payaccounts/setPage', 1);
			},
			selectStatus (status) {
				this.searchText = ''
				this.$store.dispatch('payaccounts/selectStatus', status);
			},
			removeStatus (status) {
				this.$store.dispatch('payaccounts/removeStatus', status);
			},
			selectCurrency (currency) {
				this.searchTextCurrency = ''
				this.$store.dispatch('payaccounts/selectCurrency', currency);
			},
			removeCurrency (currency) {
				this.$store.dispatch('payaccounts/removeCurrency', currency);
			},
			selectCompanies(company) {
				this.$store.dispatch('payaccounts/selectCompany', company)
			}
		},
		beforeMount () {
			this.search();
			this.searchCurrency();
		}
	}
</script>