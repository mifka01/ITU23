/**
 * @file StageController.ts
 * @brief Represents the StageController, which is responsible for managing the staging area in Git.
 * @author Radim Mifka (xmifka00)
 * @date October 2023
 */

/**
 * Represents the StageController, which is responsible for managing the staging area in Git.
 */
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'
import path from 'node:path'

/**
 * Represents the result of the Git status command.
 */
type StatusResult = {
  not_added: string[]
  deleted: string[]
  created: string[]
  files: { path: string }[]
}

/**
 * The StageController object that implements the IController interface.
 */
export const StageController: IController = {
  prefix: 'git',

  helpers: {
    /**
     * Gets the status letter for a given basename based on the input object.
     * @param basename - The name of the file.
     * @param inputObject - The input object containing the status information.
     * @returns The status letter for the file.
     */
    getStatusLetter(file_path: string, inputObject: StatusResult) {
      if (inputObject.not_added.includes(file_path)) {
        return 'U'
      } else if (inputObject.deleted.includes(file_path)) {
        return 'D'
      } else if (inputObject.created.includes(file_path)) {
        return 'A'
      }
      return 'M'
    },
  },

  functions: {
    /**
     * Retrieves the Git status.
     * @param _ - The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object containing the status information.
     * @throws A ResponseError object if an error occurs.
     */
    async status(_: IpcMainInvokeEvent) {
      type FileEntry = {
        basename: string
        dirname: string
        path: string
        status: string
      }
      try {
        const response = await git.status()

        let staged_files: FileEntry[] = []
        let not_added: FileEntry[] = []

        response.files.forEach((file: { path: string }) => {
          const entry: FileEntry = {
            basename: path.basename(file.path),
            dirname: path.dirname(file.path),
            path: file.path,
            status: StageController.helpers?.getStatusLetter(
              file.path,
              response,
            ),
          }

          if (response.staged.includes(file.path)) staged_files.push(entry)
          else not_added.push(entry)
        })

        return ResponseSuccess({
          not_added: not_added,
          staged: staged_files,
        })
      } catch (error: unknown) {
        return ResponseError()
      }
    },

    /**
     * Commits the changes with the specified message.
     * @param _ - The IpcMainInvokeEvent object.
     * @param message - The commit message.
     * @returns A ResponseSuccess object if the commit is successful.
     * @throws A ResponseError object if an error occurs.
     */
    async commit(_: IpcMainInvokeEvent, message: string) {
      try {
        const response = await git.commit(message)

        if (
          !response.summary.changes &&
          !response.summary.deletions &&
          !response.summary.insertions
        ) {
          log.append('ERROR', `Nothing to commit, working tree clean`)
        } else {
          log.append(
            'COMMAND',
            `git commit -m "${message}" - Successfully commited`,
          )
        }
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Adds a file to the staging area.
     * @param _ - The IpcMainInvokeEvent object.
     * @param file - The file to be added. If not specified, all files will be added.
     * @returns A ResponseSuccess object if the file is successfully added.
     * @throws A ResponseError object if an error occurs.
     */
    async add(_: IpcMainInvokeEvent, file?: string) {
      try {
        await git.add(file)
        log.append('COMMAND', `git add ${file}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Unstages a file from the staging area.
     * @param _ - The IpcMainInvokeEvent object.
     * @param file - The file to be unstaged. If not specified, all files will be unstaged.
     * @returns A ResponseSuccess object if the file is successfully unstaged.
     * @throws A ResponseError object if an error occurs.
     */
    async unstage(_: IpcMainInvokeEvent, file?: string) {
      try {
        await git.unstage(file)
        log.append('COMMAND', `git reset ${file}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Discards the changes made to a file.
     * @param _ - The IpcMainInvokeEvent object.
     * @param file - The file to be discarded.
     * @returns A ResponseSuccess object if the file changes are successfully discarded.
     * @throws A ResponseError object if an error occurs.
     */
    async discard(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.discard(file)
        log.append('COMMAND', `git reset ${file}`)
        log.append('COMMAND', `git checkout HEAD -f -- ${file}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Discards all unstaged changes.
     * @param _ - The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object if the unstaged changes are successfully discarded.
     * @throws A ResponseError object if an error occurs.
     */
    async discard_unstaged(_: IpcMainInvokeEvent) {
      try {
        await git.discard_unstaged()
        log.append('COMMAND', `git stash push --keep-index --include untracked`)
        log.append('COMMAND', `git stash drop 0`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Removes a file from the repository.
     * @param _ - The IpcMainInvokeEvent object.
     * @param file - The file to be removed.
     * @returns A ResponseSuccess object if the file is successfully removed.
     * @throws A ResponseError object if an error occurs.
     */
    async rm(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.rm(file)
        log.append('COMMAND', `git reset ${file}`)
        log.append('COMMAND', `git clean -f -- ${file}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },
  },
}
