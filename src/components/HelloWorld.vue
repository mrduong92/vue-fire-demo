<template>
  <div class="hello">
    <h1>{{ msg1 }}</h1>
    <div v-if="user">
      <h2 v-text="msg3 + user.name"></h2>
      <ul>
        <li v-for="room in rooms" :key="room.id">
          <router-link :to="`/rooms/${room.id}`" class="nav-link">{{ room.name }}</router-link>
        </li>
      </ul>
    </div>
    <div v-else>
      <h2>{{ msg2 }}</h2>
      <div class="input-group">
          <input id="btn-input" type="text" class="form-control input-sm chat_input" placeholder="Enter your nickname..." v-model="username">
          <span class="input-group-btn">
          <button class="btn btn-primary btn-sm" @click="sendNickName()">Send</button>
          </span>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../db'
import { authUser } from '../user'
import firebase from 'firebase/app'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg1: 'Welcome to Yahoo Chat',
      msg2: 'Login your username',
      msg3: 'Room List of ',
      rooms: [],
      messages: [],
      username: null,
      user: null,
      users: []
    }
  },
  firestore: {
    rooms: db.collection('rooms')
  },
  watch: {
    users: {
      immediate: true,
      handler (val) {
        if (val.length) {
          this.user = val[0]
          this.rooms = this.user.rooms
          localStorage.setItem('user', JSON.stringify(this.user))
        }
      }
    }
  },
  mounted () {
    if (authUser) {
      this.user = authUser
    }
  },
  methods: {
    sendNickName () {
      this.$bind('users', db.collection('users').where('username', '==', this.username).limit(1))
    },
    getRooms (roomIds) {
      db.collection('rooms').where(firebase.firestore.FieldPath.documentId(), 'in', roomIds).onSnapshot(snapshot => {
        const rooms = []

        snapshot.forEach(doc => {
          const room = doc.data()
          room.id = doc.id
          rooms.push(room)
        })

        this.rooms = rooms
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
ul {
  display: inline-grid;
}
</style>
