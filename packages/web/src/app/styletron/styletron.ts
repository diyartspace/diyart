import { Client, Server } from 'styletron-engine-atomic'
import { DebugEngine, NoopDebugEngine, StandardEngine } from 'styletron-react'

import { getStyleElements } from './styletron-head'

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

export const getStyletronStyleElements = getStyleElements({ styletronEngine, hydrateClassName: HYDRATE_CLASSNAME })
