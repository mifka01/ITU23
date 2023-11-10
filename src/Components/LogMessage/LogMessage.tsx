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
        className={`line ${
          type === 'COMMAND' ? 'text-success' : 'text-danger'
        }`}
      >
        {`${time}: ${text}`}
      </div>
    </>
  )
}

export default LogMessage
