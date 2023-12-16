/**
 * @file components/CommitDetailFile.tsx
 * @brief Commit detail file
 * @author Miroslav Bálek (xbalek02)
 * @date October 2023
 */

import clsx from 'clsx'

interface CommitDetailFileProps {
  operation?: string
  file?: string
  dir?: string
}

function CommitDetailFile({ operation, file, dir }: CommitDetailFileProps) {
  return (
    <>
      <div>
        <span
          className={clsx('', {
            'text-success': operation === 'A',
            'text-warning':
              operation === 'M' || operation === 'R' || operation === 'C' || operation === 'MM',
            'text-danger': operation === 'D',
          })}
        >
          {operation}{' '}
        </span>
        <span>
          {file}
          {dir && <small className="text-davygray ms-2"> {dir}</small>}
        </span>
      </div>
    </>
  )
}
export default CommitDetailFile
