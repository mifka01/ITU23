/**
 * @file components/Stashes.tsx
 * @brief Stash list component
 * @author Miroslav Bálek (xbalek02)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import ListItem from 'components/ListItem'
import Button from 'components/Button'
import { Minus, Plus, ArchiveRestore, Archive } from 'lucide-react'
import { useRef, useEffect, Dispatch, MouseEvent, ChangeEvent } from 'react'

interface StashesProps {
  refresh: number
  dispatch: Dispatch<Actions>
  stashes: Stashes
}

type StashEntry = { message: string; hash: string }

function Stashes({ stashes, refresh, dispatch }: StashesProps) {
  const newStashRef = useRef<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    newStashRef.current = value
  }

  const handleCreate = async () => {
    dispatch({
      type: 'SET_MODAL',
      payload: {
        children: (
          <>
            <span>Please provide a stash name</span>
            <input
              type='text'
              name='stash'
              style={{ resize: 'none' }}
              className='form-control bg-gunmetal border border-davygray text-beige shadow-none mt-3'
              placeholder='Stash name'
              defaultValue={newStashRef.current}
              onChange={handleChange}
            />
          </>
        ),
        buttons: [
          {
            text: 'Abort',
            onClick: () => {
              newStashRef.current = ''
            },
          },
          {
            text: 'Create',
            onClick: async () => {
              const response = await window.git.stash_push(newStashRef.current)
              if (!response.status) {
                fetchStashes()
              }
              newStashRef.current = ''
            },
          },
        ],
      },
    })
  }

  const handleDrop = async (event: MouseEvent<HTMLButtonElement>) => {
    let message = event.currentTarget.dataset['message']
    let index = event.currentTarget.dataset['index']

    dispatch({
      type: 'SET_MODAL',
      payload: {
        children: (
          <span>Are you sure you want to drop this stash: {message}?</span>
        ),
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            onClick: async () => {
              const response = await window.git.stash_drop(index)
              if (!response.status) {
                fetchStashes()
              }
            },
          },
        ],
      },
    })
  }
  const handleApply = async (event: MouseEvent<HTMLButtonElement>) => {
    let index = event.currentTarget.dataset['index']
    const response = await window.git.stash_apply(index)
    if (!response.status) {
      fetchStashes()
    }
  }

  const handlePop = async (event: MouseEvent<HTMLButtonElement>) => {
    let index = event.currentTarget.dataset['index']
    const response = await window.git.stash_pop(index)
    if (!response.status) {
      fetchStashes()
    }
  }

  const fetchStashes = async () => {
    const response = await window.git.stashes()

    if (!response.status && response.payload) {
      dispatch({ type: 'SET_STASHES', payload: response.payload.stashes })
    }
  }

  useEffect(() => {
    fetchStashes()
  }, [refresh])

  useEffect(() => {
    window.app.request_refresh(fetchStashes)
    fetchStashes()
    return () => {
      window.app.request_refresh(fetchStashes, true)
    }
  }, [])

  return (
    <div className='col-12 text-start text-beige'>
      <CollapseList
        heading={'Stashes'}
        buttons={[
          {
            text: Plus,
            onClick: handleCreate,
            tooltip: 'Stash save - Save staged changes to the stash.',
          },
        ]}
        className='border-top border-bottom border-davygray'
        items={stashes.map((stash: StashEntry, index: number) => (
          <ListItem
            key={stash.message}
            start={<span>{stash.message}</span>}
            hovered={
              <>
                <Button
                  data-message={stash.message}
                  data-index={index}
                  className='text-white border-0 pe-1'
                  onClick={handlePop}
                  title='Stash pop - Apply changes from the stash and remove them from the stash stack.'
                >
                  <ArchiveRestore size={15} />
                </Button>
                <Button
                  data-message={stash.message}
                  data-index={index}
                  className='text-white border-0 pe-1'
                  onClick={handleApply}
                  title='Stash apply - Apply changes from the stash without removing them from the stash stack.'
                >
                  <Archive size={15} />
                </Button>
                <Button
                  data-message={stash.message}
                  data-index={index}
                  className='text-white border-0'
                  onClick={handleDrop}
                  title='Stash drop - Remove the stash.'
                >
                  <Minus size={15} />
                </Button>
              </>
            }
          />
        ))}
      />
    </div>
  )
}

export default Stashes
