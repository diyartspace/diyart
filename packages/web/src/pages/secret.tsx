import { Alert } from '@material-ui/lab'
import { NextPage } from 'next'

import { AuthReadyNoSsr } from '../app/auth'
import { PageLayout } from '../app/common'

const SecretPage: NextPage = () => {
  return (
    <PageLayout title='Secret'>
      <AuthReadyNoSsr>
        <Alert severity='info'>Hello, authenticated user!</Alert>
      </AuthReadyNoSsr>
    </PageLayout>
  )
}

export default SecretPage
