/**
 * @file GitController.ts
 * @brief Represents the GitController, which is responsible for managing Git operations.
 * @author Radim Mifka (xmifka00)
 * @date October 2023
 */

import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess } from '../shared/response'
import { git } from '../models/Git'

/**
 * Represents the GitController, which is responsible for managing Git operations.
 */
export const GitController: IController = {
  prefix: 'git',
  functions: {
    /**
     * Retrieves the current working directory (CWD) in Git.
     * @param _: The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object containing the current working directory.
     */
    async cwd(_: IpcMainInvokeEvent) {
      return ResponseSuccess(git.getCWD())
    },
  },
}
