/**
 * @file components/App.tsx
 * @brief Main App grid
 * @author Radim Mifka (xmifka00)
 * @date October 2023
 */

import Menu from 'components/Menu'
import Log from 'components/Log'
import Stage from 'components/Stage'
import Branches from 'components/Branches'
import Repositories from 'components/Repositories'
import Portal from 'components/Portal'
import Diff from 'components/Diff'
import CommitTree from 'components/CommitTree'
import Stashes from 'components/Stashes'
import { ModalProps } from 'components/Modal'
import { useState } from 'react'
import CommitDetail from '../CommitDetail'

enum WindowDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT,
}

type WindowData = { value: string; type: WindowDataType } | undefined

function App() {
  const [refreshLog, setRefreshLog] = useState(false)
  const [refreshCommitTree, setRefreshCommitTree] = useState(false)
  const [refreshStage, setRefreshStage] = useState(false)
  const [refreshStashes, setRefreshStashes] = useState(false)
  const [refreshBranches, setRefreshBranches] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [windowData, setWindowData] = useState<WindowData>(undefined)
  const [modal, setModal] = useState<ModalProps>({
    children: undefined,
    buttons: [],
  })

  return (
    <>
      <div className='text-beige bg-darkpurple vh-100 vw-100 d-flex flex-column overflow-hidden'>
        <div className='flex-shrink-1'>
          <Menu
            setRefreshLog={setRefreshLog}
            setShowModal={setShowModal}
            setRefreshBranches={setRefreshBranches}
            setModal={setModal}
            setRefreshCommitTree={setRefreshCommitTree}
          />
        </div>
        <div className='d-flex flex-fill flex-row overflow-y-auto overflow-x-hidden'>
          <div className='d-flex w-25 flex-column border border-davygray'>
            <Stage
              setRefreshLog={setRefreshLog}
              setRefreshCommitTree={setRefreshCommitTree}
              setShowModal={setShowModal}
              setModal={setModal}
              setRefreshStage={setRefreshStage}
              refreshStage={refreshStage}
              setWindowData={setWindowData}
              windowData={windowData}
            />
            <Branches
              setRefreshLog={setRefreshLog}
              setRefreshCommitTree={setRefreshCommitTree}
              setShowModal={setShowModal}
              setModal={setModal}
              setRefreshBranches={setRefreshBranches}
              refreshBranches={refreshBranches}
            />
            <Repositories
              setRefreshLog={setRefreshLog}
              setRefreshCommitTree={setRefreshCommitTree}
              setRefreshStage={setRefreshStage}
              setRefreshBranches={setRefreshBranches}
              setRefreshStashes={setRefreshStashes}
            />
            <div className='clipping-container'>
              <Portal showModal={showModal} {...modal} />
            </div>
          </div>
          <div className='w-50 d-flex flex-column border-top border-davygray'>
            <div className='d-flex flex-column h-75 bg-gunmetal'>
              {windowData?.type == WindowDataType.TYPE_COMMIT ? (
                <CommitDetail currentCommit={windowData?.value} setWindowData={setWindowData}/>
              ) : (
                <Diff currentFile={windowData?.value} setWindowData={setWindowData}/>
              )}
            </div>
            <div className='d-flex flex-column h-25 overflow-hidden'>
              <Log
                refreshLog={refreshLog}
                setRefreshLog={setRefreshLog}
                className='border-top border-bottom border-davygray'
              />
            </div>
          </div>
          <div className='d-flex w-25 flex-column flex-fill border border-davygray '>
            <CommitTree
              setRefreshCommitTree={setRefreshCommitTree}
              refreshCommitTree={refreshCommitTree}
              setWindowData={setWindowData}
            />
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
    </>
  )
}

export default App
