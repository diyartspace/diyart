import { ReactElement } from 'react'
import { Client, Server } from 'styletron-engine-atomic'
import { DebugEngine, NoopDebugEngine, StandardEngine } from 'styletron-react'

// Based on https://github.com/vercel/next.js/blob/canary/examples/with-styletron/styletron.js

const HYDRATE_CLASSNAME = '__styletron_hydrate__'

export const styletronEngine: StandardEngine =
  typeof window === 'undefined'
    ? new Server()
    : new Client({
      hydrate: document.getElementsByClassName(HYDRATE_CLASSNAME) as HTMLCollectionOf<HTMLStyleElement>,
    })

export const styletronDebug: DebugEngine =
  process.env.NODE_ENV === 'production' ? new NoopDebugEngine() : new DebugEngine()

export const getStyletronStyleElements = (): ReactElement[] => {
  if (styletronEngine instanceof Server) {
    const stylesheets = styletronEngine.getStylesheets() || []
    return stylesheets.map((stylesheet, index) => (
      <style
        key={index}
        className={HYDRATE_CLASSNAME}
        dangerouslySetInnerHTML={{ __html: stylesheet.css }}
        media={stylesheet.attrs.media}
        data-hydrate={stylesheet.attrs['data-hydrate']}
      />
    ))
  }
  return []
}
