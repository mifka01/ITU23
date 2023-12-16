/**
 * @file AppController.ts
 * @brief Represents the AppController, which is responsible for managing app operations.
 * @author Radim Mifka (xmifka00)
 * @date October 2023
 */

import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { openFolderDialog, writeJson } from '../electron/utils'
import { REPOSITORIES_FILE } from '../shared/constants'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { app } from '../models/App'

type RepositoryEntry = { name: string; path: string; current: boolean }

/**
 * AppController is an object that defines the controller for the 'app' prefix.
 * It contains various functions related to app operations.
 */
export const AppController: IController = {
  prefix: 'app',
  functions: {
    /**
     * Opens a folder dialog to select a directory and sets it as the current working directory.
     * @param event - The event object for the IPC communication.
     * @returns A response indicating success or error.
     */
    async open(event: IpcMainInvokeEvent) {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (win === null) return ResponseError()

      await openFolderDialog(win)
        .then((selectedDirectory: string | undefined) => {
          if (selectedDirectory) {
            git.setCWD(selectedDirectory)
            writeJson(REPOSITORIES_FILE, selectedDirectory)
          } else {
            return ResponseError()
          }
        })
        .catch((error) => {
          console.error('Error opening folder dialog:', String(error))
          return ResponseError()
        })
      return ResponseSuccess()
    },

    /**
     * Sets the current working directory to the specified path.
     * @param _ - The event object for the IPC communication.
     * @param path - The path of the directory to set as the current working directory.
     * @returns A response indicating success or error.
     */
    async setCWD(_: IpcMainInvokeEvent, path: string) {
      try {
        await git.setCWD(path)
        return ResponseSuccess()
      } catch {
        return ResponseError()
      }
    },

    /**
     * Retrieves the list of repositories and their details.
     * @param _ - The event object for the IPC communication.
     * @returns A response containing the list of repositories.
     */
    async repositories(_: IpcMainInvokeEvent) {
      try {
        const response = JSON.parse(await app.repositories())

        let entries: RepositoryEntry[] = []
        let current = git.getCWD()

        for (let path of response) {
          const entry: RepositoryEntry = {
            name: path.split('/').pop(),
            path: path.slice(0, path.lastIndexOf('/')),
            current: path == current,
          }
          entries.push(entry)
        }

        return ResponseSuccess({ repositories: entries })
      } catch (error: unknown) {
        console.log(error)
        return ResponseError()
      }
    },

    /**
     * Deletes a repository from the list of repositories.
     * @param _ - The event object for the IPC communication.
     * @param path - The path of the repository to delete.
     * @returns A response indicating success or error.
     */
    async delete_repository(_: IpcMainInvokeEvent, path: string) {
      try {
        await app.delete_repository(REPOSITORIES_FILE, path)
        return ResponseSuccess()
      } catch (error: unknown) {
        console.log(error)
        return ResponseError()
      }
    },
  },
}
