// @file components/App.tsx
// @brief Main App grid
// @author Radim Mifka (xmifka00)
// @date October 2023

import Menu from 'components/Menu'
import Log from 'components/Log'
import Stage from 'components/Stage'
import Branches from 'components/Branches'
import { useState } from 'react'

function App() {
  // dunno about this
  document.body.classList.add('bg-darkpurple')
  document.body.classList.add('text-white')
  const [refreshLog, setRefreshLog] = useState(false)

  return (
    <>
      <div className='container-fluid min-vh-100 d-flex flex-column'>
        <div className='row'>
          <Menu setRefreshLog={setRefreshLog} />
        </div>
        <div className='row text-center flex-grow-1'>
          <div className='col-3 border border-davygray'>
            <div className='d-flex h-50'>
              <Stage setRefreshLog={setRefreshLog} />
            </div>
            <div className='d-flex h-25'>
              <Branches setRefreshLog={setRefreshLog} />
            </div>
          </div>
          <div className='col-7 gx-0 border-top border-davygray'>
            <div className='d-flex flex-column h-75 '>
              <div className='d-flex bg-darkpurple text-start border-bottom border-davygray'>
                <span className='ps-2'>HEADER</span>
              </div>
              <div className='d-flex flex-grow-1 h-100 bg-gunmetal'>
                <span className='ps-2'>DIFF</span>
              </div>
            </div>
            <div className='d-flex flex-column h-25 overflow-hidden'>
              <Log
                refreshLog={refreshLog}
                setRefreshLog={setRefreshLog}
                className='border-top border-bottom border-davygray'
              />
            </div>
          </div>
          <div className='col-2 border border-davygray'>
            <div className='row h-50 border-bottom border-davygray'>
              <div>HISTORY</div>
            </div>
            <div className='row h-50'>
              <div>STASH</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
