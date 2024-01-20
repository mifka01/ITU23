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
import { useEffect, useState, Dispatch, MouseEvent } from 'react'

type RepositoryEntry = Path & {
  current: boolean
}
type Repositories = RepositoryEntry[]

interface RepositoriesProps {
  dispatch: Dispatch<Actions>
}

function Repositories({ dispatch }: RepositoriesProps) {
  const [repositories, setRepositories] = useState<Repositories>([])
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
    if (!response.status) {
      fetchRepositories()
    }
  }

  const fetchRepositories = async () => {
    const response = await window.app.repositories()
    if (!response.status && response.payload) {
      setRepositories(response.payload.repositories)
      dispatch({
        type: 'REPOSITORIES_SET',
      })

      if (response.payload.repositories.length == 0) {
        dispatch({
          type: 'SET_MODAL',
          payload: {
            children: <span>First you have to add a repository</span>,
            buttons: [
              {
                text: 'Open',
                onClick: async () => {
                  handleAdd()
                },
              },
            ],
          },
        })
      }
    }
  }

  useEffect(() => {
    fetchRepositories()
  }, [])

  return (
    <CollapseList
      heading={'Repositories'}
      buttons={[{ text: Plus, onClick: handleAdd }]}
      className='border-top border-bottom border-davygray'
      items={repositories.map((repository) => (
        <ListItem
          key={repository.path}
          start={
            <span
              data-path={repository.path}
              onClick={handleChange}
              role={'button'}
            >
              {repository.basename}
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
