/**
 * @file components/CommitItem.tsx
 * @brief Component commit item in list
 * @author Miroslav Bálek (xbalek02)
 * @date December 2023
 */

import { ReactNode, useState } from 'react'
import { GitCommitVertical } from 'lucide-react'

interface CommitItemProps {
  onClick?: () => void
  message?: ReactNode
}

function CommitItem({ message, onClick }: CommitItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = () => {
    setIsHovered(!isHovered)
  }
  return (
    <div
      className={`row small bg-darkpurple align-items-center`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <div className="col-1">
        <GitCommitVertical size={'2em'} viewBox="9 3 6 18" />
      </div>
      <div className="col-11 mt-1 text-truncate" onClick={onClick} role={'button'}>{message}</div>
    </div>
  )
}

export default CommitItem
