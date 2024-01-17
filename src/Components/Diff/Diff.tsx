/**
 * @file components/Diff.tsx
 * @brief Diff output
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import clsx from 'clsx'
import { useState, useEffect, Dispatch } from 'react'

interface DiffProps {
  currentFile: string
  dispatch: Dispatch<Actions>
}

enum MARKS {
  PLUS = '+',
  MINUS = '-',
  SPACE = ' ',
}

type DiffEntry = { mark: string; line_num: string; line: string }

function Diff({ currentFile, dispatch }: DiffProps) {
  const [data, setData] = useState<DiffEntry[]>([])

  const fetch = async () => {
    const response = await window.git.getDiff(currentFile)
    if (!response.status && response.payload) setData(response.payload.data)
    dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  useEffect(() => {
    fetch()
  }, [currentFile])

  return (
    <>
      <pre className='d-flex bg-gunmetal flex-column overflow-auto m-0'>
        {data.map((element, index) => {
          return (
            <div className='d-flex' key={`diff-line-${index}`}>
              <code
                className={clsx('ps-3 pe-3 bg-opacity-50', {
                  'bg-lineok': element.mark === MARKS.PLUS,
                  'bg-linenok': element.mark === MARKS.MINUS,
                  'bg-linenochange': element.mark === MARKS.SPACE,
                })}
                style={{ width: '50px', minWidth: '50px' }}
              >
                {element.line_num}
              </code>
              <code
                className={clsx('flex-fill bg-opacity-50 ps-1', {
                  'bg-codeok': element.mark === MARKS.PLUS,
                  'bg-codenok': element.mark === MARKS.MINUS,
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
export default Diff
