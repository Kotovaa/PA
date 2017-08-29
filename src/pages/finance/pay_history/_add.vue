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
					<label class="ui-label">Номер счета в А24</label>
					<el-input v-model="item.account_number_in_a24" @change="change('account_number_in_a24', $event)" placeholder="Введите номер счета"></el-input>
				</div>	
				<div class="form-group">
					<label class="ui-label">Последняя операция</label>
					<el-input v-model="item.last_pay_history_id" @change="change('last_pay_history_id', $event)" placeholder="Укажите ID последней операции"></el-input>
				</div>
				<div class="form-group">
					<label class="ui-label">Баланс счета</label>
					<el-input v-model="item.end_balance" @change="change('end_balance', $event)" placeholder="Укажите остаток на балансе"></el-input>
				</div>
				<div class="form-group">
					<label class="ui-label">Название статуса</label>
					<ui_select 
						v-model="value" 
						:options="getStatus" 
						placeholder="Выберите статус" 
						@change="change('status_id', $event)"
					/>
				</div>
				<div class="form-group">
					<label class="ui-label">Валюта</label>
					<ui_select 
						v-model="value2" 
						:options="getCurrency" 
						placeholder="Выберите статус" 
						@change="change('currency_id', $event)"
					/>
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
				return this.$store.getters['payaccounts/setNewItem'];
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
                let currencys = this.$store.getters['payaccounts/getCurrency'];
                currencys.forEach(function(item) {
                    arr[item.id] = item.name
                })

                return arr
            },
		},
		data() {
            return {
            	tableName: 'pay_accounts',
            	account_number_in_a24: '',
            	last_pay_history_id: '',
            	end_balance: '',
            	currency_id: '',
                status_id: '',
                value: [],
                value2: []
            }
        },
        methods: {
        	change(name, value) {
        		if (value instanceof Array) {
        			value = value[0];
        		}

        		this.$store.dispatch('payaccounts/updateNewItem', {name: name, value: value});
        	},
            addItem() {
            	this.$confirm('Вы подверждаете создание?', 'Создание записи', {
					confirmButtonText: 'Да',
                    cancelButtonText: 'Отмена',
                    type: 'info'
				}).then((response) => {
					this.$message({
						type: 'success',
						message: 'Запись создана'
					});
					this.$store.dispatch('payaccounts/addedTableItem', this.item);
	                for(let key in this.item) {
	                    this.item[key] = ''
	                }
				}).catch((error) => {});
            }
        },
        mounted() {
        	this.change = _.debounce(this.change, 500);
        	this.$store.dispatch('payaccounts/getStatus');
        	this.$store.dispatch('payaccounts/getCurrency');
        }
	}
</script>