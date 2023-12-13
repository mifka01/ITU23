// @file components/ListItem.tsx
// @brief Component general item in list
// @author Radim Mifka (xmifka00)
// @date December 2023

import {Dispatch, ReactNode, SetStateAction, useState} from 'react'

interface ListItemProps {
  start?: ReactNode
  end?: ReactNode
  hovered?: ReactNode
  setFilePath: Dispatch<SetStateAction<string>>
  full_path: string
}

function ListItem({ start, end, hovered, setFilePath, full_path }: ListItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const background_color = isHovered ? 'bg-gunmetal' : 'bg-darkpurple'

  const handleHover = () => {
    setIsHovered(!isHovered)
  }

  const handleOnClick = async () => {
    setFilePath(full_path)
  }

  return (
    <div
      className={`row small ${background_color}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className='col-8 mt-1' onClick={handleOnClick}>{start}</div>
      <div className='col-4'>
        <div className='d-flex justify-content-end'>
          {isHovered && <div className='text-end'>{hovered}</div>}
          <div className={`ps-2 mt-1 text-end`}>{end}</div>
        </div>
      </div>
    </div>
  )
}

export default ListItem
