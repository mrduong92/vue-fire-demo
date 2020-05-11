<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential44 666Links222</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href="https://forum.vuejs.org"
          target="_blank"
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href="https://chat.vuejs.org"
          target="_blank"
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href="https://twitter.com/vuejs"
          target="_blank"
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href="http://vuejs-templates.github.io/webpack/"
          target="_blank"
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href="http://router.vuejs.org/"
          target="_blank"
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href="http://vuex.vuejs.org/"
          target="_blank"
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href="http://vue-loader.vuejs.org/"
          target="_blank"
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href="https://github.com/vuejs/awesome-vue"
          target="_blank"
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '../db'

// const jobs = db.collection('jobs').doc('a').get()

export default {
  name: 'HelloWorld',
  props: ['id'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      jobs: []
    }
  },
  mounted () {
  //   db.collection('jobs')
  //     .get()
  //     .then(querySnapshot => {
  //       // console.log(querySnapshot.docs)
  //       this.jobs = querySnapshot.docs.map(doc => {
  //         console.log(doc.data())
  //       })
  //       // do something with documents
  //     })

    console.log('this.jobs')
    console.log(this.jobs)
  },
  firestore: {
    jobs: db.collection('jobs')
  },
  watch: {
    jobs: {
      immediate: true,
      handler (id) {
        console.log(id[0].aaa.seconds)
      }
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
</style>
