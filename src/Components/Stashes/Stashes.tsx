// @file components/Branches.tsx
// @brief Stash list component
// @author Miroslav Bálek (xbalek02)
// @date December 2023

import CollapseList from 'components/CollapseList'
import ListItem from 'components/ListItem'
import Button from 'components/Button'
import { ModalProps } from 'components/Modal'
import { Minus } from 'lucide-react'
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
  setRefreshCommitTree?: Dispatch<SetStateAction<boolean>>
  setShowModal?: Dispatch<SetStateAction<boolean>>
  setModal?: Dispatch<SetStateAction<ModalProps>>
}

type BranchEntry = { name: string; current: boolean }

function Branches({
  setRefreshLog,
  setRefreshCommitTree,
  setModal,
  setShowModal,
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
            text: 'No',
            onClick: () => {
              newBranchRef.current = ''
              setShowModal?.(false)
            },
          },
          {
            text: 'Yes',
            onClick: async () => {
              await window.git.create_branch(newBranchRef.current)
              fetchBranches()
              newBranchRef.current = ''
              setShowModal?.(false)
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
              await window.git.delete_branch(name)
              fetchBranches()
              setShowModal?.(false)
            },
          },
        ],
      })
      setShowModal(true)
    }
  }

  const handleCheckout = async (event: MouseEvent<HTMLButtonElement>) => {
    let name = event.currentTarget.dataset['name']
    await window.git.checkout_branch(name)
    fetchBranches()
  }

  const fetchBranches = async () => {
    const response = await window.git.branches()
    let entries: BranchEntry[] = []

    let current = response.current

    response.all.forEach((branch_name: string) => {
      const entry: BranchEntry = {
        name: branch_name,
        current: branch_name == current,
      }
      entries.push(entry)
    })

    setBranches(entries)
    setRefreshLog?.(true)
    setRefreshCommitTree?.(true)
  }

  useEffect(() => {
    window.app.request_refresh(fetchBranches)
    fetchBranches()
    return () => {
      window.app.request_refresh(fetchBranches, true)
    }
  }, [])

  return (
    <div className='col-12 text-start text-beige'>
      <CollapseList
        heading={'Branches'}
        buttons={[{ text: 'NEW', onClick: handleCreate }]}
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
              !branch.current ? (
                <Button
                  data-name={branch.name}
                  className='text-white border-0'
                  onClick={handleDelete}
                >
                  <Minus size={15} />
                </Button>
              ) : undefined
            }
            end={
              branch.current ? (
                <span className='text-ecru'>CURRENT</span>
              ) : undefined
            }
          />
        ))}
      />
    </div>
  )
}

export default Branches
