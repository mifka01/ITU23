/**
 * @file components/Branches.tsx
 * @brief Branches list component
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import ListItem from 'components/ListItem'
import Button from 'components/Button'
import { ModalProps } from 'components/Modal'
import { Minus, Plus } from 'lucide-react'
import {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  MouseEvent,
} from 'react'

interface BranchesProps {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
  setRefreshCommitHistory?: Dispatch<SetStateAction<boolean>>
  setShowModal?: Dispatch<SetStateAction<boolean>>
  setModal?: Dispatch<SetStateAction<ModalProps>>
  setRefreshBranches?: Dispatch<SetStateAction<boolean>>
  refreshBranches?: boolean
}

type BranchEntry = { name: string; current: boolean }

function Branches({
  setRefreshLog,
  setRefreshCommitHistory,
  setModal,
  setShowModal,
  setRefreshBranches,
  refreshBranches,
}: BranchesProps) {
  const [branches, setBranches] = useState<BranchEntry[]>([])
  const newBranchRef = useRef<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    newBranchRef.current = value
  }

  const handleCreate = async () => {
    if (setModal && setShowModal) {
      setModal({
        children: (
          <>
            <span>Please provide a branch name</span>
            <input
              type='text'
              name='branch'
              style={{ resize: 'none' }}
              className='form-control bg-gunmetal border border-davygray text-beige shadow-none mt-3'
              placeholder='Branch name'
              defaultValue={newBranchRef.current}
              onChange={handleChange}
            />
          </>
        ),
        buttons: [
          {
            text: 'Abort',
            onClick: () => {
              newBranchRef.current = ''
              setShowModal?.(false)
            },
          },
          {
            text: 'Create',
            onClick: async () => {
              const response = await window.git.create_branch(
                newBranchRef.current,
              )
              if (!response.status) {
                fetchBranches()
                newBranchRef.current = ''
              }
              setShowModal?.(false)
              setRefreshLog?.(true)
            },
          },
        ],
      })
      setShowModal(true)
    }
  }

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    if (setModal && setShowModal) {
      let name = event.currentTarget.dataset['name']

      setModal({
        children: <span>Are you sure you want to delete branch: {name}?</span>,
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
              const response = await window.git.delete_branch(name)
              if (!response.status) {
                fetchBranches()
              }
              setShowModal?.(false)
              setRefreshLog?.(true)
            },
          },
        ],
      })
      setShowModal(true)
    }
  }

  const handleCheckout = async (event: MouseEvent<HTMLButtonElement>) => {
    let name = event.currentTarget.dataset['name']
    const response = await window.git.checkout_branch(name)

    if (!response.status) fetchBranches()
    setRefreshLog?.(true)
  }

  const fetchBranches = async () => {
    const response = await window.git.branches()

    if (!response.status && response.payload) {
      setBranches(response.payload.branches)
      setRefreshCommitHistory?.(true)
    }
    setRefreshLog?.(true)
  }

  useEffect(() => {
    if (refreshBranches) {
      fetchBranches()
      setRefreshBranches?.(false)
    }
  }, [refreshBranches])

  useEffect(() => {
    window.app.request_refresh(fetchBranches)
    fetchBranches()
    return () => {
      window.app.request_refresh(fetchBranches, true)
    }
  }, [])

  return (
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
  )
}

export default Branches
