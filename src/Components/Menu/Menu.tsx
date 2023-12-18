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
import { ChangeEvent, Dispatch } from 'react'
import { useRef } from 'react'

interface Props {
  dispatch: Dispatch<Actions>
}
function Menu({ dispatch }: Props) {
  const commitMessage = useRef<string>('')

  const handlePush = async () => {
    await window.git.push()
    dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }
  const handlePull = async () => {
    await window.git.pull()
    dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  const handleRevert = async () => {
    dispatch({
      type: 'SET_MODAL',
      payload: {
        children: (
          <>
            <span>Do you really wanna revert last commit ?</span>
          </>
        ),
        buttons: [
          {
            text: 'Leave',
          },
          {
            text: 'Revert',
            onClick: async () => {
              await window.git.revert()
              dispatch({ type: 'REFRESH_COMMIT_HISTORY' })
            },
          },
        ],
      },
    })
    dispatch({ type: 'REFRESH_COMMIT_HISTORY' })
  }

  const handleFetch = async () => {
    const response = await window.git.fetch()
    if (!response.status) {
      dispatch({ type: 'REFRESH_BRANCHES' })
      return
    }
    dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  const handleCommitMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    commitMessage.current = value
  }

  const handleAmend = async () => {
    dispatch({
      type: 'SET_MODAL',
      payload: {
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
          },
          {
            text: 'Rename',
            onClick: async () => {
              await window.git.amend(commitMessage.current)
              dispatch({ type: 'REFRESH_COMMIT_HISTORY' })
            },
          },
        ],
      },
    })
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
