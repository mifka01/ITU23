// @file api/app.ts
// @brief
// @author Radim Mifka (xmifka00)
// @date October 2023

import { IpcRenderer, ipcRenderer } from 'electron'
import { Response } from 'shared/response'

export const app = {
  prefix: 'app',

  open: (): Promise<Response> => {
    return ipcRenderer.invoke(`${app.prefix}:open`)
  },

  setCWD: (path: string): Promise<Response> => {
    return ipcRenderer.invoke(`${app.prefix}:setCWD`, path)
  },

  request_refresh: (func: () => void, remove: boolean = false): IpcRenderer => {
    if (remove) {
      return ipcRenderer.removeListener(`${app.prefix}:request_refresh`, func)
    }
    return ipcRenderer.on(`${app.prefix}:request_refresh`, func)
  },

  repositories: (): Promise<Response> => {
    return ipcRenderer.invoke(`${app.prefix}:repositories`)
  },
}
