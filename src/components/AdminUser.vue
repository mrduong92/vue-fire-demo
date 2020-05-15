<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <div>
      <button class="btn btn-success" @click="showAddUserForm()" v-if="!isAddUser">Add User</button>
      <div class="input-group" v-if="isAddUser">
          <input id="btn-input" type="text" class="form-control input-sm chat_input" placeholder="Enter your room name..." v-model="username">
          <span class="input-group-btn">
            <button class="btn btn-primary btn-sm" @click="addUser()">Save</button>
          </span>
      </div>
      <ul style="list-style: none; margin: 0; padding: 0;">
        <li v-for="user in users" :key="user.id">
          <router-link :to="`/update/user/${user.id}`" class="nav-link">{{ user.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { db } from '../db'

const userRef = db.collection('users')

export default {
  name: 'AdminUser',
  data () {
    return {
      msg: 'User Management',
      isAddUser: false,
      username: null,
      users: []
    }
  },
  firestore: {
    users: userRef
  },
  methods: {
    showAddUserForm () {
      this.isAddUser = true
    },
    async addUser () {
      // Create User
      userRef.add({
        name: this.username
      }).then(() => {
        this.username = ''
      })
    }
  }
}
</script>

<style scoped>

</style>
