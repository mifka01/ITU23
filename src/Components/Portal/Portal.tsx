/**
 * @file Portal.tsx
 * @brief React component for the portal.
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import { createPortal } from 'react-dom'
import { Dispatch } from 'react'
import { default as CModal } from 'components/Modal'

interface PortalProps extends Modal {
  modal?: Modal
  dispatch: Dispatch<Actions>
}

function Portal({ modal, ...props }: PortalProps) {
  return (
    <>
      {modal &&
        createPortal(
          <CModal buttons={modal.buttons} key={'modal-0'} {...props}>
            {modal.children}
          </CModal>,
          document.body,
        )}
    </>
  )
}
export default Portal
