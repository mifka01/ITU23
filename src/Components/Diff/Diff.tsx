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
      //console.log(filePath)
      if (currentFile) {
        const data = await window.git.getDiff(currentFile)
        setData(data)
      } else setData([])
    }
    getData()
  }, [currentFile])

    return (
        <>
            <div style={{
                overflowY: 'scroll',
                overflow: 'auto',
                height: '65vh',
                width: '100%',
                textAlign: 'left',
                display: "flex"
            }}>
                <pre style={{width: "100%"}}>
                    {data.map((element) => {
                        let color = ""
                        if(element.mark === '+') {
                            color = "green"
                        }else if(element.mark === '-'){
                            color = "darkred"
                        }

                        return (
                            <div style={{
                                display:  "block"
                            }}>
                                <code style={{
                                    display: "inline-block",
                                    width: "10%"
                                }}>
                                    {element.line_num}
                                </code>
                                <code style={{
                                display: "inline-block",
                                paddingLeft: '1vh',
                                background: color,
                                width: "90%"
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
