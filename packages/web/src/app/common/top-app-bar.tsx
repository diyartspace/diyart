import {
  AppBar,
  Avatar,
  createStyles,
  Link,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from '@material-ui/core'
import PageLink from 'next/link'
import { FunctionComponent, ReactNode } from 'react'

import { useAppState } from '../store'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
)

export interface TopAppBarProps {
  readonly appBarTitle?: ReactNode
}

export const TopAppBar: FunctionComponent<TopAppBarProps> = ({ appBarTitle }) => {
  const classes = useStyles()
  const user = useAppState((state) => state.auth.user)
  return (
    <AppBar position='fixed'>
      <Toolbar>
        {appBarTitle && (
          <Typography variant='h6' noWrap className={classes.title}>
            {appBarTitle}
          </Typography>
        )}
        {!user ? (
          <PageLink href='/signin' passHref>
            <Link color='inherit'>Sign In</Link>
          </PageLink>
        ) : (
          <PageLink href='/signin' passHref>
            <Avatar src={user.photoUrl} alt={user.displayName} />
          </PageLink>
        )}
      </Toolbar>
    </AppBar>
  )
}
