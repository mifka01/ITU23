// controllers/LogController.ts
//
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess } from '../shared/response'
import { log } from '../models/Log'

export const LogController: IController = {
  prefix: 'log',

  functions: {
    async get(_: IpcMainInvokeEvent) {
      return ResponseSuccess({ messages: log.get() })
    },
    async clear(_: IpcMainInvokeEvent) {
      log.clear()
      return ResponseSuccess({ messages: log.get() })
    },
  },
}
