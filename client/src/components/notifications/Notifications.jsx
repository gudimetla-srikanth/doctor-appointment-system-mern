import axios from 'axios'
import './Notifications.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { rendervalchange } from '../../store/userSlice'
export default function Notifications() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const renderval = useSelector(state => state.user.renderval)
    const [show, setShow] = useState(false)
    const submitHandle = async () => {
        try {
            const res = await axios.get('http://localhost:5000/doc/user/notifications', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(rendervalchange(!renderval))
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="notifications">
            <button onClick={() => setShow(prev => !prev)}>New Notifications</button>
            <button onClick={() => setShow(prev => !prev)}>Old Notifications</button>
            <button className='noti_mark' onClick={submitHandle}>Mark all Read</button>
            <div className="noti_block">
                {show ? <>
                    {user?.seenNotifications?.map((item) => {
                        return <><div className='noti'>{`${item.message}`}</div></>
                    })}
                </> : <>{user?.notifications?.map((item) => {
                    return <><div className='noti'>{`${item.message}`}</div></>
                })}</>}
            </div>
        </div>
    )
}
