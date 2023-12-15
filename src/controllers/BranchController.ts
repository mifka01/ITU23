/**
 * @file BranchController.ts
 * @brief Represents the BranchController, which is responsible for managing Git branch operations.
 * @author Radim Mifka (xmifka00)
 * @date October 2023
 */

import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'

/**
 * Represents an entry in the list of Git branches.
 */
type BranchEntry = {
  name: string;
  current: boolean
}

/**
 * The BranchController responsible for managing Git branch operations.
 */
export const BranchController: IController = {
  prefix: 'git',
  functions: {
    /**
     * Retrieves the list of Git branches.
     * @param _: The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object containing the list of branches.
     * @throws ResponseError if an error occurs.
     */
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

    /**
     * Checks out the specified Git branch.
     * @param _: The IpcMainInvokeEvent object.
     * @param name The name of the branch to checkout.
     * @returns A ResponseSuccess object if the branch is checked out successfully.
     * @throws ResponseError if an error occurs.
     */
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

    /**
     * Deletes the specified Git branch.
     * @param _: The IpcMainInvokeEvent object.
     * @param name The name of the branch to delete.
     * @returns A ResponseSuccess object if the branch is deleted successfully.
     * @throws ResponseError if an error occurs.
     */
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

    /**
     * Creates a new Git branch with the specified name.
     * @param _: The IpcMainInvokeEvent object.
     * @param name The name of the branch to create.
     * @returns A ResponseSuccess object if the branch is created successfully.
     * @throws ResponseError if an error occurs.
     */
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
