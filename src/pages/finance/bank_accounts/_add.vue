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
					<label class="ui-label">Название счета</label>
					<el-input v-model="item.name" @change="change('name', $event)"></el-input>
				</div>
				<div class="form-group">
					<label class="ui-label">Номер счета</label>
					<el-input v-model="item.account_number" @change="change('account_number', $event)"></el-input>
				</div>	
				<div class="form-group">
					<label class="ui-label">ID банка счета</label>
					<el-input v-model="item.bank_id" @change="change('bank_id', $event)"></el-input>
				</div>
				<div class="form-group">
					<label class="ui-label">Описание счета</label>
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
					<label class="ui-label">Валюта</label>
					<ui_select 
						v-model="value2" 
						:options="getCurrency"
						@change="change('currency_id', $event)"
					/>
				</div>
				<div class="form-group">
					<label class="ui-label">ID юр лица</label>
					<el-input v-model="item.legal_entity_id" @change="change('legal_entity_id', $event)"></el-input>
				</div>
				<div class="item__wrapper_buttons">
					<el-button type="success" class="create_button" @click="addItem">Сохранить</el-button>
					<router-link :to="'/bankaccounts'">
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
				return this.$store.getters['bankaccounts/setNewItem'];
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
                let currencys = this.$store.getters['bankaccounts/getCurrency'];
                currencys.forEach(function(item) {
                    arr[item.id] = item.name
                })

                return arr
            },
		},
		data() {
            return {
            	tableName: 'bank_accounts',
            	name: '',
            	account_number: '',
            	description: '',
            	bank_id: '',
            	currency_id: '',
                value: [],
                value2: []
            }
        },
        methods: {
        	change(name, value) {
        		if (value instanceof Array) {
        			value = value[0];
        		}
        		this.$store.dispatch('bankaccounts/updateNewItem', {name: name, value: value});
        	},
            addItem() {
            	let $this = this;
            	if (Object.keys(this.item).length < Object.keys(this.$data).length - 1) {
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

						this.$store.dispatch('bankaccounts/addedTableItem', {
							cb: () => {
								$this.$message({
									type: 'success',
									message: 'Запись создана'
								});

								$this.$router.push('/bankaccounts');

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
        	this.$store.dispatch('bankaccounts/getStatus');
        	this.$store.dispatch('bankaccounts/getCurrency');
        }
	}
</script>