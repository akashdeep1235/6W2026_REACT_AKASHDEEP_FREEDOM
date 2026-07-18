import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function AdHeader() {
  
  return (
    <>
      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h1 className="m-0">Admin Panel</h1>
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
            <Link to="/admin/manageskills" className="nav-item nav-link">
              Skills
            </Link>
              <Link to="/admin/managerequests" className="nav-item nav-link">
              Freelancer Requests
            </Link>
            


            <Link to="/admin/mprojects" className="nav-item nav-link">
              Projects
            </Link>
           


      
        
            <Link to="/admin/managecontracts" className="nav-item nav-link">
              Contracts
            </Link>
              <Link to="/admin/managepayments" className="nav-item nav-link">
              Payments
            </Link>
             <Link to="/admin/manageusers" className="nav-item nav-link">
              Users
            </Link>
          </div>
          <Link
            to=""
            className="btn btn-primary py-4 px-lg-4 rounded-0 d-none d-lg-block"
          >
            Get A Quote
            <i className="fa fa-arrow-right ms-3" />
          </Link>
        </div>
      </nav>
      {/* Navbar End */}

    </>
  )
}