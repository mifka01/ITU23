/**
 * @file components/Commit.tsx
 * @brief Component for commit
 * @author Radim Mifka (xmifka00)
 * @date November 2023
 */

import clsx from 'clsx'
import Button from 'components/Button'
import {
  ChangeEvent,
  FormEvent,
  useState,
  Dispatch,
  SetStateAction,
} from 'react'

interface CommitProps {
  setRefreshCommitHistory?: Dispatch<SetStateAction<boolean>>
  refreshCommitHistory?: Dispatch<SetStateAction<boolean>>
  className?: String
  afterSubmit?: () => void
}

function Commit({ className, afterSubmit }: CommitProps) {
  const [formData, setFormData] = useState({ message: '' })

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormData((prevFormData: typeof formData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formData.message == '') console.log('blank')
    else {
      const response = await window.git.commit(formData.message)
      if (!response.status) {
        setFormData({ message: '' })
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
            className=' form-control bg-gunmetal border border-davygray text-beige shadow-none'
            placeholder='Commit message...'
            name='message'
            value={formData.message}
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
