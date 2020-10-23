/**
 * API接口配置文件
 */
import httpRequest from './httpRequest.js'
import ENV from './env'

let baseUrl = ENV.baseUrl

// 用户
const user= {
	list: (options) => httpRequest.get(baseUrl+'user/list', options)
}

const bantch = {
	list: (options) => httpRequest.get(baseUrl+'/bantchList', options)
}

const pagenation = (options) => httpRequest.get(baseUrl+'/allList', options)

// const baidu = (options) => httpRequest.get(baseUrl+'material/ocr/baidu', options)
// const getAccess_Token = (options) => httpRequest.get(baseUrl+'material/ocr/baidu', options)

let ocrUrl = ''

const userMaintenance = {
	idCardOCR: function (token,type, image) {
		let param = {
			access_token: token,
			id_card_side: 'front',
			image: image
	    }
		// switch (type){
		// 	case '居民身份证':
		// 		ocrUrl = 'https://aip.baidubce.com/ocr/rest/2.0/ocr/v1/idcard'
		// 		param.id_card_side= 'front'
		// 		break;
		// 	case '中国护照':
		// 		ocrUrl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/passport'
		// 		break;
		// 	case '港澳居民来往内地通行证':
		// 		ocrUrl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/HK_Macau_exitentrypermit'
		// 		break;
		// 	case '台湾居民来往大陆通行证':
		// 		ocrUrl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/taiwan_exitentrypermit'
		// 		break;
		// 	default:
		// 		break;
		// }
		return httpRequest.post('https://aip.baidubce.com/ocr/rest/2.0/ocr/v1/idcard', param, 'application/x-www-form-urlencoded')
	},
	
}

export default {
	user,
	bantch,
	pagenation
}
