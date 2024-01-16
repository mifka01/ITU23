/**
 * @file components/Branches.tsx
 * @brief Branches list component
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import CollapseList from 'components/CollapseList'
import ListItem from 'components/ListItem'
import Button from 'components/Button'
import { Minus, Plus } from 'lucide-react'
import {
  useRef,
  useState,
  useEffect,
  Dispatch,
  ChangeEvent,
  MouseEvent,
} from 'react'

type BranchEntry = { name: string; current: boolean }
type Branches = BranchEntry[]

interface BranchesProps {
  dispatch: Dispatch<Actions>
  refresh: number
}

function Branches({ dispatch, refresh }: BranchesProps) {
  const newBranchRef = useRef<string>('')
  const [branches, setBranches] = useState<Branches>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    newBranchRef.current = value
  }

  const handleCreate = async () => {
    dispatch({
      type: 'SET_MODAL',
      payload: {
        children: (
          <>
            <span>Please provide a branch name</span>
            <input
              type='text'
              name='branch'
              autoFocus
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
              } else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
            },
          },
        ],
      },
    })
  }

  const handleDelete = async (event: MouseEvent<HTMLButtonElement>) => {
    let name = event.currentTarget.dataset['name']

    dispatch({
      type: 'SET_MODAL',
      payload: {
        children: <span>Are you sure you want to delete branch: {name}?</span>,
        buttons: [
          {
            text: 'No',
            onClick: () => {},
          },
          {
            text: 'Yes',
            onClick: async () => {
              const response = await window.git.delete_branch(name)
              if (!response.status) fetchBranches()
              else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
            },
          },
        ],
      },
    })
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
