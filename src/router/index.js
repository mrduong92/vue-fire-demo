import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Room from '@/components/Room'
import AdminRoom from '@/components/AdminRoom'
import AdminUser from '@/components/AdminUser'
import UpdateRoom from '@/components/UpdateRoom'
import UpdateUser from '@/components/UpdateUser'
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
    },
    {
      path: '/admin/room',
      name: 'admin-room',
      component: AdminRoom
    },
    {
      path: '/admin/user',
      name: 'admin-user',
      component: AdminUser
    },
    {
      path: '/update/room/:room',
      name: 'update-room',
      component: UpdateRoom
    },
    {
      path: '/update/user/:user',
      name: 'update-user',
      component: UpdateUser
    }
  ]
})
