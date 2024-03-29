/**
 * @file DiffController.ts
 * @brief Represents the MenuController, which is responsible for showing difference in files.
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import { IpcMainInvokeEvent } from 'electron'
import { IController } from 'interfaces/IController'
import { git } from '../models/Git'
import { ResponseSuccess, ResponseError } from '../shared/response.ts'
import { log } from '../models/Log.ts'

/**
 * Represents the processed result od git diff command.
 */
type DiffEntry = { mark: string; line_num: string; line: string }

/**
 * The DiffController object that implements the IController interface.
 */
export const DiffController: IController = {
  prefix: 'git',
  functions: {
    /**
     * Returns processed result of command git diff.
     * @param _ - The IpcMainInvokeEvent object.
     * @param path - Path to the fill where diff will be processed.
     * @returns A ResponseSuccess object if the diff is successful.
     * @returns A ResponseError object if an error occurs.
     */
    async getDiff(_: IpcMainInvokeEvent, path: string) {
      try {
        let input = await git.getDiff(path)

        let res: DiffEntry[] = []
        let result = input.split('\n')
        let from = 0
        let neg = 0
        let previous = 's'
        for (let i = 0; i < result.length; i++) {
          let line = ''

          if (result[i] && result[i][0] === '@') {
            from = parseInt(
              result[i].split(' ')[2].replace(/\D/g, ' ').trim().split(' ')[0],
            )
            previous = 's'
            continue
          } else if (
            result[i] &&
            (result[i][0] == '+' || result[i][0] == '-' || result[i][0] == ' ')
          ) {
            if (result[i][1] === '+' || result[i][1] === '-') {
              continue
            }
          } else {
            continue
          }

          if (result[i][0] === '+') {
            from++
            line = from.toString()
          } else if (result[i][0] === '-') {
            if (previous !== '-') {
              neg = from
            }
            neg++
            line = neg.toString()
          } else {
            if (previous !== 's') from++
            line = from.toString()
          }
          previous = result[i][0]

          const record: DiffEntry = {
            mark: result[i][0],
            line_num: line,
            line: result[i].substring(1) === '' ? ' ' : result[i].substring(1),
          }

          res.push(record)
        }

        log.append('COMMAND',`git diff HEAD ${path}`)
        return ResponseSuccess({ data: res })
      } catch (error: unknown) {
        log.append('ERROR',String(error))
        return ResponseError()
      }
    },
  },
}
