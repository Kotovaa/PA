<template>
	<div>
		<top_menu></top_menu>
	    <h1>Платежные аккаунты</h1>
	    <div class="wrapper">
	    	<div class="wrapper__filter">
	    		<filter_aside></filter_aside>
	    	</div>
	    	<div class="wrapper__table">
	    		<table_list></table_list>
	    	</div>
	    </div>
    	<div class="pagination">
    		<dashboard-pagination 
				:current="pagination.page"
				:last="pagination.last"
				@change="setPage"
			/>
    	</div>
	</div>
</template>

<script>
	import top_menu from '../../../components/top_menu.vue'
	import filter_aside from '../pay_accounts/components/filter.vue'
	import table_list from '../pay_accounts/components/table.vue'
	import dashboardPagination from '../../../components/DashboardPagination.vue';
	
    export default {
		components: {
			top_menu,
			filter_aside,
			dashboardPagination,
			table_list
		},
		computed: {
            pagination () {
            	return this.$store.getters['payaccounts/pagination'];
            }
		},
		methods: {
			setPage (page) {
				this.$store.dispatch('payaccounts/setPage', page);
			}
		}
	}
</script>