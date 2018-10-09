import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyBHwPjKW6C_XCWpF3q4VgwSKB-vtYYYrro",
  authDomain: "vue-online-biding.firebaseapp.com",
  databaseURL: "https://vue-online-biding.firebaseio.com",
  projectId: "vue-online-biding",
  storageBucket: "vue-online-biding.appspot.com",
  messagingSenderId: "30912616948"
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
    timestampsInSnapshots: true
}
db.settings(settings)

export {
    db,
    auth,
    currentUser,
}
