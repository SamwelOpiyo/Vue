import Vue from 'vue'
import Router from 'vue-router'
import Beers from './../components/Beers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Beers,
      name: 'home',
      props: true
    },
    {
      path: '/favourite',
      name: 'favourite',
      component: Beers,
      props: true
    }
  ]
})