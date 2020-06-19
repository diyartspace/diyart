import { ServerStyleSheets } from '@material-ui/core'
import Document, { DocumentContext, DocumentInitialProps } from 'next/document'
import React from 'react'

class MainDocument extends Document {
  static async getInitialProps (context: DocumentContext): Promise<DocumentInitialProps> {
    // Collect and inject css, based on https://material-ui.com/guides/server-rendering/#handling-the-request
    const sheets = new ServerStyleSheets()

    const initialProps: DocumentInitialProps = await Document.getInitialProps({
      ...context,
      renderPage: () =>
        context.renderPage({
          enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        }),
    })

    return {
      ...initialProps,
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    }
  }
}

export default MainDocument
