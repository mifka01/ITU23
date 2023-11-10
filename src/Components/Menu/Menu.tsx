// @file components/Menu.tsx
// @brief Menu component
// @author Michal Zapletal (xzaple41)
// @date October 2023

import MenuButton from 'components/MenuButton'
import { ArrowUpFromLine, ArrowDownToLine } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
}
function Menu({ setRefreshLog }: Props) {
  const handlePush = async () => {
    const response = await window.git.push()
    if (setRefreshLog != undefined) setRefreshLog(true)
    return response
  }
  const handlePull = async () => {
    const response = await window.git.pull()
    if (setRefreshLog != undefined) setRefreshLog(true)
    return response
  }

  const buttons = [
    { Icon: ArrowUpFromLine, text: 'push', onClick: handlePush },
    { Icon: ArrowDownToLine, text: 'pull', onClick: handlePull },
  ]

  return (
    <>
      <ul className='list-group list-group-horizontal rounded-0 px-3'>
        {buttons.map((button, index) => (
          <li
            key={index}
            className='list-group-item rounded-0 border-0 bg-transparent p-0 pe-3 py-2'
          >
            <MenuButton Icon={button.Icon} onClick={button.onClick}>
              {button.text}
            </MenuButton>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Menu
