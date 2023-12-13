// @file components/file.tsx
// @brief Component for file in staging area
// @author Radim Mifka (xmifka00)
// @date November 2023

import { Plus, Minus, Undo2 } from 'lucide-react'
import Button from 'components/Button'
import ListItem from 'components/ListItem'
import {Dispatch, SetStateAction} from "react";

const STATUS_UNTRACKED = 'U'
const STATUS_APPENDED = 'A'
const STATUS_MODIFIED = 'M'
const STATUS_DELETED = 'D'

interface FileProps {
  afterClick?: () => void
  staged: boolean
  full_path: string
  status: string
  setFilePath: Dispatch<SetStateAction<string>>
}

function File({ afterClick, staged, full_path, status, setFilePath }: FileProps) {
  const name = full_path.split('/').pop()
  // const path = full_path.slice(0, full_path.lastIndexOf('/'))

  let status_color = 'text-success'

  switch (status) {
    case STATUS_UNTRACKED:
    case STATUS_APPENDED:
      status_color = 'text-success'
      break
    case STATUS_MODIFIED:
      status_color = 'text-warning'
      break
    case STATUS_DELETED:
      status_color = 'text-danger'
      break
    default:
      status_color = 'text-success'
  }

  const icon = staged ? (
    <Minus size={15} color='white' />
  ) : (
    <Plus size={15} color='white' />
  )

  const handleStage = async () => {
    if (!staged) {
      await window.git.add(full_path)
    } else {
      await window.git.unstage(full_path)
    }
    afterClick?.()
  }

  const handleDiscard = async () => {
    if (status == STATUS_UNTRACKED || status == STATUS_APPENDED) {
      await window.git.rm(full_path)
    } else {
      await window.git.discard(full_path)
    }
    afterClick?.()
  }

  return (
    <ListItem
      start={name}
      end={<span className={status_color}>{status}</span>}
      hovered={
        <>
          <Button onClick={handleDiscard} className='text-end border-0'>
            <Undo2 size={15} color='white' />
          </Button>
          <Button onClick={handleStage} className='text-end border-0 ps-2'>
            {icon}
          </Button>
        </>
      }
      setFilePath={setFilePath}
      full_path={full_path}
    />
  )
}

export default File
