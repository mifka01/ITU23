// @file components/App.tsx
// @brief Main App grid

// @author Radim Mifka (xmifka00)
// @date October 2023

import Menu from 'components/Menu'
import Log from 'components/Log'
import Stage from 'components/Stage'
import Branches from 'components/Branches'
import Portal from 'components/Portal'
import Diff from 'components/Diff'
import { ModalProps } from 'components/Modal'
import { useState } from 'react'

function App() {
  const [refreshLog, setRefreshLog] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentFile, setCurrentFile] = useState<string>("No file selected")
  const [modal, setModal] = useState<ModalProps>({
    children: undefined,
    buttons: [],
  })

  return (
    <>
      <div className='container-fluid min-vh-100 d-flex flex-column text-beige bg-darkpurple'>
        <div className='row'>
          <Menu setRefreshLog={setRefreshLog} />
        </div>
        <div className='row text-center flex-grow-1'>
          <div className='col-3 border border-davygray'>
            <div className='d-flex'>
              <Stage
                setRefreshLog={setRefreshLog}
                setShowModal={setShowModal}
                setModal={setModal}
                setCurrentFile={setCurrentFile}
              />
            </div>
            <div className='d-flex '>
              <Branches
                setRefreshLog={setRefreshLog}
                setShowModal={setShowModal}
                setModal={setModal}
              />
            </div>
            <div className='d-flex'>REPO</div>
            <div className='clipping-container'>
              <Portal showModal={showModal} {...modal} />
            </div>
          </div>
          <div className='col-7 gx-0 border-top border-davygray'>
            <div className='d-flex flex-column h-75'>
              <div className='d-flex bg-darkpurple text-beige text-start border-bottom border-davygray'>
                <span className='ps-2'>{currentFile}</span>
              </div>
              <div className='d-flex flex-grow-1 h-100 bg-gunmetal '>
                <Diff currentFile={currentFile} />
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
            <div className='row h-50 border-bottom border-davygray bg-darkpurple'>
              <div>HISTORY</div>
            </div>
            <div className='row h-50 bg-darkpurple text-beige'>
              <div>STASH</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
