import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import Home from '../views/home.vue'
import Menu from '../views/menu.vue'
import Orderlist from '../views/orderlist.vue'
import Mine from '../views/mine.vue'
import Pay from '../views/pay.vue'
import Orderdetail from '../views/orderdetail.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/menu',
        name: 'Menu',
        component: Menu,
      }, {
        path: '/orderlist',
        name: 'Orderlist',
        component: Orderlist,
      }, {
        path: '/mine',
        name: 'Mine',
        component: Mine,
      },
    ]
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay,
  }, {
    path: '/orderdetail',
    name: 'Orderdetail',
    component: Orderdetail,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
