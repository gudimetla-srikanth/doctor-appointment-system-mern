import './Appointments.css'
import { useSelector } from 'react-redux'
export default function Appointments() {
    const user = useSelector(state => state.user.doctor)
    return (
        <div className="appointments">
            <div className="ap_blocks">
                {user?.appointments?.map((item) => {
                    return <><div className='apblock'>
                        <div className="ap_item">
                            <div className="ap_name">{item.message}</div>
                        </div>
                    </div></>
                })}
            </div>
        </div>
    )
}
