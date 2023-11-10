// @file components/Stage.tsx
// @brief Component for managing git status and staging
// @author Radim Mifka (xmifka00)
// @date November 2023

import { useState, useEffect } from 'react'
import File from 'components/File'

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

function Stage() {
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
      if (response.staged.includes(file.path)) {
        staged_files.push(entry)
      } else {
        not_added.push(entry)
      }

      setStaged(staged_files)
      setNotAdded(not_added)
    })
  }

  useEffect(() => {
    fetch()
  }, [])

  return (
    <>
      <div className='text-start mt-5'>
        <div className='row'>
          <div className='border border-davygray border-start-0 border-end-0'>
            Staged Changes
          </div>
        </div>
        {staged.map((file) => (
          <File
            key={file.path}
            afterClick={fetch}
            staged={true}
            full_path={file.path}
            status={file.status}
          />
        ))}
        <div className='row'>
          <div className='border border-davygray border-start-0 border-end-0'>
            Changes
          </div>
        </div>
        {notAdded.map((file) => (
          <File
            key={file.path}
            afterClick={fetch}
            staged={false}
            full_path={file.path}
            status={file.status}
          />
        ))}
      </div>
    </>
  )
}

export default Stage
