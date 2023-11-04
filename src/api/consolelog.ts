// @file api/consolelog.ts
// @brief
// @author Miroslav Bálek (xbalek02)
// @date October 2023

import { ipcRenderer } from 'electron'

export const consolelog = {
  prefix: 'consolelog',

  get: (): Promise<any> => {
    return ipcRenderer.invoke(`${consolelog.prefix}:get`)
  },
  clear: (): Promise<any> => {
    return ipcRenderer.invoke(`${consolelog.prefix}:clear`)
  },
  //prbbly not needed
  append: (data: string): Promise<any> => {
    return ipcRenderer.invoke(`${consolelog.prefix}:append`, data)
  },
  listen: () => {
    ipcRenderer.on('event-from-main', (event, eventData) => {})
  },
}
