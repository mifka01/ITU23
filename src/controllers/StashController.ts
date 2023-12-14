// @file components/Branches.tsx
// @brief Stash list component
// @author Miroslav Bálek (xbalek02)
// @date December 2023

// controllers/BranchController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { log } from '../models/Log'

export const StashController: IController = {
  prefix: 'git',
  functions: {
    async stashes(_: IpcMainInvokeEvent) {
      try {
        let response = await git.stashes();
        return JSON.parse(JSON.stringify(response))
      } catch (error: any) {
        log.append('ERROR', String(error))
      }
    },

    async stash_apply(_: IpcMainInvokeEvent, index: string) {
      try {
        await git.stash_apply(index)
        log.append('COMMAND', `git stash apply stash@{${index}}`)
        return true
      } catch (error: any) {
        log.append('ERROR', String(error))
        return false
      }
    },

    async stash_pop(_: IpcMainInvokeEvent, index: string) {
        try {
          await git.stash_pop(index)
          log.append('COMMAND', `git stash pop stash@{${index}}`)
          return true
        } catch (error: any) {
          log.append('ERROR', String(error))
          return false
        }
      },

      async stash_drop(_: IpcMainInvokeEvent, index: string) {
        try {
          await git.stash_drop(index)
          log.append('COMMAND', `git stash apply stash@{${index}}`)
          return true
        } catch (error: any) {
          log.append('ERROR', String(error))
          return false
        }
      },

  },
}
