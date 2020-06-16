import * as firebaseUi from 'firebaseui'
import { FunctionComponent, useCallback } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { firebase } from '../firebase'
import { useAppState } from '../store'

const uiConfig: firebaseUi.auth.Config = {
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
}

export const AuthWidget: FunctionComponent = () => {
  const user = useAppState((state) => state.auth.user)
  const signOut = useCallback(async () => {
    await firebase.auth().signOut()
  }, [])

  if (user) {
    return (
      <div>
        <p>Logging in as {user.email}</p>
        <button onClick={signOut}>Sign out</button>
      </div>
    )
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
}
