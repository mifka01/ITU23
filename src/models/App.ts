/**
 * @file App.ts
 * @brief Represents the App class, which is responsible for operations with repository.
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import { readFileSync, existsSync } from 'fs'
import { REPOSITORIES_FILE } from '../shared/constants'
import { deleteFromJson } from '../electron/utils'

export class App {
  /**
   * Retrieves the contents of the repositories file.
   * @returns A Promise that resolves to a string containing the contents of the repositories file.
   */
  async repositories(): Promise<string> {
    return readFileSync(REPOSITORIES_FILE, 'utf-8')
  }

  get_last_repository(): string {
    if (!existsSync(REPOSITORIES_FILE)) return ''
    const repos = JSON.parse(readFileSync(REPOSITORIES_FILE, 'utf-8'))

    if (repos) return repos[0]
    return ''
  }

  /**
   * Deletes a repository from the JSON file at the specified path.
   * @param path - The path to the JSON file.
   * @param item - The item to delete from the JSON file.
   * @returns A Promise that resolves when the repository is successfully deleted.
   */
  async delete_repository(path: string, item: string): Promise<void> {
    deleteFromJson(path, item)
  }
}

/**
 * An instance of the App class.
 */
export const app: App = new App()
