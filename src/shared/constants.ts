/**
 * @file constants.ts
 * @brief Contains constants used in the application.
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import path from 'node:path'
import { app } from 'electron'

/**
 * The file path of the repositories JSON file.
 */
export const REPOSITORIES_FILE = path.join(
  app.getPath('userData'),
  'repositories.json',
)
