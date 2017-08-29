<template>
	<div class="filter__container">
		<router-link to="addbanks"><el-button type="primary" class="create_button">Создать</el-button></router-link>
		<div class="filter__group">
			<div class="form-group">
			 	<label class="ui-label">Идентификатор банка</label>
				<el-input v-model="id" @focus="focus">ID</el-input>
			 </div>
			<div class="form-group">
				<label class="ui-label">БИК банка</label>
				<el-input v-model="bank_bic" @focus="focus" :maxlength="9">БИК банка</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Название банка</label>
				<el-input v-model="bank_name" @focus="focus">Название банка</el-input>
			</div>	
			<div class="form-group">
				<label class="ui-label">Корреспонденский счет банка</label>
				<el-input v-model="bank_corr_account" @focus="focus" :maxlength="20">Кор. счет банка</el-input>
			</div>
			<div class="form-group">
				<label class="ui-label">Описание банка</label>
				<el-input
					type="textarea"
					:rows="4"
					v-model="description"
					@focus="focus"
					>
				</el-input>
			</div>

			<div class="form-group">
				<label class="ui-label">Выберите статус</label>
				<ui_input_suggest
	                v-model="searchText"
	                :results="result"
	                @input="search"
	                icon="uikit-chevron-down"
	            >
	                <ui-select-option
	                    v-for="(status, key) in result"
	                    slot="dropdown"
	                    :key="key"
	                    :value="status"
	                    @select="selectStatus"
	                >
	                    {{ status.name }}
	                </ui-select-option>
	            </ui_input_suggest>
	
	            <ui-chip
	                v-for="(status, key) in statuses"
	                :key="key"
	                removable
	                remove-by-callback
	                @delete="removeStatus(status)"
	            >
	                {{ status.name }}
	            </ui-chip>
			</div>
		</div>
	</div>
</template>

<script>
	import ui_chip from 'uikit-agro24/components/ui-chip.vue';
	import ui_input_suggest from 'uikit-agro24/components/ui-input-suggest.vue';
	import { statuses } from '../../../../api/';

	import _ from 'lodash';
	
	export default {
		data() {
			return {
				company_id: '',
				status_id: '',
				searchText: '',
				result: []
			}
		},
		computed: {
			id: {
				get () {
					return this.$store.getters['banks/getId'];
				},
				set (value) {
					this.$store.dispatch('banks/setFilterValue', { name: 'id', value });
				}
			},
			bank_bic: {
				get () {
					return this.$store.getters['banks/getBank_bic'];
				},
				set (value) {
					this.$store.dispatch('banks/setFilterValue', { name: 'bank_bic', value });
				}
			},
			bank_name: {
				get () {
					return this.$store.getters['banks/getBank_name'];
				},
				set (value) {
					this.$store.dispatch('banks/setFilterValue', { name: 'bank_name', value });
				}
			},
			bank_corr_account: {
				get () {
					return this.$store.getters['banks/getBank_corr_account'];
				},
				set (value) {
					this.$store.dispatch('banks/setFilterValue', { name: 'bank_corr_account', value });
				}
			},
			description: {
				get () {
					return this.$store.getters['banks/getDescription'];
				},
				set (value) {
					this.$store.dispatch('banks/setFilterValue', { name: 'description', value });
				}
			},
			statuses: {
				get() {
					return this.$store.getters['banks/getStatuses'];
				}
			}
		},
		components: {
			ui_chip,
			ui_input_suggest
		},
		methods: {
			 search () {
                statuses({
                    search: this.searchText,
                }).then((statuses) => {
                    this.result = statuses;
                }).catch((err) => {
                    console.log(err);
                });
            },
			focus() {
				this.$store.dispatch('banks/setPage', 1);
			},
			selectStatus (status) {
				this.searchText = ''
				this.$store.dispatch('banks/selectStatus', status);
			},
			removeStatus (status) {
				this.$store.dispatch('banks/removeStatus', status);
			}
		},
		beforeMount () {
			this.search();
		}
	}
</script>