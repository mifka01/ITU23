// @file api/git.ts
// @brief
// @author Radim Mifka (xmifka00)
// @date October 2023

// TODO
// rename?
import { ipcRenderer } from 'electron'

export const git = {
  commit(data: string) {
    return ipcRenderer.invoke('commit', data)
  },

  status(data: string) {
    return ipcRenderer.invoke('status', data)
  },

  cwd() {
    return ipcRenderer.invoke('cwd')
  },
}
