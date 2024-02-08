import { useNavigate } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'

export default function Login() {
    const navigate = useNavigate()
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const loginHandle = (e) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }
    const submitHandle = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/doc/user/login', loginData)
            console.log(res.data)
            if (res.data.success) {
                localStorage.setItem('token', res.data.token)
                navigate('/')
            } else {
                alert(res.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="login">
            <h1>Login Here</h1>
            <form onSubmit={submitHandle} >
                <div className="login_item">
                    <input type="email" placeholder='Enter your email' name='email' value={loginData.email} required onChange={loginHandle} />
                </div>
                <div className="login_item">
                    <input type="text" placeholder='Enter your password' name='password' value={loginData.password} required onChange={loginHandle} />
                </div>
                <div className="login_item">
                    <input type="submit" />
                </div>
            </form>
            <div className="login_register">Don't you have an account?<span onClick={() => navigate('/register')}>Register</span></div>
        </div>
    )
}
