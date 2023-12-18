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

  type RepositoryEntry = Path & {
    current: boolean
  }
  type Repositories = RepositoryEntry[]

  type FileEntry = Path & {
    status: string
  }
  type Files = FileEntry[]
  type Stage = { not_added: Files; staged: Files }

  type BranchEntry = { name: string; current: boolean }
  type Branches = BranchEntry[]

  type CommitEntry = { message: string; hash: string }
  type CommitHistory = CommitEntry[]

  type StashEntry = { message: string; hash: string }
  type Stashes = StashEntry[]

  type WindowData = { value: string; type: WindowDataType } | undefined

  interface Modal {
    buttons?: {
      text: string
      onClick?: () => void
      className?: string
    }[]
    children?: ReactNode
  }

  type LogMessage = {
    type: string
    time: string
    text: string
  }
  type LogMessages = LogMessage[]

  type Actions =
    | { type: 'SET_REPOSITORIES'; payload: Repositories }
    | { type: 'SET_BRANCHES'; payload: Branches }
    | { type: 'SET_COMMIT_HISTORY'; payload: CommitHistory }
    | { type: 'SET_STASHES'; payload: Stashes }
    | { type: 'SET_STAGE'; payload: Stage }
    | { type: 'SET_MESSAGES'; payload: LogMessages }
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
