// @file components/Branches.tsx
// @brief Branches list component
// @author Radim Mifka (xmifka00)
// @date December 2023

import CollapseList from 'components/CollapseList'
import ListItem from 'components/ListItem'
import Button from 'components/Button'
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
} from 'react'

interface BranchesProps {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
}

type BranchEntry = { name: string; current: boolean }

function Branches({ setRefreshLog }: BranchesProps) {
  const [branches, setBranches] = useState<BranchEntry[]>([])

  const handleCheckout = async (event: MouseEvent<HTMLButtonElement>) => {
    let name = event.currentTarget.innerText
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
        className='border-top border-bottom border-davygray'
        items={branches.map((branch: BranchEntry, index: number) => (
          <ListItem
            key={index}
            start={
              <Button
                onClick={handleCheckout}
                className='text-end text-white border-0'
              >
                {branch.name}
              </Button>
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
