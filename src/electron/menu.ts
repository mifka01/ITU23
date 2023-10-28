// @file electron/menu.ts
// @brief Menu template
// @author Radim Mifka (xmifka00)
// @date October 2023
import { app, BrowserWindow, Menu } from 'electron'
import { setCWD } from './utils'

export const generateMenu = (win: BrowserWindow) => {
  return Menu.buildFromTemplate([
    {
      label: 'Repository',
      submenu: [
        {
          label: 'New',
          click: () => {
            // Implement the 'New' action here
          },
        },
        {
          label: 'Open',
          click: () => {
            setCWD(win)
          },
        },
        { type: 'separator' },
        {
          label: 'Exit',
          click: () => {
            app.quit() // Exit the application
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
