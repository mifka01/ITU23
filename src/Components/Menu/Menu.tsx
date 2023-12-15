/**
 * @file components/Menu.tsx
 * @brief Menu component
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */


import MenuButton from 'components/MenuButton'
import {ArrowUpFromLine, ArrowDownToLine, Undo2, GitCompareArrows} from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import {ModalProps} from "components/Modal";

interface Props {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
  setShowModal?: Dispatch<SetStateAction<boolean>>
  setModal?: Dispatch<SetStateAction<ModalProps>>
}
function Menu({ setRefreshLog, setShowModal, setModal }: Props) {
  const handlePush = async () => {
    const response = await window.git.push()
    if (!response.status) setRefreshLog?.(true)
  }
  const handlePull = async () => {
    const response = await window.git.pull()
    if (!response.status) setRefreshLog?.(true)
  }

  const handleRevert = async () => {
    if (setModal && setShowModal) {
      setModal({
        children: (
            <>
              <span>Do you really wanna revert last commit ?</span>
            </>
        ),
        buttons: [
          {
            text: 'Leave',
            onClick: () => {
              setShowModal?.(false)
            },
          },
          {
            text: 'Revert',
            onClick: async () => {
              const response = await window.git.revert()
              if (!response.status) setRefreshLog?.(true)
              setShowModal?.(false)
            },
          },
        ],
      })
      setShowModal(true)
    }
  }

  const handleFetch = async () => {
    const response = await window.git.fetch()
    if (!response.status) setRefreshLog?.(true)
  }

  const buttons = [
    { Icon: ArrowUpFromLine, text: 'push', onClick: handlePush },
    { Icon: ArrowDownToLine, text: 'pull', onClick: handlePull },
    { Icon: Undo2, text: 'revert', onClick: handleRevert },
    { Icon: GitCompareArrows, text: 'fetch', onClick: handleFetch },
  ]

  return (
    <>
      <ul className='list-group list-group-horizontal rounded-0 px-3 bg-darkpurple'>
        {buttons.map((button, index) => (
          <li
            key={index}
            className='list-group-item rounded-0 border-0 bg-transparent p-0 pe-3 py-2'
          >
            <MenuButton Icon={button.Icon} onClick={button.onClick}>
              {button.text}
            </MenuButton>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Menu
