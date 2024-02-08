
import './UpdateUser.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { rendervalchange } from '../../store/userSlice'
import axios from 'axios'

function UpdateUser() {
    const dispatch = useDispatch()
    const renderval = useSelector(state => state.user.renderval)
    const user = useSelector(state => state.user.user)
    const [updateData, setUpdateData] = useState({
        name: '',
        email: '',
    })
    const [adData, setAdData] = useState({
        notifications: user?.notifications,
        seenNotifications: user?.seenNotifications,
        newDoctor: user?.newDoctor

    })
    const [updateData1, setUpdateData1] = useState({
        isDoctor: ''
    })
    const updateHandle = (e) => {
        const { name, value } = e.target
        setUpdateData({ ...updateData, [name]: value })
    }
    const updateHandle1 = (e) => {
        const { name, value } = e.target
        setUpdateData1({ ...updateData1, [name]: value })
    }
    const submitHandle = async (e) => {
        e.preventDefault()
        console.log(updateData)
        if (updateData1.isDoctor == 'false' || updateData1.isDoctor == 'true') {
            try {
                const res = await axios.put('http://localhost:5000/doc/user/update', { ...updateData, ...updateData1, ...adData }, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                dispatch(rendervalchange(!renderval))
                console.log(res.data)
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('wrong inputs')
        }
    }
    return (
        <div className="update">
            <form onSubmit={submitHandle} className='update_form'>
                <div className="update_item">
                    <input type="text" name='name' value={updateData.name} placeholder='Enter name' onChange={updateHandle} required />
                </div>
                <div className="update_item">
                    <input type="email" name='email' value={updateData.email} placeholder='Enter email' onChange={updateHandle} required />
                </div>
                <div className="update_item">
                    <input type="submit" className='update_btn' />
                </div>
            </form>
        </div>
    )
}

export default UpdateUser
