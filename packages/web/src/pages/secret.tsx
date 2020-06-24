import { Container } from '@material-ui/core'
import { NextPage } from 'next'

import { AuthReadyNoSsr } from '../app/auth'
import { PageHead } from '../app/common'

const SecretPage: NextPage = () => {
  return (
    <Container>
      <PageHead title='Secret' />
      <AuthReadyNoSsr>Hello, authenticated user.</AuthReadyNoSsr>
    </Container>
  )
}

export default SecretPage
