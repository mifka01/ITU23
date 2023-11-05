// controllers/StageController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { log } from '../models/Log'

export const StageController: IController = {
  prefix: 'git',

  functions: {
    async add(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.add(file)
        log.append('COMMAND', `Added file}`)
        return true
      } catch (error: any) {
        log.append('ERROR', error)
        return false
      }
    },

    async unstage(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.unstage(file)
        log.append('COMMAND', `Unstaged file}`)
        return true
      } catch (error: any) {
        console.log(error)
        log.append('ERROR', error)
        return false
      }
    },
  },
}
