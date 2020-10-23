<template>
	<view>
		<view class="flex justify-around cu-form-group">
			<input v-model="keword" class="text-df margin-right-sm align-center padding-left-xs" placeholder-class="margin-left-xs text-sm" placeholder="输入关键字搜索" style="border-radius: 4px; border: 1px dashed #0081ff;line-height: 1.5;height: 60rpx; "/>
			<button  @click="search" size="mini" class="cu-btn bg-blue">查询</button>
		</view>
		
		<!-- 列表 -->
		<userList :dataList="pageList"></userList>

		<view style="height: 40px;"></view>
		
		<!-- 分页组件 -->
		<Page :total="total" :pageSize="pageSize" :currentPage="pageNo"  @current-change="handleCurrentChange" @pageSize-change="handleSizeChange" style="position:fixed;bottom:0; width: 100%;"></Page>
	</view>
</template>

<script>
	import Page from '@/components/Pagination.vue'
	import userList from '@/components/user-list/user-list'
	export default {
		components:{
			Page,
			userList
		},
		data() {
			return {
				keword: '',
				total:0,
				pageNo:1,
				pageSize: 11,
				list: [],
				pageList: []
			}
		},
		created() {
			this.search()
		},
		methods: {
			currentChangePage(list,currentPage) {
			   this.pageNo = currentPage
			   this.total = list.length
			   let from = (currentPage - 1) * this.pageSize
			   let to = currentPage * this.pageSize;
			   this.pageList = [];
			   for (; from < to; from++) {
			    if (list[from]) {
			       this.pageList.push(list[from]);
			    }
			   }
			},
			search(){
				this.$api.pagenation().then(res => {
					console.log('列表数据：')
					console.log(res)
					this.list = res
					this.total = res.length
					this.currentChangePage(res,1)
				})
			},
			handleCurrentChange(val){
				this.pageNo = val
				this.currentChangePage(this.list,val)
			},
			handleSizeChange(val){
				this.pageNo = 1
				this.pageSize = val
				this.currentChangePage(this.list,1)
			},
		}
	}
</script>

<style>

</style>
