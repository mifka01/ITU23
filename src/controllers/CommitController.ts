// controllers/CommitController.js
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'

export const CommitController: IController = {
  // TODO
  prefix: 'git',

  functions: {
    async commit(event: IpcMainInvokeEvent, data: string) {
      console.log(event)
      console.log(data)
      return 'response'
    },
  }
}
