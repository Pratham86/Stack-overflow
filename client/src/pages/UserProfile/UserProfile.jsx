import React, { useState } from 'react'
import LeftSideBar from "../../components/LeftSidebar/LeftSidebar"
import Avatar from "../../components/Avatar/Avatar"
import moment from "moment"
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBirthdayCake , faPen} from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UsersProfile.css'

const UserProfile = () => {

  const users = useSelector((state) => state.usersReducer);

  const {_id} = useParams();
  const currentProfile = users.filter((user) => user._id === _id);

  const currentUser = useSelector((state) => state.currentUserReducer)

  const[Switch , setSwitch] = useState(false)


  return (
    <div className='home-container-1'>
        <LeftSideBar />
        <div className="home-container-2">
            <section> 
                <div className='user-details-container'>
                    <div className="user-details">
                        <Avatar backgroundColor='purple' color = "white" fontSize = "50px" px = "40px" py = "30px" >
                        {currentProfile[0]?.name?.charAt(0).toUpperCase()}
                        </Avatar>

                        <div className="user-name">
                            <h1>{currentProfile[0]?.name}</h1>

                            <p><FontAwesomeIcon icon = {faBirthdayCake} /> Joined {moment(currentProfile[0]?.joinedOn).fromNow()}</p>
                        </div>
                    </div>

                    {
                        currentUser?.message?._id === _id && (
                            <button type = 'button' onClick={() => setSwitch(true)} className='edit-profile-btn'>
                                <FontAwesomeIcon icon={faPen} />
                                Edit Profile
                            </button>
                        )
                    }
                </div>

                <>
                    {
                        Switch ? (
                            <EditProfileForm 
                                currentUser={currentUser} setSwitch = {setSwitch}
                            />
                        ) : (
                            <ProfileBio currentProfile = {currentProfile[0]} />
                        )
                    }
                </>

            </section>
        </div>

    </div>
  )
}

export default UserProfile