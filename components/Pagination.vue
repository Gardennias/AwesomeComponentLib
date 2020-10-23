/**
 * 分页组件
 */
<template>
	<view class="text-df bg-white padding solids-top align-center">
		<view class="flex align-center justify-between">
			<view class="flex align-center">
				<input v-model.number="internalPageSize" type="number" style="border: 1px solid #ddd;width: 40px;text-align: center;border-radius: 8upx;" @change="pageSizeChange()"/>条/页
			</view>
			<view class="flex justify-center text-df align-center">
				<text @click="prev()" :class="internalCurrentPage>1 ? 'text-blue' : 'text-gray'" class="cuIcon-back" style="font-size: 15px;"></text>
				<view class="flex align-center margin-left-sm margin-right-sm">
					<input v-model.number="internalCurrentPage " type="number" class="text-df" style="border: 1px solid #ddd;width: 40px;text-align: center;border-radius: 8upx;color: #0081ff;margin-right: 5px;" @change="emitChange"/>/{{internalPageCount}}
				</view>			
				<text @click="next()" :class="(internalCurrentPage == internalPageCount )? 'text-grey' : 'text-blue'" class="cuIcon-right" style="font-size: 15px;"></text>	
			</view>
			<text class="flex align-center">共{{total}}条</text>
		</view>
	</view>	
</template>

<script>
	export default {
		name:'Page',
		props: {
			total: Number,
			pageCount: Number,
			disabled: Boolean,
			pageSize: {
			  type: [Number, String],
			  default: 10
			},
			currentPage: {
			  type: Number,
			  default: 1
			},
			pageSizes: {
			  type: Array,
			  default() {
				return [10, 20, 30, 40, 50, 100];
			  }
			},
		},
		data() {
			return {
				internalCurrentPage: 1,
			    internalPageSize: 0,
			    lastEmittedPage: -1,
				userChangePageSize: false
			}
		},
		computed: {
			internalPageCount() {
			  if (typeof this.total === 'number') {
				return Math.max(1, Math.ceil(this.total / this.internalPageSize));
			  } else if (typeof this.pageCount === 'number') {
				return Math.max(1, this.pageCount);
			  }
			  return null;
			}
		},
		watch: {
			currentPage: {
			  immediate: true,
			  handler(val) {
				this.internalCurrentPage = this.getValidCurrentPage(val);
			  }
			},
		
			pageSize: {
			  immediate: true,
			  handler(val) {
				this.internalPageSize = isNaN(val) ? 10 : val;
				this.userChangePageSize = true
				this.$emit('update:pageSize', val);
			  }
			},
		
			internalCurrentPage: {
			  immediate: true,
			  handler(newVal) {
				this.$emit('update:currentPage', newVal);
				this.lastEmittedPage = -1;
			  }
			},
			internalPageCount(newVal) {
			  /* istanbul ignore if */
			  const oldPage = this.internalCurrentPage;
			  if (newVal > 0 && oldPage === 0) {
				this.internalCurrentPage = 1;
			  } else if (oldPage > newVal) {
				this.internalCurrentPage = newVal === 0 ? 1 : newVal;
				this.userChangePageSize && this.emitChange();
			  }
			  this.userChangePageSize = false;
			}
		  
		},
		methods:{
			home() { // 首页
				this.internalCurrentPage = 1
				this.emitChange();
			},
			last(){ // 尾页
				this.internalCurrentPage = this.internalPageCount
				this.emitChange()
			},
			handleCurrentChange(val) {
			  this.internalCurrentPage = this.getValidCurrentPage(val);
			  this.userChangePageSize = true;
			  this.emitChange();
			},		
			prev() {
			  if (this.disabled) return;
			  const newVal = this.internalCurrentPage - 1;
			  this.internalCurrentPage = this.getValidCurrentPage(newVal);
			  this.$emit('prev-click', this.internalCurrentPage);
			  this.emitChange();
			},		
			next() {
			  if (this.disabled) return;
			  const newVal = this.internalCurrentPage + 1;
			  this.internalCurrentPage = this.getValidCurrentPage(newVal);
			  this.$emit('next-click', this.internalCurrentPage);
			  this.emitChange();
			},
			pageSizeChange() {
				this.$emit('pageSize-change', this.internalPageSize);
				this.userChangePageSize = true;
				this.emitChange();
			},
			emitChange() {
			  this.$nextTick(() => {
				if (this.internalCurrentPage !== this.lastEmittedPage || this.userChangePageSize) {
				  this.$emit('current-change', this.internalCurrentPage);
				  this.lastEmittedPage = this.internalCurrentPage;
				  this.userChangePageSize = false;
				}
			  });
			},
			getValidCurrentPage(value) {
			  value = parseInt(value, 10);
		
			  const havePageCount = typeof this.internalPageCount === 'number';
		
			  let resetValue;
			  if (!havePageCount) {
				if (isNaN(value) || value < 1) resetValue = 1;
			  } else {
				if (value < 1) {
				  resetValue = 1;
				} else if (value > this.internalPageCount) {
				  resetValue = this.internalPageCount;
				}
			  }
		
			  if (resetValue === undefined && isNaN(value)) {
				resetValue = 1;
			  } else if (resetValue === 0) {
				resetValue = 1;
			  }
		
			  return resetValue === undefined ? value : resetValue;
			},
		}
	}
</script>

<style scoped>

</style>
