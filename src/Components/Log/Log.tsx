// @file components/Log.ts
// @brief Component for command log
// @author Miroslav Bálek (xbalek02)
// @date November 2023

import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  ComponentProps,
} from 'react'

import LogMessage from 'components/LogMessage'

interface LogProps {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
  refreshLog?: boolean
}

function Log({ refreshLog, setRefreshLog }: LogProps) {
  const [messages, setMessages] = useState<ComponentProps<typeof LogMessage>[]>(
    [],
  )
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
    if (refreshLog && setRefreshLog) {
      const response = await window.log.get()
      setMessages(response)
      setRefreshLog(false)
    }
  }

  useEffect(() => {
    fetch()
  }, [refreshLog == true])

  return (
    <>
      <div className='text-start'>
        {messages.map((message, index) => (
          <LogMessage
            key={index}
            type={message.type}
            time={message.time}
            text={message.text}
          />
        ))}
      </div>
      <Bottom />
    </>
  )
}

export default Log
