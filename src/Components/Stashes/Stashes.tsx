/**
 * @file components/Stashes.tsx
 * @brief Stash list component
 * @author Miroslav Bálek (xbalek02)
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import ListItem from 'components/ListItem'
import Button from 'components/Button'
import Portal from 'components/Portal'
import { Minus, Plus, ArchiveRestore, Archive } from 'lucide-react'
import { useState, useEffect, Dispatch, MouseEvent, ChangeEvent } from 'react'

interface StashesProps {
  refresh: number
  dispatch: Dispatch<Actions>
}

enum ModalType {
  NONE = 0,
  CREATE,
  DROP,
}

type StashEntry = { message: string; hash: string }
type Stashes = StashEntry[]

function Stashes({ refresh, dispatch }: StashesProps) {
  const [stashes, setStashes] = useState<Stashes>([])
  const [stash, setStash] = useState<
    { name: string | undefined; index: string | undefined } | undefined
  >()
  const [modal, setModal] = useState({ show: false, type: ModalType.NONE })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setStash({ name: value, index: undefined })
  }

  const handleCreate = async () => {
    setModal({ show: true, type: ModalType.CREATE })
  }

  const handleDrop = async (event: MouseEvent<HTMLButtonElement>) => {
    let message = event.currentTarget.dataset['message']
    let index = event.currentTarget.dataset['index']
    setStash({ name: message, index: index })
    setModal({ show: true, type: ModalType.DROP })
  }
  const handleApply = async (event: MouseEvent<HTMLButtonElement>) => {
    let index = event.currentTarget.dataset['index']
    const response = await window.git.stash_apply(index)
    if (!response.status) fetchStashes()
    else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  const handlePop = async (event: MouseEvent<HTMLButtonElement>) => {
    let index = event.currentTarget.dataset['index']
    const response = await window.git.stash_pop(index)
    if (!response.status) fetchStashes()
    else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  const fetchStashes = async () => {
    const response = await window.git.stashes()

    if (!response.status && response.payload) {
      setStashes(response.payload.stashes)
      dispatch({ type: 'STASHES_SET' })
    } else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
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

  let modalChildren
  let modalButtons

  switch (modal.type) {
    case ModalType.CREATE:
      modalChildren = (
        <>
          <span>Please provide a stash name</span>
          <input
            type='text'
            name='stash'
            style={{ resize: 'none' }}
            autoFocus
            className='form-control bg-gunmetal border border-davygray text-beige shadow-none mt-3'
            placeholder='Stash name'
            defaultValue={stash?.name}
            onChange={handleChange}
          />
        </>
      )
      modalButtons = [
        {
          text: 'Abort',
          onClick: () => {
            setStash(undefined)
            setModal({ show: false, type: ModalType.NONE })
          },
        },
        {
          text: 'Create',
          onClick: async () => {
            const response = await window.git.stash_push(stash?.name)
            if (!response.status) {
              fetchStashes()
              setStash(undefined)
            } else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
            setModal({ show: false, type: ModalType.NONE })
          },
        },
      ]
      break
    case ModalType.DROP:
      modalChildren = (
        <span>Are you sure you want to drop stash: {stash?.name}?</span>
      )
      modalButtons = [
        {
          text: 'No',
          onClick: () => {
            setModal({ show: false, type: ModalType.NONE })
          },
        },

        {
          text: 'Yes',
          onClick: async () => {
            const response = await window.git.stash_drop(stash?.index)
            if (!response.status) {
              fetchStashes()
              setStash(undefined)
            } else dispatch({ type: 'REFRESH_LOG_MESSAGES' })

            setModal({ show: false, type: ModalType.NONE })
          },
        },
      ]
      break
  }

  return (
    <>
      <Portal show={modal.show} buttons={modalButtons}>
        {modalChildren}
      </Portal>
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
    </>
  )
}

export default Stashes
