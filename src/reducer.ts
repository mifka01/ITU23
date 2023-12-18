type State = {
  repositories: Repositories
  branches: Branches
  commitHistory: CommitHistory
  stashes: Stashes
  stage: Stage
  messages: LogMessages
  windowData: WindowData
  modal: Modal | undefined
  refreshBranches: number
  refreshCommitHistory: number
  refreshStashes: number
  refreshStage: number
  refreshMessages: number
}

export const initialState: State = {
  repositories: [],
  branches: [],
  commitHistory: [],
  stashes: [],
  stage: { staged: [], not_added: [] },
  messages: [],
  windowData: undefined,
  modal: undefined,
  refreshBranches: 0,
  refreshCommitHistory: 0,
  refreshStashes: 0,
  refreshStage: 0,
  refreshMessages: 0,
}

// fetch_repos -> branches, stashes
// fetch_branches -> stage
// fetch_stage -> commitHistory
//

enum WindowDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT = 1,
}

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'SET_REPOSITORIES':
      return {
        ...state,
        repositories: action.payload,
        refreshBranches: state.refreshBranches + 1,
        refreshStashes: state.refreshStashes + 1,
      }
    case 'SET_BRANCHES':
      return {
        ...state,
        branches: action.payload,
        refreshStage: state.refreshStage + 1,
      }
    case 'SET_COMMIT_HISTORY':
      return { ...state, commitHistory: action.payload }
    case 'SET_STASHES':
      return {
        ...state,
        stashes: action.payload,
        refreshMessages: state.refreshMessages + 1,
      }
    case 'SET_STAGE':
      const isWindowDataReset =
        !action.payload.not_added.some(
          (entry: FileEntry) => entry.path === state.windowData?.value,
        ) || state.windowData?.type === WindowDataType.TYPE_COMMIT

      return {
        ...state,
        stage: action.payload,
        refreshCommitHistory: state.refreshCommitHistory + 1,
        refreshMessages: state.refreshMessages + 1,
        windowData: isWindowDataReset ? undefined : state.windowData,
      }
    case 'SET_MESSAGES':
      return { ...state, messages: action.payload }
    case 'SET_CURRENT_FILE':
      return {
        ...state,
        windowData: { value: action.payload, type: WindowDataType.TYPE_FILE },
      }
    case 'SET_CURRENT_COMMIT':
      return {
        ...state,
        windowData: { value: action.payload, type: WindowDataType.TYPE_COMMIT },
      }
    case 'RESET_CURRENT_COMMIT':
    case 'RESET_CURRENT_FILE':
      return { ...state, windowData: undefined }
    case 'REFRESH_BRANCHES':
      return { ...state, refreshBranches: state.refreshBranches + 1 }
    case 'REFRESH_COMMIT_HISTORY':
      return {
        ...state,
        refreshCommitHistory: state.refreshCommitHistory + 1,
        refreshMessages: state.refreshMessages + 1,
      }
    case 'REFRESH_LOG_MESSAGES':
      return { ...state, refreshMessages: state.refreshMessages + 1 }
    case 'SET_MODAL':
      return { ...state, modal: action.payload }
    case 'CLOSE_MODAL':
      return { ...state, modal: undefined }

    default:
      return state
  }
}
