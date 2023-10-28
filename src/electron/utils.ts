// @file utils.ts
// @brief Utility functions for the application.
// @author Radim Mifka (xmifka00)
// @date October 2023
import { ipcMain, IpcMainInvokeEvent, BrowserWindow, dialog } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'

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

export function openFolderDialog(win: BrowserWindow): Promise<string> {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog(win, {
        properties: ['openDirectory'],
      })
      .then((result) => {
        if (!result.canceled && result.filePaths.length > 0) {
          const selectedDirectory = result.filePaths[0]
          resolve(selectedDirectory)
        } else {
          reject(new Error('No folder selected or dialog canceled.'))
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export function setCWD(win: BrowserWindow) {
  openFolderDialog(win)
    .then((selectedDirectory: string) => {
      git.setCWD(selectedDirectory)
      win.reload()
    })
    .catch((err) => {
      console.error('Error opening folder dialog:', err)
    })
}
