/**
 * @file components/CommmitHistory.tsx
 * @brief Commit history component
 * @author Bálek Miroslav (xbalek02)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import CommitItem from 'components/CommitItem'
import { useEffect, Dispatch } from 'react'

interface CommitHistoryProps {
  commitHistory: CommitHistory
  refresh: number
  dispatch: Dispatch<Actions>
}

type CommitEntry = { message: string; hash: string }

function CommitHistory({
  commitHistory,
  refresh,
  dispatch,
}: CommitHistoryProps) {
  const fetchCommitHistory = async () => {
    const response = await window.git.commit_history()
    if (!response.status && response.payload) {
      dispatch({
        type: 'SET_COMMIT_HISTORY',
        payload: response.payload.commit_history,
      })
    }
  }

  useEffect(() => {
    fetchCommitHistory()
  }, [refresh])

  useEffect(() => {
    window.app.request_refresh(fetchCommitHistory)
    fetchCommitHistory()
    return () => {
      window.app.request_refresh(fetchCommitHistory, true)
    }
  }, [])

  return (
    <CollapseList
      heading={'Commit History'}
      className='border-top border-bottom border-davygray'
      items={commitHistory.map((commit: CommitEntry) => (
        <CommitItem
          key={commit.hash}
          message={<small>{commit.message}</small>}
          onClick={() => {
            dispatch({
              type: 'SET_CURRENT_COMMIT',
              payload: commit.hash,
            })
          }}
        />
      ))}
    />
  )
}

export default CommitHistory
