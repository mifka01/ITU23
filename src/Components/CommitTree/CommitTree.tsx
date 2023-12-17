/**
 * @file components/CommitTree.tsx
 * @brief Commit tree component
 * @author Bálek Miroslav (xbalek02)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import CommitItem from 'components/CommitItem'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'

interface CommitTreeProps {
  setRefreshCommitTree?: Dispatch<SetStateAction<boolean>>
  refreshCommitTree?: boolean
  setWindowData?: Dispatch<SetStateAction<WindowData>>
}

type CommitEntry = { message: string; hash: string }

enum WindowDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT,
}

type WindowData = { value: string; type: WindowDataType } | undefined

function CommitTree({
  setRefreshCommitTree,
  refreshCommitTree,
  setWindowData,
}: CommitTreeProps) {
  const [committree, setCommitTree] = useState<CommitEntry[]>([])

  const fetchCommitTree = async () => {
    const response = await window.git.commit_tree()

    if (!response.status && response.payload)
      setCommitTree(response.payload.commit_tree)
  }

  useEffect(() => {
    if (refreshCommitTree) {
      fetchCommitTree()
      setRefreshCommitTree?.(false)
    }
  }, [refreshCommitTree])

  useEffect(() => {
    window.app.request_refresh(fetchCommitTree)
    fetchCommitTree()
    return () => {
      window.app.request_refresh(fetchCommitTree, true)
    }
  }, [])

  return (
    <CollapseList
      heading={'Commit Tree'}
      className='border-top border-bottom border-davygray'
      items={committree.map((commit: CommitEntry) => (
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

export default CommitTree
