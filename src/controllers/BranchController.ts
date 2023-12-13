// controllers/BranchController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { log } from '../models/Log'

export const BranchController: IController = {
  prefix: 'git',
  functions: {
    async branches(_: IpcMainInvokeEvent) {
      try {
        let response = await git.branches()
        // happening too often
        // log.append('COMMAND', `git branch`)
        return JSON.parse(JSON.stringify(response))
      } catch (error: any) {
        log.append('ERROR', String(error))
      }
    },

    async checkout_branch(_: IpcMainInvokeEvent, name: string) {
      try {
        await git.checkout_branch(name)
        log.append('COMMAND', `git checkout ${name}`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },

    async delete_branch(_: IpcMainInvokeEvent, name: string) {
      try {
        await git.delete_branch(name)
        log.append('COMMAND', `git branch -d ${name}`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },

    async create_branch(_: IpcMainInvokeEvent, name: string) {
      try {
        await git.create_branch(name)
        log.append('COMMAND', `git checkout -b ${name}`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },
  },
}
