// controllers/StageController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { log } from '../models/Log'

export const StageController: IController = {
  prefix: 'git',

  functions: {
    async status(_: IpcMainInvokeEvent) {
      try {
        let response = await git.status()
        // happening too often
        // log.append('COMMAND', `status`)
        return JSON.parse(JSON.stringify(response))
      } catch (error: any) {
        log.append('ERROR', String(error))
      }
    },

    async commit(_: IpcMainInvokeEvent, message: string) {
      try {
        let response = await git.commit(message)

        if (
          !response.summary.changes &&
          !response.summary.deletions &&
          !response.summary.insertions
        ) {
          log.append('COMMAND', `nothing to commit, working tree clean`)
        } else {
          log.append('COMMAND', `Commited`)
        }
      } catch (error: any) {
        log.append('ERROR', String(error))
      }
    },

    async add(_: IpcMainInvokeEvent, file?: string) {
      try {
        await git.add(file)
        log.append('COMMAND', `Added`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },

    async unstage(_: IpcMainInvokeEvent, file?: string) {
      try {
        await git.unstage(file)
        log.append('COMMAND', `Unstaged`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },

    async discard(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.discard(file)
        log.append('COMMAND', `Discard`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },

    async discard_unstaged(_: IpcMainInvokeEvent) {
      try {
        await git.discard_unstaged()
        log.append('COMMAND', `Discard unstaged`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },

    async rm(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.rm(file)
        log.append('COMMAND', `Remove file`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },
  },
}
