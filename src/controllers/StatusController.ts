// controllers/StatusController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { log } from '../models/Log'

export const StatusController: IController = {
  prefix: 'git',

  functions: {
    async status(_: IpcMainInvokeEvent) {
      try {
        let statusResponse = await git.status()
        log.append('COMMAND', `status`)
        return JSON.parse(JSON.stringify(statusResponse))
      } catch (error: any) {
        log.append('COMMAND', error)
      }
    },
  },
}
