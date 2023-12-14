// @file utils.ts
// @brief Utility functions for the application.
// @author Radim Mifka (xmifka00)
// @date October 2023

import { ipcMain, IpcMainInvokeEvent, BrowserWindow, dialog } from 'electron'
import { IController } from 'interfaces/IController'
import { readFileSync, existsSync, writeFileSync } from 'fs'

function removeDuplicates(arr: []) {
  return [...new Set(arr)]
}

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

export function createJson(path: string, data: string) {
  if (!existsSync(path)) {
    try {
      writeFileSync(path, data, 'utf-8')
    } catch (e) {
      alert('Failed to save the file !')
    }
  }
}

export function writeJson(path: string, data: string) {
  const ogData = readFileSync(path)
  const json: any = JSON.parse(ogData.toString())
  json.push(data)
  writeFileSync(path, JSON.stringify(removeDuplicates(json), null, 2))
}

export function deleteFromJson(path: string, item: string) {
  const ogData = readFileSync(path)
  const json = JSON.parse(ogData.toString())
  json.splice(json.indexOf(item), 1)

  writeFileSync(path, JSON.stringify(removeDuplicates(json), null, 2))
}
