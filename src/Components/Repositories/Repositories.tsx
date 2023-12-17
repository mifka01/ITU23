/**
 * @file components/Repositories.tsx
 * @brief Repositories list component
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import ListItem from 'components/ListItem'
import Button from 'components/Button'
import { Minus, Plus } from 'lucide-react'
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from 'react'

interface RepositoriesProps {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
  setRefreshCommitHistory?: Dispatch<SetStateAction<boolean>>
  setRefreshStage?: Dispatch<SetStateAction<boolean>>
  setRefreshBranches?: Dispatch<SetStateAction<boolean>>
  setRefreshStashes?: Dispatch<SetStateAction<boolean>>
}

type RepositoryEntry = {
  filename: string
  dirname: string
  path: string
  current: boolean
}

function Repositories({
  setRefreshLog,
  setRefreshCommitHistory,
  setRefreshStage,
  setRefreshBranches,
  setRefreshStashes,
}: RepositoriesProps) {
  const [repositories, setRepositories] = useState<RepositoryEntry[]>([])

  const handleAdd = async () => {
    const response = await window.app.open()
    if (!response.status) fetchRepositories()
  }

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    const path = event.currentTarget.dataset['path']
    const response = await window.app.delete_repository(path)
    if (!response.status) fetchRepositories()
  }

  const handleChange = async (event: MouseEvent<HTMLButtonElement>) => {
    const path = event.currentTarget.dataset['path']
    const response = await window.app.setCWD(path)
    if (!response.status) fetchRepositories()
  }

  const fetchRepositories = async () => {
    const response = await window.app.repositories()
    if (!response.status && response.payload)
      setRepositories(response.payload.repositories)
    setRefreshLog?.(true)
  }

  useEffect(() => {
    setRefreshStage?.(true)
    setRefreshBranches?.(true)
    setRefreshStashes?.(true)
    setRefreshCommitHistory?.(true)
  }, [repositories])

  useEffect(() => {
    fetchRepositories()
  }, [])

  return (
    <CollapseList
      heading={'Repositories'}
      buttons={[{ text: Plus, onClick: handleAdd }]}
      className='border-top border-bottom border-davygray'
      items={repositories.map((repository: RepositoryEntry) => (
        <ListItem
          key={repository.path}
          start={
            <span
              data-path={repository.path}
              onClick={handleChange}
              role={'button'}
            >
              {repository.filename}
              <small className='text-davygray ms-2'>{repository.dirname}</small>
            </span>
          }
          hovered={
            !repository.current && (
              <Button
                data-path={repository.path}
                className='text-white border-0'
                onClick={handleDelete}
              >
                <Minus size={15} />
              </Button>
            )
          }
          end={repository.current && <span className='text-ecru'>CURRENT</span>}
        />
      ))}
    />
  )
}

export default Repositories
