/**
 * @file components/Diff.tsx
 * @brief Diff output
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import { useEffect, useState, Dispatch } from 'react'
import clsx from 'clsx'
import { X } from 'lucide-react'

interface Path {
  currentFile?: string
  dispatch: Dispatch<Actions>
}

type DiffEntry = { mark: string; line_num: string; line: string }

function Diff({ currentFile, dispatch }: Path) {
  const [data, setData] = useState<DiffEntry[]>([])

  const fetchData = async () => {
    const response = await window.git.getDiff(currentFile)
    if (!response.status && response.payload) setData(response.payload.data)
    dispatch({ type: 'REFRESH_LOG_MESSAGES' })
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
      <div className='heading bg-darkpurple text-beige d-flex justify-content-between align-items-center border-bottom border-davygray'>
        <span className='ps-2'>
          {currentFile ? currentFile : 'Neither file nor commit selected'}
        </span>
        {currentFile ? (
          <span
            role='button'
            onClick={() => {
              dispatch({ type: 'RESET_CURRENT_FILE' })
            }}
          >
            <X size={20} className='me-2' />
          </span>
        ) : null}
      </div>

      <pre className='d-flex bg-gunmetal flex-column overflow-auto m-0'>
        {data.map((element, index) => {
          return (
            <div className='d-flex' key={'diff-line-' + index}>
              <code
                className={clsx('ps-3 pe-3 bg-opacity-50', {
                  'bg-lineok': element.mark === '+',
                  'bg-linenok': element.mark === '-',
                  'bg-linenochange': element.mark === ' ',
                })}
                style={{ width: '50px', minWidth: '50px' }}
              >
                {element.line_num}
              </code>
              <code
                className={clsx('flex-fill bg-opacity-50 ps-1', {
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
