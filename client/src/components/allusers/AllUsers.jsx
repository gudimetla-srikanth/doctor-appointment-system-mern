import { useEffect, useState } from 'react'
import './AllUsers.css'
import axios from 'axios'
import { useSelector } from 'react-redux'

export default function AllUsers() {
    const [allUserData, setAllUserData] = useState([])
    const renderval = useSelector(state => state.user.renderval)
    useEffect(() => {
        try {
            const users = async () => {
                const res = await axios.get('http://localhost:5000/doc/user/allusers', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if (res.data.length === 1) {
                    setAllUserData([res.data.data])
                } else {
                    setAllUserData(res.data.data)
                }
            }

            users()
        } catch (error) {
            console.log(error)
        }
    }, [renderval])
    return (
        <div className="allusers">
            <div className="allusers_wrapper">
                {allUserData?.map((item) => {
                    return <>
                        <div className="allusers_block">
                            <div className="allusers_item"> {item.name}</div>
                            <div className="allusers_item"> {item.email}</div>
                        </div>
                    </>
                })}
            </div>
        </div>
    )
}
