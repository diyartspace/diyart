import { createStore, createTypedHooks } from 'easy-peasy'

import { AuthStoreModel, authStoreModel } from '../auth/auth-store'

interface AppStoreModel {
  readonly auth: AuthStoreModel
}

const appStoreModel: AppStoreModel = {
  auth: authStoreModel,
}

export const appStore = createStore(appStoreModel)

const { useStoreState: useAppState, useStoreActions: useAppActions } = createTypedHooks<AppStoreModel>()

export { useAppState, useAppActions }
