<template>
	<view :class="['uni-collapse-cell',{'uni-collapse-cell--disabled':disabled,'uni-collapse-cell--open':isOpen}]" :hover-class="disabled ? '' : 'uni-collapse-cell--hover'">
		<view class="uni-collapse-cell__title"@click.stop.prevent="onClick()" :style="{padding: titlePadding}">
      <view v-if="arrow === 'left'"
            :class="{'uni-active':isOpen,'uni-collapse-cell--animation':showAnimation===true}"
            style="margin-right: 5px"
            class="uni-collapse-cell__title-arrow">
        <!-- <uni-icon color="#bbb" size="20" type="arrowdown" /> -->
        <view class="uni-icon uni-icon-arrowdown" style="color: #BEBEBE;"></view>
      </view>

      <view v-if="thumb" class="uni-collapse-cell__title-extra">
				<image :src="thumb" class="uni-collapse-cell__title-img" />
			</view>
			<view class="uni-collapse-cell__title-inner">
				<view class="uni-collapse-cell__title-text">
					<text v-if="showCheck" :class="isCheck?'cuIcon-roundcheckfill text-green': 'cuIcon-round' " style="font-size: 20px;margin-right: 5px;" @click.stop="statusCheck"></text> 
					{{ title }}
					<view class="uni-collapse-cell-subName" v-if="!!subName">
						<uni-tag size="small" :text="mindleTitle" :type="tagType" style="margin-right: 10upx;"></uni-tag>
						{{subName}}
					</view>
				</view>
			</view>
			<view v-if="showMoney" style="margin-right: 10upx;" :class="money < 0 ? 'red' : 'blue'" class="flex align-center">
				<uni-tag size="small" :text="rightTitle" :type="tagTypeR" style="margin-right: 10upx;border-radius: 10px" ></uni-tag>
				<span style="margin-right: 5upx;">{{money}}</span> <span>{{tag}}</span>
				<uni-tag size="small" :text="rightTag" :type="tagTypeR" mark style="border-radius: 10px"></uni-tag>
			</view>
			<view v-if="showText" style="font-size: 15px;">
				<text class="tagText">{{text}}</text>
			</view>
			<view v-if="arrow === 'right'" :class="{'uni-active':isOpen,'uni-collapse-cell--animation':showAnimation===true}" class="uni-collapse-cell__title-arrow">
				<!-- <uni-icon color="#bbb" size="20" type="arrowdown" /> -->
				<view class="uni-icon uni-icon-arrowdown" style="color: #BEBEBE;"></view>
			</view>
		</view>
		<view :class="{'uni-collapse-cell--animation':showAnimation===true}" :style="{height:isOpen ? height : '0px'}" class="uni-collapse-cell__content">
			<view class="view" :id="elId">
				<slot />
			</view>
		</view>
	</view>
</template>

