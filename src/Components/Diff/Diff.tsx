/**
 * @file components/Diff.tsx
 * @brief Diff output
 * @author Michal Zapletal (xzaple41)
 * @date October 2023
 */

import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import clsx from 'clsx'
import { X } from 'lucide-react'

interface Path {
  currentFile?: string
  setWindowData?: Dispatch<SetStateAction<WindowData>>
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
}

type DiffEntry = { mark: string; line_num: string; line: string }

enum WindowDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT,
}

type WindowData = { value: string; type: WindowDataType } | undefined

function Diff({ currentFile, setWindowData, setRefreshLog }: Path) {
  const [data, setData] = useState<DiffEntry[]>([])

  const fetchData = async () => {
    const response = await window.git.getDiff(currentFile)
    if (!response.status && response.payload) {
      setData(response.payload.data)
      setRefreshLog?.(true)
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
      <div className="heading bg-darkpurple text-beige d-flex justify-content-between align-items-center border-bottom border-davygray">
        <span className="ps-2">
          {currentFile ? currentFile : 'Neither file nor commit selected'}
        </span>
        {currentFile ? (
          <span
            role="button"
            className=""
            onClick={() => {
              setWindowData?.(undefined)
            }}
          >
            <X size={20} className="me-2" />
          </span>
        ) : null}
      </div>

      <pre className="d-flex bg-gunmetal flex-column overflow-auto m-0">
        {data.map((element, index) => {
          return (
            <div className="d-flex" key={'diff-line-' + index}>
              <code
                className={clsx('ps-3 pe-3 bg-opacity-50', {
                  'bg-lineok': element.mark === '+',
                  'bg-linenok': element.mark === '-',
                  'bg-linenochange': element.mark === ' ',
                })}
              >
                {element.line_num}
              </code>
              <code
                className={clsx('flex-fill bg-opacity-50', {
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
