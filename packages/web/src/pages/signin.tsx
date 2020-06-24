import { Container, Link } from '@material-ui/core'
import { NextPage } from 'next'
import PageLink from 'next/link'

import { AuthReadyNoSsr, AuthWidget } from '../app/auth'
import { PageHead } from '../app/common'

const SignInPage: NextPage = () => {
  return (
    <Container>
      <PageHead title='Sign in' />
      <PageLink href='/' passHref>
        <Link>Home</Link>
      </PageLink>
      <AuthReadyNoSsr authRequired={false}>
        <AuthWidget />
      </AuthReadyNoSsr>
    </Container>
  )
}

export default SignInPage
