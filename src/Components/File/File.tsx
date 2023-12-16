/**
 * @file components/file.tsx
 * @brief Component for file in staging area
 * @author Radim Mifka (xmifka00)
 * @date November 2023
 */

import { Plus, Minus, Undo2 } from 'lucide-react'
import Button from 'components/Button'
import ListItem from 'components/ListItem'

const STATUS_UNTRACKED = 'U'
const STATUS_APPENDED = 'A'
const STATUS_MODIFIED = 'M'
const STATUS_DELETED = 'D'

interface FileProps {
  onClick?: () => void
  afterAction?: () => void
  staged: boolean
  fileEntry: { filename: string; dirname: string; path: string }
  status: string
}

function File({ afterAction, onClick, staged, fileEntry, status }: FileProps) {
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
    const response = !staged
      ? await window.git.add(fileEntry.path)
      : await window.git.unstage(fileEntry.path)
    if (!response.status) afterAction?.()
  }

  const handleDiscard = async () => {
    const response =
      status == STATUS_UNTRACKED || status == STATUS_APPENDED
        ? await window.git.rm(fileEntry.path)
        : await window.git.discard(fileEntry.path)
    if (!response.status) afterAction?.()
  }

  return (
    <ListItem
      start={
        <span onClick={onClick} role={'button'}>
          {fileEntry.filename}
          <small className='text-davygray ms-2'>{fileEntry.path}</small>
        </span>
      }
      end={<span className={status_color}> {status}</span>}
      hovered={
        <>
          <Button onClick={handleDiscard} className='border-0'>
            <Undo2 size={15} color='white' />
          </Button>
          <Button onClick={handleStage} className='border-0 ps-2'>
            {icon}
          </Button>
        </>
      }
    />
  )
}

export default File
