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
        className={`row ${type === 'COMMAND' ? 'text-success' : 'text-danger'}`}
      >
        <div className='col-10 ps-0 text-start'> {text}</div>
        <div className='col-2 pe-0 text-end'>{time}</div>
      </div>
    </>
  )
}

export default LogMessage
