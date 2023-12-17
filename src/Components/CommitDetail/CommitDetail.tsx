/**
 * @file components/CommitDetail.tsx
 * @brief Commit detail
 * @author Miroslav Bálek (xbalek02)
 * @date October 2023
 */

import { useEffect, useState, Dispatch, SetStateAction } from 'react'
import CommitDetailFile from 'components/CommitDetailFile'
import { X } from 'lucide-react'

interface CommitDetailProps {
  currentCommit?: string
  setWindowData?: Dispatch<SetStateAction<WindowData>>
  setRefreshLog?: Dispatch<SetStateAction<boolean>>
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

enum WindowDataType {
  TYPE_FILE = 0,
  TYPE_COMMIT,
}

type WindowData = { value: string; type: WindowDataType } | undefined

function CommitDetail({ currentCommit, setWindowData, setRefreshLog }: CommitDetailProps) {
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
      setRefreshLog?.(true)
    }
  }

  useEffect(() => {
    if (!currentCommit) {
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
      <div className="heading bg-darkpurple text-beige d-flex justify-content-between align-items-center border-bottom border-davygray">
        <span className="ps-2">
          {currentCommit ? "Commit Detail" : 'Neither file nor commit selected'}
        </span>
        {currentCommit ? (
          <span
            role="button"
            className=""
            onClick={() => {
              setWindowData?.(undefined)
            }}
          >
            <X size={20} className="me-2" />
          </span>
        ) : null}
      </div>
      <pre className="d-flex bg-gunmetal flex-column overflow-auto m-0">
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
                  {Array.isArray(commitDetails.changed_files)
                    ? commitDetails.changed_files.map((changedFile, index) => (
                        <CommitDetailFile
                          key={'commitdetailfile-' + index}
                          operation={changedFile.operation}
                          dir={changedFile.dir}
                          file={changedFile.file}
                        />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </pre>
    </>
  )
}
export default CommitDetail
