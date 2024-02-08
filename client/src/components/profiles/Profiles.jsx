import './Profiles.css'
import { useSelector } from 'react-redux'
export default function Profile() {
    const user = useSelector(state => state.user.doctor)
    return (
        <div className="profiles">
            <div className="profiles_wrapper">
                <div className="profiles_item">
                    <div className="profiles_name">Fullname</div>
                    <div className="profiles_name">{user?.fullName}</div>
                </div>
                <div className="profiles_item">
                    <div className="profiles_name">Email</div>
                    <div className="profiles_name">{user?.email}</div>
                </div>
                <div className="profiles_item">
                    <div className="profiles_name">Mobile Number</div>
                    <div className="profiles_name">{user?.phNo}</div>
                </div>
                <div className="profiles_item">
                    <div className="profiles_name">Specilization</div>
                    <div className="profiles_name">{user?.specilization}</div>
                </div>
                <div className="profiles_item">
                    <div className="profiles_name">Experience</div>
                    <div className="profiles_name">{user?.experience}</div>
                </div>
                <div className="profiles_item">
                    <div className="profiles_name">Fee For consultation</div>
                    <div className="profiles_name">${user?.feeForConsultation}</div>
                </div>
                <div className="profiles_item">
                    <div className="profiles_name">Timings</div>
                    <div className="profiles_name">{user?.timings}</div>
                </div>
            </div>
        </div>
    )
}
