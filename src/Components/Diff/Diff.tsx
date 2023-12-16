/**
 * @file components/Diff.tsx
 * @brief Diff output
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface Path {
  currentFile?: string
}

type DiffEntry = { mark: string; line_num: string; line: string }

function Diff({ currentFile }: Path) {
  const [data, setData] = useState<DiffEntry[]>([])

  const fetchData = async () => {
    const response = await window.git.getDiff(currentFile)
    if (!response.status && response.payload) {
      setData(response.payload.data)
    }
  }

  useEffect(() => {
    if (!currentFile) {
      setData([])
      return
    }

    fetchData()
  }, [currentFile])

  return (
    <>
      <div className='bg-darkpurple text-beige text-start border-bottom border-davygray'>
        <span className='ps-2'>
          {currentFile ? currentFile : 'No file selected'}
        </span>
      </div>

      <pre className='d-flex bg-gunmetal flex-column overflow-auto m-0'>
        {data.map((element,index) => {
          return (
            <div className='d-flex' key={"diff-line-"+index}>
              <code className='ms-3 me-auto bg-opacity-50'>
                {element.line_num}
              </code>
              <code
                className={clsx('ms-3 flex-fill bg-opacity-50', {
                  'bg-codeok': element.mark === '+',
                  'bg-codenok': element.mark === '-',
                })}
              >
                {element.line}
              </code>
            </div>
          )
        })}
      </pre>
    </>
  )
}
// {result.map((element) => (<code>{element}</code>))}
export default Diff
