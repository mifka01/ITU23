// @file components/Stage.tsx
// @brief Component for managing git status and staging
// @author Radim Mifka (xmifka00)
// @date November 2023

import { useState, useEffect, Dispatch, SetStateAction } from 'react'
import File from 'components/File'
import CollapseButton from 'components/CollapseButton'
import clsx from 'clsx'

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
  const [stagedCollapsed, setStagedCollapsed] = useState<boolean>(false)
  const [changesCollapsed, setChangesCollapsed] = useState<boolean>(false)

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
      <div className='text-start mt-5 text-beige'>
        <div className='row border border-davygray border-start-0 border-end-0'>
          <div className='col-10'>Staged Changes</div>
          <div className='col-2 text-end'>
            <CollapseButton
              collapsed={stagedCollapsed}
              setCollapsed={setStagedCollapsed}
            />
          </div>
        </div>
        <div className={clsx({ ['d-none']: stagedCollapsed })}>
          {staged.map((file) => (
            <File
              key={file.path}
              afterClick={fetch}
              staged={true}
              full_path={file.path}
              status={file.status}
            />
          ))}
        </div>
        <div className='row border border-davygray border-start-0 border-end-0'>
          <div className='col-10'>Changes</div>
          <div className='col-2 text-end'>
            <CollapseButton
              collapsed={changesCollapsed}
              setCollapsed={setChangesCollapsed}
            />
          </div>
        </div>
        <div className={clsx({ ['d-none']: changesCollapsed })}>
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
      </div>
    </>
  )
}

export default Stage
