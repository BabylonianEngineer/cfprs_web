import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UploadExcel from '../views/UploadExcel'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'CFPRS-首页'
    },
    children: [
      {
        path: '',
        name: 'UploadExcel',
        component: UploadExcel,
        meta: {
          title: 'CFPRS-上传'
        },
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import(/* webpackChunkName: "about" */ '../views/Search.vue'),
        meta: {
          title: 'CFPRS-检索'
        },

      },
    ]
  },
  {
    path: '/detail',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/Detail.vue'),
    meta: {
      title: '详情'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 文件下面进行路由导航设置
router.beforeEach((to, from, next) => {
  //  从from 跳转到 to
  document.title = to.matched[0].meta.title
  //  一定要写！！！ 
  next()
})
export default router
