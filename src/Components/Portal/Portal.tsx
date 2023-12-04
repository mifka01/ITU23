import { createPortal } from 'react-dom'
import { Modal, ModalProps } from 'components/Modal'

interface PortalProps extends ModalProps {
  showModal: boolean
}

function Portal({ showModal, children, ...props }: PortalProps) {
  return (
    <>
      {showModal &&
        createPortal(<Modal {...props}>{children}</Modal>, document.body)}
    </>
  )
}
export default Portal
