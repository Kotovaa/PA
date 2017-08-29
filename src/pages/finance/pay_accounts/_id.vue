<template>
	<div>
		<top_menu></top_menu>
		<div class="item__wrapper">
			<h1>Данные записи</h1>
			<div style="display: flex; flex-direction: row;">
				<div class="item__container" v-if="item" style="width: 400px">
					<router-link :to="'/payaccounts'">
						<el-button type="primary" class="create_button">Назад</el-button>
					</router-link>
					<div class="form-group inline-block">
					 	<label class="ui-label">Вы работаете с таблицей:</label>
					 	<el-input :value="tableName" disabled></el-input>
					</div>
					<div class="form-group inline-block">
					 	<label class="ui-label">Запись создана:</label>
					 	<el-input :value="convertDateTime(item.created_at)" disabled></el-input>
					</div>
					<div class="form-group inline-block">
					 	<label class="ui-label">Последнее обновление: </label>
					 	<el-input :value="convertDateTime(item.updated_at)" disabled></el-input>
					</div>
					<div class="form-group inline-block">
					 	<label class="ui-label">Идентификатор счета: </label>
					 	<el-input v-model="item.id" disabled></el-input>
					</div>
					<div class="form-group inline-block">
						<label class="ui-label">Номер счета в А24</label>
						<el-input v-model="item.account_number_in_a24" disabled></el-input>
					</div>
					<div class="form-group inline-block">
						<label class="ui-label">Последняя операция</label>
						<el-input v-model="item.last_pay_history_id" disabled></el-input>
					</div>	
					<div class="form-group inline-block">
						<label class="ui-label">Остаток на балансе</label>
						<el-input :value="formatPrice(item.end_balance)" disabled></el-input>
					</div>
					<div class="form-group">
						<label class="ui-label">Выберите компанию</label>
						<ui_select v-model="item.company_id" :options="getAllCompanies"></ui_select>
					</div>
					<div class="form-group">
						<label class="ui-label">Выберите валюту счета</label>
						<ui_select v-model="item.currency_id" :options="getCurrency"></ui_select>
					</div>
					<div class="form-group">
						<label class="ui-label">Выберите статус</label>
						<ui_select v-model="item.status_id" :options="getStatus"></ui_select>
					</div>
					<div class="item__wrapper_buttons">
						<el-button type="success" class="create_button" @click="editItem">Сохранить</el-button>
						<router-link :to="'/payaccounts'">
							<el-button type="primary" class="create_button">Отмена</el-button>
						</router-link>
					</div>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	import ui_input from 'uikit-agro24/components/ui-input.vue';
	import router from '../../../router/';
	import top_menu from '../../../components/top_menu.vue';
	import ui_select from 'uikit-agro24/components/ui-select.vue';
	import moment from 'moment'

	export default {
		components: {
			ui_input,
			top_menu,
			ui_select
		},
		data () {
			return {
				tableName: 'pay_accounts'
			};
		},
		computed: {
			item() {
				return this.$store.getters['payaccounts/getItem'] || {};
			},
			getStatus() {
                let arr = {}
                let statuses = this.$store.getters['payaccounts/getStatus'];
                statuses.forEach(function(item) {
                    arr[item.id] = item.name
                })
                return arr
            },
            getCurrency() {
                let arr = {}
                let currency = this.$store.getters['payaccounts/getCurrency'];
                currency.forEach(function(item) {
                    arr[item.id] = item.name
                })
                return arr
            },
            getAllCompanies() {
                let arr = {}
                let currency = this.$store.getters['payaccounts/getAllCompanies'];
                currency.forEach(function(item) {
                    arr[item.id] = item.name
                })
                return arr
            },
            filterValue() {
            	formatPrice(item.end_balance)
            }
		},
		methods: {
			convertDateTime (datetime) {
				return moment(datetime, "YYYY-MM-DD HH:mm:ss").format("DD.MM.YYYY HH:mm");
			},
			editItem() {
				this.$confirm('Вы подверждаете редактирование?', 'Редактирование записи', {
					confirmButtonText: 'Да',
                    cancelButtonText: 'Отмена',
                    type: 'info'
				}).then((response) => {
					this.$message({
						type: 'success',
						message: 'Запись изменена'
					});
					this.$store.dispatch('payaccounts/updateTableItem', this.item);
				}).catch((error) => {});
			},
			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			},
			load() {
				this.$store.dispatch('payaccounts/getTableItemsCompanies');
				this.$store.dispatch('payaccounts/getTableItem', {id: this.$route.params.id})
			}
		},
		mounted() {
			this.load();
		}
	}
</script>