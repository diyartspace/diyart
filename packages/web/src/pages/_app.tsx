import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'
import { useEffect } from 'react'

import { appStore } from '../app/store'
import { appTheme } from '../app/theme'

const useRemoveInjectedCssEffect = () => {
  // Based on https://material-ui.com/guides/server-rendering/#the-client-side
  useEffect(() => {
    const styleElement = document.querySelector('#jss-server-side')
    if (styleElement && styleElement.parentElement) {
      styleElement.parentElement.removeChild(styleElement)
    }
  }, [])
}

const MainApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  useRemoveInjectedCssEffect()

  return (
    <StoreProvider store={appStore}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  )
}

export default MainApp
