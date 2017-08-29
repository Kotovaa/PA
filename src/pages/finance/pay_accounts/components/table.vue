<template>
	<div class="table__container">
		<h5>{{ hasFilters ? 'Найдено записей' : 'Всего записей' }} : {{ total }}. <span>Рабочая таблица: pay_accounts</span></h5>
		<el-table
			:data="items"
			border
			id="table__wrapper"
			:default-sort = "{field: 'id', order: 'asc'}">
			<el-table-column
				prop="id"
				label="ID"
				width="70"
				sortable>
				<template scope="scope">
					<router-link :to="'/payaccounts/' + scope.row.id">
						<el-tag :close-transition="true">{{ scope.row.id }}</el-tag>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column
				prop="account_number_in_a24"
				label="Номер счета в А24"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ scope.row.account_number_in_a24 || '-' }}
				</template>
			</el-table-column>
			<el-table-column
				prop="last_pay_history_id"
				label="Последняя операция"
				min-width="250"
				sortable>
				<template scope="scope">
					<router-link :to="'/payaccounts/' + scope.row.last_pay_history_id">
						<el-tag :close-transition="true">{{ scope.row.last_pay_history ? scope.row.last_pay_history.id : '-' }}</el-tag> - 
						<el-tag :close-transition="true" type="gray">{{ scope.row.last_pay_history ? convertDateTime(scope.row.last_pay_history.datetime) : '-' }}</el-tag>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column
				prop="end_balance"
				label="Баланс счета"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ formatPrice(scope.row.end_balance) || '-' }}
				</template>
			</el-table-column>
			<el-table-column
				prop="currency_id"
				label="Валюта счета"
				min-width="250"
				sortable>
				<template scope="scope">
					<el-tag :close-transition="true">{{ scope.row.currency ? scope.row.currency.id : '-' }}</el-tag> -
					<el-tag :close-transition="true" type="gray">{{ scope.row.currency ? scope.row.currency.name : '-' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				prop="company_id"
				label="Компания"
				min-width="250"
				sortable>
				<template scope="scope">
					<a :href="'https://admin.agro24.ru/company/' + scope.row.company_id + '/edit'">
						<el-tag :close-transition="true">{{ scope.row.company ? scope.row.company.id : '-' }}</el-tag> -
						<el-tag :close-transition="true" type="gray">{{ scope.row.company ? scope.row.company.name : '-' }}</el-tag>
					</a>
				</template>
			</el-table-column>
			<el-table-column min-width="250" prop="status.name" label="Статус" sortable class-name="status__code">
				<template scope="scope">
					<el-tag :close-transition="true" type="gray">{{ scope.row.status ? scope.row.status.code : '-' }}</el-tag> -
		        	<el-tag :close-transition="true"
			          type="primary"
			          close-transition>{{ scope.row.status ? scope.row.status.name : '-' }}</el-tag>
			    </template>
			</el-table-column>
			<el-table-column fixed="right" class-name="status__operation">
				<template scope="scope">
					<router-link :to="'/payaccounts/' + scope.row.id">
						<i class="el-icon-edit"></i>
					</router-link>
					<deleteButton :idItem="scope.row.id"></deleteButton>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import ui_chip from 'uikit-agro24/components/ui-chip.vue';
	import deleteButton from './ui/deleteButton.vue'
	import moment from 'moment';
	export default {
		components: {
			ui_chip,
			deleteButton
		},
		computed: {
			item() {
				this.$store.state.ITEM = {};
			},
			items() {
				return this.$store.getters['payaccounts/getItems'];
			},
			total() {
				return this.$store.getters['payaccounts/totalItems'];
			},
			hasFilters () {
				return this.$store.getters['payaccounts/hasFilters'];
			}
		},
		methods: {
			convertDateTime (datetime) {
				return moment(datetime, "YYYY-MM-DD HH:mm:ss").format("DD.MM.YYYY HH:mm");
			},
			load() {
				this.$store.dispatch('payaccounts/getTableItems');
				this.$store.dispatch('payaccounts/getTableItemsCompanies');
			},
			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			}
		},
		mounted() {
			this.load();
		},
		beforeDestroy() {
			if (this.hasFilters) {
				const clear = this.$store.state.payaccounts.FILTER;
				for (let key in clear) {
					if (clear[key] instanceof Array) {
						clear[key] = [];
					}else{
						clear[key] = '';
					}
				}
				this.load();
			}
		}
	}
</script>