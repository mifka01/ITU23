// controllers/StageController.ts
import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { ResponseSuccess, ResponseError } from '../shared/response'
import { git } from '../models/Git'
import { log } from '../models/Log'

type StatusResult = {
  not_added: string[]
  deleted: string[]
  created: string[]
  files: { path: string }[]
}

export const StageController: IController = {
  prefix: 'git',

  helpers: {
    getStatusLetter(filename: string, inputObject: StatusResult) {
      if (inputObject.not_added.includes(filename)) {
        return 'U'
      } else if (inputObject.deleted.includes(filename)) {
        return 'D'
      } else if (inputObject.created.includes(filename)) {
        return 'A'
      }
      return 'M'
    },
  },

  functions: {
    async status(_: IpcMainInvokeEvent) {
      type FileEntry = { path: string; status: string }

      try {
        const response = await git.status()

        let staged_files: FileEntry[] = []
        let not_added: FileEntry[] = []

        response.files.forEach((file: { path: string }) => {
          const entry: FileEntry = {
            path: file.path,
            status: StageController.helpers?.getStatusLetter(
              file.path,
              response,
            ),
          }

          if (response.staged.includes(file.path)) staged_files.push(entry)
          else not_added.push(entry)
        })

        return ResponseSuccess({ not_added: not_added, staged: staged_files })
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async commit(_: IpcMainInvokeEvent, message: string) {
      try {
        const response = await git.commit(message)

        if (
          !response.summary.changes &&
          !response.summary.deletions &&
          !response.summary.insertions
        ) {
          log.append('COMMAND', `nothing to commit, working tree clean`)
        } else {
          log.append('COMMAND', `Commited`)
        }
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async add(_: IpcMainInvokeEvent, file?: string) {
      try {
        await git.add(file)
        log.append('COMMAND', `Added`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async unstage(_: IpcMainInvokeEvent, file?: string) {
      try {
        await git.unstage(file)
        log.append('COMMAND', `Unstaged`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async discard(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.discard(file)
        log.append('COMMAND', `Discard`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async discard_unstaged(_: IpcMainInvokeEvent) {
      try {
        await git.discard_unstaged()
        log.append('COMMAND', `Discard unstaged`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },

    async rm(_: IpcMainInvokeEvent, file: string) {
      try {
        await git.rm(file)
        log.append('COMMAND', `Remove file`)
        return ResponseSuccess()
      } catch (error: unknown) {
        log.append('ERROR', String(error))
        return ResponseError()
      }
    },
  },
}
