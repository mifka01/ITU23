/**
 * @file components/CollapseList.tsx
 * @brief Component for collapsing/expanding section
 * @author Radim Mifka (xmifka00)
 * @date November 2023
 */

import { ReactNode, useState, useCallback } from 'react'
import CollapseButton from 'components/CollapseButton'
import { LucideIcon } from 'lucide-react'
import clsx from 'clsx'
import Button from 'components/Button'
import './CollapseList.css'

type Buttons = {
  text: LucideIcon | string
  tooltip?: string
  onClick: () => void
}[]

interface CollapseListProps {
  heading: String
  items: ReactNode[]
  className?: String
  buttons?: Buttons
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
          'heading bg-darkpurple',
          { ['bg-gunmetal']: isHovered },
          className,
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className='d-flex px-2'>
          <span className='me-auto'>{heading}</span>
          {buttons?.map(
            (button, index) =>
              isHovered && (
                <Button
                  key={index}
                  onClick={button.onClick}
                  title={button.tooltip}
                  className='text-beige border-0 pe-2'
                >
                  {typeof button.text === 'string' ? (
                    button.text
                  ) : (
                    <button.text size={20} />
                  )}
                </Button>
              ),
          )}
          <CollapseButton collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
      </div>

      <div
        className={clsx('d-flex flex-column overflow-auto', {
          'minimal-item': !collapsed && items.length > 0,
        })}
      >
        {!collapsed && items}
      </div>
    </>
  )
}

export default CollapseList
