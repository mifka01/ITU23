// @file api/app.ts
// @brief
// @author Radim Mifka (xmifka00)
// @date October 2023

import { IpcRenderer, ipcRenderer } from 'electron'

export const app = {
  prefix: 'app',

  open: (): Promise<any> => {
    return ipcRenderer.invoke(`${app.prefix}:open`)
  },

  request_refresh: (func: () => void, remove: boolean = false): IpcRenderer => {
    if (remove) {
      return ipcRenderer.removeListener(
        `${app.prefix}:request_refresh`,
        func,
      )
    }
    return ipcRenderer.on(`${app.prefix}:request_refresh`, func)
  },
}
