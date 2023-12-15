/**
 * @file components/Button.tsx
 * @brief Basic Button component
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'

/**
 * Button component.
 * @param {ComponentPropsWithoutRef<'button'>} props - The button props.
 * @returns {JSX.Element} The rendered button element.
 */
function Button({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={clsx('btn m-0 p-0', className)} {...props}>
      {children}
    </button>
  )
}

export default Button
