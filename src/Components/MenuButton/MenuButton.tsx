// @file components/MenuButton.tsx
// @brief Menu Button component
// @author Michal Zapletal (xzaple41)
// @date October 2023

import Button from 'components/Button'
import { ComponentType, ComponentPropsWithoutRef } from 'react'
import { LucideProps } from 'lucide-react'
import './MenuButton.css'

interface Props extends ComponentPropsWithoutRef<'button'> {
  Icon: ComponentType<LucideProps>
}

function MenuButton({ Icon, children, className, ...props }: Props) {
  return (
    <Button
      {...props}
      className={`btn-darkpurple border border-davygray border-3 btn-square text-ecru h-10 w-10 ${className}`}
    >
      <Icon size={32} />
      <div className='text-center'>
        <p className='mb-0 text-white text-uppercase small'>{children}</p>
      </div>
    </Button>
  )
}

export default MenuButton
