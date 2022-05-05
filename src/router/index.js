import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/reg',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/home',
    component: () => import('@/components/Home.vue'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', component: () => import('@/components/content/Welcome.vue') },
      { path: '/cate', component: () => import('@/components/content/ArticleCate.vue') },
      { path: '/list', component: () => import('@/components/content/ArticleList.vue') },
      { path: '/send', component: () => import('@/components/content/ArticleSend.vue') },
      { path: '/info', component: () => import('@/components/user/Userinfo.vue') },
      { path: '/avatar', component: () => import('@/components/user/Avatar.vue') },
      { path: '/pwd', component: () => import('@/components/user/UserPwd.vue') }
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/reg' || to.path === '/') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/')
  next()
})
export default router
