// controllers/CommitController.js
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'

export const StatusController: IController = {
  async status(_: IpcMainInvokeEvent) {
    let statusResponse = await git.status()
    return JSON.parse(JSON.stringify(statusResponse))
  },
}
