// @file components/CommitItem.tsx
// @brief Component commit item in list
// @author Miroslav Bálek (xbalek02)
// @date December 2023

import { ReactNode, useState } from 'react'
import { GitCommitVertical } from 'lucide-react'

interface ListItemProps {
  message?: ReactNode
}

function ListItem({ message }: ListItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = () => {
    setIsHovered(!isHovered)
  }
  return (
    <div
      className={`row small mt-0 mb-0 bg-darkpurple d-flex flex-nowrap align-items-center`}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover} 
    >
      <div className="col-1 ps-1 me-1 text-end">
        <GitCommitVertical size={'2em'} viewBox="9 3 6 18" />
      </div>
      <div className="ps-2 col-11 mt-1 text-truncate">{message}</div>
    </div>
  )
}

export default ListItem
