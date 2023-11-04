import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
  onClick: (...args: any[]) => any
}

function Button({ children, className, onClick }: Props) {
  const handleClick = async () => {
    const response = onClick()
    return response
  }

  return (
    <button className={`btn ${className}`} onClick={handleClick}>
      {children}
    </button>
  )
}

export default Button