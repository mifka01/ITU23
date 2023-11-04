import MenuButton from 'components/MenuButton'
import { ArrowUpFromLine, ArrowDownToLine } from 'lucide-react'
import { SetStateAction } from 'react';



interface Props {
 
  setConsoleContent?: SetStateAction

}
function Menu({ setConsoleContent }: Props) {
  const handlePush = async () => {
   
      const response = await window.git.push()
      const resposnedata = await window.consolelog.get()
      console.log(resposnedata)
      return response
  }

  const buttons = [
    { Icon: ArrowUpFromLine, text: 'push', onClick: handlePush },
    { Icon: ArrowDownToLine, text: 'pull', onClick: handlePush },
  ]

  return (
    <>
      <ul className='list-group list-group-horizontal rounded-0 px-3'>
        {buttons.map((button, index) => (
          <li
            key={index}
            className='list-group-item rounded-0 border-0 bg-transparent p-0 pe-3 py-2'
          >
            <MenuButton
              Icon={button.Icon}
              text={button.text}
              onClick={button.onClick}
            />
          </li>
        ))}
      </ul>
    </>
  )
}

export default Menu
