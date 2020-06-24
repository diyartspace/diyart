import { Button, Container } from '@material-ui/core'
import { NextPage } from 'next'
import { useState } from 'react'

import { AuthReadyNoSsr } from '../../app/auth'
import { ImageUploader, PageHead } from '../../app/common'

const CreateGuidePage: NextPage = () => {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined)

  return (
    <Container>
      <PageHead title='Create a new guide' />
      <AuthReadyNoSsr>
        <ImageUploader onChange={setImageFile} />
        <Button disabled={!imageFile} variant='contained' color='primary'>
          Create
        </Button>
      </AuthReadyNoSsr>
    </Container>
  )
}

export default CreateGuidePage
