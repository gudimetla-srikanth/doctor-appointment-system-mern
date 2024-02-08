import './ApplyAsDoctor.css'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { rendervalchange } from '../../store/userSlice'
export default function ApplyAsDoctor() {
    const dispatch = useDispatch()
    const renderval = useSelector(state => state.user.renderval)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phNo: '',
        specilization: '',
        experience: '',
        feeForConsultation: '',
        timings: ''
    })
    const formHandler = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }
    const submitHandle = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/doc/doctor/register', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            setFormData({
                fullName: '',
                email: '',
                phNo: '',
                specilization: '',
                experience: '',
                feeForConsultation: '',
                timings: ''
            })
            dispatch(rendervalchange(!renderval))
            alert(res.data.message)
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="applyasdoctor">
            <form onSubmit={submitHandle} className='forms'>
                <div className="applyas_item">
                    <input type="text" name='fullName' placeholder='Enter fullname' value={formData.fullName} onChange={formHandler} required />
                </div>
                <div className="applyas_item">
                    <input type="email" name='email' placeholder='Enter email' value={formData.email} onChange={formHandler} required />
                </div>
                <div className="applyas_item">
                    <input type="text" name='phNo' placeholder='Enter phno' value={formData.phNo} onChange={formHandler} required />
                </div>
                <div className="applyas_item">
                    <input type="text" name='specilization' placeholder='Enter specilization' value={formData.specilization} onChange={formHandler} required />
                </div>
                <div className="applyas_item">
                    <input type="text" name='experience' placeholder='Enter experience' value={formData.experience} onChange={formHandler} required />
                </div>
                <div className="applyas_item">
                    <input type="text" name='feeForConsultation' placeholder='Enter fee' value={formData.feeForConsultation} onChange={formHandler} required />
                </div>
                <div className="applyas_item">
                    <input type="text" name='timings' placeholder='Enter timings' value={formData.timings} onChange={formHandler} required />
                </div>
                <input type="submit" className='applys_btn' />

            </form>
        </div>
    )
}
