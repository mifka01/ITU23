import MenuButton from 'components/MenuButton'
import { ArrowUpFromLine, ArrowDownToLine } from 'lucide-react'

function Menu() {
  const handlePush = async () => {
    try {
      // TODO
      const response = await window.git.push()
      return response
    } catch (error) {
      console.log('Error while pushing')
    }
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
