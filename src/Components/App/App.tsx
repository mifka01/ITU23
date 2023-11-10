// @file components/App.tsx
// @brief Main App grid
// @author Radim Mifka (xmifka00)
// @date October 2023

import Menu from 'components/Menu'
import Log from 'components/Log'
import Stage from 'components/Stage'
import { useState } from 'react'

function App() {
  // dunno about this
  document.body.classList.add('bg-darkpurple')
  document.body.classList.add('text-white')
  const [refreshLog, setRefreshLog] = useState(false)

  return (
    <>
      <div className='container-fluid min-vh-100 d-flex flex-column overflow-hidden'>
        <div className='row'>
          <Menu setRefreshLog={setRefreshLog} />
        </div>
        <div className='row text-center flex-grow-1'>
          <div className='d-flex flex-column col-3'>
            <div className='row h-50 border border-1 border-davygray'>
              <Stage setRefreshLog={setRefreshLog} />
            </div>
            <div className='row h-50 border border-1 border-top-0 border-davygray'></div>
          </div>
          <div className='col-7 d-flex flex-column bg-gunmetal'>
            <div className='row h-75 border border-1 border-start-0 border-davygray'>
              <div className='row m-0 border bg-darkpurple border-0 border-bottom border-davygray text-start'>
                <div>HEADER</div>
              </div>
              <div className='row m-0 h-100'>DIFF</div>
            </div>
            <div className='row border h-25 border-1 border-top-0 border-start-0 border-davygray overflow-hidden'>
              <div className='row m-0 bg-darkpurple border border-0 border-bottom border-davygray text-start'>
                HEADER
              </div>
              <div className='row m-0 h-100 overflow-auto'>
                <Log refreshLog={refreshLog} setRefreshLog={setRefreshLog} />
              </div>
            </div>
          </div>
          <div className='d-flex flex-column col-2'>
            <div className='row h-50 border border-1 border-start-0 border-davygray'>
              <div>HISTORY</div>
            </div>
            <div className='row h-50 border border-1 border-top-0 border-start-0 border-davygray'>
              <div>STASH</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
