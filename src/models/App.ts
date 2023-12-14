// @file App.ts
// @brief Main app model
// @author Radim Mifka (xmifka00)
// @date December 2023

import { readFileSync } from 'fs'
import { REPOSITORIES_FILE } from '../shared/constants'
import { deleteFromJson } from '../electron/utils'

export class App {
  async repositories(): Promise<string> {
    return readFileSync(REPOSITORIES_FILE, 'utf-8')
  }

  async delete_repository(path: string, item: string): Promise<void> {
    deleteFromJson(path, item)
  }
}

export const app: App = new App()
