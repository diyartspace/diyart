import { StyledLink } from 'baseui/link'
import { NextPage } from 'next'
import PageLink from 'next/link'

import { AuthReadyNoSsr, AuthWidget } from '../app/auth'
import { PageHead } from '../app/common'

const SignInPage: NextPage = () => {
  return (
    <>
      <PageHead title='Sign in' />
      <PageLink href='/' passHref>
        <StyledLink>Home</StyledLink>
      </PageLink>
      <AuthReadyNoSsr>
        <AuthWidget />
      </AuthReadyNoSsr>
    </>
  )
}

export default SignInPage
