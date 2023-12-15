/**
 * @file components/Stashes.tsx
 * @brief Stash list component
 * @author Miroslav Bálek (xbalek02)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import ListItem from 'components/ListItem'
import Button from 'components/Button'
import { ModalProps } from 'components/Modal'
import { Minus, Plus, ArchiveRestore, Archive } from 'lucide-react'
import {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
  ChangeEvent,
} from 'react'

interface StashesProps {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
  setShowModal?: Dispatch<SetStateAction<boolean>>
  setModal?: Dispatch<SetStateAction<ModalProps>>
  setRefreshStage?: Dispatch<SetStateAction<boolean>>
  setRefreshStashes?: Dispatch<SetStateAction<boolean>>
  refreshStashes?: boolean
}

type StashEntry = { message: string; hash: string }

function Stashes({
  setRefreshLog,
  setModal,
  setShowModal,
  setRefreshStage,
  setRefreshStashes,
  refreshStashes,
}: StashesProps) {
  const [stashes, setStashes] = useState<StashEntry[]>([])
  const newStashRef = useRef<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    newStashRef.current = value
  }

  const handleCreate = async () => {
    if (setModal && setShowModal) {
      setModal({
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
              setShowModal?.(false)
            },
          },
          {
            text: 'Create',
            onClick: async () => {
              const response = await window.git.stash_push(newStashRef.current)
              if (!response.status) {
                fetchStashes()
                setRefreshStage?.(true)
              }
              newStashRef.current = ''
              setShowModal?.(false)
            },
          },
        ],
      })
      setShowModal(true)
    }
  }

  const handleDrop = async (event: MouseEvent<HTMLButtonElement>) => {
    if (setModal && setShowModal) {
      let message = event.currentTarget.dataset['message']
      let index = event.currentTarget.dataset['index']

      setModal({
        children: (
          <span>Are you sure you want to drop this stash: {message}?</span>
        ),
        buttons: [
          {
            text: 'No',
            onClick: () => {
              setShowModal?.(false)
            },
          },
          {
            text: 'Yes',
            onClick: async () => {
              const response = await window.git.stash_drop(index)
              if (!response.status) {
                fetchStashes()
              }
              setShowModal?.(false)
            },
          },
        ],
      })
      setShowModal(true)
    }
  }
  const handleApply = async (event: MouseEvent<HTMLButtonElement>) => {
    let index = event.currentTarget.dataset['index']
    const response = await window.git.stash_apply(index)
    if (!response.status) {
      setRefreshStage?.(true)
      fetchStashes()
    }
  }

  const handlePop = async (event: MouseEvent<HTMLButtonElement>) => {
    let index = event.currentTarget.dataset['index']
    const response = await window.git.stash_pop(index)
    if (!response.status) {
      setRefreshStage?.(true)
      fetchStashes()
    }
  }

  const fetchStashes = async () => {
    const response = await window.git.stashes()

    if (!response.status && response.payload) {
      setStashes(response.payload.stashes)
      setRefreshLog?.(true)
    }
  }

  useEffect(() => {
    if (refreshStashes) {
      fetchStashes()
      setRefreshStashes?.(false)
    }
  }, [refreshStashes])

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
        buttons={[{ text: Plus, onClick: handleCreate }]}
        className='border-top border-bottom border-davygray'
        items={stashes.map((stash: StashEntry, index: number) => (
          <ListItem
            key={stash.message}
            start={<small>{stash.message}</small>}
            hovered={
              <>
                <Button
                  data-message={stash.message}
                  data-index={index}
                  className='text-white border-0 pe-1'
                  onClick={handlePop}
                  title='pop stash'
                >
                  <ArchiveRestore size={15} />
                </Button>
                <Button
                  data-message={stash.message}
                  data-index={index}
                  className='text-white border-0 pe-1'
                  onClick={handleApply}
                  title='apply stash'
                >
                  <Archive size={15} />
                </Button>
                <Button
                  data-message={stash.message}
                  data-index={index}
                  className='text-white border-0'
                  onClick={handleDrop}
                  title='drop stash'
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
