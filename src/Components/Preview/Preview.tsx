/**
 * @file components/Window.tsx
 * @brief Window for window data
 * @author Radim Mifka (xmifka00)
 * @date January 2024
 */

import { Dispatch } from 'react'
import { X } from 'lucide-react'
import Diff from 'components/Diff'
import CommitDetail from 'components/CommitDetail'

interface PreviewProps {
  preview: PreviewData
  dispatch: Dispatch<Actions>
}

enum PreviewDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT = 1,
}

function Preview({ preview, dispatch }: PreviewProps) {
  return (
    <>
      <div className='heading bg-darkpurple text-beige d-flex justify-content-between align-items-center border-bottom border-davygray'>
        <span className='ps-2'>
          {preview ? preview.value : 'Neither file nor commit selected'}
        </span>
        {preview && (
          <span
            role='button'
            onClick={() => {
              dispatch({ type: 'RESET_PREVIEW' })
            }}
          >
            <X size={20} className='me-2' />
          </span>
        )}
      </div>
      {preview &&
        (preview?.type == PreviewDataType.TYPE_FILE ? (
          <Diff currentFile={preview.value} dispatch={dispatch} />
        ) : (
          <CommitDetail currentCommit={preview.value} dispatch={dispatch} />
        ))}
    </>
  )
}
export default Preview
