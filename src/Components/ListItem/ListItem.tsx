/**
 * @file components/ListItem.tsx
 * @brief Component general item in list
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import { ReactNode, useState } from 'react'
import clsx from 'clsx'

interface ListItemProps {
  start?: ReactNode
  end?: ReactNode
  hovered?: ReactNode
}

function ListItem({ start, end, hovered }: ListItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={clsx('d-flex px-2 small bg-darkpurple', {
        'bg-gunmetal': isHovered,
      })}
      onMouseOver={() => {
        setIsHovered(true)
      }}
      onMouseOut={() => {
        setIsHovered(false)
      }}
    >
      <div className='me-auto text-truncate'>{start}</div>

      {isHovered && <div className='text-nowrap px-2'>{hovered}</div>}

      <div className=''>{end}</div>
    </div>
  )
}

export default ListItem
