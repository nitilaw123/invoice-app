import React from 'react'
import '../../Components/dashboard/Dashboard.css'
import logoImg from '../../assets/invoice.jpg';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase'
import {signOut} from 'firebase/auth'
const Dashboard = () => {
  const navigate= useNavigate()
  const logOut = ()=>{
    
    signOut(auth).then(()=>{
   
      localStorage.clear()
       navigate('/login')

    }).catch((error)=>{
        console.log(error)
    })
  }
  const storedLogo = localStorage.getItem('companyLogo');
  console.log(storedLogo)
  return (
    <div className='dashboard-wrpper'>
     <div className='side-nav'>
      <div className='profile-info'>
      {/* <img src={logoImg} alt="" /> */}
      {storedLogo && <img src={storedLogo} alt="Stored Logo" />}
     <div>
     <p>{localStorage.getItem('cName')}</p>
     <button className='btn-logout' onClick={logOut}>Logout</button>
     </div>
      </div>
      <hr />
      <div className='menu'>
      <Link to='/dashboard/home' className='menu-item' ><i className="fa-solid fa-house"></i> Home</Link>
       <Link to = '/dashboard/invoices' className='menu-item'><i className="fa-solid fa-file-invoice"></i> Invoices</Link>
       <Link to = '/dashboard/new-invoice' className='menu-item'><i className="fa-solid fa-file-circle-plus"></i> New Invoice</Link>
       <Link  to ='/dashboard/setting' className='menu-item'><i className="fa-solid fa-gear"></i> Setting</Link>
      </div>
       </div>

     <div className='main-container'>
       <Outlet></Outlet>
     </div>
    </div>
  )
}

export default Dashboard
