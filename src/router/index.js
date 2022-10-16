import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'

Vue.use(VueRouter)

const routes = [
  {path: "/", redirect: "/login"},
  {path: "/login", component: Login},
  {
    path: "/home", component: Home,
    redirect: '/welcome',
    children: [
      {path: '/welcome', component: Welcome},
    ]
  },
  {
    path: "/books",
    hidden: true,
    component: Home,
    name: '图书信息数据库',
    meta: {icon: 'fa fa-male'},
    children: [
      {
        path: '/list',
        hidden: true,
        component: (resolve) => require(['@/views/BookList'], resolve),
        name: '图书列表'
      },
      {
        path: '/books/detail/:bookId',
        component: (resolve) => require(['@/views/BookDetail'], resolve)
      },
    ]
  },
  {
    path: "/borrow",
    hidden: true,
    component: Home,
    name: '图书借阅管理',
    meta: {icon: 'fa fa-dog'},
    children: [
      {
        path: '/borrow',
        hidden: true,
        component: (resolve) => require(['@/views/Borrow'], resolve),
        name: '图书借阅列表'
      }
    ]
  },
  {
    path: "/user",
    component: Home,
    children: [
      {
        path: "pwd",
        component: (resolve) => require(['@/views/PassWord'], resolve)
      },
      {
        path: "userlist",
        component: (resolve) => require(['@/views/UserList'], resolve)
      },
    ]
  },
  {
    path: "/sys",
    hidden: true,
    component: Home,
    name: '系统管理',
    meta: {icon: 'fa fa-cog'},
    children: [
      {
        path: "/userlist",
        hidden: true,
        component: (resolve) => require(['@/views/UserList'], resolve),
        name: '用户列表'
      },
      {
        path: "/log",
        hidden: true,
        component: (resolve) => require(['@/views/LogShow'], resolve),
        name: '登录日志管理'
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  /* 放行登录请求 */
  // if (to.path === '/login') return next()
  // /* 除登录以外的请求，先判断是否携带token， */
  // let token = window.sessionStorage.getItem("token")
  // /* 必须先登录 */
  // if (!token) return next('/login')
  /* 已登录过则放行 */
  next()
})

export default router
