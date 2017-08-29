<template>
	<i class="el-icon-delete" @click="deleteItem"></i>
</template>

<script>
	export default {
		props: {
			idItem: [String, Number]
		},
		methods: {
			deleteItem() {
				this.$confirm('Вы подверждаете удаление?', 'Внимание!', {
					confirmButtonText: 'Да',
                    cancelButtonText: 'Отмена',
                    type: 'warning'
				}).then((response) => {
					this.$message({
						type: 'success',
						message: 'Запись удалена'
					});
					this.$store.dispatch('banks/deleteTableItem', {id: this.idItem});
				}).catch(() => {});
			}
		}
	}
</script>