<template>
	<div>
		<top_menu></top_menu>
		<div class="item__wrapper">
			<h1>Данные записи</h1>
			<div style="display: flex; flex-direction: row;">
				<div class="item__container" v-if="item" style="width: 400px">
					<router-link :to="'/banks'">
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
					 	<label class="ui-label">Идентификатор банка: </label>
					 	<el-input v-model="item.id" disabled></el-input>
					</div>
					<div class="form-group">
						<label class="ui-label">БИК банка</label>
						<el-input v-model="item.bank_bic" :maxlength="9">БИК банка</el-input>
					</div>
					<div class="form-group">
						<label class="ui-label">Название банка</label>
						<el-input v-model="item.bank_name">Название банка</el-input>
					</div>	
					<div class="form-group">
						<label class="ui-label">Корреспонденский счет банка</label>
						<el-input v-model="item.bank_corr_account" :maxlength="20">Кор. счет банка</el-input>
					</div>
					<div class="form-group">
						<label class="ui-label">Описание банка</label>
						<el-input
							type="textarea"
							:rows="4"
							v-model="item.description"
							>
						</el-input>
					</div>
					<div class="form-group">
						<label class="ui-label">Название статуса</label>
						<ui_select v-model="item.status_id" :options="getStatus"></ui_select>
					</div>
					<div class="item__wrapper_buttons">
						<el-button type="success" class="create_button" @click="editItem">Сохранить</el-button>
						<router-link :to="'/banks'">
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
				tableName: 'banks'
			};
		},
		computed: {
			item() {
				return this.$store.getters['banks/getItem'] || {};
			},
			getStatus() {
                let arr = {}
                let statuses = this.$store.getters['banks/getStatus'];
                statuses.forEach(function(item) {
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
					this.$store.dispatch('banks/updateTableItem', this.item);
					router.go(-1);
				}).catch((error) => {});
			},
			load() {
				this.$store.dispatch('banks/getTableItem', {id: this.$route.params.id})
			},
			getItemsStatus() {
				return this.$store.getters['banks/getStatus'] || {};
			}
		},
		mounted() {
			this.load();
			this.getItemsStatus();
		}
	}
</script>