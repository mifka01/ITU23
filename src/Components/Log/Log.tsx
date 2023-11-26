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
import { Trash2 } from 'lucide-react'

import LogMessage from 'components/LogMessage'
import Button from 'components/Button'

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

  const handleClear = async () => {
    const response = await window.log.clear()
    setMessages(response)
  }

  useEffect(() => {
    fetch()
  }, [refreshLog == true])

  return (
    <>
      <div className='m-0 row bg-darkpurple border border-0 border-bottom border-davygray text-start'>
        <div className='col-11'>LOG</div>
        <div className='col-1 text-end'>
          <Button
            onClick={handleClear}
            className='text-beige border-0 d-flex align-items-center h-100 ms-auto'
          >
            <Trash2 size={18} />
          </Button>
        </div>
      </div>
      <div className='row text-start m-0 ps-2'>
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
