/**
 * @file components/ListItem.tsx
 * @brief Component general item in list
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

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
      className={`d-flex px-2 small ${background_color}`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className='me-auto text-truncate'>{start}</div>

      {isHovered && <div className='text-nowrap px-2'>{hovered}</div>}

      <div className=''>{end}</div>
    </div>
  )
}

export default ListItem
