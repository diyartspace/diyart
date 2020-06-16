import { Action, action } from 'easy-peasy'

import { User } from './user'

export interface AuthStoreModel {
  ready: boolean
  user?: User
  setUser: Action<AuthStoreModel, User | undefined>
}

export const authStoreModel: AuthStoreModel = {
  ready: false,
  setUser: action((state, user) => {
    state.ready = true
    state.user = user
  }),
}
