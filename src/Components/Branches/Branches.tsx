/**
 * @file components/Branches.tsx
 * @brief Branches list component
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import ListItem from 'components/ListItem'
import Button from 'components/Button'
import Portal from 'components/Portal'
import { Minus, Plus } from 'lucide-react'
import { useState, useEffect, Dispatch, ChangeEvent, MouseEvent } from 'react'

type BranchEntry = { name: string; current: boolean }
type Branches = BranchEntry[]

enum ModalType {
  NONE = 0,
  DELETE,
  CREATE,
}

interface BranchesProps {
  dispatch: Dispatch<Actions>
  refresh: number
}

function Branches({ dispatch, refresh }: BranchesProps) {
  const [branches, setBranches] = useState<Branches>([])
  const [modal, setModal] = useState({ show: false, type: ModalType.NONE })
  const [branchName, setBranchName] = useState<string | undefined>()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setBranchName(value)
  }

  const handleCreate = async () => {
    setModal({ show: true, type: ModalType.CREATE })
  }

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    let name = event.currentTarget.dataset['name']
    setBranchName(name)
    setModal({ show: true, type: ModalType.DELETE })
  }

  const handleCheckout = async (event: MouseEvent<HTMLButtonElement>) => {
    let name = event.currentTarget.dataset['name']
    const response = await window.git.checkout_branch(name)

    if (!response.status) fetchBranches()
    else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  const fetchBranches = async () => {
    const response = await window.git.branches()

    if (!response.status && response.payload) {
      setBranches(response.payload.branches)
      dispatch({ type: 'BRANCHES_SET' })
    } else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  useEffect(() => {
    fetchBranches()
  }, [refresh])

  useEffect(() => {
    window.app.request_refresh(fetchBranches)
    fetchBranches()
    return () => {
      window.app.request_refresh(fetchBranches, true)
    }
  }, [])

  let modalChildren
  let modalButtons

  switch (modal.type) {
    case ModalType.CREATE:
      modalChildren = (
        <>
          <span>Please provide a branch name</span>
          <input
            type='text'
            name='branch'
            autoFocus
            style={{ resize: 'none' }}
            className='form-control bg-gunmetal border border-davygray text-beige shadow-none mt-3'
            placeholder='Branch name'
            defaultValue={branchName}
            onChange={handleChange}
          />
        </>
      )
      modalButtons = [
        {
          text: 'Abort',
          onClick: () => {
            setBranchName(undefined)
            setModal({ show: false, type: ModalType.NONE })
          },
        },
        {
          text: 'Create',
          onClick: async () => {
            const response = await window.git.create_branch(branchName)
            if (!response.status) {
              fetchBranches()
              setBranchName(undefined)
            } else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
            setModal({ show: false, type: ModalType.NONE })
          },
        },
      ]
      break
    case ModalType.DELETE:
      modalChildren = (
        <span>Are you sure you want to delete branch: {branchName}?</span>
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
            const response = await window.git.delete_branch(branchName)
            if (!response.status) {
              fetchBranches()
              setBranchName(undefined)
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

      <CollapseList
        heading={'Branches'}
        buttons={[{ text: Plus, onClick: handleCreate }]}
        className='border-top border-bottom border-davygray'
        items={branches.map((branch: BranchEntry) => (
          <ListItem
            key={branch.name}
            start={
              <Button
                data-name={branch.name}
                onClick={handleCheckout}
                className='text-end text-beige border-0'
              >
                <small>{branch.name}</small>
              </Button>
            }
            hovered={
              !branch.current && (
                <Button
                  data-name={branch.name}
                  className='text-white border-0'
                  onClick={handleDelete}
                >
                  <Minus size={15} />
                </Button>
              )
            }
            end={branch.current && <span className='text-ecru'>CURRENT</span>}
          />
        ))}
      />
    </>
  )
}

export default Branches
