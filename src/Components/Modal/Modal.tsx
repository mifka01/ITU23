/**
 * @file Modal.tsx
 * @brief React component for the modal.
 * @author Radim Mifka (xmifka00)
 * @date December 2023
 */

import { PropsWithChildren } from 'react'
import Button from 'components/Button'
import './Modal.css'

interface ModalProps extends PropsWithChildren {
  buttons?: {
    text: string
    onClick?: () => void
    className?: string
  }[]
}

function Modal({ children, buttons }: ModalProps) {
  return (
    <div className='modal d-block backdrop'>
      <div className='modal-dialog modal-dialog-centered '>
        <div className='modal-content bg-gunmetal text-beige border-davygray rounded-0'>
          <div className='modal-body text-ecru text-center'>{children}</div>
          <div className='modal-footer border-0'>
            <div className='col-12'>
              <div className='row'>
                {buttons?.map(({ text, onClick, className }) => (
                  <div className='col text-center'>
                    <Button
                      className={`border-0 ${
                        className ? className : 'text-beige'
                      }`}
                      onClick={() => {
                        onClick?.()
                      }}
                    >
                      {text}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
