<template>
	<div class="menu">
		<el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
			<el-menu-item index="1">
				<router-link to="/">Главная</router-link>
			</el-menu-item>
			<el-submenu index="2">
				<template slot="title">Финансовый кабинет</template>
				<el-menu-item index="2-1">
					<router-link to="/banks">Банки</router-link>
				</el-menu-item>
				<el-menu-item index="2-2">
					<router-link to="/bankaccounts">Банковский аккаунт</router-link>
				</el-menu-item>
				<el-menu-item index="2-3">
					<router-link to="/payaccounts">Платежные аккаунты</router-link>
				</el-menu-item>
				<el-menu-item index="2-4">
					<router-link to="/payhistory">История операций</router-link>
				</el-menu-item>
			</el-submenu>
		</el-menu>
	</div>
</template>



<script>
	export default {
		data() {
			return {
				activeIndex: '1'
			};
		}
	}
</script>