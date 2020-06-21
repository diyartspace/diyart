import { NoSsr } from '@material-ui/core'
import { FunctionComponent } from 'react'

import { useAppState } from '../store'

const AuthReady: FunctionComponent = ({ children }) => {
  const isAuthReady = useAppState((state) => state.auth.ready)

  if (!isAuthReady) {
    // This state will stay shortly, so no need to show loader.
    return <></>
  }

  return <>{children}</>
}

export const AuthReadyNoSsr: FunctionComponent = ({ children }) => (
  <NoSsr>
    <AuthReady>{children}</AuthReady>
  </NoSsr>
)
