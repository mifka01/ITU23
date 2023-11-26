// @file components/Commit.tsx
// @brief Component for commit
// @author Radim Mifka (xmifka00)
// @date November 2023

import clsx from 'clsx'
import Button from 'components/Button'

interface CommitProps {
  className?: String
}

function Commit({ className }: CommitProps) {
  return (
    <>
      <form className={clsx('form-floating', className)}>
        <div className='row mx-2 mt-4'>
          <textarea
            style={{ resize: 'none' }}
            className='form-control bg-gunmetal border border-davygray text-beige shadow-none'
            placeholder='Commit message...'
            id='commitMessage'
          ></textarea>
        </div>
        <div className='row my-4 mx-2'>
          <Button className='btn-darkpurple border border-davygray border-3 text-beige h-10 w-10 bg-gunmetal py-2'>
            <div className='text-center'>
              <p className='mb-0 text-beige text-uppercase'>Commit</p>
            </div>
          </Button>
        </div>
      </form>
    </>
  )
}

export default Commit
