// @file components/Button.tsx
// @brief Diff output
// @author Michal Zapletal (xzaple41)
// @date October 2023

import { useEffect, useState } from 'react'

interface Path {
  currentFile?: string
}

type DiffEntry = {mark: string, line_num: string, line: string}

function Diff({ currentFile }: Path) {
  const [data, setData] = useState<DiffEntry[]>([])

  useEffect(() => {
    async function getData() {
        const response = await window.git.getDiff(currentFile)
        if(!response.status && response.payload) {
            setData(response.payload.res)
        }
    }
    getData()
  }, [currentFile])

    return (
        <>
            <div style={{
                overflowY: 'scroll',
                overflow: 'auto',
                height: '67.5vh', //TODO: repair height to align with parent content
                width: '100%',
                textAlign: 'left',
                display: "flex"
            }}>
                <pre style={{width: "100%"}}>
                    {data.map((element) => {
                        let code_color
                        let line_color
                        if(element.mark === '+') {
                            code_color = 'bg-codeok bg-opacity-50'
                            line_color = 'bg-lineok bg-opacity-50'
                        }else if(element.mark === '-'){
                            code_color = 'bg-codenok bg-opacity-50'
                            line_color = 'bg-linenok bg-opacity-50'
                        }else{
                            code_color = 'bg-darkpruple'
                            line_color = 'bg-linenochange bg-opacity-50'
                        }

                        return (
                            <div style={{
                                display:  "block"
                            }}>
                                <code className={line_color} style={{
                                    display: "inline-block",
                                    width: "5%",
                                    paddingLeft: "1vh",
                                    minWidth: "5%"
                                }}>
                                    {element.line_num}
                                </code>
                                <code className={'bg-opacity-50 '+code_color} style={{
                                display: "inline-block",
                                paddingLeft: '1vh',
                                width: "95%"
                                }}>
                                    {element.line}
                                </code>
                            </div>)
                        })}
                    </pre>
            </div>
        </>
)
}
// {result.map((element) => (<code>{element}</code>))}
export default Diff
