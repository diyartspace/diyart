import { DropzoneArea } from 'material-ui-dropzone'
import { FunctionComponent, useCallback } from 'react'

export interface ImageUploaderProps {
  readonly onChange: (file?: File) => void
}

export const ImageUploader: FunctionComponent<ImageUploaderProps> = ({ onChange }) => {
  const handleChange = useCallback(
    (files: File[]) => {
      onChange(files[0])
    },
    [onChange],
  )

  return <DropzoneArea filesLimit={1} acceptedFiles={['image/*']} maxFileSize={50000000} onChange={handleChange} />
}
