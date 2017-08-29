<template>
	<div class="table__container">
		<h5>{{ hasFilters ? 'Найдено записей' : 'Всего записей' }} : {{ total }}. <span>Рабочая таблица: bank_accounts</span></h5>
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
					<router-link :to="'/bankaccounts/' + scope.row.id">
						<el-tag :close-transition="true">{{ scope.row.id }}</el-tag>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column
				prop="name"
				label="Название счета"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ scope.row.name || '-' }}
				</template>
			</el-table-column>
			<el-table-column
				prop="account_number"
				label="Номер счета в банке"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ scope.row.account_number || '-' }}
				</template>
			</el-table-column>
			<el-table-column
				prop="bank_id"
				label="ID банка счета"
				min-width="250"
				sortable>
				<template scope="scope">
					<router-link :to="'/banks/' + scope.row.bank_id">
						<el-tag :close-transition="true">{{ scope.row.bank ? scope.row.bank.id : '-' }}</el-tag> -
						<el-tag :close-transition="true" type="gray">{{ scope.row.bank ? scope.row.bank.bank_name : '-' }}</el-tag>
					</router-link>
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
				prop="legal_entity_id"
				label="ID юридического лица"
				min-width="250"
				sortable>
				<template scope="scope">
					<el-tag :close-transition="true">{{ scope.row.legal_entity ? scope.row.legal_entity.id : '-' }}</el-tag> -
					<el-tag :close-transition="true" type="gray">{{ scope.row.legal_entity ? scope.row.legal_entity.name : '-' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				prop="description"
				sortable
				min-width="250"
				label="Описание счета">
				<template scope="scope">
					{{ scope.row.description || '-' }}
					<el-popover
						ref="popover2"
						placement="bottom"
						width="300"
						popper-class="popover__description"
						trigger="click">
						{{ scope.row.description }}
					</el-popover>
					<el-button v-popover:popover2 type="text" size="small">Подробнее</el-button>
				</template>
			</el-table-column>
			<el-table-column min-width="250" prop="status.name" label="Статус" sortable class-name="status__code">
				<template scope="scope">
					<el-tag :close-transition="true" type="gray">{{ scope.row.status ? scope.row.status.code : '-' }}</el-tag> -
		        	<el-tag :close-transition="true"
			          :type="scope.row.status.name === 'Работает' ? 'success' : 'primary'"
			          close-transition>{{ scope.row.status ? scope.row.status.name : '-' }}</el-tag>
			    </template>
			</el-table-column>
			<el-table-column fixed="right" class-name="status__operation">
				<template scope="scope">
					<router-link :to="'/bankaccounts/' + scope.row.id">
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
				return this.$store.getters['bankaccounts/getItems'];
			},
			total() {
				return this.$store.getters['bankaccounts/totalItems'];
			},
			hasFilters () {
				return this.$store.getters['bankaccounts/hasFilters'];
			}
		},
		methods: {
			load() {
				this.$store.dispatch('bankaccounts/getTableItems');
			}
		},
		mounted() {
			this.load();
		},
		beforeDestroy() {
			if (this.hasFilters) {
				const clear = this.$store.state.bankaccounts.FILTER;
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