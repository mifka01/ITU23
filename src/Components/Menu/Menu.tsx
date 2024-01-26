/**
 * @file components/Menu.tsx
 * @brief Menu component
 * @author Michal Zapletal (xzaple41)
 * @author Radim Mifka (xmifka00)
 * @date October 2023
 */

import MenuButton from 'components/MenuButton'
import Portal from 'components/Portal'

import {
  ArrowUpFromLine,
  ArrowDownToLine,
  Undo2,
  GitCompareArrows,
  RotateCw,
} from 'lucide-react'
import { ChangeEvent, Dispatch } from 'react'
import { useRef, useState } from 'react'

interface Props {
  dispatch: Dispatch<Actions>
}

enum ModalType {
  NONE = 0,
  REVERT,
  AMEND,
}

function Menu({ dispatch }: Props) {
  const commitMessage = useRef<string>('')
  const [modal, setModal] = useState({ show: false, type: ModalType.NONE })

  const handlePush = async () => {
    await window.git.push()
    dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }
  const handlePull = async () => {
    await window.git.pull()
    dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  const handleRevert = async () => {
    setModal({ show: true, type: ModalType.REVERT })
  }

  const handleAmend = async () => {
    setModal({ show: true, type: ModalType.AMEND })
  }

  const handleFetch = async () => {
    const response = await window.git.fetch()
    if (!response.status) dispatch({ type: 'REFRESH_BRANCHES' })
    else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  const handleCommitMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    commitMessage.current = value
  }

  const buttons = [
    {
      Icon: ArrowUpFromLine,
      text: 'push',
      onClick: handlePush,
      tooltip: 'Takes all commited changes and send them to the remote server.',
    },
    {
      Icon: ArrowDownToLine,
      text: 'pull',
      onClick: handlePull,
      tooltip: 'Takes all remote changes on this branch and pulls them.',
    },
    {
      Icon: Undo2,
      text: 'revert',
      onClick: handleRevert,
      tooltip: 'Remove all changes that were made by last commit.',
    },
    {
      Icon: GitCompareArrows,
      text: 'fetch',
      onClick: handleFetch,
      tooltip: 'Same as PULL, but for all local branches.',
    },
    {
      Icon: RotateCw,
      text: 'amend',
      onClick: handleAmend,
      tooltip:
        'Renames last commit. Only non-pushed commits. Staged change are added, too.',
    },
  ]

  let modalChildren
  let modalButtons
  switch (modal.type) {
    case ModalType.REVERT:
      modalChildren = <span>Do you really wanna revert last commit ?</span>
      modalButtons = [
        {
          text: 'Leave',
          onClick: () => {
            setModal({ show: false, type: ModalType.NONE })
          },
        },
        {
          text: 'Revert',
          onClick: async () => {
            await window.git.revert()
            dispatch({ type: 'REFRESH_COMMIT_HISTORY' })
            setModal({ show: false, type: ModalType.NONE })
          },
        },
      ]
      break
    case ModalType.AMEND:
      modalChildren = (
        <>
          <span>Change last commit message</span>
          <br />
          <span className={'text-danger small'}>WARNING: </span>
          <span className='small'>Includes all staged changes.</span>
          <input
            type='text'
            name='commit_name'
            style={{ resize: 'none' }}
            autoFocus
            className='form-control bg-gunmetal border border-davygray text-beige shadow-none mt-3'
            placeholder='New commit message'
            defaultValue={commitMessage.current}
            onChange={handleCommitMessageChange}
          />
        </>
      )

      modalButtons = [
        {
          text: 'Leave',
          onClick: () => {
            setModal({ show: false, type: ModalType.NONE })
          },
        },
        {
          text: 'Rename',
          onClick: async () => {
            await window.git.amend(commitMessage.current)
            dispatch({ type: 'REFRESH_COMMIT_HISTORY' })
            setModal({ show: false, type: ModalType.NONE })
          },
        },
      ]
      break
  }

  return (
    <>
      <Portal show={modal.show} buttons={modalButtons}>
        {modalChildren}
      </Portal>

      <ul className='list-group list-group-horizontal rounded-0 px-3 bg-darkpurple'>
        {buttons.map((button, index) => (
          <li
            key={index}
            className='list-group-item rounded-0 border-0 bg-transparent p-0 pe-3 py-2'
          >
            <MenuButton
              Icon={button.Icon}
              onClick={button.onClick}
              title={button.tooltip}
            >
              {button.text}
            </MenuButton>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Menu
