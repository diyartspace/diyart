import { CircularProgress, Grid, NoSsr } from '@material-ui/core'
import { FunctionComponent } from 'react'

import { useAppState } from '../store'

const AuthReady: FunctionComponent = ({ children }) => {
  const isAuthReady = useAppState((state) => state.auth.ready)

  if (!isAuthReady) {
    return (
      <Grid container justify='center'>
        <CircularProgress />
      </Grid>
    )
  }

  return <>{children}</>
}

export const AuthReadyNoSsr: FunctionComponent = ({ children }) => (
  <NoSsr>
    <AuthReady>{children}</AuthReady>
  </NoSsr>
)
