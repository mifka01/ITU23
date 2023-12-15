// controllers/MenuController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
//import Modal from 'components/Modal'
import { git } from '../models/Git'
import { log } from '../models/Log'

export const MenuController: IController = {
  prefix: 'git',

  functions: {
    async pull(_: IpcMainInvokeEvent) {
      try {
        await git.pull()
        log.append('COMMAND', `Succesfully Pulled`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async push(_: IpcMainInvokeEvent) {
      try {
        const response = await git.push()

        if (response.pushed.pop()?.alreadyUpdated)
          log.append('COMMAND', `Everything up-to-date`)
        else log.append('COMMAND', `Pushed to:${response.repo}`)

        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async revert(_: IpcMainInvokeEvent) {
      const response = await git.revert()

      if(response !== undefined){
        log.append('COMMAND',`Successfully reverted commit "${response}"`)
        return ResponseSuccess()
      }

      log.append('ERROR', 'No existing commits to revert')
      return ResponseError()
    },

    async fetch(_: IpcMainInvokeEvent) {
      try {
        await git.fetch()
        log.append('COMMAND','Successfully fetched')
        return ResponseSuccess()
      }catch (error: unknown){
        log.append('ERROR',String(error))
        return ResponseError()
      }
    },
  },
}
