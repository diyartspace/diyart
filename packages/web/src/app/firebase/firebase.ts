import * as firebase from 'firebase/app'

import { appStore } from '../store'

require('firebase/analytics')
require('firebase/auth')

const ensureEnv = (value?: string): string => {
  if (!value) {
    throw new Error('Env not found')
  }
  return value
}

const firebaseConfig = {
  projectId: ensureEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
  authDomain: `${ensureEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)}.firebaseapp.com`,
  databaseURL: `https://${ensureEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)}.firebaseio.com`,
  storageBucket: `${ensureEnv(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID)}.appspot.com`,
  apiKey: ensureEnv(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
  messagingSenderId: ensureEnv(process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID),
  appId: ensureEnv(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
  measurementId: ensureEnv(process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID),
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

  if (!email) {
    actions.auth.setUser(undefined)
    return
  }

  actions.auth.setUser({
    id: uid,
    email,
    displayName: displayName || email.split('@')[0],
    photoUrl: photoURL || undefined,
  })
})

export { firebase }
