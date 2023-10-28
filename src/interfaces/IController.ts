// @file  IController.ts
// @brief Interface for controllers in the application.
// @author Radim Mifka (xmifka00)
// @date October 2023
import { IpcMainInvokeEvent } from 'electron'

export interface IController {
  prefix: string;
  functions: {
    [key: string]: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any>
  }
}

