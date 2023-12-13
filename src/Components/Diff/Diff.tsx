// @file components/Button.tsx
// @brief Diff output
// @author Michal Zapletal (xzaple41)
// @date October 2023


import {useEffect, useState} from "react";

function Diff() {
    const [data, setData] = useState<string>("")

    useEffect(() => {
        async function getData(){
            const data = await window.git.getDiff('src/Components/Diff/Diff.tsx')
            setData(data)
            //console.log(data)
        }
        getData()
    }, []);

    let res = []
    let result= data.split('\n')
    let from = 0
    let neg = 0
    let previous = 's'
    for(let i = 0; i < result.length; i++) {
        let record = []

        if(result[i] && result[i][0] === '@') {
            from = parseInt(result[i].split(' ')[2].replace(/\D/g,' ').trim().split(' ')[0])
            previous = 's'
            continue
        }else if(result[i] && (result[i][0] == '+' || result[i][0] == '-' || result[i][0] == ' ')) {
            if(result[i][1] === '+' || result[i][1] === '-'){
                continue
            }
            record.push(result[i][0])
        }else{
            continue
        }

        if(result[i][0] === '+'){
            from ++
            record.push(from.toString())
        }else if(result[i][0] === '-') {
            if(previous !== '-') {
                neg = from
            }
            neg++
            record.push(neg.toString())
        }else {
            if(previous !== 's')
                from ++
            record.push(from.toString())
        }
        previous = result[i][0]

        record.push(result[i].substring(1))

        if(record[2] === ""){
            record[2] = " "
        }

        res.push(record)
    }

    console.log(res)

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
                    {res.map((element) => {
                        let color = ""
                        if(element[0] === '+') {
                            color = "green"
                        }else if(element[0] === '-'){
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
                                    {element[1]}
                                </code>
                                <code style={{
                                display: "inline-block",
                                paddingLeft: '1vh',
                                background: color,
                                width: "90%"
                                }}>
                                    {element[2]}
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
