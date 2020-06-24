import { Container, makeStyles, Theme } from '@material-ui/core'
import { FunctionComponent } from 'react'

import { PageHead } from './page-head'
import { TopNavigationBar } from './top-navigation-bar'

const useStyles = makeStyles((theme: Theme) => ({
  topNavigationBarOffset: {
    ...theme.mixins.toolbar,
    marginBottom: theme.spacing(3),
  },
}))

export interface PageLayoutProps {
  readonly title: string
}

export const PageLayout: FunctionComponent<PageLayoutProps> = ({ title, children }) => {
  const classes = useStyles()

  return (
    <Container>
      <PageHead title={title} />
      <TopNavigationBar title={title} />
      <div className={classes.topNavigationBarOffset}></div>
      {children}
    </Container>
  )
}
