// controllers/GitController.js
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess } from '../shared/response'
import { git } from '../models/Git'

export const GitController: IController = {
  prefix: 'git',
  functions: {
    async cwd(_: IpcMainInvokeEvent) {
      return ResponseSuccess(git.getCWD())
    },
  },
}
