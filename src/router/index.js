import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/home/home'

import Shop from '@/components/shop/shop'
// import HelloWorld from '@/components/HelloWorld'
import shopGoods from '@/components/shop/shop_goods'
import shopRatings from '@/components/shop/shop_ratings'
import shopSeller from '@/components/shop/shop_seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      //    component: Home
      component: Vue.component('Home', function (resolve) {
        require(['@/components/home/home'], resolve)
      })
    },
    {
      path: '/shop',
      name: 'Shop',
      //    component: Shop,
      component: Vue.component('Shop', function (resolve) {
        require(['@/components/shop/shop'], resolve)
      }),
      children: [
        {
          path: '/goods',
          component: shopGoods
        },
        {
          path: '/ratings',
          component: shopRatings
        },
        {
          path: '/seller',
          component: shopSeller
        }
      ]
    }
  ]
})
