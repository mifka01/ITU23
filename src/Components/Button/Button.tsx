/**
 * @file components/Button.tsx
 * @brief Basic Button component
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import clsx from 'clsx'
import { ComponentPropsWithoutRef } from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'

/**
 * Button component.
 * @param {ComponentPropsWithoutRef<'button'>} props - The button props.
 * @returns {JSX.Element} The rendered button element.
 */
function Button({
  children,
  className,
  title,
  ...props
}: ComponentPropsWithoutRef<'button'>) {
  const tooltip = (
    <Tooltip id='tooltip' style={{ position: 'fixed' }}>
      {title}
    </Tooltip>
  )
  const button = (
    <button className={clsx('btn m-0 p-0', className)} {...props}>
      {children}
    </button>
  )
  return title ? (
    <OverlayTrigger
      placement='auto'
      overlay={tooltip}
      delay={{ show: 1000, hide: 500 }}
    >
      {button}
    </OverlayTrigger>
  ) : (
    button
  )
}

export default Button
