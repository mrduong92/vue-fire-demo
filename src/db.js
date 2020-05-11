import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

// Get a Firestore instance
export const db = firebase
  .initializeApp({
    apiKey: 'AIzaSyDfn-UCPHXb8A7nwktMcqInmCa6j4SLsLE',
    authDomain: 'https://pay-create.firebaseio.com',
    projectId: 'pay-create'
  })
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
