/**
 * @file components/CommitDetail.tsx
 * @brief Commit detail
 * @author Miroslav Bálek (xbalek02)
 * @date October 2023
 */

import { useEffect, useState } from 'react'
import clsx from 'clsx'

interface CommitDetailProps {
  currentCommit?: string
}

type CommitDetailEntry = {
  message: string
  hash: string
  author_name: string
  author_email: string
  body: string
  refs: string
  date: string
}
type ChangedFileEntry = {
  operation: string
  file: string
  dir: string
}

function CommitDetail({ currentCommit }: CommitDetailProps) {
  const [commitDetails, setCommitDetails] = useState<{
    commit_detail: CommitDetailEntry[]
    changed_files: ChangedFileEntry[]
  }>({
    commit_detail: [],
    changed_files: [],
  })

  const fetchData = async () => {
    const response = await window.git.commit_detail(currentCommit)

    if (!response.status && response.payload) {
      setCommitDetails(response.payload)
    }
  }

  useEffect(() => {
    // TODO
    if (!currentCommit || (currentCommit && currentCommit === '')) {
      setCommitDetails({
        commit_detail: [],
        changed_files: [],
      })
      return
    }

    fetchData()
  }, [currentCommit])

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
          {commitDetails.commit_detail.map((commitDetail) => (
            <div className="container mt-4" key={'detail' + commitDetail.hash}>
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-2">
                    <strong>Hash:</strong> {commitDetail.hash}
                  </div>
                  <div className="mb-2">
                    <strong>Message:</strong> {commitDetail.message}
                  </div>
                  <div className="mb-2">
                    <strong>Author Name:</strong> {commitDetail.author_name}
                  </div>
                  <div className="mb-2">
                    <strong>Author Email:</strong> {commitDetail.author_email}
                  </div>
                  <div className="mb-2">
                    <strong>Body:</strong> {commitDetail.body}
                  </div>
                  <div className="mb-2">
                    <strong>Refs:</strong> {commitDetail.refs}
                  </div>
                  <div className="mb-2">
                    <strong>Date:</strong> {commitDetail.date}
                  </div>
                  <div className="mb-2">
                    <strong>Files:</strong>
                    {/*TODO move to separate component*/ }
                    {Array.isArray(commitDetails.changed_files) ? 
                      commitDetails.changed_files.map((changedFile, index) => (
                        
                        <div key={`file${index}`}>
                          <div>
                            <span
                              className={clsx('', {
                                'text-success': changedFile.operation === 'A',
                                'text-warning':
                                  changedFile.operation === 'M' ||
                                  changedFile.operation === 'R' ||
                                  changedFile.operation === 'C',
                                'text-danger': changedFile.operation === 'D',
                              })}
                            >
                              {changedFile.operation}{' '}
                            </span>
                            <span>
                              {changedFile.file}
                              {changedFile.dir && (
                                <small className="text-davygray ms-2">
                                  {' '}
                                  {changedFile.dir}
                                </small>
                              )}
                            </span>
                          </div>
                        </div>
                      ))
                     : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </pre>
      </div>
    </>
  )
}
export default CommitDetail
