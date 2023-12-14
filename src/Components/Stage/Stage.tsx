// @file components/Stage.tsx
// @brief Component for managing git status and staging
// @author Radim Mifka (xmifka00)
// @date November 2023

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import File from 'components/File'
import CollapseList from 'components/CollapseList'
import Commit from 'components/Commit'
import { Plus, Minus, Undo2 } from 'lucide-react'
import { ModalProps } from 'components/Modal'

type FileEntry = { path: string; status: string }

interface StageProps {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
  setRefreshCommitTree?: Dispatch<SetStateAction<boolean>>
  setShowModal?: Dispatch<SetStateAction<boolean>>
  setModal?: Dispatch<SetStateAction<ModalProps>>
  setCurrentFile?: Dispatch<SetStateAction<string>>
}

function Stage({
  setRefreshLog,
  setRefreshCommitTree,
  setShowModal,
  setModal,
  setCurrentFile,
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
      setRefreshLog?.(true)
    }
  }

  useEffect(() => {
    window.app.request_refresh(fetchStatus)
    fetchStatus()
    return () => {
      window.app.request_refresh(fetchStatus, true)
    }
  }, [])

  return (
    <>
      <div className='col-12 text-start text-beige'>
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
              full_path={file.path}
              status={file.status}
              onClick={() => {
                setCurrentFile?.(file.path)
              }}
            />
          ))}
        />

        <CollapseList
          heading={'Changes'}
          className='border-top border-bottom border-davygray'
          buttons={notAdded_buttons}
          items={notAdded.map((file) => (
            <File
              key={file.path}
              afterAction={fetchStatus}
              staged={false}
              full_path={file.path}
              status={file.status}
              onClick={() => {
                setCurrentFile?.(file.path)
              }}
            />
          ))}
        />
      </div>
    </>
  )
}

export default Stage
