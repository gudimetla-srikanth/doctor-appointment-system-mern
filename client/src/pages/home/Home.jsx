import './Home.css'
import { userMenu, adminMenu, doctorMenu } from '../../data'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { userData, doctorData } from '../../store/userSlice'
export default function Home() {
    const user = useSelector(state => state.user.user)
    const [menuChanger, setMenuChanger] = useState([])
    const [menuShow, setMenuShow] = useState(true)
    const [showUsers, setShowUsers] = useState(false)
    const [userDataCurrent, setUserDataCurrent] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const val = useLocation()
    console.log(val.pathname)
    const renderval = useSelector(state => state.user.renderval)
    useEffect(() => {
        try {
            const getData = async () => {
                const res = await axios.get('http://localhost:5000/doc/user/userdata', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                setUserDataCurrent(res.data.data)
                dispatch(userData(res.data.data))

            }
            getData()
        } catch (error) {
            console.log(error)
        }
    }, [renderval])
    const logoutHandle = () => {
        localStorage.clear()
        dispatch(userData({}))
        navigate('/login')
    }
    const notificationHandle = () => {
        navigate('/notifications')
    }
    const adminHandle = () => {
        setMenuChanger(adminMenu)
        setMenuShow(false)
        setShowUsers(false)
        navigate('/')
    }
    const userHandle = () => {
        setMenuChanger(userMenu)
        setMenuShow(false)
        setShowUsers(false)
        navigate('/')
    }
    const doctorHandle = async () => {
        try {
            const res = await axios.get('http://localhost:5000/doc/doctor/getdoctor', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(doctorData(res?.data?.data))
        } catch (error) {
            console.log(error)
        }
        setMenuChanger(doctorMenu)
        setMenuShow(false)
        setShowUsers(false)
        navigate('/')
    }
    return (
        <div className="home">
            <div className="home_left">
                <div className="home_left_top">
                    <h1>DOS</h1>
                </div>
                <div className="home_links">
                    {
                        menuShow && userMenu?.map((item, index) => {
                            return <>
                                <Link to={item.link} className='link' key={index}><div className={`home_left_middle ${(val.pathname == item.link) && 'active'}`}>
                                    <i className={item.icon}></i>
                                    <span>{item.tab}</span>
                                </div></Link>
                            </>
                        })
                    }
                    {
                        !menuShow && menuChanger?.map((item, index) => {
                            return <>
                                <Link to={item.link} className='link' key={index}><div className={`home_left_middle ${(val.pathname == item.link) && 'active'}`}>
                                    <i className={item.icon}></i>
                                    <span>{item.tab}</span>
                                </div></Link>
                            </>
                        })
                    }
                </div>
                <div className="home_left_bottom" onClick={logoutHandle}>
                    <div className='home_logout'>Logout</div>
                </div>
            </div>
            <div className="home_right">
                <div className="home_right_top">
                    <div className="bell"><i class="fa-solid fa-bell" onClick={notificationHandle}></i><span>{userDataCurrent?.notifications?.length}</span></div><span onClick={() => setShowUsers(prev => !prev)}>{userDataCurrent?.name}</span>
                    {showUsers && <div className='showusers'><div className='userP' onClick={adminHandle}>{userDataCurrent?.isAdmin && 'Admin'}</div><div className='userP' onClick={doctorHandle}>{userDataCurrent?.isDoctor && 'Doctor'}</div><div className='userP' onClick={userHandle}>{userDataCurrent?.name}</div></div>}
                </div>
                <div className="home_right_bottom">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
