/**
 * @file api/app.ts
 * @brief API for the application object.
 * @author Radim Mifka (xmifka00)
 * @date November 2023
 */

import { IpcRenderer, ipcRenderer } from 'electron'
import { Response } from 'shared/response'

/**
 * Represents the application object.
 */
export const app = {
  prefix: 'app',

  /**
   * Opens the folder select dialog window.
   * @returns A promise that resolves to a response.
   */
  open: (): Promise<Response> => {
    return ipcRenderer.invoke(`${app.prefix}:open`)
  },

  /**
   * Sets the current working directory.
   * @param path - The path of the directory to set as the current working directory.
   * @returns A promise that resolves to a response.
   */
  setCWD: (path: string): Promise<Response> => {
    return ipcRenderer.invoke(`${app.prefix}:setCWD`, path)
  },

  /**
   * Registers a listener for the "request_refresh" event.
   * @param func - The function to be called when the event is triggered.
   * @param remove - Specifies whether to remove the listener after it is called once. Default is false.
   * @returns The IpcRenderer object for chaining.
   */
  request_refresh: (func: () => void, remove: boolean = false): IpcRenderer => {
    if (remove) {
      return ipcRenderer.removeListener(`${app.prefix}:request_refresh`, func)
    }
    return ipcRenderer.on(`${app.prefix}:request_refresh`, func)
  },

  /**
   * Retrieves the list of repositories.
   * @returns A promise that resolves to a response.
   */
  repositories: (): Promise<Response> => {
    return ipcRenderer.invoke(`${app.prefix}:repositories`)
  },

  /**
   * Deletes a repository.
   * @param path - The path of the repository to delete.
   * @returns A promise that resolves to a response.
   */
  delete_repository: (path: string): Promise<Response> => {
    return ipcRenderer.invoke(`${app.prefix}:delete_repository`, path)
  },
}
