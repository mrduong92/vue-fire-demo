<template>
  <div class="hello">
    <h1>User Profile</h1>
  </div>
</template>
<script>
import { db } from '../db'

const users = db.collection('users')

export default {
  name: 'UserProfile',
  props: ['id'],
  data () {
    return {
      user: null
    }
  },
  watch: {
    id: {
      // call it upon creation too
      immediate: true,
      handler (id) {
        this.$bind('user', users.doc(id))
      }
    }
  }
}
</script>
