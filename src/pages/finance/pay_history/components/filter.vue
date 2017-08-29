<template>
	<div class="filter__container">
		<router-link to="addbankaccounts"><el-button type="primary" class="create_button">Создать</el-button></router-link>
		<div class="filter__group">
			<div class="form-group">
			 	<label class="ui-label">ID</label>
				<el-input v-model="id" @focus="focus"></el-input>
			 </div>
			<div class="form-group">
				<label class="ui-label">Дата и время операции</label>
				<el-input v-model="datetime" @focus="focus"></el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Сумма операции</label>
				<el-input v-model="value" @focus="focus"></el-input>
			</div>	
			<div class="form-group">
				<label class="ui-label">Описание</label>
				<el-input v-model="description" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">ID внешнего счета</label>
				<el-input v-model="bank_account_id" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Счет отправителя</label>
				<el-input v-model="from_pay_account_id" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Счет получателя</label>
				<el-input v-model="to_pay_account_id" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Флаг блокировки денег</label>
				<el-input v-model="blocked_flag" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Флаг требования проверки</label>
				<el-input v-model="to_check_flag" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Внутренняя/Внешняя операция</label>
				<el-input v-model="flag_in_out" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Тип операции</label>
				<ui_select v-model="transaction_type_id" multiple :options="getAllTypesOperations" @input="selectOperations"></ui_select>
			</div>
			<div class="form-group">
				<label class="ui-label">Назначение платежа</label>
				<el-input v-model="payment_purpose" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">ID внешней операции</label>
				<el-input v-model="bank_document_id" @focus="focus">
				</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Тариф</label>
				<el-input v-model="a24_tariff_id" @focus="focus">
				</el-input>
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
	import { statusesPayHistory } from '../../../../api/';
	import { currency } from '../../../../api/';

	import _ from 'lodash';
	
	export default {
		data() {
			return {
				searchText: '',
				searchTextCurrency: '',
				result: [],
				resultCurrency: [],
				transaction_type_id: []
			}
		},
		computed: {
			id: {
				get () {
					return this.$store.getters['payhistory/getId'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'id', value });
				}
			},
			datetime: {
				get () {
					return this.$store.getters['payhistory/getDatetime'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'datetime', value });
				}
			},
			value: {
				get () {
					return this.$store.getters['payhistory/getValue'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'value', value });
				}
			},
			description: {
				get () {
					return this.$store.getters['payhistory/getDescription'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'description', value });
				}
			},
			bank_account_id: {
				get () {
					return this.$store.getters['payhistory/getBankAccountId'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'bank_account_id', value });
				}
			},
			from_pay_account_id: {
				get () {
					return this.$store.getters['payhistory/getFromPayAccountId'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'from_pay_account_id', value });
				}
			},
			to_pay_account_id: {
				get () {
					return this.$store.getters['payhistory/getToPayAccountId'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'to_pay_account_id', value });
				}
			},
			blocked_flag: {
				get () {
					return this.$store.getters['payhistory/getBlockedFlag'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'blocked_flag', value });
				}
			},
			to_check_flag: {
				get () {
					return this.$store.getters['payhistory/getToCheckFlag'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'to_check_flag', value });
				}
			},
			payment_purpose: {
				get () {
					return this.$store.getters['payhistory/getPaymentPurpose'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'payment_purpose', value });
				}
			},
			bank_document_id: {
				get () {
					return this.$store.getters['payhistory/getBankDocumentId'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'bank_document_id', value });
				}
			},
			a24_tariff_id: {
				get () {
					return this.$store.getters['payhistory/getA24TariffId'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'a24_tariff_id', value });
				}
			},
			flag_in_out: {
				get () {
					return this.$store.getters['payhistory/getFlagInOut'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'flag_in_out', value });
				}
			},
			currency_id: {
				get () {
					return this.$store.getters['payhistory/getCurrency_id'];
				},
				set (value) {
					this.$store.dispatch('payhistory/setFilterValue', { name: 'currency_id', value });
				}
			},
			statuses: {
				get() {
					return this.$store.getters['payhistory/getStatuses'];
				}
			},
			currencys: {
				get() {
					return this.$store.getters['payhistory/getCurrencys'];
				}
			},
			typesOperations: {
				get() {
					return this.$store.getters['payhistory/getOperations'];
				}
			},
			getAllTypesOperations() {
                let arr = {}
                let operations = this.$store.getters['payhistory/getAllTypesOperation'];
                operations.map(function(item) {
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
                statusesPayHistory({
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
				this.$store.dispatch('payhistory/setPage', 1);
			},
			selectStatus (status) {
				this.searchText = ''
				this.$store.dispatch('payhistory/selectStatus', status);
			},
			removeStatus (status) {
				this.$store.dispatch('payhistory/removeStatus', status);
			},
			selectCurrency (currency) {
				this.searchTextCurrency = ''
				this.$store.dispatch('payhistory/selectCurrency', currency);
			},
			removeCurrency (currency) {
				this.$store.dispatch('payhistory/removeCurrency', currency);
			},
			selectOperations(operation) {
				this.$store.dispatch('payhistory/selectOperations', operation)
			}
		},
		beforeMount () {
			this.search();
			this.searchCurrency();
		}
	}
</script>