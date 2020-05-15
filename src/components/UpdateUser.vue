<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <div>
      <div class="input-group">
          <input id="btn-input" type="text" class="form-control input-sm chat_input" :placeholder="user.name || ''" v-model="username">
          <span class="input-group-btn">
            <button class="btn btn-primary btn-sm" @click="updateUser()">Save</button>
          </span>
      </div>
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
      msg: 'Update User',
      username: null,
      userId: null,
      user: null,
      users: []
    }
  },
  mounted () {
    this.userId = this.$route.params.user
    // Get room info
    userRef.doc(this.userId).onSnapshot(snapshot => {
      this.user = snapshot.data()
      this.user.id = snapshot.id
    })
  },
  methods: {
    async updateUser () {
      // Create User
      userRef.doc(this.userId).update({
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
