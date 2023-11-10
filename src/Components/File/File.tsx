// @file components/file.tsx
// @brief Component for file in staging area
// @author Radim Mifka (xmifka00)
// @date November 2023

import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'
import Button from 'components/Button'

interface FileProps {
  afterClick: () => void
  staged: boolean
  full_path: string
  status: string
}

function File({ afterClick, staged, full_path, status }: FileProps) {
  const [isHovered, setIsHovered] = useState(false)

  const name = full_path.split('/').pop()
  // const path = full_path.slice(0, full_path.lastIndexOf('/'))

  let status_color = 'text-success'

  switch (status) {
    case 'U':
    case 'A':
      status_color = 'text-success'
      break
    case 'M':
      status_color = 'text-warning'
      break
    case 'D':
      status_color = 'text-danger'
      break
    default:
      status_color = 'text-success'
  }

  const background_color = isHovered ? 'bg-gunmetal' : 'bg-darkpurple'

  const handleHover = () => {
    setIsHovered(!isHovered)
  }

  const icon = staged ? (
    <Minus size={15} color='white' />
  ) : (
    <Plus size={15} color='white' />
  )

  const handleClick = async () => {
    if (!staged) {
      await window.git.add(full_path)
    } else {
      await window.git.unstage(full_path)
    }
    afterClick()
  }

  return (
    <>
      <div
        className={`row small ${background_color}`}
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        <div className='col-8'>{name}</div>
        <div className='col-4'>
          <div className='d-flex justify-content-end'>
            <Button onClick={handleClick} className='text-end'>
              {icon}
            </Button>
            <div className={`ps-2 mt-1 ${status_color}`}>{status}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default File
