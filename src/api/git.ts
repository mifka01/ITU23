// @file api/git.ts
// @brief
// @author Radim Mifka (xmifka00)
// @date October 2023

import { ipcRenderer } from 'electron'

export const git = {
  prefix: 'git',

  commit: (data: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:commit`, data)
  },

  status: (data: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:status`, data)
  },

  push: (data: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:push`, data)
  },

  pull: (data: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:pull`, data)
  },

  add: (file: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:add`, file)
  },

  unstage: (file: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:unstage`, file)
  },

  cwd: (): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:cwd`)
  },
}
