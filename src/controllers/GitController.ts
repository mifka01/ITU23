// controllers/GitController.js
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'

export const GitController: IController = {
  prefix: 'git',
  functions: {
    async cwd(_: IpcMainInvokeEvent) {
      let response = await git.getCWD()
      return response
    },
  }
}
