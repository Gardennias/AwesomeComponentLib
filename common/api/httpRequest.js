// import cache from './cache'
let loginLock = false
module.exports = {
	handBack(succ, error,result){
		let da = result.data
		da = JSON.parse(da)
		if (da.code == null) {
			succ.call(self, da)
			return
		}
		if (da.code == 0 || da.code == 200) {
			succ.call(self, da.data)
		} else {			
			error.call(self, da)
		}
	},
	upload:function(url,formData,filePath){
		return new Promise((succ, error) => {
			let token
			let userId
			// let cac = cache.get("auth",false);

			// if(cac==false){

			// }else{
			// 	token = cac.token
			// 	userId = cac.id
			// }
			if (filePath==null){
				filePath = undefined
			}

			uni.uploadFile({
				url: url,
				filePath: filePath,
				name: 'file',
				formData: formData,
				header: {
					"AUTH_TOKEN": token,
					'USERID': userId
				},
				success: (result) => {
					this.handBack(succ,error,result)
				},
				fail: function (e) {
					uni.showToast({
						title: e.data,
						icon: 'none',
						duration: 2000
					});
					error.call(self, e)
				}
			});
		});
	},
	post: function(url, data, header,judgeLogin=true) {
		let token
		let userId
		// let cac = cache.get("auth",false);

		// if(cac==false){

		// }else{
		//   token = cac.token
		//   userId = cac.id
		// }

		header = header || "application/json";
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "POST",
				header: {
					"content-type": header,
					"AUTH_TOKEN": token,
					'USERID': userId
				},
				success: function(result) {
					let da = result.data
					if(da.code==null){
						succ.call(self, da)
						return
					}
					if(da.code==0 || da.code==200 ){
						succ.call(self, da.data)
					}else{						
						error.call(self, da)
					}
				},
				fail: function(e) {
					uni.showToast({
						title: e.data,
						icon: 'none',
						duration: 2000
					});
					error.call(self, e)
				}
			})
		})
	},
	get: function(url, data, header,judgeLogin=true) {
		let token
		let userId
		// let cac = cache.get("auth",false);
		// if(cac==false){

		// }else{
			// token = cac.token;
			// userId = cac.id
		// }

		header = header || "application/json";
		return new Promise((succ, error) => {
			uni.request({
				url: url,
				data: data,
				method: "GET",
				header: {
					"content-type": header,
					"AUTH_TOKEN": token,
					"USERID": userId
				},
				success: function(result) {
					let da = result.data
					if(da.code==0 || da.code ==200){
						succ.call(self, da.data)
					}else{
						// 错误消息处理
					}
				},
				fail: function(e) {
					let da = e.data
					uni.showToast({
						title: '网络连接异常',
						icon: 'none',
						duration: 2000
					});
					error.call(self, e)
				}
			})
		})
	},
	create: function(url, data, method, header,judgeLogin=true) {
		let token
		let userId
		// let cac = cache.get("auth",false);

		// if(cac==false){

		// }else{
		//   token = cac.token
		//   userId = cac.id
		// }
		header = header || "application/json";
		return new Promise((succ, error) => {
		 	uni.request({
		 		url: url,
		 		data: data,
		 		method: method,
		 		header: {
		 			"content-type": header,
					'Accept': 'application/json, text/plain, */*',
		 			"AUTH_TOKEN": token,
		 			'USERID': userId
		 		},
		 		success: function(result) {
		 			let da = result.data
		 			if(da.code==0 || da.code==200){
		 				succ.call(self, da.data)
		 			}else{
						
		 			}
		 		},
		 		fail: function(e) {
		 			let da = e.data
		 			uni.showToast({
		 				title: da.message,
		 				icon: 'none',
		 				duration: 2000
		 			});
		 			error.call(self, e)
		 		}
		 	})
		})
	}
}
