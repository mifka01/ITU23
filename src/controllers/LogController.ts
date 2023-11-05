// controllers/CommitController.js
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { log } from '../models/Log'

export const LogController: IController = {
  prefix: 'log',

  functions: {
    async get(_: IpcMainInvokeEvent) {
      return log.get()
    },
    async clear(_: IpcMainInvokeEvent) {
      log.clear()
      return log.get()
    },
  },
}
