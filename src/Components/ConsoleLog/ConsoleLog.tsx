import { useState } from "react";

function ConsoleLog() {
    
    const [consoleContent, setConsoleContent] = useState('')


    return (
          <pre>{consoleContent}</pre>       
    )
  }



export default ConsoleLog;