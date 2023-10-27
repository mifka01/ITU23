// !IMPORTANT
// JUST FOR TESTING ALL OF THIS SHOULD BE DIVIDED INTO SEPARATE COMPOMENTS
//
import { useState, useEffect } from 'react'

// Icons:
import { Plus, Minus, RefreshCw } from 'lucide-react'

// use window.git to invoke handlers
// available invokes can be found in src/api/git.ts

function App() {
  const [notAdded, setNotAdded] = useState<any[]>([])
  const [deleted, setDeleted] = useState<any[]>([])

  const fetchData = async () => {
    try {
      const response = await window.git.status()
      const notAddedFiles = response.not_added.map((file: string) => ({
        type: 'success',
        icon: Plus,
        text: file,
      }))

      const deletedFiles = response.deleted.map((file: string) => ({
        type: 'danger',
        icon: Minus,
        text: file,
      }))

      setNotAdded(notAddedFiles)
      setDeleted(deletedFiles)

      console.log('Success `git status` data fetched')
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData() // Fetch data when the component mounts
  }, [])

  // Components should be simple and single-purpose
  // this is overkill and serves just as backend testing component
  return (
    <>
      <div className='mx-3 mt-3'>
        <div className='col-md-6'>
          <h1>
            git status
            <button onClick={fetchData} className='btn btn-sm mx-2'>
              <RefreshCw />
            </button>
          </h1>
        </div>

        <ul className='list-group'>
          {notAdded.map((item, index) => (
            <li
              key={index}
              className={`list-group-item list-group-item-${item.type}`}
            >
              <item.icon color='black' size={15} />
              {item.text}
            </li>
          ))}

          {deleted.map((item, index) => (
            <li
              key={index}
              className={`list-group-item list-group-item-${item.type}`}
            >
              <item.icon color='black' size={15} />
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
