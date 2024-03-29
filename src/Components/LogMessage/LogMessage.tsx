/**
 * @file components/LogMessage.tsx
 * @brief Component for command log message
 * @author Michal Zapletal (xzaple41)
 * @date November 2023
 */

type LogMessageProps = {
  type: string
  time: string
  text: string
}

function LogMessage({ type, time, text }: LogMessageProps) {
  return (
    <>
      <div
        className={`row gx-0 ${
          type === 'COMMAND' ? 'text-success' : 'text-danger'
        }`}
      >
        <div className='col-9'>
          <pre
            className='text-start ms-1 mb-0'
            style={{
              whiteSpace: 'pre-wrap',
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              lineHeight: 'inherit',
            }}
          >
            <code>{text}</code>
          </pre>
        </div>
        <div className='col-3'>
          <pre className='text-end mb-0'>
            <code className='me-2 mb-0'>{time}</code>
          </pre>
        </div>
      </div>
    </>
  )
}

export default LogMessage
