import React, { useState, useEffect, useRef } from 'react'

interface Props {
  resfreshLog?: boolean
  setResfreshLog?: React.Dispatch<React.SetStateAction<boolean>>
}

function Log({ resfreshLog, setResfreshLog }: Props) {
  const [logs, setLogs] = useState<any[]>([])

  // scroll to bottom
  const Bottom = () => {
    const bottom = useRef<HTMLDivElement>(null)
    useEffect(() => {
      if (bottom.current) {
        bottom.current.scrollIntoView()
      }
    })
    return <div ref={bottom} />
  }

  const fetch = async () => {
    if (resfreshLog) {
      const response = await window.log.get()
      const logs = response.map((item: any, index: number) => (
        <div
          key={index}
          className={`line ${item.type === 'COMMAND' ? 'text-success' : 'text-danger'
            }`}
        >
          {`${item.time}: ${item.text}`}
        </div>
      ))
      setLogs(logs)
      if (setResfreshLog) setResfreshLog(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [resfreshLog])

  return (
    <>
      <div className='text-start'>{logs}</div>
      <Bottom />
    </>
  )
}

export default Log
