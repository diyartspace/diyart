import { FileUploader } from 'baseui/file-uploader'
import { NextPage } from 'next'
import { useCallback } from 'react'

import { PageHead } from '../components/common'

const HomePage: NextPage = () => {
  const onDropAccepted = useCallback((accepted: File[]) => {
    if (!accepted.length) {
      return
    }
    const imageFile: File = accepted[0]
    console.log(imageFile)
  }, [])

  return (
    <>
      <PageHead title='Home' />
      <FileUploader multiple={false} onDropAccepted={onDropAccepted} />
    </>
  )
}

export default HomePage
