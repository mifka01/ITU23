/**
 * @file componets/Stage.tsx
 * @brief Stage component.
 * @author Radim Mifka (xmifka00)
 * @date November 2023
 */

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import File from 'components/File'
import CollapseList from 'components/CollapseList'
import Commit from 'components/Commit'
import { Plus, Minus, Undo2 } from 'lucide-react'
import { ModalProps } from 'components/Modal'

type FileEntry = {
  filename: string
  dirname: string
  path: string
  status: string
}

interface StageProps {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
  setRefreshCommitTree?: Dispatch<SetStateAction<boolean>>
  setShowModal?: Dispatch<SetStateAction<boolean>>
  setModal?: Dispatch<SetStateAction<ModalProps>>
  setRefreshStage?: Dispatch<SetStateAction<boolean>>
  refreshStage?: boolean
  setCurrentFile?: Dispatch<SetStateAction<string | undefined>>
  currentFile?: string | undefined
}

function Stage({
  setRefreshLog,
  setRefreshCommitTree,
  setShowModal,
  setModal,
  setRefreshStage,
  refreshStage,
  setCurrentFile,
  currentFile,
}: StageProps) {
  const [notAdded, setNotAdded] = useState<FileEntry[]>([])
  const [staged, setStaged] = useState<FileEntry[]>([])

  const handleStageAll = async () => {
    const response = await window.git.add()
    if (!response.status) fetchStatus()
  }

  const handleUnstageAll = async () => {
    const response = await window.git.unstage()
    if (!response.status) fetchStatus()
  }

  const handleDiscardAll = async () => {
    if (setModal && setShowModal) {
      setModal({
        children: <span>Are you sure you want to discard all changes?</span>,
        buttons: [
          {
            text: 'No',
            onClick: () => {
              setShowModal?.(false)
            },
          },
          {
            text: 'Yes',
            onClick: async () => {
              const response = await window.git.discard_unstaged()
              if (!response.status) {
                fetchStatus()
                setShowModal?.(false)
              }
            },
          },
        ],
      })
      setShowModal(true)
    }
  }

  const notAdded_buttons = [
    {
      text: Undo2,
      onClick: handleDiscardAll,
    },
    {
      text: Plus,
      onClick: handleStageAll,
    },
  ]
  const staged_buttons = [
    {
      text: Minus,
      onClick: handleUnstageAll,
    },
  ]

  const fetchStatus = async () => {
    const response = await window.git.status()

    if (!response.status && response.payload) {
      setStaged(response.payload.staged)
      setNotAdded(response.payload.not_added)

      if (currentFile && !notAdded.some((entry) => entry.path === currentFile))
        setCurrentFile?.(undefined)
    }
    setRefreshLog?.(true)
  }

  useEffect(() => {
    window.app.request_refresh(fetchStatus)
    fetchStatus()
    return () => {
      window.app.request_refresh(fetchStatus, true)
    }
  }, [])

  useEffect(() => {
    if (refreshStage) {
      fetchStatus()
      setRefreshStage?.(false)
    }
  }, [refreshStage])

  return (
    <>
      <Commit
        afterSubmit={() => {
          fetchStatus()
          setRefreshCommitTree?.(true)
        }}
      />
      <CollapseList
        heading={'Staged changes'}
        className='border-top border-bottom border-davygray'
        buttons={staged_buttons}
        items={staged.map((file) => (
          <File
            key={file.path}
            afterAction={fetchStatus}
            staged={true}
            fileEntry={file}
            status={file.status}
            onClick={() => {
              setCurrentFile?.(file.path)
            }}
          />
        ))}
      />

      <CollapseList
        heading={'Changes'}
        className='border-top border-bottom border-davygray '
        buttons={notAdded_buttons}
        items={notAdded.map((file) => (
          <File
            key={file.path}
            afterAction={fetchStatus}
            staged={false}
            fileEntry={file}
            status={file.status}
            onClick={() => {
              setCurrentFile?.(file.path)
            }}
          />
        ))}
      />
    </>
  )
}

export default Stage
