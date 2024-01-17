type State = {
  previewData: PreviewData
  modal: Modal | undefined
  refreshBranches: number
  refreshCommitHistory: number
  refreshStashes: number
  refreshStage: number
  refreshMessages: number
}

export const initialState: State = {
  previewData: undefined,
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

enum PreviewDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT = 1,
}

export function reducer(state: State, action: Actions): State {
  switch (action.type) {
    case 'REPOSITORIES_SET':
      return {
        ...state,
        refreshBranches: state.refreshBranches + 1,
        refreshStashes: state.refreshStashes + 1,
      }
    case 'BRANCHES_SET':
      return {
        ...state,
        refreshStage: state.refreshStage + 1,
      }
    case 'COMMIT_HISTORY_SET':
      return { ...state }
    case 'STASHES_SET':
      return {
        ...state,
        refreshMessages: state.refreshMessages + 1,
      }
    case 'STAGE_SET':
      return {
        ...state,
        refreshCommitHistory: state.refreshCommitHistory + 1,
        refreshMessages: state.refreshMessages + 1,
      }
    case 'SET_CURRENT_FILE':
      return {
        ...state,
        previewData: { value: action.payload, type: PreviewDataType.TYPE_FILE },
      }
    case 'SET_CURRENT_COMMIT':
      return {
        ...state,
        previewData: {
          value: action.payload,
          type: PreviewDataType.TYPE_COMMIT,
        },
      }
    case 'RESET_PREVIEW':
      return { ...state, previewData: undefined }
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
