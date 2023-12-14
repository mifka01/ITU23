// @file api/log.ts
// @brief
// @author Miroslav Bálek (xbalek02)
// @date October 2023

import { ipcRenderer } from 'electron'
import { Response } from 'shared/response'

export const log = {
  prefix: 'log',

  get: (): Promise<Response> => {
    return ipcRenderer.invoke(`${log.prefix}:get`)
  },
  clear: (): Promise<Response> => {
    return ipcRenderer.invoke(`${log.prefix}:clear`)
  },
  //prbbly not needed
  append: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${log.prefix}:append`, data)
  },
}
