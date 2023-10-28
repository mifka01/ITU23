// @file utils.ts
// @brief Utility functions for the application.
// @author Radim Mifka (xmifka00)
// @date October 2023
import { ipcMain, IpcMainInvokeEvent, BrowserWindow, dialog } from 'electron'
import { IController } from 'interfaces/IController'

/**
 * @brief Create IPC handlers for the given functions.
 * @param functions Object with functions to create IPC handlers for.
 */
export function createIPCHandlers(controller: IController) {
  for (const funcName in controller.functions) {
    if (typeof controller.functions[funcName] === 'function') {
      ipcMain.handle(
        `${controller.prefix}:${funcName}`,
        async (event: IpcMainInvokeEvent, ...args: any[]) => {
          return controller.functions[funcName](event, ...args)
        },
      )
    }
  }
}

/**
 * @brief Open file dialog and return selected file path.
 * @param win BrowserWindow to open the dialog on.
 */
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
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}
