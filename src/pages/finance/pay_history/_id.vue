<template>
	<div>
		<top_menu></top_menu>
		<div class="item__wrapper">
			<h1>Данные записи</h1>
			<div style="display: flex; flex-direction: row;">
				<div class="item__container" v-if="item" style="width: 400px">
					<router-link :to="'/payhistory'">
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
						<el-input disabled v-model="item.account_number_in_a24" placeholder="Введите номер счета"></el-input>
					</div>
					<div class="form-group inline-block">
						<label class="ui-label">Последняя операция</label>
						<el-input disabled v-model="item.last_pay_history_id" placeholder="Введите ID последней операции"></el-input>
					</div>	
					<div class="form-group inline-block">
						<label class="ui-label">Остаток на балансе</label>
						<el-input disabled v-model="item.end_balance" placeholder="Введите остаток"></el-input>
					</div>
					<div class="form-group inline-block">
						<label class="ui-label">Выберите валюту счета</label>
						<ui_select v-model="item.currency_id" :options="getCurrency" placeholder="Выберите валюту" disabled></ui_select>
					</div>
					<div class="form-group inline-block">
						<label class="ui-label">Выберите статус</label>
						<ui_select v-model="item.status_id" :options="getStatus" placeholder="Выберите статус" disabled></ui_select>
					</div>
					<div class="item__wrapper_buttons">
						<el-button type="success" class="create_button" @click="editItem">Сохранить</el-button>
						<router-link :to="'/payhistory'">
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
					router.go(-1);
				}).catch((error) => {});
			},
			load() {
				this.$store.dispatch('payaccounts/getTableItem', {id: this.$route.params.id})
			}
		},
		mounted() {
			this.load();
		}
	}
</script>