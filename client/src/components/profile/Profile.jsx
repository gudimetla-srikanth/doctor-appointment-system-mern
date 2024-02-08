import './Profile.css'
import { useSelector } from 'react-redux'
export default function Profile() {
    const user = useSelector(state => state.user.user)
    return (
        <div className="profile">
            <div className="profile_wrapper">
                <div className="profile_item">
                    <div className="profile_name">Name</div>
                    <div className="profile_name">{user?.name}</div>
                </div>
                <div className="profile_item">
                    <div className="profile_name">Email</div>
                    <div className="profile_name">{user?.email}</div>
                </div>
                <div className="profile_item">
                    <div className="profile_name">isDoctor</div>
                    <div className="profile_name">{user?.isDoctor ? 'YES' : 'NO'}</div>
                </div>
                <div className="profile_item">
                    <div className="profile_name">isAdmin</div>
                    <div className="profile_name">{user?.isAdmin ? 'YES' : 'NO'}</div>
                </div>
            </div>
        </div>
    )
}
