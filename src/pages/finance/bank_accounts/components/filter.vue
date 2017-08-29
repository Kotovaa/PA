<template>
	<div class="filter__container">
		<router-link to="addbankaccounts"><el-button type="primary" class="create_button">Создать</el-button></router-link>
		<div class="filter__group">
			<div class="form-group">
			 	<label class="ui-label">ID</label>
				<el-input v-model="id" @focus="focus"></el-input>
			 </div>
			<div class="form-group">
				<label class="ui-label">Название счета</label>
				<el-input v-model="name" @focus="focus" :maxlength="9"></el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Номер счета в банке</label>
				<el-input v-model="account_number" @focus="focus"></el-input>
			</div>	
			<div class="form-group">
				<label class="ui-label">ID банка счета</label>
				<el-input v-model="bank_id" @focus="focus" :maxlength="20">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Описание счета</label>
				<el-input
					type="textarea"
					:rows="4"
					v-model="description"
					@focus="focus"
					>
				</el-input>
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
			<!-- <div class="form-group">
				<label class="ui-label">Валюта счета</label>
				<el-input v-model="currency_id" @focus="focus" placeholder="Выберите валюту счету"></el-input>
			</div> -->
			<!-- <div class="form-group">
				<label class="ui-label">Юридическое лицо</label>
				<el-input v-model="legal_entity_id" @focus="focus" placeholder="Выберите юридическое лицо"></el-input>
			</div> -->
		</div>
	</div>
</template>

<script>
	import ui_chip from 'uikit-agro24/components/ui-chip.vue';
	import ui_input_suggest from 'uikit-agro24/components/ui-input-suggest.vue';
	import { statusesBankAccounts } from '../../../../api/';
	import { currency } from '../../../../api/';

	import _ from 'lodash';
	
	export default {
		data() {
			return {
				company_id: '',
				searchText: '',
				searchTextCurrency: '',
				result: [],
				resultCurrency: []
			}
		},
		computed: {
			id: {
				get () {
					return this.$store.getters['bankaccounts/getId'];
				},
				set (value) {
					this.$store.dispatch('bankaccounts/setFilterValue', { name: 'id', value });
				}
			},
			name: {
				get () {
					return this.$store.getters['bankaccounts/getName'];
				},
				set (value) {
					this.$store.dispatch('bankaccounts/setFilterValue', { name: 'name', value });
				}
			},
			account_number: {
				get () {
					return this.$store.getters['bankaccounts/getAccount_number'];
				},
				set (value) {
					this.$store.dispatch('bankaccounts/setFilterValue', { name: 'account_number', value });
				}
			},
			bank_id: {
				get () {
					return this.$store.getters['bankaccounts/getBank_id'];
				},
				set (value) {
					this.$store.dispatch('bankaccounts/setFilterValue', { name: 'bank_id', value });
				}
			},
			description: {
				get () {
					return this.$store.getters['bankaccounts/getDescription'];
				},
				set (value) {
					this.$store.dispatch('bankaccounts/setFilterValue', { name: 'description', value });
				}
			},
			currency_id: {
				get () {
					return this.$store.getters['bankaccounts/getCurrency_id'];
				},
				set (value) {
					this.$store.dispatch('bankaccounts/setFilterValue', { name: 'currency_id', value });
				}
			},
			legal_entity_id: {
				get () {
					return this.$store.getters['bankaccounts/getLegal_entity_id'];
				},
				set (value) {
					this.$store.dispatch('bankaccounts/setFilterValue', { name: 'legal_entity_id', value });
				}
			},
			statuses: {
				get() {
					return this.$store.getters['bankaccounts/getStatuses'];
				}
			},
			currencys: {
				get() {
					return this.$store.getters['bankaccounts/getCurrencys'];
				}
			}
		},
		components: {
			ui_chip,
			ui_input_suggest
		},
		methods: {
			 search () {
                statusesBankAccounts({
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
				this.$store.dispatch('bankaccounts/setPage', 1);
			},
			selectStatus (status) {
				this.searchText = ''
				this.$store.dispatch('bankaccounts/selectStatus', status);
			},
			removeStatus (status) {
				this.$store.dispatch('bankaccounts/removeStatus', status);
			},
			selectCurrency (currency) {
				this.searchTextCurrency = ''
				this.$store.dispatch('bankaccounts/selectCurrency', currency);
			},
			removeCurrency (currency) {
				this.$store.dispatch('bankaccounts/removeCurrency', currency);
			}
		},
		beforeMount () {
			this.search();
			this.searchCurrency();
		}
	}
</script>