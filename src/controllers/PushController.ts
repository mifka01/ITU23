// controllers/PushController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'

export const PushController: IController = {
  // TODO
  prefix: 'git',

  functions: {
    async push(_: IpcMainInvokeEvent) {
      let statusResponse = await git.push()
      return JSON.parse(JSON.stringify(statusResponse))
    },
  },
}
