<template>
  <div class="">
    <h1>{{ msg }}</h1>
    <div>
      <button class="btn btn-success" @click="showAddRoomForm()" v-if="!isAddRoom">Add Room</button>
      <div class="input-group" v-if="isAddRoom">
          <input id="btn-input" type="text" class="form-control input-sm chat_input" placeholder="Enter your room name..." v-model="roomname">
          <select multiple="" v-if="users" v-model="selectedUsers">
            <option v-for="user in users" :key="user.id" :value="user.id" v-text="user.name">
            </option>
          </select>
          <span class="input-group-btn">
            <button class="btn btn-primary btn-sm" @click="addRoom()">Save</button>
          </span>
      </div>
      <ul style="list-style: none; margin: 0; padding: 0;">
        <li v-for="room in rooms" :key="room.id">
          <router-link :to="`/update/room/${room.id}`" class="nav-link">{{ room.name }}</router-link>
        </li>
      </ul>
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
      msg: 'Room Management',
      isAddRoom: false,
      roomname: null,
      rooms: [],
      users: [],
      selectedUsers: []
    }
  },
  firestore: {
    rooms: roomRef,
    users: userRef
  },
  methods: {
    showAddRoomForm () {
      this.isAddRoom = true
    },
    async addRoom () {
      const selectedUsers = this.selectedUsers.map(user => {
        return `/users/${user}`
      })

      // Create room
      const roomId = await new Promise((resolve, reject) => {
        roomRef.add({
          name: this.roomname,
          users: selectedUsers
        }).then(doc => {
          // console.log(doc.id)
          resolve(doc.id)
        })
      })

      // Batch Update users
      const batch = db.batch()
      this.selectedUsers.forEach(user => {
        batch.update(userRef.doc(user), {
          rooms: firebase.firestore.FieldValue.arrayUnion(`rooms/${roomId}`)
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
