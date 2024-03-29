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
import Preview from 'components/Preview'
import CommitHistory from '@/Components/CommitHistory'
import Stashes from 'components/Stashes'
import { useReducer } from 'react'
import { reducer, initialState } from '../../reducer'

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <div className='text-beige bg-darkpurple vh-100 vw-100 d-flex flex-column overflow-hidden'>
        <div className='flex-shrink-1'>
          <Menu dispatch={dispatch} />
        </div>
        <div className='d-flex flex-fill flex-row overflow-y-auto overflow-x-hidden'>
          <div className='d-flex w-20 flex-column border border-davygray'>
            <Stage refresh={state.refreshStage} dispatch={dispatch} />
            <Branches dispatch={dispatch} refresh={state.refreshBranches} />
            <Repositories dispatch={dispatch} />
          </div>
          <div className='d-flex w-65 flex-grow flex-column border-top border-davygray'>
            <div className='d-flex flex-column h-75 bg-gunmetal'>
              <Preview preview={state.previewData} dispatch={dispatch} />
            </div>
            <div className='d-flex flex-column h-25 overflow-hidden'>
              <Log
                className='border-top border-bottom border-davygray'
                refresh={state.refreshMessages}
              />
            </div>
          </div>
          <div className='d-flex w-15 flex-column border border-davygray border-top-0'>
            <CommitHistory
              refresh={state.refreshCommitHistory}
              dispatch={dispatch}
            />
            <Stashes refresh={state.refreshStashes} dispatch={dispatch} />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
