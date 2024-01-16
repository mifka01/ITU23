/**
 * @file componets/Stage.tsx
 * @brief Stage component.
 * @author Radim Mifka (xmifka00)
 * @date November 2023
 */

import { useEffect, useState, Dispatch } from 'react'
import File from 'components/File'
import CollapseList from 'components/CollapseList'
import Commit from 'components/Commit'
import { Plus, Minus, Undo2, LucideIcon } from 'lucide-react'

type Buttons = {
  text: LucideIcon | string
  tooltip?: string
  onClick: () => void
}[]

interface StageProps {
  refresh: number
  dispatch: Dispatch<Actions>
}

type FileEntry = Path & {
  status: string
}
type Files = FileEntry[]
type Stage = { not_added: Files; staged: Files }

function Stage({ refresh, dispatch }: StageProps) {
  const [stage, setStage] = useState<Stage>({ not_added: [], staged: [] })
  const handleStageAll = async () => {
    const response = await window.git.add()
    if (!response.status) fetchStatus()
    else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  const handleUnstageAll = async () => {
    const response = await window.git.unstage()
    if (!response.status) fetchStatus()
    else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  const handleDiscardAll = async () => {
    dispatch({
      type: 'SET_MODAL',
      payload: {
        children: <span>Are you sure you want to discard all changes?</span>,
        buttons: [
          {
            text: 'No',
          },
          {
            text: 'Yes',
            onClick: async () => {
              const response = await window.git.discard_unstaged()
              if (!response.status) fetchStatus()
              else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
            },
          },
        ],
      },
    })
  }

  const notAdded_buttons: Buttons = [
    {
      text: Undo2,
      onClick: handleDiscardAll,
    },
    {
      text: Plus,
      onClick: handleStageAll,
    },
  ]
  const staged_buttons: Buttons = [
    {
      text: Minus,
      onClick: handleUnstageAll,
    },
  ]

  const fetchStatus = async () => {
    const response = await window.git.status()

    if (!response.status && response.payload) {
      setStage({
        staged: response.payload.staged,
        not_added: response.payload.not_added,
      })

      dispatch({
        type: 'STAGE_SET',
      })
    } else dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  useEffect(() => {
    window.app.request_refresh(fetchStatus)
    fetchStatus()
    return () => {
      window.app.request_refresh(fetchStatus, true)
    }
  }, [])

  useEffect(() => {
    fetchStatus()
  }, [refresh])

  return (
    <>
      <Commit
        afterSubmit={() => {
          fetchStatus()
        }}
      />
      <CollapseList
        heading={'Staged changes'}
        className='border-top border-bottom border-davygray'
        buttons={staged_buttons}
        items={stage.staged.map((file) => (
          <File
            key={file.path}
            afterAction={fetchStatus}
            staged={true}
            fileEntry={file}
            status={file.status}
            onClick={() => {
              dispatch({
                type: 'SET_CURRENT_FILE',
                payload: file.path,
              })
            }}
          />
        ))}
      />

      <CollapseList
        heading={'Changes'}
        className='border-top border-bottom border-davygray '
        buttons={notAdded_buttons}
        items={stage.not_added.map((file) => (
          <File
            key={file.path}
            afterAction={fetchStatus}
            staged={false}
            fileEntry={file}
            status={file.status}
            onClick={() => {
              dispatch({
                type: 'SET_CURRENT_FILE',
                payload: file.path,
              })
            }}
          />
        ))}
      />
    </>
  )
}

export default Stage
