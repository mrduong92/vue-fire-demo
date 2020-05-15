<template>
  <div class="">
    <h1>{{ msg}}</h1>
    <div>
      <div class="input-group">
          <input id="btn-input" type="text" class="form-control input-sm chat_input" :placeholder="room.name || ''" v-model="roomname">
          <select multiple="" v-if="users" v-model="selectedUsers">
            <option v-for="user in users" :key="user.id" :value="user.id" v-text="user.name">
            </option>
          </select>
          <span class="input-group-btn">
            <button class="btn btn-primary btn-sm" @click="updateRoom()">Save</button>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../db'
import firebase from 'firebase/app'

const roomRef = db.collection('rooms')
const userRef = db.collection('users')

export default {
  name: 'AdminRoom',
  data () {
    return {
      msg: 'Update Room ',
      roomname: null,
      roomId: null,
      room: null,
      users: [],
      selectedUsers: []
    }
  },
  firestore: {
    users: userRef
  },
  mounted () {
    this.roomId = this.$route.params.room
    // Get room info
    roomRef.doc(this.roomId).onSnapshot(snapshot => {
      this.room = snapshot.data()
      this.room.id = snapshot.id
    })
  },
  methods: {
    async updateRoom () {
      const selectedUsers = this.selectedUsers.map(user => {
        return `/users/${user}`
      })

      // Update room
      roomRef.doc(this.roomId).update({
        name: this.roomname,
        users: selectedUsers
      })

      // Batch Update users
      const batch = db.batch()
      this.selectedUsers.forEach(user => {
        batch.update(userRef.doc(user), {
          rooms: firebase.firestore.FieldValue.arrayUnion(`rooms/${this.roomId}`)
        })
      })

      batch.commit().then(() => {
        this.roomname = ''
      })
    }
  }
}
</script>

<style scoped>

</style>
