// controllers/CommitController.js
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { consoleLog } from '../models/ConsoleLog'

export const ConsoleLogController: IController = {
  prefix: 'consolelog',

  functions: {
    async get(_: IpcMainInvokeEvent) {
      return consoleLog.getLog()
    },
    async clear(_: IpcMainInvokeEvent) {
      consoleLog.clearLog()
      return consoleLog.getLog()
    },
    //prbbly not needed
    async append(_: IpcMainInvokeEvent, data: string) {
      consoleLog.appendLog(data)
      return consoleLog.getLog()
    },
  },
}
