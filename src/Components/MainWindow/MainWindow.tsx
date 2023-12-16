/**
 * @file components/MainWindow.tsx
 * @brief Main window
 * @author Miroslav Bálek (xbalek02)
 * @date October 2023
 */

import Diff from 'components/Diff'
import CommitDetail from 'components/CommitDetail'

interface MainWindowProps {
  showDiff?: boolean
  currentCommit?: string
  currentFile?: string
}

function CommitDetailFile({
  showDiff,
  currentCommit,
  currentFile,
}: MainWindowProps) {
  return (
    <>
      <div
        style={{
          overflowY: 'scroll',
          overflow: 'auto',
          height: '67.5vh', //TODO: repair height to align with parent content
          width: '100%',
          textAlign: 'left',
          display: 'flex',
        }}
      >
        <pre style={{ width: '100%' }}>
          {showDiff ? (
            <Diff key={"ssssssssssssssssssssssssss-1"} currentFile={currentFile} />
          ) : (
            <CommitDetail key={"commitdetail-1"} currentCommit={currentCommit} />
          )}
        </pre>
      </div>
    </>
  )
}
export default CommitDetailFile
