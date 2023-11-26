// @file components/Stage.tsx
// @brief Component for managing git status and staging
// @author Radim Mifka (xmifka00)
// @date November 2023

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import File from 'components/File'
import CollapseList from 'components/CollapseList'
import Commit from 'components/Commit'

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
}

function Stage({ setRefreshLog }: StageProps) {
  const [notAdded, setNotAdded] = useState<FileEntry[]>([])
  const [staged, setStaged] = useState<FileEntry[]>([])

  const fetch = async () => {
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

      setStaged(staged_files)
      setNotAdded(not_added)
    })

    if (setRefreshLog != undefined) setRefreshLog(true)
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <div className='text-start text-beige'>
        <Commit />
        <CollapseList
          className='border-bottom-0'
          heading={'Staged changes'}
          items={staged.map((file) => (
            <File
              key={file.path}
              afterClick={fetch}
              staged={true}
              full_path={file.path}
              status={file.status}
            />
          ))}
        />

        <CollapseList
          heading={'Changes'}
          items={notAdded.map((file) => (
            <File
              key={file.path}
              afterClick={fetch}
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
