// @file components/LogMessage.tsx
// @brief Component for command log message
// @author Miroslav Bálek (xbalek02)
// @date November 2023

interface LogMessageProps {
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
        <div className='col-10 text-start'>
          <span className='ms-2'>{text}</span>
        </div>
        <div className='col-2 text-end'>
          <span className='me-2'>{time}</span>
        </div>
      </div>
    </>
  )
}

export default LogMessage
