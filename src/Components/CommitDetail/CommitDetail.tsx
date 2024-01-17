/**
 * @file components/CommitDetail.tsx
 * @brief Commit detail
 * @author Miroslav Bálek (xbalek02)
 * @date October 2023
 */

import { Dispatch, useEffect, useState } from 'react'
import CommitDetailFile from 'components/CommitDetailFile'

interface CommitDetailProps {
  currentCommit: string
  dispatch: Dispatch<Actions>
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

type CommitDetailType = {
  commit_detail: CommitDetailEntry[]
  changed_files: ChangedFileEntry[]
}

function CommitDetail({ currentCommit, dispatch }: CommitDetailProps) {
  const [data, setData] = useState<CommitDetailType>()

  const fetch = async () => {
    const response = await window.git.commit_detail(currentCommit)
    if (!response.status && response.payload) setData(response.payload.data)
    dispatch({ type: 'REFRESH_LOG_MESSAGES' })
  }

  useEffect(() => {
    fetch()
  }, [currentCommit])

  return (
    <>
      {data && (
        <pre className='d-flex bg-gunmetal flex-column overflow-auto m-0'>
          {data.commit_detail.map((commitDetail) => (
            <div className='container mt-4' key={'detail' + commitDetail.hash}>
              <div className='row'>
                <div className='col-md-6'>
                  <div className='mb-2'>
                    <strong>Hash:</strong> {commitDetail.hash}
                  </div>
                  <div className='mb-2'>
                    <strong>Message:</strong> {commitDetail.message}
                  </div>
                  <div className='mb-2'>
                    <strong>Author Name:</strong> {commitDetail.author_name}
                  </div>
                  <div className='mb-2'>
                    <strong>Author Email:</strong> {commitDetail.author_email}
                  </div>
                  <div className='mb-2'>
                    <strong>Body:</strong> {commitDetail.body}
                  </div>
                  <div className='mb-2'>
                    <strong>Refs:</strong> {commitDetail.refs}
                  </div>
                  <div className='mb-2'>
                    <strong>Date:</strong> {commitDetail.date}
                  </div>
                  <div className='mb-2'>
                    <strong>Files:</strong>
                    {Array.isArray(data.changed_files) &&
                      data.changed_files.map((changedFile, index) => (
                        <CommitDetailFile
                          key={'commitdetailfile-' + index}
                          operation={changedFile.operation}
                          dir={changedFile.dir}
                          file={changedFile.file}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </pre>
      )}
    </>
  )
}
export default CommitDetail
