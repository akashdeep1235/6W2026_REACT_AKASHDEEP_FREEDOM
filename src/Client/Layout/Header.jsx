import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { toast } from "react-toastify";


export default function header() {
  const[email,setEmail]=useState('')
  const nav=useNavigate()
  useEffect(()=>{
   let res = AuthService.getEmail()
    setEmail(res);

  },[])
  function logout(){

    AuthService.logout()
    toast.success("Logout Success")
    nav("/")
  }
    return (
        <>
           
  {/* Navbar Start */}
  <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
    <Link
      to="/admin/manageskills"
      className="navbar-brand d-flex align-items-center px-4 px-lg-5"
    >
      <h1 className="m-0">Freedom</h1>
    </Link>
    <button
      type="button"
      className="navbar-toggler me-4"
      data-bs-toggle="collapse"
      data-bs-target="#navbarCollapse"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarCollapse">
      <div className="navbar-nav ms-auto p-4 p-lg-0">
        <Link to="/" className="nav-item nav-link">
          Home
        </Link>
          <Link to="/projects" className="nav-item nav-link">
          Post Project
        </Link>
        <Link to="/managebids" className="nav-item nav-link">
          BrowseBids
        </Link>
        <Link to="/skills" className="nav-item nav-link">
          BrowseSkills
        </Link>
        <Link to="/work" className="nav-item nav-link">
          Work
        </Link>
        <Link to="/rate" className="nav-item nav-link">
          Rate
        </Link>
          <Link to="/contact" className="nav-item nav-link">
          Contact
        </Link>
        
        <Link to="/profile" className="nav-item nav-link">
          Profile
        </Link>
        {email ?
           <Link to="#" className="nav-item nav-link "onClick={logout}>
           Logout

        </Link>
        :
      
              <Link to="/userlogin" className="nav-item nav-link">
          Login/Register
        </Link>
        }
      </div>
      
      {/* <Link
        to="/userlogin"
        className="btn btn-primary py-4 px-lg-4 rounded-0 d-none d-lg-block"
      >
        Join
        <i className="fa fa-arrow-right ms-3" />
      </Link> */}
    </div>
  </nav>
  {/* Navbar End */}
</>

        
    )
}
