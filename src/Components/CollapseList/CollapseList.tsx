// @file components/CollapseList.tsx
// @brief Component for collapsing/expanding section
// @author Radim Mifka (xmifka00)
// @date November 2023

import {ReactNode, useState, useCallback} from 'react'
import CollapseButton from 'components/CollapseButton'
import { LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import Button from 'components/Button'

interface CollapseListProps {
  heading: String
  items: ReactNode[]
  className?: String
  buttons?: { Icon: LucideIcon; onClick: () => Promise<void> }[]
}

function CollapseList({
  items,
  heading,
  className,
  buttons,
}: CollapseListProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [isHovered, setIsHovered] = useState<boolean>(false)

  const onMouseEnter = useCallback(() => {
    if (buttons) setIsHovered(true)
  }, [buttons])

  const onMouseLeave = useCallback(() => {
    if (buttons) setIsHovered(false)
  }, [buttons])

  return (
    <>
      <div
        className={clsx(
          'heading row bg-darkpurple',
          { ['bg-gunmetal']: isHovered },
          className,
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className='col-auto'>
          <span>{heading}</span>
        </div>
        <div className='col text-end'>
          {buttons?.map(
            (button, index) =>
              isHovered && (
                <Button
                  key={index}
                  onClick={button.onClick}
                  className='text-beige border-0 pe-2'
                >
                  <button.Icon size={20} />
                </Button>
              ),
          )}
          <CollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      </div>

      <div className='items'>{!collapsed && items}</div>
    </>
  )
}

export default CollapseList
