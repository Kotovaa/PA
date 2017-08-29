<template>
	<div class="table__container">
		<h5>{{ hasFilters ? 'Найдено записей' : 'Всего записей' }} : {{ total }}. <span>Рабочая таблица: pay_history</span></h5>
		<el-table
			:data="items"
			border
			id="table__wrapper"
			:default-sort = "{field: 'id', order: 'asc'}">
			<el-table-column
				:show-overflow-tooltip="true"
				prop="id"
				label="ID"
				width="70"
				sortable>
				<template scope="scope">
					<router-link :to="'/payhistory/' + scope.row.id">
						<el-tag :close-transition="true">{{ scope.row.id }}</el-tag>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="datetime"
				label="Дата и время операции"
				min-width="250"
				sortable>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="value"
				label="Сумма операции"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ formatPrice(scope.row.value) }}
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="description"
				label="Описание"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ scope.row.description || '-' }}
					<el-popover
						ref="popover1"
						placement="bottom"
						width="300"
						popper-class="popover__description"
						trigger="click">
						{{ scope.row.description || '-' }}
					</el-popover>
					<el-button v-popover:popover1 type="text" size="small">Подробнее</el-button>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="bank_account_id"
				label="ID внешнего счета"
				min-width="250"
				sortable>
				<template scope="scope">
					<router-link :to="'/bankaccounts/' + scope.row.bank_account.id">
						<el-tag :close-transition="true">{{ scope.row.bank_account ? scope.row.bank_account.id : '-' }}</el-tag>
					<el-tag :close-transition="true" type="gray">{{ scope.row.bank_account ? scope.row.bank_account.name : '-' }}</el-tag>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="from_pay_account_id"
				label="Счет отправителя"
				min-width="250"
				sortable>
				<template scope="scope">
					<router-link :to="'/payaccounts/' + scope.row.from_pay_account_id">
						<el-tag :close-transition="true">{{ scope.row.from_pay_account_id }}</el-tag>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="to_pay_account_id"
				label="Счет получателя"
				min-width="250"
				sortable>
				<template scope="scope">
					<router-link :to="'/payaccounts/' + scope.row.to_pay_account_id">
						<el-tag :close-transition="true">{{ scope.row.to_pay_account_id }}</el-tag>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="blocked_flag"
				label="Блокировка денег"
				min-width="250"
				sortable>
				<template scope="scope">
					<el-tag :close-transition="true"
			          :type="scope.row.blocked_flag === 1 ? 'success' : 'danger'"
			          close-transition>{{ blockedCash(scope.row.blocked_flag) }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="to_check_flag"
				label="Требование проверки"
				min-width="250"
				sortable>
				<template scope="scope">
					<el-tag :close-transition="true"
			          type="primary"
			          close-transition>{{ needCheck(scope.row.to_check_flag)}}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="flag_in_out"
				label="Внутренняя/Внешняя операция"
				min-width="250"
				sortable>
				<template scope="scope">
					<el-tag :close-transition="true">{{ scope.row.flag_in_out || '-' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="transaction_type_id"
				label="Тип операции"
				min-width="250"
				sortable>
				<template scope="scope">
					<el-tag :close-transition="true">{{ scope.row.transaction_type ? scope.row.transaction_type.id : '-' }}</el-tag>
					<el-tag :close-transition="true" type="gray">{{ scope.row.transaction_type ? scope.row.transaction_type.name : '-' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="payment_purpose"
				label="Назначение платежа"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ scope.row.payment_purpose || '-' }}
					<el-popover
						ref="popover2"
						placement="bottom"
						width="300"
						popper-class="popover__description"
						trigger="click">
						{{ scope.row.payment_purpose || '-' }}
					</el-popover>
					<el-button v-popover:popover2 type="text" size="small">Подробнее</el-button>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="bank_document_id"
				label="ID внешней операции"
				min-width="250"
				sortable>
				<template scope="scope">
					<el-tag :close-transition="true">{{ scope.row.bank_document_id || '-' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="a24_tariff_id"
				label="Тариф"
				min-width="250"
				sortable>
				<template scope="scope">
					<el-tag :close-transition="true">{{ scope.row.a24_tariff ? scope.row.a24_tariff.id : '-' }}</el-tag>
					<el-tag :close-transition="true" type="gray">{{ scope.row.a24_tariff ? scope.row.a24_tariff.name : '-' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				prop="currency_id"
				label="Валюта счета"
				min-width="250"
				sortable>
				<template scope="scope">
					<el-tag :close-transition="true">{{ scope.row.currency ? scope.row.currency.id : '-' }}</el-tag>
					<el-tag :close-transition="true" type="gray">{{ scope.row.currency ? scope.row.currency.name : '-' }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column
				:show-overflow-tooltip="true"
				min-width="250"
				prop="status.name"
				label="Статус"
				sortable
				class-name="status__code">
				<template scope="scope">
					<el-tag :close-transition="true" type="gray">{{ scope.row.status ? scope.row.status.code : '-' }}</el-tag>
		        	<el-tag :close-transition="true"
			          :type="scope.row.status.name === 'Работает' ? 'success' : 'primary'"
			          close-transition>{{scope.row.status ? scope.row.status.name : '-'}}</el-tag>
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
				return this.$store.getters['payhistory/getItems'];
			},
			total() {
				return this.$store.getters['payhistory/totalItems'];
			},
			hasFilters () {
				return this.$store.getters['payhistory/hasFilters'];
			}
		},
		methods: {
			convertDateTime (datetime) {
				return moment(datetime, "YYYY-MM-DD HH:mm:ss").format("DD.MM.YYYY HH:mm");
			},
			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			},
			blockedCash(flag) {
				if (flag) {
					return '0 - Нет'
				}else {
					return '1 - Да'
				}
			},
			needCheck(flag) {
				if (flag == 0) {
					return '0 - Проверка не требуется'
				}else if (flag == 1) {
					return '1 - Проверка требуется'
				}else {
					return '2 - Проверка произведена'
				}
			},
			load() {
				this.$store.dispatch('payhistory/getAllTypesOperations');
				this.$store.dispatch('payhistory/getTableItems');
			}
		},
		mounted() {
			this.load();
		},
		beforeDestroy() {
			if (this.hasFilters) {
				const clear = this.$store.state.payhistory.FILTER;
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