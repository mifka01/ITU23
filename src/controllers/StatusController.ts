// controllers/CommitController.js
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'

export const StatusController: IController = {
  prefix: "git",

  functions: {
    async status(_: IpcMainInvokeEvent) {
      let statusResponse = await git.status()
      return JSON.parse(JSON.stringify(statusResponse))
    },
  }
}
