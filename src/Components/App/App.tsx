/**
 * @file components/App.tsx
 * @brief Main App grid
 * @author Radim Mifka (xmifka00)
 * @author Miroslav Bálek (xbalek02)
 * @date October 2023
 */

import Menu from 'components/Menu'
import Log from 'components/Log'
import Stage from 'components/Stage'
import Branches from 'components/Branches'
import Repositories from 'components/Repositories'
import Portal from 'components/Portal'
import MainWindow from 'components/MainWindow'
import CommitTree from 'components/CommitTree'
import Stashes from 'components/Stashes'
import { ModalProps } from 'components/Modal'
import { useState } from 'react'
import Main from 'electron/main'

function App() {
  const [refreshLog, setRefreshLog] = useState(false)
  const [refreshCommitTree, setRefreshCommitTree] = useState(false)
  const [refreshStage, setRefreshStage] = useState(false)
  const [refreshStashes, setRefreshStashes] = useState(false)
  const [refreshBranches, setRefreshBranches] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [currentCommit, setCurrentCommit] = useState<string | undefined>(undefined)
  const [showDiff, setShowDiff] = useState(true)
  const [currentFile, setCurrentFile] = useState<string | undefined>(undefined)
  const [modal, setModal] = useState<ModalProps>({
    children: undefined,
    buttons: [],
  })

  return (
    <>
      <div className='container-fluid min-vh-100 d-flex flex-column text-beige bg-darkpurple'>
        <div className='row'>
          <Menu
            setRefreshLog={setRefreshLog}
            setShowModal={setShowModal}
            setRefreshBranches={setRefreshBranches}
            setModal={setModal}
            setRefreshCommitTree={setRefreshCommitTree}
          />
        </div>
        <div className='row text-center flex-grow-1'>
          <div className='col-3 border border-davygray'>
            <div className='d-flex'>
              <Stage
                setRefreshLog={setRefreshLog}
                setRefreshCommitTree={setRefreshCommitTree}
                setShowModal={setShowModal}
                setModal={setModal}
                setRefreshStage={setRefreshStage}
                refreshStage={refreshStage}
                setCurrentFile={setCurrentFile}
                currentFile={currentFile}
                setShowDiff={setShowDiff}
              />
            </div>
            <div className='d-flex '>
              <Branches
                setRefreshLog={setRefreshLog}
                setRefreshCommitTree={setRefreshCommitTree}
                setShowModal={setShowModal}
                setModal={setModal}
                setRefreshBranches={setRefreshBranches}
                refreshBranches={refreshBranches}
              />
            </div>
            <div className='d-flex'>
              <Repositories
                setRefreshLog={setRefreshLog}
                setRefreshCommitTree={setRefreshCommitTree}
                setRefreshStage={setRefreshStage}
                setRefreshBranches={setRefreshBranches}
                setRefreshStashes={setRefreshStashes}
              />
            </div>
            <div className='clipping-container'>
              <Portal showModal={showModal} {...modal} />
            </div>
          </div>
          <div className='col-7 gx-0 border-top border-davygray'>
            <div className='d-flex flex-column h-75'>
              <div className='d-flex bg-darkpurple text-beige text-start border-bottom border-davygray'>
                <span className='ps-2'>{showDiff ? (currentFile):(`Commit detail`)}</span>
              </div>
              <div className='d-flex flex-grow-1 h-100 bg-gunmetal '>
                <MainWindow
                showDiff={showDiff}
                currentFile={currentFile}
                currentCommit={currentCommit}
                />
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
            <div className='d-flex'>
              <CommitTree
                setRefreshCommitTree={setRefreshCommitTree}
                refreshCommitTree={refreshCommitTree}
                setCurrentCommit={setCurrentCommit}
                setShowDiff={setShowDiff}
              />
            </div>
            <div className='d-flex'>
              <Stashes
                setShowModal={setShowModal}
                setRefreshLog={setRefreshLog}
                setModal={setModal}
                setRefreshStage={setRefreshStage}
                setRefreshStashes={setRefreshStashes}
                refreshStashes={refreshStashes}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
