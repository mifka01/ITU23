/**
 * @file controllers/CommitTreeController.ts
 * @brief Commit tree controller
 * @author Miroslav Bálek (xbalek02)
 * @date December 2023
 */

import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'

const HISTORY_MAX_COUNT = 50

type CommitEntry = { message: string; hash: string }

/**
 * Commit Tree Controller
 */
export const CommitTreeController: IController = {
  prefix: 'git',
  functions: {
    /**
     * Retrieves the commit tree.
     * @param _ The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object containing the commit tree entries.
     *          If an error occurs, a ResponseError object is returned.
     */
    async commit_tree(_: IpcMainInvokeEvent) {
      try {
        const response = await git.commit_tree(HISTORY_MAX_COUNT)

        let entries: CommitEntry[] = []
        response.all.forEach((entry: CommitEntry) => {
          entries.push({ message: entry.message, hash: entry.hash })
        })

        return ResponseSuccess({ commit_tree: entries })
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },
  },
}
