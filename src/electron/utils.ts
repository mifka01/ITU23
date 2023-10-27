// @file utils.ts
// @brief Utility functions for the application.
// @author Radim Mifka (xmifka00)
// @date October 2023
import { ipcMain, IpcMainInvokeEvent, BrowserWindow, dialog } from 'electron'
import { IController } from 'interfaces/IController'
import { existsSync } from 'fs'
import { join } from 'path'

/**
 * @brief Create IPC handlers for the given functions.
 * @param functions Object with functions to create IPC handlers for.
 */
export function createIPCHandlers(functions: IController) {
  for (const funcName in functions) {
    if (typeof functions[funcName] === 'function') {
      ipcMain.handle(
        funcName,
        async (event: IpcMainInvokeEvent, ...args: any[]) => {
          return functions[funcName](event, ...args)
        },
      )
    }
  }
}

export function openFolderDialog(win: BrowserWindow) {
  dialog
    .showOpenDialog(win, {
      properties: ['openDirectory'],
    })
    .then((result) => {
      if (!result.canceled && result.filePaths.length > 0) {
        const selectedDirectory = result.filePaths[0]

        const gitPath = join(selectedDirectory, '.git')
        if (existsSync(gitPath)) {
          // .git directory exists
          console.log('Selected Directory has a .git directory:', gitPath)
        } else {
          // .git directory does not exist
          console.log(
            'Selected Directory does not have a .git directory:',
            selectedDirectory,
          )
        }
      }
    })
    .catch((err) => {
      console.error('Error opening folder dialog:', err)
    })
}
