<template>
	<view>
		<movable-area class="movable-areaI">
			<movable-view class="movable-viewI" :x="x" :y="y" direction="all" >
				
				<view class="bg-blue text-center padding" style="border-radius: 50%;">
					<text class="cuIcon-add text-white text-bold" style="font-size: 44upx;"></text>
				</view>
				
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				x:0,
				y:0,
			}
		},
		methods: {
			
		},
		mounted() {
			uni.getSystemInfo({
				success: (res) => {
					this.x=parseInt(res.windowWidth);
					this.y=parseInt(res.windowHeight);
				}
			})
		}
	}
</script>

<style scoped>
 .movable-areaI{
    pointer-events:none;// 这个属性设置为none,让所有事件穿透过去
    z-index: 100;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .movable-viewI{
  	pointer-events:auto;// 重设为auto,覆盖父属性设置
    height: 55px;
    width: 55px;
  }
</style>
