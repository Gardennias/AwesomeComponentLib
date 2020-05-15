<template>
	<view>
		<view class="user-box margin padding text-lg">
			<view style="border-top: 1px solid #666666;"></view>
			<view class="flex align-center" v-for="(item, index) in dataList" :key="index">
				<view class="cu-avatar round"  :class="[{
					'bg-purple': (index+1)%5==0,
					'bg-red': (index+1)%2==0,
					'bg-yellow': (index+2)%4==0,
					'bg-blue': index==0 || (index+1)%9==0,
					'bg-green': (index+1)%4==0,
				    }, '']"
				style="width: 74upx">
					<text class="avatar-text text-df">{{item.name.charAt(0)}}</text>
				</view>
				<view class="flex justify-between align-center margin-left-sm padding-bottom-sm padding-top-sm" style="width: 100%;" :class="(index+1==dataList.length)?'' : 'borderBottom'">
					<view class="text-df">{{item.name}}</view>
					<view class="text-sm text-blue">{{item.status}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			dataList: {
				type: Array,
				default: function () {
					return []
				}
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.user-box {
		box-shadow:1px 1px 6px rgba(0,0,0,0.16);
		border-radius:10px;
	}
	.borderBottom {
		border-bottom: 1rpx solid #ccc;
	}
	
</style>
