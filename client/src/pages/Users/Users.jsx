import React from 'react'
import './Users.css';
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar';
// import { useLocation } from 'react-router-dom';
import UsersList from './UsersList';

const Users = () => {

  return (
    <div className='home-container-1'>
        <LeftSideBar />
        <div className="home-container-2">
          <h3 style = {{fontWeight : "400"}}>Users</h3>
          <UsersList/>
        </div>
    </div>
  )
}

export default Users