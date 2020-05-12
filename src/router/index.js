import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Room from '@/components/Room'
import { firestorePlugin } from 'vuefire'

Vue.use(Router)
Vue.use(firestorePlugin)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/rooms/:room',
      name: 'room',
      component: Room
    }
  ]
})
