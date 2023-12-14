// controllers/BranchController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'

type BranchEntry = { name: string; current: boolean }

export const BranchController: IController = {
  prefix: 'git',
  functions: {
    async branches(_: IpcMainInvokeEvent) {
      try {
        const response = await git.branches()

        let entries: BranchEntry[] = []
        let current = response.current

        response.all.forEach((branch_name: string) => {
          const entry: BranchEntry = {
            name: branch_name,
            current: branch_name == current,
          }
          entries.push(entry)
        })

        return ResponseSuccess({ branches: entries })
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async checkout_branch(_: IpcMainInvokeEvent, name: string) {
      try {
        await git.checkout_branch(name)
        log.append('COMMAND', `git checkout ${name}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async delete_branch(_: IpcMainInvokeEvent, name: string) {
      try {
        await git.delete_branch(name)
        log.append('COMMAND', `git branch -d ${name}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async create_branch(_: IpcMainInvokeEvent, name: string) {
      try {
        await git.create_branch(name)
        log.append('COMMAND', `git checkout -b ${name}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },
  },
}
