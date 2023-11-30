// controllers/MenuController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { log } from '../models/Log'

export const MenuController: IController = {
  prefix: 'git',

  functions: {
    async pull(_: IpcMainInvokeEvent) {
      try {
        await git.pull()
        log.append('COMMAND', `Succesfully Pulled`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },

    async push(_: IpcMainInvokeEvent) {
      try {
        let response = await git.push()

        if (response.pushed.pop()?.alreadyUpdated)
          log.append('COMMAND', `Everything up-to-date`)
        else log.append('COMMAND', `Pushed to:${response.repo}`)

        response = JSON.parse(JSON.stringify(response))
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },
  },
}
