import Vue from 'vue'
import App from './App'

import httpApi from './common/api/httpApi'

Vue.config.productionTip = false

Vue.prototype.$api = httpApi

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
