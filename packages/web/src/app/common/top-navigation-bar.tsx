import { AppBar, Avatar, Link, makeStyles, Toolbar, Typography } from '@material-ui/core'
import PageLink from 'next/link'
import { FunctionComponent, ReactNode } from 'react'

import { AuthReadyNoSsr } from '../auth'
import { useAppState } from '../store'

const useStyles = makeStyles({
  title: {
    flexGrow: 1,
  },
})

export interface TopNavigationBarProps {
  readonly title?: ReactNode
}

// TODO reduce complexity
export const TopNavigationBar: FunctionComponent<TopNavigationBarProps> = ({ title }) => {
  const user = useAppState((state) => state.auth.user)
  const classes = useStyles()

  return (
    <AppBar position='fixed'>
      <Toolbar>
        {title && (
          <Typography variant='h6' noWrap className={classes.title}>
            {title}
          </Typography>
        )}
        <AuthReadyNoSsr showLoading={false} authRequired={false}>
          <PageLink href='/signin' passHref>
            {user ? <Avatar src={user.photoUrl} alt={user.displayName} /> : <Link color='inherit'>Sign in</Link>}
          </PageLink>
        </AuthReadyNoSsr>
      </Toolbar>
    </AppBar>
  )
}
