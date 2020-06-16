import '../app/auth/auth-widget.css'

import { BaseProvider, LightTheme } from 'baseui'
import { StoreProvider } from 'easy-peasy'
import { AppProps } from 'next/app'
import { Provider as StyletronProvider } from 'styletron-react'

import { appStore } from '../app/store'
import { styletronEngine } from '../app/styletron'

const MainApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    // Styletron DebugEngine is not working at the moment https://github.com/styletron/styletron/issues/366
    // <StyletronProvider value={styletronEngine} debug={styletronDebug} debugAfterHydration>
    <StyletronProvider value={styletronEngine}>
      <BaseProvider theme={LightTheme}>
        <StoreProvider store={appStore}>
          <Component {...pageProps} />
        </StoreProvider>
      </BaseProvider>
    </StyletronProvider>
  )
}

export default MainApp
