// !IMPORTANT
// JUST FOR TESTING ALL OF THIS SHOULD BE DIVIDED INTO SEPARATE COMPOMENTS
//
import { useState, useEffect } from 'react'

// Icons:
import { FilePlus, FileMinus, RefreshCw, Pencil } from 'lucide-react'
import RepositorySelector from 'components/RepositorySelector'

// use window.git to invoke handlers
// available invokes can be found in src/api/git.ts

function App() {
  const [notAdded, setNotAdded] = useState<any[]>([])
  const [deleted, setDeleted] = useState<any[]>([])
  const [modified, setModified] = useState<any[]>([])
  const [currentDir, setCurrentDir] = useState<any[]>([])

  // Temporary so my eyes don't hurt
  document.body.classList.add('bg-dark')
  document.body.classList.add('text-white')

  const fetchData = async () => {
    try {
      const response = await window.git.status()
      const notAddedFiles = response.not_added.map((file: string) => ({
        type: 'success',
        icon: FilePlus,
        text: file,
      }))

      const deletedFiles = response.deleted.map((file: string) => ({
        type: 'danger',
        icon: FileMinus,
        text: file,
      }))

      const modifiedFiles = response.modified.map((file: string) => ({
        type: 'warning',
        icon: Pencil,
        text: file,
      }))

      const cwd = await window.git.cwd()
      setCurrentDir(cwd)
      setNotAdded(notAddedFiles)
      setDeleted(deletedFiles)
      setModified(modifiedFiles)

      console.log('Success data fetched')
    } catch (error) {}
  }

  useEffect(() => {
    fetchData() // Fetch data when the component mounts
  }, [])

  // Components should be simple and single-purpose
  // this is overkill and serves just as backend testing component
  return (
    <>
      {currentDir.length === 0 ? (
        <div className='d-flex justify-content-center align-items-center vh-100'>
          <RepositorySelector afterSelect={fetchData} />
        </div>
      ) : (
        <div className='mx-3 mt-3'>
          <div className='row'>
            <h1>cwd: {currentDir}</h1>
            <div className='col-md-6'>
              <h2>
                git status
                <button onClick={fetchData} className='btn btn-sm mx-2'>
                  <RefreshCw color='white' />
                </button>
              </h2>
            </div>

            <div className='col-md-6 d-flex justify-content-end'>
              <RepositorySelector afterSelect={fetchData} />
            </div>
          </div>
          <ul className='list-group col-md-4'>
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

            {modified.map((item, index) => (
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
      )}
    </>
  )
}

export default App
