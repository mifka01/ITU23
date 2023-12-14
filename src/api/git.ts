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

  discard: (file: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:discard`, file)
  },

  discard_unstaged: (): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:discard_unstaged`)
  },

  rm: (file: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:rm`, file)
  },

  cwd: (): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:cwd`)
  },

  branches: (): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:branches`)
  },

  checkout_branch: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:checkout_branch`, name)
  },

  delete_branch: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:delete_branch`, name)
  },

  getDiff: (path: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:getDiff`, path)

  create_branch: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:create_branch`, name)
  },

  commit_tree: (maxCount: number): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:commit_tree`, maxCount)
  },
}
