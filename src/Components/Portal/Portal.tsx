/**
 * @file Portal.tsx
 * @brief React component for the portal.
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import { createPortal } from 'react-dom'
import { PropsWithChildren } from 'react'
import Modal from 'components/Modal'

interface PortalProps extends PropsWithChildren {
  show: boolean
  buttons?: {
    text: string
    onClick?: () => void
    className?: string
  }[]
}

function Portal({ show, children, buttons, ...props }: PortalProps) {
  return (
    <>
      {show &&
        createPortal(
          <Modal buttons={buttons} key={'modal-0'} {...props}>
            {children}
          </Modal>,
          document.body,
        )}
    </>
  )
}
export default Portal
