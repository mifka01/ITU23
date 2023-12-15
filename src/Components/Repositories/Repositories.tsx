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
  setRefreshCommitTree?: Dispatch<SetStateAction<boolean>>
  setRefreshStage?: Dispatch<SetStateAction<boolean>>
  setRefreshBranches?: Dispatch<SetStateAction<boolean>>
  setRefreshStashes?: Dispatch<SetStateAction<boolean>>
}

type RepositoryEntry = { name: string; path: string; current: boolean }

function Repositories({
  setRefreshLog,
  setRefreshCommitTree,
  setRefreshStage,
  setRefreshBranches,
  setRefreshStashes,
}: RepositoriesProps) {
  const [repositories, setRepositories] = useState<RepositoryEntry[]>([])

  const handleAdd = async () => {
    let response = await window.app.open()
    if (!response.status) {
      fetchRepositories()
    }
  }

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    const path = event.currentTarget.dataset['path']
    await window.app.delete_repository(path)
    fetchRepositories()
  }

  const handleChange = async (event: MouseEvent<HTMLButtonElement>) => {
    const path = event.currentTarget.dataset['path']
    await window.app.setCWD(path)
    fetchRepositories()
  }

  const fetchRepositories = async () => {
    const response = await window.app.repositories()

    if (!response.status && response.payload) {
      setRepositories(response.payload.repositories)
      setRefreshLog?.(true)
      setRefreshCommitTree?.(true)
      setRefreshStage?.(true)
      setRefreshBranches?.(true)
      setRefreshStashes?.(true)
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return (
    <div className='col-12 text-start text-beige'>
      <CollapseList
        heading={'Repositories'}
        buttons={[{ text: Plus, onClick: handleAdd }]}
        className='border-top border-bottom border-davygray'
        items={repositories.map((repository: RepositoryEntry) => (
          <ListItem
            key={`${repository.path}/${repository.name}`}
            start={
              <span
                data-path={`${repository.path}/${repository.name}`}
                onClick={handleChange}
                role={'button'}
              >
                {repository.name}
                <small className='text-davygray ms-2'>{repository.path}</small>
              </span>
            }
            hovered={
              !repository.current && (
                <Button
                  data-path={`${repository.path}/${repository.name}`}
                  className='text-white border-0'
                  onClick={handleDelete}
                >
                  <Minus size={15} />
                </Button>
              )
            }
            end={
              repository.current && <span className='text-ecru'>CURRENT</span>
            }
          />
        ))}
      />
    </div>
  )
}

export default Repositories
