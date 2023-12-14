// @file components/Branches.tsx
// @brief Stash list component
// @author Miroslav Bálek (xbalek02)
// @date December 2023

// controllers/BranchController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'

type StashEntry = { message: string; }

export const StashController: IController = {
  prefix: 'git',
  functions: {
    async stashes(_: IpcMainInvokeEvent) {
      try {
        let response = await git.stashes()
            
        let entries: StashEntry[] = []
        response.all.forEach((entry: StashEntry) => {
          entries.push({ message: entry.message})
        })

        return ResponseSuccess({ stashes: entries })
      } catch (error: any) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async stash_push(_: IpcMainInvokeEvent, message: string) {
      try {
        let response = await git.stash_push(message)
 
        log.append('COMMAND', `${response}`)
        return ResponseSuccess()
      } catch (error: any) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async stash_apply(_: IpcMainInvokeEvent, index: string) {
      try {
        await git.stash_apply(index)
        log.append('COMMAND', `git stash apply stash@{${index}}`)
        return ResponseSuccess()
      } catch (error: any) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async stash_pop(_: IpcMainInvokeEvent, index: string) {
      try {
        await git.stash_pop(index)
        log.append('COMMAND', `git stash pop stash@{${index}}`)
        return ResponseSuccess()
      } catch (error: any) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async stash_drop(_: IpcMainInvokeEvent, index: string) {
      try {
        await git.stash_drop(index)
        log.append('COMMAND', `git stash drop stash@{${index}}`)
        return ResponseSuccess()
      } catch (error: any) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },
  },
}
