import { createStore, createTypedHooks } from 'easy-peasy'

import { AppModel, appModel } from './app-model'

export const appStore = createStore(appModel)

const { useStoreState: useAppState, useStoreActions: useAppActions } = createTypedHooks<AppModel>()

export { useAppState, useAppActions }

// Based on https://easy-peasy.now.sh/docs/recipes/hot-reloading.html
if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./app-model', () => {
      appStore.reconfigure(appModel)
    })
  }
}
