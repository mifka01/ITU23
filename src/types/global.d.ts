import { ReactNode } from 'react'

enum PreviewDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT = 1,
}

declare global {
  type Path = {
    basename: string
    dirname: string
    path: string
  }

  type PreviewData = { value: string; type: PreviewDataType } | undefined

  type Actions =
    | { type: 'REPOSITORIES_SET' }
    | { type: 'BRANCHES_SET' }
    | { type: 'COMMIT_HISTORY_SET' }
    | { type: 'STASHES_SET' }
    | { type: 'STAGE_SET' }
    | { type: 'SET_CURRENT_FILE'; payload: string }
    | { type: 'RESET_CURRENT_FILE' }
    | { type: 'SET_CURRENT_COMMIT'; payload: string }
    | { type: 'RESET_PREVIEW' }
    | { type: 'REFRESH_COMMIT_HISTORY' }
    | { type: 'REFRESH_BRANCHES' }
    | { type: 'REFRESH_LOG_MESSAGES' }
}
