// @file components/Button.tsx
// @brief Basic Button component
// @author Michal Zapletal (xzaple41)
// @date October 2023

import { ComponentPropsWithoutRef } from 'react'

function Button({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button {...props} className={`btn m-0 p-0 ${className}`}>
      {children}
    </button>
  )
}

export default Button
