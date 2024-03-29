import { app, BrowserWindow, Menu } from 'electron'
import { AppController } from '../controllers/AppController'
import { MenuController } from '../controllers/MenuController'
import { LogController } from '../controllers/LogController'
import { StageController } from '../controllers/StageController'
import { BranchController } from '../controllers/BranchController'
import { DiffController } from '../controllers/DiffController.ts'
import { CommitHistoryController } from '../controllers/CommitHistoryController.ts'
import { StashController } from '../controllers/StashController'
import { createIPCHandlers, createJson } from './utils'
import { generateMenu } from './menu'
import { REPOSITORIES_FILE } from '../shared/constants.ts'
import path from 'node:path'

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.js
// │
process.env.DIST = path.join(__dirname, '../dist')
process.env.VITE_PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public')

let win: BrowserWindow | null

let handlers_registered = false

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']

function createWindow() {
  win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  Menu.setApplicationMenu(generateMenu(win))

  if (!handlers_registered) {
    handlers_registered = true

    createIPCHandlers(AppController)
    createIPCHandlers(MenuController)
    createIPCHandlers(LogController)
    createIPCHandlers(StageController)
    createIPCHandlers(BranchController)
    createIPCHandlers(DiffController)
    createIPCHandlers(CommitHistoryController)
    createIPCHandlers(StashController)
  }

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(process.env.DIST, 'index.html'))
  }

  // create repositories json
  createJson(REPOSITORIES_FILE, '[]')
}

if (!app.requestSingleInstanceLock()) {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
} else {
  app.on('second-instance', () => {
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('browser-window-focus', (_, win) => {
  win.webContents.send('app:request_refresh')
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)
