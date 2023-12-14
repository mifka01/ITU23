// @file IController.ts
// @brief Interface for controllers in the application.
// @author Radim Mifka (xmifka00)
// @date October 2023
import { IpcMainInvokeEvent } from 'electron'
import { Response } from 'shared/response'

export enum ResponseStatus {
  STATUS_SUCCESS = 0,
  STATUS_ERROR,
}

export type Data = {
  status: ResponseStatus
  payload?: {}
}

export interface IController {
  prefix: string
  helpers?: {
    [key: string]: (...args: any[]) => any
  }
  functions: {
    [key: string]: (
      event: IpcMainInvokeEvent,
      ...args: any[]
    ) => Promise<Response>
  }
}
