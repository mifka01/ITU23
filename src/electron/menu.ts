/**
 * @file menu.ts
 * @brief Menu template for the application.
 * @author Radim Mifka (xmifka00)
 * @date October 2023
 */

import { app, BrowserWindow, Menu } from 'electron'
import { openFolderDialog, writeJson } from './utils'
import { REPOSITORIES_FILE } from '../shared/constants'
import { git } from '../models/Git'

export const generateMenu = (win: BrowserWindow) => {
  return Menu.buildFromTemplate([
    {
      label: 'Repository',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            openFolderDialog(win)
              .then((selectedDirectory: string | undefined) => {
                if (!selectedDirectory) return
                git.setCWD(selectedDirectory)
                writeJson(REPOSITORIES_FILE, selectedDirectory)
                win.reload()
              })
              .catch((err) => {
                console.error('Error opening folder dialog:', err)
              })
          },
        },
        {
          label: 'Refresh',
          accelerator: 'CmdOrCtrl+R',
          click() {
            win.reload()
          },
        },
        { type: 'separator' },
        {
          label: 'Exit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit()
          },
        },
      ],
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Devtools',
          click: () => {
            win.webContents.openDevTools()
          },
        },
      ],
    },
  ])
}
