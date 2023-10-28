// @file api/repository.ts
// @brief
// @author Radim Mifka (xmifka00)
// @date October 2023

import { ipcRenderer } from 'electron'

export const repository = {
  prefix: 'repository',

  open: (): Promise<any> => {
    return ipcRenderer.invoke(`${repository.prefix}:open`)
  },
}
