import { Action, action } from 'easy-peasy'

import { User } from './user'

export interface AuthModel {
  ready: boolean
  user?: User
  setUser: Action<AuthModel, User | undefined>
}

export const authModel: AuthModel = {
  ready: true,
  setUser: action((state, user) => {
    state.ready = true
    state.user = user
  }),
}
