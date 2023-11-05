// controllers/PushController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { log } from '../models/Log'

export const PushController: IController = {
  // TODO
  prefix: 'git',

  functions: {
    async push(_: IpcMainInvokeEvent) {
      try {
        let response = await git.push()
        log.append('COMMAND', `Pushed to:${response.repo}`)
        response = JSON.parse(JSON.stringify(response))
        return true
      } catch (error: any) {
        log.append('ERROR', error)
        return false
      }
    },
  },
}
