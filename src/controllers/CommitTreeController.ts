// @file components/Branches.tsx
// @brief Stash list component
// @author Miroslav Bálek (xbalek02)
// @date December 2023

// controllers/CommitTreeController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'

const HISTORY_MAX_COUNT = 7

type CommitEntry = { message: string; hash: string }

export const CommitTreeController: IController = {
  prefix: 'git',
  functions: {
    async commit_tree(_: IpcMainInvokeEvent) {
      try {
        let response = await git.commit_tree(HISTORY_MAX_COUNT)

        let entries: CommitEntry[] = []
        response.all.forEach((entry: CommitEntry) => {
          entries.push({ message: entry.message, hash: entry.hash })
        })

        return ResponseSuccess({ commit_tree: entries })
      } catch (error: any) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },
  },
}
