import { CircularProgress, Grid, Link, NoSsr } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import PageLink from 'next/link'
import { FunctionComponent } from 'react'

import { useAppState } from '../store'

const SignInAlert: FunctionComponent = () => {
  return (
    <Alert severity='info'>
      Please{' '}
      <PageLink href='/signin' passHref>
        <Link>Sign in</Link>
      </PageLink>{' '}
      to continue.
    </Alert>
  )
}

export interface AuthReadyProps {
  readonly showLoading?: boolean
  readonly authRequired?: boolean
}

// TODO reduce complexity
const AuthReady: FunctionComponent<AuthReadyProps> = ({ children, showLoading = true, authRequired = true }) => {
  const isAuthReady = useAppState((state) => state.auth.ready)
  const user = useAppState((state) => state.auth.user)

  if (!isAuthReady) {
    return showLoading ? (
      <Grid container justify='center'>
        <CircularProgress />
      </Grid>
    ) : (
      <></>
    )
  }

  if (!user && authRequired) {
    return <SignInAlert />
  }

  return <>{children}</>
}

export const AuthReadyNoSsr: FunctionComponent<AuthReadyProps> = ({ children, ...props }) => (
  <NoSsr>
    <AuthReady {...props}>{children}</AuthReady>
  </NoSsr>
)
