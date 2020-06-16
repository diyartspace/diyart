import * as firebase from 'firebase/app'

import { appStore } from '../store'

require('firebase/analytics')
require('firebase/auth')

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
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
