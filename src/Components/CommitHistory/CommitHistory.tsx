/**
 * @file components/CommmitHistory.tsx
 * @brief Commit history component
 * @author Bálek Miroslav (xbalek02)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import CommitItem from 'components/CommitItem'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'

interface CommitHistoryProps {
  setRefreshCommitHistory?: Dispatch<SetStateAction<boolean>>
  refreshCommitHistory?: boolean
  setWindowData?: Dispatch<SetStateAction<WindowData>>
}

type CommitEntry = { message: string; hash: string }

enum WindowDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT,
}

type WindowData = { value: string; type: WindowDataType } | undefined

function CommitHistory({
  setRefreshCommitHistory,
  refreshCommitHistory,
  setWindowData,
}: CommitHistoryProps) {
  const [commitHistory, setCommitHistory] = useState<CommitEntry[]>([])

  const fetchCommitHistory = async () => {
    const response = await window.git.commit_history()

    if (!response.status && response.payload)
      setCommitHistory(response.payload.commit_history)
  }

  useEffect(() => {
    if (refreshCommitHistory) {
      fetchCommitHistory()
      setRefreshCommitHistory?.(false)
    }
  }, [refreshCommitHistory])

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
            setWindowData?.({
              value: commit.hash,
              type: WindowDataType.TYPE_COMMIT,
            })
          }}
        />
      ))}
    />
  )
}

export default CommitHistory
