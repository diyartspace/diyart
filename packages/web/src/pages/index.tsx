import { FileUploader } from 'baseui/file-uploader'
import { NextPage } from 'next'
import Pica from 'pica/dist/pica'
import { useCallback, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { PageHead } from '../app/common'

const HomePage: NextPage = () => {
  const [image, setImage] = useState<string>(undefined)

  const onDropAccepted = useCallback((accepted: File[]) => {
    if (!accepted.length) {
      return
    }
    const imageFile: File = accepted[0]
    const imageObject = new Image()
    const fileLoader = new FileReader()
    fileLoader.readAsDataURL(imageFile)
    fileLoader.onload = function () {
      if (typeof this.result === 'string') {
        imageObject.src = this.result
      }
    }
    imageObject.onload = async function () {
      if (Math.max(imageObject.width, imageObject.height) > 1000) {
        const offScreenCanvas = document.createElement('canvas')
        if (imageObject.width < imageObject.height) {
          offScreenCanvas.height = (imageObject.height * 1000) / imageObject.width
          offScreenCanvas.width = 1000
        } else {
          offScreenCanvas.height = 1000
          offScreenCanvas.width = (imageObject.width * 1000) / imageObject.height
        }
        const pica = new Pica()
        await pica.resize(imageObject, offScreenCanvas)
        setImage(offScreenCanvas.toDataURL())
      } else {
        setImage(imageObject.src)
      }
    }
  }, [])

  return (
    <>
      <PageHead title='Home' />
      <FileUploader multiple={false} onDropAccepted={onDropAccepted} />
      {image && (
        <TransformWrapper>
          <TransformComponent>
            <img src={image} />
          </TransformComponent>
        </TransformWrapper>
      )}
    </>
  )
}

export default HomePage
