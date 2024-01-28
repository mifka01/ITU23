/**
 * @file components/Commit.tsx
 * @brief Component for commit
 * @author Radim Mifka (xmifka00)
 * @date November 2023
 */

import clsx from 'clsx'
import Button from 'components/Button'
import { ChangeEvent, FormEvent, useState } from 'react'

interface CommitProps {
  className?: String
  afterSubmit?: () => void
}

function Commit({ className, afterSubmit }: CommitProps) {
  const [message, setMessage] = useState('')
  const [valid, setValid] = useState(true)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    if (value != '') setValid(true)
    setMessage(value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (message == '') setValid(false)
    else {
      setValid(true)
      const response = await window.git.commit(message)
      if (!response.status) {
        setMessage('')
        afterSubmit?.()
      }
    }
  }

  return (
    <>
      <form
        className={clsx(
          'bg-darkpurple form-floating d-flex flex-column m-2 my-4',
          className,
        )}
        onSubmit={handleSubmit}
      >
        <div className='flex-fill'>
          <textarea
            style={{ resize: 'none' }}
            className={clsx(
              'form-control bg-gunmetal border border-danger text-beige shadow-none',
              { 'border-davygray': valid },
            )}
            placeholder='Commit message...'
            name='message'
            value={message}
            onChange={handleChange}
          ></textarea>
        </div>
        <Button
          type='submit'
          className='mt-4 btn-darkpurple border border-davygray border-3 text-beige h-10 bg-gunmetal py-2'
        >
          <div className='text-center'>
            <p className='mb-0 text-beige text-uppercase'>Commit</p>
          </div>
        </Button>
      </form>
    </>
  )
}

export default Commit
