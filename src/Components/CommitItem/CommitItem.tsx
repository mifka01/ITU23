/**
 * @file components/CommitItem.tsx
 * @brief Component commit item in list
 * @author Miroslav Bálek (xbalek02)
 * @date December 2023
 */

import { ReactNode, useState } from 'react'
import { GitCommitVertical } from 'lucide-react'

interface CommitItemProps {
  message?: ReactNode
}

function CommitItem({ message }: CommitItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = () => {
    setIsHovered(!isHovered)
  }
  return (
    <div
      className={`d-flex flex-fill small bg-darkpurple align-items-center`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className='text-truncate'>
        <GitCommitVertical className='me-1' size={'2em'} viewBox='9 3 6 18' />
        {message}
      </div>
    </div>
  )
}

export default CommitItem
