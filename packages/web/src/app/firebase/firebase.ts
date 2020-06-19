import * as firebase from 'firebase/app'

import { appStore } from '../store'

require('firebase/analytics')
require('firebase/auth')

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.appspot.com`,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

firebase.auth().onAuthStateChanged((firebaseUser) => {
  const actions = appStore.getActions()

  if (!firebaseUser) {
    actions.auth.setUser(undefined)
    return
  }

  const { uid, email, displayName, photoURL } = firebaseUser
  actions.auth.setUser({
    id: uid,
    email,
    displayName: displayName || email.split('@')[0],
    photoUrl: photoURL,
  })
})

export { firebase }
