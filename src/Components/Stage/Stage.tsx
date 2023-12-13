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

type StatusResult = {
  not_added: string[]
  deleted: string[]
  created: string[]
  files: { path: string }[]
}

function getStatus(filename: string, inputObject: StatusResult) {
  if (inputObject.not_added.includes(filename)) {
    return 'U'
  } else if (inputObject.deleted.includes(filename)) {
    return 'D'
  } else if (inputObject.created.includes(filename)) {
    return 'A'
  }
  return 'M'
}

interface StageProps {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
  setShowModal?: Dispatch<SetStateAction<boolean>>
  setModal?: Dispatch<SetStateAction<ModalProps>>
}

function Stage({ setRefreshLog, setShowModal, setModal }: StageProps) {
  const [notAdded, setNotAdded] = useState<FileEntry[]>([])
  const [staged, setStaged] = useState<FileEntry[]>([])

  const handleStageAll = async () => {
    await window.git.add()
    fetchStatus()
  }

  const handleUnstageAll = async () => {
    await window.git.unstage()
    fetchStatus()
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
              await window.git.discard_unstaged()
              fetchStatus()
              setShowModal?.(false)
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

    let staged_files: FileEntry[] = []
    let not_added: FileEntry[] = []

    response.files.forEach((file: { path: string }) => {
      const entry: FileEntry = {
        path: file.path,
        status: getStatus(file.path, response),
      }
      if (response.staged.includes(file.path)) staged_files.push(entry)
      else not_added.push(entry)
    })

    setStaged(staged_files)
    setNotAdded(not_added)

    setRefreshLog?.(true)
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
        <Commit afterSubmit={fetchStatus} />
        <CollapseList
          heading={'Staged changes'}
          className='border-top border-bottom border-davygray'
          buttons={staged_buttons}
          items={staged.map((file) => (
            <File
              key={file.path}
              afterClick={fetchStatus}
              staged={true}
              full_path={file.path}
              status={file.status}
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
              afterClick={fetchStatus}
              staged={false}
              full_path={file.path}
              status={file.status}
            />
          ))}
        />
      </div>
    </>
  )
}

export default Stage
