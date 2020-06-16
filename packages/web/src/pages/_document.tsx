import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import React from 'react'

import { getStyletronStyleElements } from '../app/styletron'

// Based on https://github.com/vercel/next.js/blob/canary/examples/with-styletron/pages/_document.js
// and https://nextjs.org/docs/advanced-features/custom-document
class MainDocument extends Document {
  static async getInitialProps (context: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps: DocumentInitialProps = await Document.getInitialProps(context)

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), ...getStyletronStyleElements()],
    }
  }
}

export default MainDocument
