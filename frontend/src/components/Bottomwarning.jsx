import {Link} from 'react-router-dom'

export default function Bottomwarning({label,to,buttontext}){
    return<div>
        <div className='flex gap-2'>
            {label}
            <Link className='pointer underline cursor-pointer' to={to}>
            {buttontext}
            </Link>
        </div>
    </div>
}