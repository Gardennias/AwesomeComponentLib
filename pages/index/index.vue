<template>
	<view>
		<view v-for="(item,index) in invoiceList" :key="index" style="padding: 24upx 32upx;margin-bottom: 10px;" class="myBoxShadow">
			<uni-collapse>					
				<!-- 发票 -->
				<uni-collapse-item showCheck :check="item.check" @statusClick="statusClick(item, index)" title="测试" text="状态" showText>
					aaaa
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="margin-left text-df">
			<text :class="isCheckAll?'cuIcon-roundcheckfill text-green': 'cuIcon-round' " style="font-size: 20px;margin-right: 5px;" @click.stop="statusCheckALL"></text> 全选
			
		</view>
	</view>
</template>

<script>
	import UniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import UniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	
	export default {
		data() {
			return {
				isCheckAll: false,
				invoiceList: [],
				checkList: []
			}
		},
		watch:{
			checkList(){
				
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			statusClick(v,index){
				this.invoiceList[index].check = !this.invoiceList[index].check
				
				let arrIndex = this.checkList.indexOf(v.id)
				if(arrIndex>-1){   // 已选中,点击取消
					this.checkList.splice(arrIndex,1);
				}else{  // 未选中,点击选中
					this.checkList.push(v.id);
				}
				
				if (this.checkList.length ==0){
					this.checkList = []
					this.isCheckAll = false
				}
				
				if (this.checkList.length == this.invoiceList.length) {
					this.isCheckAll = true
				}
				console.log(this.checkList)
			},
			statusCheckALL(){
				this.isCheckAll = !this.isCheckAll
				if (this.isCheckAll) {
					this.checkList = []
					this.invoiceList = this.invoiceList.map(v => {
						return {
							...v,
							check: true
						}
					})
					this.checkList = this.invoiceList.map(v => {return v.id})
				} else {
					this.checkList = []
					this.invoiceList = this.invoiceList.map(v => {
						return {...v,check: false}
					})
				}
			},
			getData(){
				this.$api.bantch.list().then(res => {
					this.invoiceList = res.map(v => {
						return {
							...v,
							check: false
						}
					})
				})

			}
		},
		components:{
			UniCollapse,UniCollapseItem
		}
	}
</script>

<style>
	
</style>
