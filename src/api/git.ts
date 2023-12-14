// @file api/git.ts
// @brief
// @author Radim Mifka (xmifka00), Miroslav Bálek (xbalek02)
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

  create_branch: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:create_branch`, name)
  },

  commit_tree: (maxCount: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:commit_tree`, maxCount)
  },

  stashes: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stashes`, name)
  },

  stash_save: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_save`, name)
  },

  stash_apply: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_apply`, name)
  },

  stash_pop: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_pop`, name)
  },

  stash_drop: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_drop`, name)
  },
}
