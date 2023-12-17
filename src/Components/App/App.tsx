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
import CommitHistory from '@/Components/CommitHistory'
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
  const [refreshCommitHistory, setRefreshCommitHistory] = useState(false)
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
            setRefreshCommitHistory={setRefreshCommitHistory}
          />
        </div>
        <div className='d-flex flex-fill flex-row overflow-y-auto overflow-x-hidden'>
          <div className='d-flex w-25 flex-column border border-davygray'>
            <Stage
              setRefreshLog={setRefreshLog}
              setRefreshCommitHistory={setRefreshCommitHistory}
              setShowModal={setShowModal}
              setModal={setModal}
              setRefreshStage={setRefreshStage}
              refreshStage={refreshStage}
              setWindowData={setWindowData}
              windowData={windowData}
            />
            <Branches
              setRefreshLog={setRefreshLog}
              setRefreshCommitHistory={setRefreshCommitHistory}
              setShowModal={setShowModal}
              setModal={setModal}
              setRefreshBranches={setRefreshBranches}
              refreshBranches={refreshBranches}
            />
            <Repositories
              setRefreshLog={setRefreshLog}
              setRefreshCommitHistory={setRefreshCommitHistory}
              setRefreshStage={setRefreshStage}
              setRefreshBranches={setRefreshBranches}
              setRefreshStashes={setRefreshStashes}
              setShowModal={setShowModal}
              setModal={setModal}
            />
            <div className='clipping-container'>
              <Portal showModal={showModal} {...modal} />
            </div>
          </div>
          <div className='w-50 d-flex flex-column border-top border-davygray'>
            <div className='d-flex flex-column h-75 bg-gunmetal'>
              {windowData?.type == WindowDataType.TYPE_COMMIT ? (
                <CommitDetail
                  currentCommit={windowData?.value}
                  setWindowData={setWindowData}
                  setRefreshLog={setRefreshLog}
                />
              ) : (
                <Diff
                  currentFile={windowData?.value}
                  setWindowData={setWindowData}
                  setRefreshLog={setRefreshLog}
                />
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
          <div className='d-flex w-25 flex-column flex-fill border border-davygray border-top-0'>
            <CommitHistory
              setRefreshCommitHistory={setRefreshCommitHistory}
              refreshCommitHistory={refreshCommitHistory}
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
