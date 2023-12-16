/**
 * @file LogController.ts
 * @brief Represents the LogController, which is responsible for log window in app.
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess } from '../shared/response'
import { log } from '../models/Log'

/**
 * The LogController object that implements the IController interface.
 */
export const LogController: IController = {
  prefix: 'log',

  functions: {
    /**
     * Returns log.
     * @param _ - The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object if the pull is successful.
     */
    async get(_: IpcMainInvokeEvent) {
      return ResponseSuccess({ messages: log.get() })
    },

    /**
     * Clears log.
     * @param _ - The IpcMainInvokeEvent object.
     * @returns A ResponseSuccess object if the pull is successful.
     */
    async clear(_: IpcMainInvokeEvent) {
      log.clear()
      return ResponseSuccess({ messages: log.get() })
    },
  },
}
