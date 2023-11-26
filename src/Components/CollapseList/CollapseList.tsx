// @file components/CollapseList.tsx
// @brief Component for collapsing/expanding section
// @author Radim Mifka (xmifka00)
// @date November 2023

import { ReactNode, useState } from 'react'
import CollapseButton from 'components/CollapseButton'
import clsx from 'clsx'

interface CollapseListProps {
  heading: String
  className?: String
  items: ReactNode[]
}

function CollapseList({ items, heading, className }: CollapseListProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)

  return (
    <>
      <div
        className={clsx(
          'row border border-davygray border-start-0 border-end-0 ',
          className,
        )}
      >
        <div className='col-10'>{heading}</div>
        <div className='col-2 text-end'>
          <CollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      </div>
      <div className={clsx({ ['d-none']: collapsed })}>{items}</div>
    </>
  )
}

export default CollapseList
