// @file api/git.ts
// @brief
// @author Radim Mifka (xmifka00)
// @date October 2023

// TODO
// rename?
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

  cwd: (): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:cwd`)
  },
}
