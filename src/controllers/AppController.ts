// controllers/AppController.js
import { BrowserWindow, IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { openFolderDialog, writeJson } from '../electron/utils'
import { REPOSITORIES_FILE } from '../shared/constants'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { app } from '../models/App'

type RepositoryEntry = { name: string; path: string; current: boolean }

export const AppController: IController = {
  prefix: 'app',
  functions: {
    async open(event: IpcMainInvokeEvent) {
      const win = BrowserWindow.fromWebContents(event.sender)
      if (win === null) return ResponseError()

      await openFolderDialog(win)
        .then((selectedDirectory: string) => {
          git.setCWD(selectedDirectory)
          writeJson(REPOSITORIES_FILE, selectedDirectory)
        })
        .catch((error) => {
          console.error('Error opening folder dialog:', String(error))
          return ResponseError()
        })
      return ResponseSuccess()
    },

    async setCWD(_even: IpcMainInvokeEvent, path: string) {
      try {
        git.setCWD(path)
        return ResponseSuccess()
      } catch {
        return ResponseError()
      }
    },

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
