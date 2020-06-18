import { ReactElement } from 'react'
import { Server } from 'styletron-engine-atomic'
import { StandardEngine } from 'styletron-react'

export interface GetStyleElementsOptions {
  readonly styletronEngine: StandardEngine
  readonly hydrateClassName: string
}

export const getStyleElements = (options: GetStyleElementsOptions) => (): ReactElement[] => {
  const { styletronEngine, hydrateClassName } = options
  if (styletronEngine instanceof Server) {
    const stylesheets = styletronEngine.getStylesheets() || []
    return stylesheets.map((stylesheet, index) => (
      <style
        key={index}
        className={hydrateClassName}
        dangerouslySetInnerHTML={{ __html: stylesheet.css }}
        media={stylesheet.attrs.media}
        data-hydrate={stylesheet.attrs['data-hydrate']}
      />
    ))
  }
  return []
}
