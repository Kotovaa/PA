<template>
	<div>
		<top_menu></top_menu>
		<div class="item__wrapper">
			<h1>Данные записи</h1>
			<div style="display: flex; flex-direction: row;">
				<div class="item__container" v-if="item" style="width: 400px">
					<router-link :to="'/bankaccounts'">
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
					<div class="form-group">
						<label class="ui-label">Название счета</label>
						<el-input v-model="item.name"></el-input>
					</div>
					<div class="form-group">
						<label class="ui-label">Номер счета в банке</label>
						<el-input v-model="item.account_number"></el-input>
					</div>	
					<div class="form-group">
						<label class="ui-label">ID банка</label>
						<el-input v-model="item.bank_id"></el-input>
					</div>
					<div class="form-group">
						<label class="ui-label">Выберите валюту счета</label>
						<ui_select v-model="item.currency_id" :options="getCurrency"></ui_select>
					</div>
					<div class="form-group">
						<label class="ui-label">Выберите статус</label>
						<ui_select v-model="item.status_id" :options="getStatus"></ui_select>
					</div>
					<div class="form-group">
						<label class="ui-label">Юр лицо</label>
						<el-input v-model="item.legal_entity_id"></el-input>
					</div>
					<div class="form-group">
						<label class="ui-label">Описание счета</label>
						<el-input
							type="textarea"
							:rows="4"
							v-model="item.description"
							>
						</el-input>
					</div>
					<div class="item__wrapper_buttons">
						<el-button type="success" class="create_button" @click="editItem">Сохранить</el-button>
						<router-link :to="'/bankaccounts'">
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
				tableName: 'bank_accounts'
			};
		},
		computed: {
			item() {
				return this.$store.getters['bankaccounts/getItem'] || {};
			},
			getStatus() {
                let arr = {}
                let statuses = this.$store.getters['bankaccounts/getStatus'];
                statuses.forEach(function(item) {
                    arr[item.id] = item.name
                })
                return arr
            },
            getCurrency() {
                let arr = {}
                let currency = this.$store.getters['bankaccounts/getCurrency'];
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
					this.$store.dispatch('bankaccounts/updateTableItem', this.item);
					router.go(-1);
				}).catch((error) => {});
			},
			load() {
				this.$store.dispatch('bankaccounts/getTableItem', {id: this.$route.params.id})
			}
		},
		mounted() {
			this.load();
		}
	}
</script>