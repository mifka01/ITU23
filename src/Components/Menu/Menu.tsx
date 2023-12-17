/**
 * @file components/Menu.tsx
 * @brief Menu component
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import MenuButton from 'components/MenuButton'
import {
  ArrowUpFromLine,
  ArrowDownToLine,
  Undo2,
  GitCompareArrows,
  RotateCw,
} from 'lucide-react'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { ModalProps } from 'components/Modal'
import { useRef } from 'react'

interface Props {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
  setShowModal?: Dispatch<SetStateAction<boolean>>
  setModal?: Dispatch<SetStateAction<ModalProps>>
  setRefreshBranches?: Dispatch<SetStateAction<boolean>>
  setRefreshCommitTree?: Dispatch<SetStateAction<boolean>>
}
function Menu({
  setRefreshLog,
  setShowModal,
  setModal,
  setRefreshBranches,
  setRefreshCommitTree,
}: Props) {
  const commitMessage = useRef<string>('')

  const handlePush = async () => {
    await window.git.push()
    setRefreshLog?.(true)
  }
  const handlePull = async () => {
    await window.git.pull()
    setRefreshLog?.(true)
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
              await window.git.revert()
              setRefreshLog?.(true)
              setShowModal?.(false)
              setRefreshCommitTree?.(true)
            },
          },
        ],
      })
      setShowModal(true)
    }
  }

  const handleFetch = async () => {
    const response = await window.git.fetch()
    if (!response.status) {
      setRefreshBranches?.(true)
    }
    setRefreshLog?.(true)
  }

  const handleCommitMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    commitMessage.current = value
  }

  const handleAmend = async () => {
    if (setModal && setShowModal) {
      setModal({
        children: (
          <>
            <span>Change last commit message</span>
            <br />
            <span className={'text-danger small'}>WARNING: </span>
            <span className='small'>Includes all staged changes.</span>
            <input
              type='text'
              name='commit_name'
              style={{ resize: 'none' }}
              className='form-control bg-gunmetal border border-davygray text-beige shadow-none mt-3'
              placeholder='New commit message'
              defaultValue={commitMessage.current}
              onChange={handleCommitMessageChange}
            />
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
            text: 'Rename',
            onClick: async () => {
              await window.git.amend(commitMessage.current)
              setRefreshLog?.(true)
              setShowModal?.(false)
              setRefreshCommitTree?.(true)
            },
          },
        ],
      })
      setShowModal(true)
    }
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
      tooltip:
        'Takes all changes on current branch that were made on remote and loads them into local.',
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
      tooltip:
        'Similar to PULL, but takes all changes on all branches and downloads it into local.',
    },
    {
      Icon: RotateCw,
      text: 'amend',
      onClick: handleAmend,
      tooltip:
        'Renames last commit. Only non-pushed commits can be renamed. Into renamed commit adds all actually staged changes.',
    },
  ]

  return (
    <>
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
