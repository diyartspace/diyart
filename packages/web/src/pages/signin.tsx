import { NextPage } from 'next'

import { AuthReadyNoSsr, AuthWidget } from '../app/auth'
import { PageLayout } from '../app/common'

const SignInPage: NextPage = () => {
  return (
    <PageLayout title='Sign in'>
      <AuthReadyNoSsr authRequired={false}>
        <AuthWidget />
      </AuthReadyNoSsr>
    </PageLayout>
  )
}

export default SignInPage
