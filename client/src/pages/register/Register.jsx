import { useNavigate } from 'react-router-dom'
import './Register.css'
import { useState } from 'react'
import axios from 'axios'


export default function Register() {
    const navigate = useNavigate()
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        isAdmin: ""
    })
    const registerHandle = (e) => {
        const { name, value } = e.target
        setRegisterData({ ...registerData, [name]: value })
    }
    const submitHandle = async (e) => {
        e.preventDefault()
        try {
            if (registerData.isAdmin === 'true' || registerData.isAdmin === 'false') {
                if (registerData.isAdmin === 'true') {
                    registerData.isAdmin = true
                } else {
                    registerData.isAdmin = false
                }
                const res = await axios.post('http://localhost:5000/doc/user/register', registerData)
                console.log(res.data)
                if (res.data.success) {
                    navigate('/login')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="register">
            <h1>Register Here</h1>
            <form onSubmit={submitHandle}>
                <div className="register_item">
                    <input type="text" placeholder='Enter your name' name="name" value={registerData.name} required onChange={registerHandle} />
                </div>
                <div className="register_item">
                    <input type="email" placeholder='Enter your email' name="email" value={registerData.email} required onChange={registerHandle} />
                </div>
                <div className="register_item">
                    <input type="text" placeholder='Enter your password' name="password" value={registerData.password} required onChange={registerHandle} />
                </div>
                <div className="register_item">
                    <input type="text" placeholder='Enter "true" or "false" (Admin)' name="isAdmin" value={registerData.isAdmin} required onChange={registerHandle} />
                </div>
                <div className="register_item">
                    <input type="submit" />
                </div>
            </form>
            <div className="register_login">Don't you have an account?<span onClick={() => navigate('/login')}>Login</span></div>
        </div>
    )
}
