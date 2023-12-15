/**
 * @file utils.ts
 * @brief Utility functions for the application.
 * @author Radim Mifka (xmifka00)
 * @date October 2023
 */

import { ipcMain, IpcMainInvokeEvent, BrowserWindow, dialog } from 'electron'
import { IController } from 'interfaces/IController'
import { readFileSync, existsSync, writeFileSync } from 'fs'

/**
 * Removes duplicate elements from an array.
 * @param arr The array to remove duplicates from.
 * @returns A new array with duplicate elements removed.
 */
function removeDuplicates(arr: any[]): any[] {
  return [...new Set(arr)]
}

/**
 * Creates IPC handlers for the given functions in the controller.
 * @param controller The controller object containing the functions.
 */
export function createIPCHandlers(controller: IController): void {
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
 * Opens a folder dialog and returns the selected folder path.
 * @param win The BrowserWindow to open the dialog on.
 * @returns A Promise that resolves with the selected folder path.
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

/**
 * Creates a JSON file at the specified path with the given data.
 * If the file already exists, it does nothing.
 * @param path The path where the JSON file should be created.
 * @param data The data to be written to the JSON file.
 */
export function createJson(path: string, data: string): void {
  if (!existsSync(path)) {
    try {
      writeFileSync(path, data, 'utf-8')
    } catch (e) {
      alert('Failed to save the file !')
    }
  }
}

/**
 * Writes data to an existing JSON file at the specified path.
 * The data is appended to the existing JSON array, removing any duplicates.
 * @param path The path of the JSON file to write to.
 * @param data The data to be written to the JSON file.
 */
export function writeJson(path: string, data: string): void {
  const ogData = readFileSync(path)
  const json: any[] = JSON.parse(ogData.toString())
  json.push(data)
  writeFileSync(path, JSON.stringify(removeDuplicates(json), null, 2))
}

/**
 * Deletes an item from a JSON file at the specified path.
 * @param path The path of the JSON file to delete from.
 * @param item The item to be deleted from the JSON file.
 */
export function deleteFromJson(path: string, item: string): void {
  const ogData = readFileSync(path)
  const json: any[] = JSON.parse(ogData.toString())
  json.splice(json.indexOf(item), 1)

  writeFileSync(path, JSON.stringify(removeDuplicates(json), null, 2))
}
