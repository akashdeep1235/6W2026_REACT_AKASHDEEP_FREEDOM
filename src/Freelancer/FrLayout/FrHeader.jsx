import { Link } from "react-router-dom";
export default function FrHeader() {
  return (
    <>
  {/* Navbar Start */}
  <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0">
    <Link
      to="index.html"
      className="navbar-brand d-flex align-items-center px-4 px-lg-5"
    >
      <h1 className="m-0">Freelancer Panel</h1>
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
        <Link to="/freelancer/bids" className="nav-item nav-link">
          Bids
        </Link>
     
        <Link to="/services" className="nav-item nav-link">
          Orders
        </Link>
        <Link to="/projects" className="nav-item nav-link">
          Projects
        </Link>
           <Link to="/about" className="nav-item nav-link">
         Profile                                                 
        </Link>
     
        <Link to="/contact" className="nav-item nav-link">
          Freelancers
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