import { AuthModel, authModel } from '../auth/auth-model'

export interface AppModel {
  readonly auth: AuthModel
}

export const appModel: AppModel = {
  auth: authModel,
}
