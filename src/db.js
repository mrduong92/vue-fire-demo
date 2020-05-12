import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: 'AIzaSyBCj_Qlesuyx-tEo4TzHVRi4hnC5sMIymM',
    authDomain: 'https://vuefire-65c2e.firebaseio.com',
    projectId: 'vuefire-65c2e'
  })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
