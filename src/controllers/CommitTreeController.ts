// @file components/Branches.tsx
// @brief Stash list component
// @author Miroslav Bálek (xbalek02)
// @date December 2023

// controllers/CommitTreeController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { log } from '../models/Log'

export const CommitTreeController: IController = {
  prefix: 'git',
  functions: {
    async commit_tree(_: IpcMainInvokeEvent) {
      try {
        //TOOD: magic number + idk if this is the right place to set it
        let response = await git.commit_tree('7')
        return JSON.parse(JSON.stringify(response))
      } catch (error: any) {
        log.append('ERROR', String(error))
      }
    },
  },
}
