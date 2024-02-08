import { useState, useEffect } from 'react'
import './BookingDc.css'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { rendervalchange } from '../../store/userSlice'
import axios from 'axios'
export default function BookingDc() {
    const dispatch = useDispatch()
    const renderval = useSelector(state => state.user.renderval)
    const { state } = useLocation()
    const [date, setDate] = useState('')
    const [check, setCheck] = useState(false)
    const user = useSelector(state => state.user.user)
    const dateHandle = (e) => {
        setDate(e.target.value)
        setCheck(false)
    }
    const [spDoctor, setSpDoctor] = useState({})
    useEffect(() => {
        const doctorDetails = async () => {
            const res = await axios.get('http://localhost:5000/doc/doctor/alldoctors', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            res?.data?.data?.map((item) => {
                if (item.email === state.email) {
                    setSpDoctor(item)
                    console.log(item)
                }
            })
        }
        doctorDetails()
    }, [renderval])
    const checkHandle = () => {
        if (date !== '') {
            if (spDoctor?.appointments?.length !== 0) {
                spDoctor?.appointments?.map((item) => {
                    console.log("item.timings" + item.timings, "date" + date)
                    if (item.date == date) {
                        alert('The date has been booked by someone')
                        setCheck(true)
                        console.log(check)
                    }
                })
            } else {
                alert('There is no appointments.You can directly book your slot')
            }
        } else {
            alert('enter date first')
        }
    }
    const bookHandle = async () => {
        if (date !== '') {
            if (!check) {
                try {
                    const res = await axios.post('http://localhost:5000/doc/user/book', {
                        doctorEmail: spDoctor?.email, userEmail: user?.email, timings: date, userName: user?.name
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
                    dispatch(rendervalchange(!renderval))
                    alert(res.data.message)
                } catch (error) {
                    console.log(error)
                }

            } else {
                alert('change the booking date')
            }
        } else {
            alert('Enter date first')
        }
    }
    console.log(check)
    return (
        <div className="booking">
            <div className="booking_wrapper">
                <div className="booking_item">
                    <div className="booking_name">Fullname</div>
                    <div className="booking_name">{spDoctor?.fullName}</div>
                </div>
                <div className="booking_item">
                    <div className="booking_name">Email</div>
                    <div className="booking_name">{spDoctor?.email}</div>
                </div>
                <div className="booking_item">
                    <div className="booking_name">Mobile</div>
                    <div className="booking_name"> {spDoctor?.phNo}</div>
                </div>
                <div className="booking_item">
                    <div className="booking_name">Experience</div>
                    <div className="booking_name">{spDoctor?.experience}</div>
                </div>
                <div className="booking_item">
                    <div className="booking_name">Specilization</div>
                    <div className="booking_name">{spDoctor?.specilization}</div>
                </div>
                <div><input type="date" value={date} onChange={dateHandle} /></div>
                <div><button onClick={checkHandle} className='bc_check'>Check Availability</button></div>
                <div><button onClick={bookHandle} className='bc_book'>Book Day</button></div>
            </div>
        </div>
    )
}
