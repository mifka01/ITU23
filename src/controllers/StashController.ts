/**
 * @file components/StashController.ts
 * @brief Stash list controller
 * @author Miroslav Bálek (xbalek02)
 * @date December 2023
 */

import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'

type StashEntry = { message: string; }

/**
 * StashController is responsible for handling stash-related operations.
 */
export const StashController: IController = {
  prefix: 'git',
  functions: {
    /**
     * Retrieves the list of stashes.
     * @param _: IpcMainInvokeEvent - The IPC event object.
     * @returns A response object containing the list of stashes.
     */
    async stashes(_: IpcMainInvokeEvent) {
      try {
        let response = await git.stashes()

        let entries: StashEntry[] = []
        response.all.forEach((entry: StashEntry) => {
          entries.push({ message: entry.message })
        })

        return ResponseSuccess({ stashes: entries })
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Pushes a stash with the specified message.
     * @param _: IpcMainInvokeEvent - The IPC event object.
     * @param message - The message for the stash.
     * @returns A response object indicating the success or failure of the operation.
     */
    async stash_push(_: IpcMainInvokeEvent, message: string) {
      try {
        let response = await git.stash_push(message)

        log.append('COMMAND', `${response}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Applies the stash at the specified index.
     * @param _: IpcMainInvokeEvent - The IPC event object.
     * @param index - The index of the stash to apply.
     * @returns A response object indicating the success or failure of the operation.
     */
    async stash_apply(_: IpcMainInvokeEvent, index: string) {
      try {
        await git.stash_apply(index)
        log.append('COMMAND', `git stash apply stash@{${index}}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Pops the stash at the specified index.
     * @param _: IpcMainInvokeEvent - The IPC event object.
     * @param index - The index of the stash to pop.
     * @returns A response object indicating the success or failure of the operation.
     */
    async stash_pop(_: IpcMainInvokeEvent, index: string) {
      try {
        await git.stash_pop(index)
        log.append('COMMAND', `git stash pop stash@{${index}}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Drops the stash at the specified index.
     * @param _: IpcMainInvokeEvent - The IPC event object.
     * @param index - The index of the stash to drop.
     * @returns A response object indicating the success or failure of the operation.
     */
    async stash_drop(_: IpcMainInvokeEvent, index: string) {
      try {
        await git.stash_drop(index)
        log.append('COMMAND', `git stash drop stash@{${index}}`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },
  },
}
