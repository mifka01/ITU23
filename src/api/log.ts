// @file api/log.ts
// @brief
// @author Miroslav Bálek (xbalek02)
// @date October 2023

import { ipcRenderer } from 'electron'

export const log = {
  prefix: 'log',

  get: (): Promise<any> => {
    return ipcRenderer.invoke(`${log.prefix}:get`)
  },
  clear: (): Promise<any> => {
    return ipcRenderer.invoke(`${log.prefix}:clear`)
  },
  //prbbly not needed
  append: (data: string): Promise<any> => {
    return ipcRenderer.invoke(`${log.prefix}:append`, data)
  },
  listen: () => {
    ipcRenderer.on('event-from-main', (event, eventData) => { })
  },
}
