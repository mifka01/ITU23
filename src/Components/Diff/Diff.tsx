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

    return (
        <>
            <div style={{
                overflowY: 'scroll',
                overflow: 'auto',
                height: '65vh',
                width: '100%',
                textAlign: 'left',
                paddingLeft: '1vh'
            }}>
                {result.map((element) => (<p>{element}</p>))}
            </div>
        </>
    )
}

export default Diff