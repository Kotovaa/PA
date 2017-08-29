<template>
	<div>
		<top_menu></top_menu>
		<div class="item__wrapper">
			<h1>Добавить запись</h1>
			<div class="item__container" style="width: 400px">
				<div class="form-group inline-block">
				 	<label class="ui-label">Вы работаете с таблицей:</label>
				 	<el-input :value="tableName" disabled></el-input>
				</div>
				<div class="form-group">
					<label class="ui-label">БИК банка</label>
					<el-input v-model="item.bank_bic" @change="change('bank_bic', $event)" :maxlength="9">БИК банка</el-input>
				</div>
				<div class="form-group">
					<label class="ui-label">Название банка</label>
					<el-input v-model="item.bank_name" @change="change('bank_name', $event)">Название банка</el-input>
				</div>	
				<div class="form-group">
					<label class="ui-label">Корреспонденский счет банка</label>
					<el-input v-model="item.bank_corr_account" @change="change('bank_corr_account', $event)" :maxlength="20">Кор. счет банка</el-input>
				</div>
				<div class="form-group">
					<label class="ui-label">Описание банка</label>
					<el-input
						type="textarea"
						:rows="4"
						v-model="item.description"
						@change="change('description', $event)"
						>
					</el-input>
				</div>
				<div class="form-group">
					<label class="ui-label">Название статуса</label>
					<ui_select 
						v-model="value" 
						:options="getStatus"
						@change="change('status_id', $event)"
					/>
				</div>
				<div class="form-group">
					<label class="ui-label">ID компании</label>
					<el-input v-model="item.company_id" @change="change('company_id', $event)">ID компании</el-input>
				</div>
				<div class="item__wrapper_buttons">
					<el-button type="success" class="create_button" @click="addItem">Сохранить</el-button>
					<router-link :to="'/banks'">
						<el-button type="primary" class="create_button">Отмена</el-button>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ui_input from 'uikit-agro24/components/ui-input.vue';
	import top_menu from '../../../components/top_menu.vue';
	import ui_select from 'uikit-agro24/components/ui-select.vue';

	import _ from 'lodash';

	export default {
		components: {
			ui_input,
			top_menu,
			ui_select
		},
		computed: {
			item() {
				return this.$store.getters['banks/setNewItem'];
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
		data() {
            return {
            	tableName: 'banks',
            	bank_name: '',
                bank_bic: '',
                bank_corr_account: '',
                description: '',
                company_id: '',
                status_id: '',
                value: []
            }
        },
        methods: {
        	change(name, value) {
        		if (value instanceof Array) {
        			value = value[0];
        		}

        		this.$store.dispatch('banks/updateNewItem', {name: name, value: value});
        	},
            addItem() {
        		let $this = this;
            	if (Object.keys(this.item).length < Object.keys(this.$data).length - 2) {
            		$this.$message({
						type: 'warning',
						message: 'Заполните все поля'
					});
            	}else {
	            	this.$confirm('Вы подверждаете создание?', 'Создание записи', {
						confirmButtonText: 'Да',
	                    cancelButtonText: 'Отмена',
	                    type: 'info'
					}).then((response) => {
						let $this = this;

						this.$store.dispatch('banks/addedTableItem', {
							cb: () => {
								$this.$message({
									type: 'success',
									message: 'Запись создана'
								});

								$this.$router.push('/banks');

								for (let key in this.item) this.item[key] = '';
							},
							cbError: () => {
								$this.$message({
									type: 'warning',
									message: 'API Error'
								});
							}
						});
					}).catch((error) => {});
            	}
            }
        },
        mounted() {
        	this.change = _.debounce(this.change, 500);
        	this.$store.dispatch('banks/getStatus');
        }
	}
</script>