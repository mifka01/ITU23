/**
 * @file components/Log.ts
 * @brief Component for command log
 * @author Michal Zapletal (xzaple41)
 * @date November 2023
 */

import { useEffect, useState, useRef } from 'react'
import { Trash2 } from 'lucide-react'

import LogMessage from 'components/LogMessage'
import Button from 'components/Button'
import clsx from 'clsx'

interface LogProps {
  className?: String
  refresh: number
}

type LogMessage = {
  type: string
  time: string
  text: string
}
type LogMessages = LogMessage[]

function Log({ className, refresh }: LogProps) {
  const [messages, setMessages] = useState<LogMessages>([])
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
    const response = await window.log.get()
    if (!response.status && response.payload) {
      setMessages(response.payload.messages)
    }
  }

  const handleClear = async () => {
    const response = await window.log.clear()
    if (!response.status && response.payload)
      setMessages(response.payload.messages)
  }

  useEffect(() => {
    fetch()
  }, [refresh])

  return (
    <>
      <div className={clsx('d-flex bg-darkpurple text-start', className)}>
        <div className='me-auto flex-fill'>
          <span className='ps-2'>LOG</span>
        </div>

        <div className='d-flex align-items-center'>
          <Button onClick={handleClear} className='text-beige ms-auto border-0'>
            <Trash2 size={18} className='mb-1 me-2' />
          </Button>
        </div>
      </div>

      <div className='d-flex bg-gunmetal flex-column flex-fill text-start h-100 overflow-auto'>
        {messages.map((message, index) => (
          <LogMessage
            key={index}
            type={message.type}
            time={message.time}
            text={message.text}
          />
        ))}
        <Bottom />
      </div>
    </>
  )
}

export default Log
