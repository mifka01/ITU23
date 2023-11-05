// @file Stage component
// @brief
// @author Radim Mifka (xmifka00)
// @date October 2023
import { useState, useEffect } from 'react'
import File from 'components/File'

function Stage() {
  const [notAdded, setNotAdded] = useState<any[]>([])
  const [staged, setStaged] = useState<any[]>([])

  function getStatus(filename: string, inputObject) {
    if (inputObject.not_added.includes(filename)) {
      return 'U'
    } else if (inputObject.deleted.includes(filename)) {
      return 'D'
    } else if (inputObject.created.includes(filename)) {
      return 'A'
    }
    return 'M'
  }

  const fetch = async () => {
    const response = await window.git.status()
    console.log(response)

    let staged_files = []
    let not_added = []

    response.files.forEach((file) => {
      const entry = {
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
        {staged.map((file, index) => (
          <File
            afterClick={fetch}
            staged={true}
            index={String(index)}
            full_path={file.path}
            status={file.status}
          />
        ))}

        <div className='row'>
          <div className='border border-davygray border-start-0 border-end-0'>
            Changes
          </div>
        </div>
        {notAdded.map((file, index) => (
          <File
            afterClick={fetch}
            staged={false}
            index={String(index)}
            full_path={file.path}
            status={file.status}
          />
        ))}
      </div>
    </>
  )
}

export default Stage
