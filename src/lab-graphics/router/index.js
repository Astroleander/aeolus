import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import CommonLayout from '@v/view/layout/common_layout.vue'
import NavLayout from '@v/view/layout/nav_layout.vue'

import ViewRoutes from './view'

export const routes = [
  {
    path: '',
    component: NavLayout,
    redirect: 'app',
    children: [{
      name: 'app',
      path: 'app',
      component: () => import('../views/index.vue'),
      meta: { name: 'index' }
    }]
  },
  {
    path: '/views',
    component: CommonLayout,
    children: ViewRoutes
  }
]

export default new Router({
  // mode: 'history', // require service suppo                                                 rt
  scrollBehavior: () => ({ y: 0 }),
  routes,
})