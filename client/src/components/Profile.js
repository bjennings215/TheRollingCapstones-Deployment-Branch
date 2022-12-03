import { useSendLogoutMutation } from '../features/auth/authapi'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react';

const Profile = () => {

  const navigate = useNavigate()

  const [sendLogout, {
      isSuccess
  }] = useSendLogoutMutation()

  const logoutButton = (
    <button
        className="hero-button"
        title="Logout"
        onClick={sendLogout}
    >Logout
    </button>
  )

  useEffect(() => {
      if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

    return <div className="profile-page">
    <div className="profile">
   <div className="profile-content">
     <h1 className="profile-header">Welcome to the Profile</h1>
     <p className="profile-subheader">Check out whats going on!!!</p>
   </div>
   </div>
   <iframe className="submits" width="640" height="480" src="https://charts.mongodb.com/charts-capcodes-database-igkqn/embed/charts?id=6384207c-b644-41bd-8855-fbc12406d00d&maxDataAge=300&theme=light&autoRefresh=true"></iframe>
    <div>
      {logoutButton}
    </div>
 </div>;
  };
  
  export default Profile;