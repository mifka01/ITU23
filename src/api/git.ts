// @file api/git.ts
// @brief
// @author Radim Mifka (xmifka00), Miroslav Bálek (xbalek02)
// @date October 2023

import { ipcRenderer } from 'electron'
import { Response } from 'shared/response'

export const git = {
  prefix: 'git',

  commit: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:commit`, data)
  },

  status: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:status`, data)
  },

  push: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:push`, data)
  },

  pull: (data: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:pull`, data)
  },

  add: (file: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:add`, file)
  },

  unstage: (file: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:unstage`, file)
  },

  discard: (file: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:discard`, file)
  },

  discard_unstaged: (): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:discard_unstaged`)
  },

  rm: (file: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:rm`, file)
  },

  cwd: (): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:cwd`)
  },

  branches: (): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:branches`)
  },

  checkout_branch: (name: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:checkout_branch`, name)
  },

  delete_branch: (name: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:delete_branch`, name)
  },

  getDiff: (path: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:getDiff`, path)
  },

  create_branch: (name: string): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:create_branch`, name)
  },

  commit_tree: (maxCount: number): Promise<Response> => {
    return ipcRenderer.invoke(`${git.prefix}:commit_tree`, maxCount)
  },

  stashes: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stashes`, name)
  },

  stash_push: (name: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_push`, name)
  },

  stash_apply: (hash: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_apply`, hash)
  },

  stash_pop: (hash: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_pop`, hash)
  },

  stash_drop: (hash: string): Promise<any> => {
    return ipcRenderer.invoke(`${git.prefix}:stash_drop`, hash)
  },

  revert: (): Promise<any> => {
    console.log("revert git.ts")
    return ipcRenderer.invoke(`${git.prefix}:revert`)
  },
}
