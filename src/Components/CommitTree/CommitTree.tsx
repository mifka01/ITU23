// @file components/CommitTree.tsx
// @brief Commit tree component
// @author Bálek Miroslav (xbalek02)
// @date December 2023

import CollapseList from 'components/CollapseList'
import CommitItem from '../CommmitItem'
import { useState, useEffect, Dispatch, SetStateAction } from 'react'

interface CommitTreeProps {
  setRefreshCommitTree?: Dispatch<SetStateAction<boolean>>
  refreshCommitTree?: boolean
}

type CommitEntry = { message: string; hash: string }

function CommitTree({
  setRefreshCommitTree,
  refreshCommitTree,
}: CommitTreeProps) {
  const [committree, setCommitTree] = useState<CommitEntry[]>([])

  const fetchCommitTree = async () => {
    const response = await window.git.commit_tree()

    if (!response.status && response.payload)
      setCommitTree(response.payload.commit_tree)
  }

  useEffect(() => {
    fetchCommitTree()
    setRefreshCommitTree?.(false), [refreshCommitTree == true]
  })

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
          />
        ))}
      />
    </div>
  )
}

export default CommitTree
