import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import UserProfile from '@/components/UserProfile'
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
      path: '/user-profile',
      name: 'user-profile',
      component: UserProfile
    }
  ]
})
