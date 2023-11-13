// @file components/CollapseButton.tsx
// @brief Component for collapsing/expanding sections
// @author Radim Mifka (xmifka00)
// @date November 2023

import { Dispatch, SetStateAction, ComponentPropsWithoutRef } from 'react'
import Button from 'components/Button'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CollapseButtonProps extends ComponentPropsWithoutRef<'button'> {
  collapsed: boolean
  setCollapsed: Dispatch<SetStateAction<boolean>>
}

function CollapseButton({ collapsed, setCollapsed }: CollapseButtonProps) {
  let collapsed_icon = collapsed ? <ChevronUp /> : <ChevronDown />

  return (
    <Button
      className='text-beige border-0'
      onClick={() => {
        setCollapsed(!collapsed)
      }}
    >
      {collapsed_icon}
    </Button>
  )
}

export default CollapseButton
