// @file App.ts
// @brief Main app model
// @author Radim Mifka (xmifka00)
// @date December 2023

import { readFileSync } from 'fs'
import { REPOSITORIES_FILE } from '../shared/constants'

export class App {
  async repositories(): Promise<string> {
    const response = readFileSync(REPOSITORIES_FILE, 'utf-8')
    return response
  }
}

export const app: App = new App()
