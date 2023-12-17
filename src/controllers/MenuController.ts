/**
 * @file MenuController.ts
 * @brief Represents the MenuController, which is responsible for logic of buttons in menu.
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'

/**
 * The MenuController object that implements the IController interface.
 */
export const MenuController: IController = {
  prefix: 'git',

  functions: {
    /**
     * Pull from git all changes into local branch.
     * @param _ - The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object if the pull is successful.
     * @returns A ResponseError object if an error occurs.
     */
    async pull(_: IpcMainInvokeEvent) {
      try {
        await git.pull()
        log.append('COMMAND', `Succesfully Pulled`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Push all local commits into remote branch.
     * @param _ - The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object if the push is successful.
     * @returns A ResponseError object if an error occurs.
     */
    async push(_: IpcMainInvokeEvent) {
      try {
        const response = await git.push()

        if (response.pushed.pop()?.alreadyUpdated)
          log.append('COMMAND', `Everything up-to-date`)
        else log.append('COMMAND', `Pushed to:${response.repo}`)

        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    /**
     * Reverts last commit.
     * @param _ - The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object if the revert is successful.
     * @returns A ResponseError object if an error occurs.
     */
    async revert(_: IpcMainInvokeEvent) {
      const response = await git.revert()

      if(response !== undefined){
        log.append('COMMAND',`Successfully reverted commit "${response}"`)
        return ResponseSuccess()
      }

      log.append('ERROR', 'No existing commits to revert or uncommited changes.')
      return ResponseError()
    },

    /**
     * Fetch all remote branches into local branches.
     * @param _ - The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object if the fetch is successful.
     * @returns A ResponseError object if an error occurs.
     */
    async fetch(_: IpcMainInvokeEvent) {
      try {
        await git.fetch()
        log.append('COMMAND','Successfully fetched')
        return ResponseSuccess()
      }catch (error: unknown){
        log.append('ERROR',String(error))
        return ResponseError()
      }
    },

    /**
     * Renames last commit.
     * @param _ - The IpcMainInvokeEvent object.
     * @param message - New commit message.
     * @returns A ResponseSuccess object if the revert is successful.
     * @returns A ResponseError object if an error occurs.
     */
    async amend(_: IpcMainInvokeEvent, message: string) {
      try {
        await git.amend(message)
        log.append('COMMAND','Successfully renamed last commit')
        return ResponseSuccess()
      }catch (error: unknown){
        log.append('ERROR','Cant rename commit. Only non-pushed commit can be renamed.')
        return ResponseError()
      }
    },
  },
}
