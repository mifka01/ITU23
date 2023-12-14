// controllers/AppController.js
import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { openFolderDialog } from '../electron/utils'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'

export const AppController: IController = {
  prefix: 'app',

  functions: {
    async open(event: IpcMainInvokeEvent) {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (win === null) return ResponseError()

      await openFolderDialog(win)
        .then((selectedDirectory: string) => {
          git.setCWD(selectedDirectory)
        })
        .catch((error) => {
          console.error('Error opening folder dialog:', String(error))
          return ResponseError()
        })
      return ResponseSuccess()
    },
  },
}
