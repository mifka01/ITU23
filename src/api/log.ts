/**
 * @file api/log.ts
 * @brief API for the Log object.
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import { ipcRenderer } from 'electron'
import { Response } from 'shared/response'

/**
 * Represents a logging utility.
 */
export const log = {
  prefix: 'log',

  /**
   * Retrieves the log data.
   * @returns A promise that resolves to the log data.
   */
  get: (): Promise<Response> => {
    return ipcRenderer.invoke(`${log.prefix}:get`)
  },

  /**
   * Clears the log data.
   * @returns A promise that resolves when the log data is cleared.
   */
  clear: (): Promise<Response> => {
    return ipcRenderer.invoke(`${log.prefix}:clear`)
  },

  /**
   * Appends data to the log.
   * @param data - The data to append to the log.
   * @returns A promise that resolves when the data is appended to the log.
   */
  append: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${log.prefix}:append`, data)
  },
}
