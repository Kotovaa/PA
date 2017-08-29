<template>
	<div class="table__container">
		<h5>{{ hasFilters ? 'Найдено записей' : 'Всего записей' }} : {{ total }}. <span>Рабочая таблица: banks</span></h5>
		<el-table
			:data="items"
			border
			id="table__wrapper"
			:default-sort = "{field: 'id', order: 'asc'}">
			<el-table-column
				prop="id"
				label="ID банка"
				width="70"
				sortable>
				<template scope="scope">
					<router-link :to="'/banks/' + scope.row.id">
						<el-tag :close-transition="true">{{ scope.row.id }}</el-tag>
					</router-link>
				</template>
			</el-table-column>
			<el-table-column
				prop="bank_name"
				label="Название банка"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ scope.row.bank_name || '-' }}
				</template>
			</el-table-column>
			<el-table-column
				prop="bank_bic"
				label="БИК банка"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ scope.row.bank_bic || '-' }}
				</template>
			</el-table-column>
			<el-table-column
				prop="bank_corr_account"
				label="Корреспонденский счет банка"
				min-width="250"
				sortable>
				<template scope="scope">
					{{ scope.row.bank_corr_account || '-' }}
				</template>
			</el-table-column>
			<el-table-column
				prop="description"
				sortable
				min-width="250"
				label="Описание">
				<template scope="scope">
					{{ scope.row.description || '-' }}
					<el-popover
						ref="popover2"
						placement="bottom"
						width="300"
						popper-class="popover__description"
						trigger="click">
						{{ scope.row.description || '-' }}
					</el-popover>
					<el-button v-popover:popover2 type="text" size="small">Подробнее</el-button>
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
			<el-table-column fixed="right" class-name="status__operation">
				<template scope="scope">
					<router-link :to="'/banks/' + scope.row.id">
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
				return this.$store.getters['banks/getItems'];
			},
			total() {
				return this.$store.getters['banks/totalItems'];
			},
			hasFilters () {
				return this.$store.getters['banks/hasFilters'];
			}
		},
		methods: {
			load() {
				this.$store.dispatch('banks/getTableItems');
			}
		},
		mounted() {
			this.load();
		},
		beforeDestroy() {
			if (this.hasFilters) {
				const clear = this.$store.state.banks.FILTER;
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