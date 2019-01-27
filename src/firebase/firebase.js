import * as firebase from 'firebase'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
}
firebase.initializeApp(config)

const database = firebase.database()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export { firebase,googleAuthProvider, database as default }

// database.ref('notes').push({
//   title: 'todo',
//   body: 'go somewhere'
// })

// database.ref('notes/-LU76yLmzy894_tH-Nep').update({
//   body: 'Buy food'
// })

// database.ref().on('value', snapshot => {
//   console.log(snapshot.val())
// })


// database.ref().set({
//   name: 'Jason',
//   isHuman: true,
//   locaction: {
//     city: 'Warsaw',
//     country: 'Poland'
//   }
// }).then (()=> {
//   console.log('lol')
// })
// .catch(e => console.log(e)) 

// database.ref().update({
//   name: 'miek',
//   age: 23,
// })

// database.ref('isHuman').remove()
//   .then(()=> console.log('removed'))
//   .catch(e => console.log(e))