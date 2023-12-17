/**
 * @file controllers/CommitHistoryController.ts
 * @brief Commit history controller
 * @author Miroslav Bálek (xbalek02)
 * @date December 2023
 */

import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'
import path from 'path'

const HISTORY_MAX_COUNT = 10

type CommitEntry = { message: string; hash: string }
type CommitDetailEntry = {
  message: string
  hash: string
  author_name: string
  author_email: string
  body: string
  refs: string
  date: string
}

type ChangedFileEntry = {
  operation: string
  file: string
  dir: string
}

/**
 * Commit Controller
 */
export const CommitHistoryController: IController = {
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

    /**
     * Retrieves detail of commit specified by hash
     * @param _ The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object containing the commit detail entry.
     *          If an error occurs, a ResponseError object is returned.
     */
    async commit_detail(_: IpcMainInvokeEvent, hash: string) {
      try {
        const response = await git.commit_detail(hash)
        const changedFiles = await git.commit_changed_files(hash)
        let filesArrayNotSorted: ChangedFileEntry[] = []
        let changedFilesArray: ChangedFileEntry[] = []

        if (changedFiles) {
          const lines = changedFiles.trim().split('\n')

          // Extract operation and file paths into an array of objects
          lines.map((line) => {
            const [operation, fullPath] = line.trim().split(/\s+/)
            const file = path.basename(String(fullPath))
            const dir = path.dirname(String(fullPath))
            filesArrayNotSorted.push({
              operation: operation,
              file: file,
              dir: dir,
            })
          })
          changedFilesArray = filesArrayNotSorted
            .slice()
            .sort((a, b) => a.file.localeCompare(b.file))
        }

        let entries: CommitDetailEntry[] = []
        response.all.forEach((entry: CommitDetailEntry) => {
          const parsedDate = new Date(entry.date)

          const formattedDate = parsedDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short',
          })

          entries.push({
            message: entry.message,
            hash: entry.hash,
            author_name: entry.author_name,
            author_email: entry.author_email,
            body: entry.body,
            refs: entry.refs,
            date: formattedDate,
          })
        })

        log.append('COMMAND',`git log -n 1 ${hash}`)
        return ResponseSuccess({
          commit_detail: entries,
          changed_files: changedFilesArray,
        })
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },
  },
}
