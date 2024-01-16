import { ReactNode } from 'react'
export {}

enum WindowDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT = 1,
}

declare global {
  type Path = {
    basename: string
    dirname: string
    path: string
  }

  type WindowData = { value: string; type: WindowDataType } | undefined

  interface Modal {
    buttons?: {
      text: string
      onClick?: () => void
      className?: string
    }[]
    children?: ReactNode
  }

  type Actions =
    | { type: 'REPOSITORIES_SET' }
    | { type: 'BRANCHES_SET' }
    | { type: 'COMMIT_HISTORY_SET' }
    | { type: 'STASHES_SET' }
    | { type: 'STAGE_SET' }
    | { type: 'SET_CURRENT_FILE'; payload: string }
    | { type: 'RESET_CURRENT_FILE' }
    | { type: 'SET_CURRENT_COMMIT'; payload: string }
    | { type: 'RESET_CURRENT_COMMIT' }
    | { type: 'REFRESH_COMMIT_HISTORY' }
    | { type: 'REFRESH_BRANCHES' }
    | { type: 'REFRESH_LOG_MESSAGES' }
    | { type: 'SET_MODAL'; payload: Modal }
    | { type: 'CLOSE_MODAL' }
}
