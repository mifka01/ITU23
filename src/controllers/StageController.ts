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
        log.append('COMMAND', `Add file`)
        return true
      } catch (error: any) {
        log.append('ERROR', error)
        return false
      }
    },

    async unstage(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.unstage(file)
        log.append('COMMAND', `Unstage file`)
        return true
      } catch (error: any) {
        console.log(error)
        log.append('ERROR', error)
        return false
      }
    },

    async discard(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.discard(file)
        log.append('COMMAND', `Discard file}`)
        return true
      } catch (error: any) {
        console.log(error)
        log.append('ERROR', error)
        return false
      }
    },

    async rm(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.rm(file)
        log.append('COMMAND', `Remove file}`)
        return true
      } catch (error: any) {
        console.log(error)
        log.append('ERROR', error)
        return false
      }
    },
  },
}
