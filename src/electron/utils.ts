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