<script>
	// import uniIcon from '../uni-icon/uni-icon.vue'
	export default {
		name: 'UniCollapseItem',
		components: {
			// uniIcon
		},
		props: {
			arrow: {
				type: String,
				default: 'right'
		    },
			subName: [String,Number],
			rightTag: [String,Number],
			mindleTitle: String,
			rightTitle: String,
			tagTypeR: String,
			tagType: { // 标签类型
				type: String,
				default: 'primary'
			},
			title: { // 列表标题
				type: String
			},
			name: { // 唯一标识符
				type: [Number, String],
				default: 0
			},
			tag: { // 标签
				type: String
			},
			showText:{ // 文字
				type: Boolean,
				default: false
			},
			text: String,

			disabled: { // 是否禁用
				type: Boolean,
				default: false
			},
			showAnimation: { // 是否显示动画
				type: Boolean,
				default: false
			},
			open: { // 是否展开
				type: Boolean,
				default: false
			},
			check: {
				type: Boolean,
				default: false
			},
			thumb: { // 缩略图
				type: String,
				default: ''
			},
			money: {
				type: Number
			},
			showMoney: { // 是否显示金额控件
				type: Boolean,
				default: false
			},
			titlePadding: String,
			showCheck: {
				type: Boolean,
				default: false
			}
		},
		data() {
			/**
			 * TODO 兼容新旧编译器
			 * 新编译器（自定义组件模式）下必须使用固定数值，否则部分平台下会获取不到节点。
			 * 随机数值是在旧编译器下使用的，旧编译器模式已经不推荐使用，后续直接废掉随机数值的写法。
			 */
			const elId = this.__call_hook ? 'uni_collapse_item' : `Uni_${Math.ceil(Math.random() * 10e5).toString(36)}`
			return {
				isCheck: false,
				isOpen: false,
				height: 'auto',
				elId: elId
			}
		},
		watch: {
			open(val) {
				this.isOpen = val
			},
			check(v) {
				this.isCheck = v
			}
		},
		inject: ['collapse'],
		created() {
			this.isOpen = this.open
			this.isCheck = this.check
			this.nameSync = this.name ? this.name : this.collapse.childrens.length
			this.collapse.childrens.push(this)
			if (this.collapse.accordion) {
				if (this.isOpen) {
					let lastEl = this.collapse.childrens[this.collapse.childrens.length - 2]
					if (lastEl) {
						this.collapse.childrens[this.collapse.childrens.length - 2].isOpen = false
					}
				}
			}
		},
		// #ifdef H5
		mounted() {
			this.getSize()
		},
		// #endif
		// #ifndef H5
		onReady() {
			this.getSize()
		},
		// #endif
		methods: {
			getSize() {
				if (this.showAnimation) {
					uni.createSelectorQuery().in(this).select(`#${this.elId}`).boundingClientRect().exec((ret) => {
						this.height = ret[0].height+ 'px'
					})
				}
			},
			onClick() {
				if (this.disabled) {
					return
				}
				if (this.collapse.accordion) {
					this.collapse.childrens.forEach(vm => {
						if (vm === this) {
							return
						}
						vm.isOpen = false
					})
				}
				this.isOpen = !this.isOpen
				
				this.collapse.onChange && this.collapse.onChange()
				this.$emit('click')
			},
			statusCheck(){
				this.isCheck = !this.isCheck
				this.$emit('statusClick')
			}
		}
	}
</script>

<style>
	@charset "UTF-8";
	.uni-collapse-cell-subName {
		color: #148efe;
		margin: 0 5%;
		display: initial;
		font-size: 25upx;
	}
	.uni-collapse-cell {
		position: relative
	}

	.uni-collapse-cell--hover {
		/* background-color: #f1f1f1 */
	}

	.uni-collapse-cell--open {
		/* background-color: #f1f1f1 */
	}

	.uni-collapse-cell--disabled {
		opacity: .3
	}

	.uni-collapse-cell--animation {
		transition: all .3s
	}

	.uni-collapse-cell:after {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		/*background-color: #c8c7cc*/
	}

	.uni-collapse-cell__title {
		/* padding: 20upx 30upx 0; */

		/* padding: 12upx; */
		width: 100%;
		box-sizing: border-box;
		flex: 1;
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		font-size: 32upx;
	}

	.uni-collapse-cell__title-extra {
		margin-right: 18upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center
	}

	.uni-collapse-cell__title-img {
		height: 52upx;
		width: 52upx
	}

	.uni-collapse-cell__title-arrow {
		width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		transform: rotate(0);
		transform-origin: center center
	}

	.uni-collapse-cell__title-arrow.uni-active {
		transform: rotate(-180deg)
	}

	.uni-collapse-cell__title-inner {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column
	}

	.uni-collapse-cell__title-text {

		text-overflow: ellipsis;
		/* white-space: nowrap; */
		color: inherit;
		line-height: 1.5;
		overflow: hidden;
		color: #454545;
	}

	.uni-collapse-cell__content {
		position: relative;
		width: 100%;
		overflow: hidden;
		background: #fff
	}

	.uni-collapse-cell__content .view {
		font-size: 28upx
	}
	.tagText{
		color: #f0ad4e;
		font-size: 23upx;
	}
</style>
