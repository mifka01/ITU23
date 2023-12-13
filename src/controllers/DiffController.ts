// controllers/DiffController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'

export const DiffController: IController = {
    prefix: 'git',
    functions: {
        async getDiff(_: IpcMainInvokeEvent, path: string) {
            return git.getDiff(path)
        },
    },
}
