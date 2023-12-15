/**
 * @file Portal.tsx
 * @brief React component for the portal.
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import { createPortal } from 'react-dom'
import { Modal, ModalProps } from 'components/Modal'

interface PortalProps extends ModalProps {
  showModal: boolean
}

function Portal({ showModal, children, ...props }: PortalProps) {
  return (
    <>
      {showModal &&
        createPortal(
          <Modal key={'modal-0'} {...props}>
            {children}
          </Modal>,
          document.body,
        )}
    </>
  )
}
export default Portal
