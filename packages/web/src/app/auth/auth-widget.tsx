import { Avatar, Button, makeStyles, Theme, Typography } from '@material-ui/core'
import * as firebaseUi from 'firebaseui'
import { FunctionComponent, useCallback } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import { firebase } from '../firebase'
import { useAppState } from '../store'
import { User } from './user'

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

const useStyles = makeStyles((theme: Theme) => ({
  '@global': {
    // Based on https://github.com/firebase/firebaseui-web/issues/121
    '.firebaseui-id-page-callback': {
      background: 'inherit !important',
      boxShadow: 'none !important',
      '& .mdl-progress': {
        height: '0 !important',
      },
      '& .mdl-progress:after': {
        content: '"Authenticating..."',
        display: 'block',
        textAlign: 'center',
        padding: '1rem',
      },
    },
  },
  profile: {
    textAlign: 'center',
  },
  avatar: {
    margin: '0 auto',
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}))

interface ProfileControlProps {
  readonly user: User
}

const ProfileControl: FunctionComponent<ProfileControlProps> = ({ user }) => {
  const signOut = useCallback(async () => {
    await firebase.auth().signOut()
  }, [])
  const classes = useStyles()

  return (
    <div className={classes.profile}>
      <Avatar src={user.photoUrl} alt={user.displayName} className={classes.avatar} />
      <Typography variant='subtitle1' gutterBottom>
        {user.email}
      </Typography>
      <Button variant='outlined' onClick={signOut}>
        Sign out
      </Button>
    </div>
  )
}

export const AuthWidget: FunctionComponent = () => {
  const user = useAppState((state) => state.auth.user)

  if (user) {
    return <ProfileControl user={user} />
  }

  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
}
