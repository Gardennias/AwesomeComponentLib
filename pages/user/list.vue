<template>
	<view>
		<userList :dataList="list"></userList>
	</view>
</template>

<script>
	import userList from '@/components/user-list/user-list'
	export default {
		components: {
			userList
		},
		data() {
			return {
				list: []
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData() {
				this.$api.user.list().then(res => {
					this.list= res
				})
			}
		}
	}
</script>

<style>
	
</style>
