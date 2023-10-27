import { IpcMainInvokeEvent } from 'electron'

export interface IController {
  [key: string]: (event: IpcMainInvokeEvent, ...args: any[]) => Promise<any>
}
