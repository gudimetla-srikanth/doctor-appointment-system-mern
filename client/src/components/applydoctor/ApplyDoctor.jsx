import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ApplyDoctor.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function ApplyDoctor() {
    const [allDoctorData, setAllDoctorData] = useState([])
    const navigate = useNavigate()
    const renderval = useSelector(state => state.user.renderval)
    useEffect(() => {
        try {
            const doctors = async () => {
                const res = await axios.get('http://localhost:5000/doc/doctor/alldoctors', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
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
        <div className="applydoctor">
            <div className="applydoctors_wrapper">
                {
                    allDoctorData?.map((item, index) => {
                        return <div className='applyD' key={index} onClick={() => {
                            navigate('/apbooking', { state: item })
                        }}> <div className='apply_item'>
                                <div className="apply_name">{item.fullName}</div>
                            </div>
                            <div className='apply_item'>
                                <div className="apply_name"><div className="apply_name">{item.experience}</div></div>
                            </div>
                            <div className='apply_item'>
                                <div className="apply_name">{item.specilization}</div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
