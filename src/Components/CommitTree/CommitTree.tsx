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
  setCurrentCommit?: Dispatch<SetStateAction<string | undefined>>
  currentCommit?: string | undefined
}

type CommitEntry = { message: string; hash: string }

function CommitTree({
  setRefreshCommitTree,
  refreshCommitTree,
  setCurrentCommit,
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
    <div className='col-12 text-start text-beige'>
      <CollapseList
        heading={'Commit Tree'}
        className='border-top border-bottom border-davygray'
        items={committree.map((commit: CommitEntry) => (
          <CommitItem
            key={commit.hash}
            message={<small>{commit.message}</small>}
            onClick={() => {
              setCurrentCommit?.(commit.hash)
            }}
          />
        ))}
      />
    </div>
  )
}

export default CommitTree
