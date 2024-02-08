import { useEffect, useState } from 'react'
import './AllDoctors.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AllDoctors() {
    const navigate = useNavigate()
    const [allDoctorData, setAllDoctorData] = useState([])
    const renderval = useSelector(state => state.user.renderval)
    useEffect(() => {
        try {
            const doctors = async () => {
                const res = await axios.get('http://localhost:5000/doc/doctor/alldoctors', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(res.data)
                if (res.data.length === 1) {
                    setAllDoctorData([res.data.data])
                } else {
                    setAllDoctorData(res.data.data)
                }
            }
            doctors()
        } catch (error) {
            console.log(error)
        }
    }, [renderval])
    return (
        <div className="alldoctors">
            <div className="alldoctors_wrapper">
                {allDoctorData?.map((item) => {
                    return <>
                        <div className="alldoctors_block">
                            <div className="alldoctors_item">{item.fullName}</div>
                            <div className="alldoctors_item">{item.email}</div>
                            <div className="alldoctors_item">{item.specilization}</div>
                        </div>
                    </>
                })}
            </div>
        </div>
    )
}
