/**
 * @file components/CommmitHistory.tsx
 * @brief Commit history component
 * @author Bálek Miroslav (xbalek02)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import CommitItem from 'components/CommitItem'
import { useEffect, useState, Dispatch } from 'react'

interface CommitHistoryProps {
  refresh: number
  dispatch: Dispatch<Actions>
}

type CommitEntry = { message: string; hash: string }
type CommitHistory = CommitEntry[]

function CommitHistory({ refresh, dispatch }: CommitHistoryProps) {
  const [commitHistory, setCommitHistory] = useState<CommitHistory>([])

  const fetchCommitHistory = async () => {
    const response = await window.git.commit_history()
    if (!response.status && response.payload) {
      setCommitHistory(response.payload.commit_history)
      dispatch({
        type: 'COMMIT_HISTORY_SET',
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
