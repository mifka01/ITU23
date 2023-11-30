// @file components/Commit.tsx
// @brief Component for commit
// @author Radim Mifka (xmifka00)
// @date November 2023

import clsx from 'clsx'
import Button from 'components/Button'
import { ChangeEvent, FormEvent, useState } from 'react'

interface CommitProps {
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
      await window.git.commit(formData.message)
      setFormData({ message: '' })
      afterSubmit?.()
    }
  }

  return (
    <>
      <div className='row'>
        <form
          className={clsx('form-floating', className)}
          onSubmit={handleSubmit}
        >
          <div className='row mx-2 mt-4'>
            <textarea
              style={{ resize: 'none' }}
              className='form-control bg-gunmetal border border-davygray text-beige shadow-none'
              placeholder='Commit message...'
              name='message'
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className='row my-4 mx-2'>
            <Button
              type='submit'
              className='btn-darkpurple border border-davygray border-3 text-beige h-10 w-10 bg-gunmetal py-2'
            >
              <div className='text-center'>
                <p className='mb-0 text-beige text-uppercase'>Commit</p>
              </div>
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Commit
