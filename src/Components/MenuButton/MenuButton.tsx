import Button from 'components/Button'
import { ComponentType } from 'react'
import { LucideProps } from 'lucide-react'
import './MenuButton.css'

interface Props {
  Icon: ComponentType<LucideProps>
  text: string
  className?: string
  onClick: (...args: any[]) => any
}

function MenuButton({ Icon, text, className, onClick }: Props) {
  return (
    <Button
      className={`btn-darkpurple border border-davygray border-3 btn-square text-ecru h-10 w-10 ${className}`}
      onClick={onClick}
    >
      <Icon size={32} />
      <div className='text-center'>
        <p className='mb-0 text-white text-uppercase small'>{text}</p>
      </div>
    </Button>
  )
}

export default MenuButton
