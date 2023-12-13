// @file components/Button.tsx
// @brief Diff output
// @author Michal Zapletal (xzaple41)
// @date October 2023


import {useEffect, useState} from "react";

function Diff() {
    const [data, setData] = useState<string>("")

    useEffect(() => {
        async function getData(){
            const data = await window.git.getDiff()
            setData(data)
            //console.log(data)
        }
        getData()
    }, []);

    console.log(data)

    let result= data.split('\n')
    for(let i = 0; i < result.length; i++){
        result[i] += '\n'
        if(result[i][0] !== '+' && result[i][0] !== '-' && result[i][0] !== ' ' /*&& result[i][0] !== '@'*/){
            delete result[i]
        }
    }


    return (
        <>
            <div style={{
                overflowY: 'scroll',
                overflow: 'auto',
                height: '65vh',
                width: '100%',
                textAlign: 'left'
            }}>
                <pre style={{width: "100%"}}>
                    {result.map((element) => {
                        if(element[0] === '+') {
                            return (<code style={{
                                backgroundColor: "green",
                                display: "block",
                                paddingLeft: '1vh'
                            }}>
                                {element.substring(1)}
                            </code>)
                        }else if(element[0] === '-'){
                            return (<code style={{
                                backgroundColor: "red",
                                display: "block",
                                paddingLeft: '1vh'
                            }}>
                                {element.substring(1)}
                            </code>)
                        }else {
                            return (<code style={{
                                display: "block",
                                paddingLeft: '1vh'
                            }}>
                                {element.substring(1)}
                            </code>)
                        }
                        })}
                </pre>
            </div>
        </>
    )
}
// {result.map((element) => (<code>{element}</code>))}
export default Diff
