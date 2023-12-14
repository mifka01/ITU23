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
                        let code_color = ""
                        let line_color = ""
                        if(element.mark === '+') {
                            code_color = "rgba(24,98,37,0.5)"
                            line_color = "rgba(20,51,1,0.5)"
                        }else if(element.mark === '-'){
                            code_color = "rgba(124,0,0,0.5)"
                            line_color = "rgba(77,13,13,0.55)"
                        }else{
                            line_color = "rgba(21,20,30,0.5)"
                        }

                        return (
                            <div style={{
                                display:  "block"
                            }}>
                                <code style={{
                                    display: "inline-block",
                                    width: "5%",
                                    background: line_color,
                                    paddingLeft: "2vh",
                                    minWidth: "5%"
                                }}>
                                    {element.line_num}
                                </code>
                                <code style={{
                                display: "inline-block",
                                paddingLeft: '1vh',
                                background: code_color,
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
