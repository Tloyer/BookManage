import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'
import qs from 'qs'
import Video from 'video.js'
import 'video.js/dist/video-js.css'

Vue.prototype.$video = Video
/* axios会将数据以json格式处理，qs能够将json数据转为x-www-urlencoded格式，也就是post请求携带表单数据 */
Vue.prototype.$qs = qs

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

//配置项目的基本url，在api.config.json文件中
//配置与代码的解耦
axios.get('/api.config.json').then((res) => {
  axios.defaults.baseURL = res.data.BASE_URL
})

axios.defaults.withCredentials = true

/* axios请求拦截 */
axios.interceptors.request.use(config => {
  /* 为请求添加请求头中Authorizaiton字段值 */
  config.headers.Authorization = window.sessionStorage.getItem("token")
  /* 这里一定要return */
  return config
})

/* 全局挂载，之后直接this.$http就可以发起请求，如this.$http.get */
Vue.prototype.$http = axios

/* 导入全局样式 */
import './assets/css/global.css'
import './assets/css/common.css'
import './assets/js/fontawesome-free-5.15.4.min.js'

Vue.config.productionTip = false

new Vue({
  router,
  mode: 'history',
  data: {
    userStatus: {
      userId: "",
      userName: "",
      roleId: "",
      roleName: "",
      privileges: [
        {
          privilegeId: "",
          privilegeName: ""
        }
      ]
    },
    canEdit: false,
    roles: {
      1: {n: "管理员（全部操作）"},
      2: {n: "普通用户（仅查看）"},
    }
  },
  methods: {
    async checkLogin() {
      if (this.userStatus.userId) return true;
      const additional = {}
      if (!this.$http.defaults.baseURL) {
        let fixGet = await this.$http.get('/api.config.json');
        additional.baseURL = fixGet.data.BASE_URL;
      }
      let {data: res} = await this.$http.get("/book/user/login/check", additional);
      if (res.code !== 200) {
        return false;
      }
      this.userStatus = res.data;
      this.updatePriv();
      return true;
    },

    checkPriv(privId) {
      return this.userStatus.privileges.some(priv => {
        return priv.privilegeId === privId;
      });
    },

    updatePriv() {
      this.canEdit = this.checkPriv(2);
    },

    clearLogin() {
      this.userStatus = {};
      this.canEdit = false;
    }
  },

  render: h => h(App)
}).$mount('#app')
