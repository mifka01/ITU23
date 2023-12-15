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
    // TODO
    if (!currentFile) {
      setData([])
      return
    }

    fetchData()
  }, [currentFile])

  return (
    <>
      <div
        style={{
          overflowY: 'scroll',
          overflow: 'auto',
          height: '67.5vh', //TODO: repair height to align with parent content
          width: '100%',
          textAlign: 'left',
          display: 'flex',
        }}
      >
        <pre style={{ width: '100%' }}>
          {data.map((element) => {
            return (
              <div
                style={{
                  display: 'block',
                }}
              >
                <code
                  className={clsx('bg-linenochange bg-opacity-50', {
                    'bg-lineok': element.mark === '+',
                    'bg-linenok': element.mark === '-',
                  })}
                  style={{
                    display: 'inline-block',
                    width: '5%',
                    paddingLeft: '1vh',
                    minWidth: '5%',
                  }}
                >
                  {element.line_num}
                </code>
                <code
                  className={clsx('bg-darkpurple bg-opacity-50', {
                    'bg-codeok': element.mark === '+',
                    'bg-codenok': element.mark === '-',
                  })}
                  style={{
                    display: 'inline-block',
                    paddingLeft: '1vh',
                    width: '95%',
                  }}
                >
                  {element.line}
                </code>
              </div>
            )
          })}
        </pre>
      </div>
    </>
  )
}
// {result.map((element) => (<code>{element}</code>))}
export default Diff
