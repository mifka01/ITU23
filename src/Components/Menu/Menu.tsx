import MenuButton from 'components/MenuButton'
import { ArrowUpFromLine } from 'lucide-react'

function Menu() {
  const handlePush = async () => {
    try {
      // TODO
      const response = await window.repository.push()
      return response
    } catch (error) {
      console.log('Error while pushing')
    }
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <div className='navbar-nav'>
            <MenuButton
              Icon={ArrowUpFromLine}
              text='push'
              onClick={handlePush}
            />
          </div>
        </div>
      </nav>
    </>
  )
}

export default Menu
