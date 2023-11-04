// controllers/PushController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { consoleLog } from '../models/ConsoleLog'

export const PushController: IController = {
  // TODO
  prefix: 'git',

  functions: {
    async push(_: IpcMainInvokeEvent) {
      try {
        let statusResponse = await git.push()
        statusResponse = JSON.parse(JSON.stringify(statusResponse))
        consoleLog.appendLog(JSON.stringify(statusResponse))
        return true
      } catch (error) {
        consoleLog.appendLog(<string>error)
        return false
      }
    },
  },
}
