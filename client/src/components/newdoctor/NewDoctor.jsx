import './NewDoctor.css'
import { useDispatch, useSelector } from 'react-redux'
import { rendervalchange } from '../../store/userSlice'
import axios from 'axios'
export default function NewDoctor() {
    const dispatch = useDispatch()
    const renderval = useSelector(state => state.user.renderval)
    const user = useSelector(state => state.user.user)
    const acceptHandle = async (e) => {
        const { value } = e.target
        console.log(value)
        try {
            const res = await axios.post('http://localhost:5000/doc/admin/accept', { indexVal: parseInt(value) }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(rendervalchange(!renderval))
            alert(res.data.message)
        } catch (error) {
            console.log(error)
            alert('Kindly reject it')
        }
    }
    const rejectHandle = async (e) => {
        const { value } = e.target
        console.log(value)
        try {
            const res = await axios.post('http://localhost:5000/doc/admin/reject', { indexVal: parseInt(value) }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(rendervalchange(!renderval))
            console.log(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="newdoctor">
            <div className="newdoctor_block">
                {user?.newDoctor?.map((item, index) => {
                    return <div className='doctorD' key={index}>
                        <div className="newdoctor_details">
                            <div className="newdoctor_item">{index + 1}</div>
                            <div className="newdoctor_item">Name : {item.fullName}</div>
                            <div className="newdoctor_item">Email : {item.email}</div>
                            <div className="newdoctor_item">Specilization : {item.specilization}</div>
                            <div className="newdoctor_item">Exprerience : {item.experience}</div>
                            <div className="newdoctor_item">Mobile No: {item.phNo}</div>
                        </div>
                        <div className="newdoctor_btns">
                            <button className="newdoctor_ac" value={index} onClick={acceptHandle}>Accept</button>
                            <button className="newdoctor_rj" value={index} onClick={rejectHandle}>Reject</button>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}
