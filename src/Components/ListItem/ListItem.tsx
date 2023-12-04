// @file components/ListItem.tsx
// @brief Component general item in list
// @author Radim Mifka (xmifka00)
// @date December 2023

import { ReactNode, useState } from 'react'

interface ListItemProps {
  start?: ReactNode
  end?: ReactNode
  hovered?: ReactNode
}

function ListItem({ start, end, hovered }: ListItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const background_color = isHovered ? 'bg-gunmetal' : 'bg-darkpurple'

  const handleHover = () => {
    setIsHovered(!isHovered)
  }
  return (
    <div
      className={`row small ${background_color}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className='col-8 mt-1'>{start}</div>
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
