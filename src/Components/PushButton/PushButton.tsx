import './ButtonStyle.css'
import { ArrowUpFromLine } from 'lucide-react'

interface Props {
    afterSelect: (...args: any[]) => any
}

function PushButton({ afterSelect }: Props){
    const handlePushButton = async (...args: any[]) => {
        try{
            const response = await window.repository.push()
            afterSelect(response, ...args)
        }catch (error){
            console.log('Error while pushing')
        }
    }
    return (
    <button className='MenuButton' onClick={handlePushButton}>
        <ArrowUpFromLine/>
        PUSH
    </button>)
}

export default PushButton
