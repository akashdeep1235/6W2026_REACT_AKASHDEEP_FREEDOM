import { Link } from "react-router-dom";

export default function Projects(){

    return(
        <>
              <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Projects
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Projects</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Add Projects
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container mb-5">
        <div className="d-flex justify-content-between mt-5">
          <h1 className="text-center"> Browse Projects </h1>
                 <Link to="/addproject">
            <button
              className="btn border-secondary py-3 bg-white text-primary "
              type="submit"
            >
              <i className="bi bi-plus"></i>
              Add Project
            </button>
          </Link>



        </div>
        {/* Single Page Header End */}

      </div>
      <>
  {/* Projects Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div
        className="text-center mx-auto wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ maxWidth: 500 }}
      >
        <p className="fs-5 fw-bold text-primary">Our Projects</p>
        <h1 className="display-5 mb-5">Some Of Our Wonderful Projects</h1>
      </div>
      <div className="row wow fadeInUp" data-wow-delay="0.3s">
        <div className="col-12 text-center">
          <ul className="list-inline rounded mb-5" id="portfolio-flters">
            <li className="mx-2 active" data-filter="*">
              All
            </li>
            <li className="mx-2" data-filter=".first">
              Complete Projects
            </li>
            <li className="mx-2" data-filter=".second">
              Ongoing Projects
            </li>
          </ul>
        </div>
      </div>
      <div className="row g-4 portfolio-container">
        <div
          className="col-lg-4 col-md-6 portfolio-item first wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="portfolio-inner rounded">
            <img className="img-fluid" src="img/service-1.jpg" alt="" />
            <div className="portfolio-text">
              <h4 className="text-white mb-4">Landscaping</h4>
              <div className="d-flex">
                <Link
                  className="btn btn-lg-square rounded-circle mx-2"
                  to="img/service-1.jpg"
                  data-lightbox="portfolio"
                >
                  <i className="fa fa-eye" />
                </Link>
                <Link className="btn btn-lg-square rounded-circle mx-2" to="">
                  <i className="fa fa-link" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 portfolio-item second wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="portfolio-inner rounded">
            <img className="img-fluid" src="img/service-2.jpg" alt="" />
            <div className="portfolio-text">
              <h4 className="text-white mb-4">Pruning plants</h4>
              <div className="d-flex">
                <Link
                  className="btn btn-lg-square rounded-circle mx-2"
                  to="img/service-2.jpg"
                  data-lightbox="portfolio"
                >
                  <i className="fa fa-eye" />
                </Link>
                <Link className="btn btn-lg-square rounded-circle mx-2" to="">
                  <i className="fa fa-link" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 portfolio-item first wow fadeInUp"
          data-wow-delay="0.5s"
        >
          <div className="portfolio-inner rounded">
            <img className="img-fluid" src="img/service-3.jpg" alt="" />
            <div className="portfolio-text">
              <h4 className="text-white mb-4">Irrigation &amp; Drainage</h4>
              <div className="d-flex">
                <Link
                  className="btn btn-lg-square rounded-circle mx-2"
                  to="img/service-3.jpg"
                  data-lightbox="portfolio"
                >
                  <i className="fa fa-eye" />
                </Link>
                <Link className="btn btn-lg-square rounded-circle mx-2" to="">
                  <i className="fa fa-link" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 portfolio-item second wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="portfolio-inner rounded">
            <img className="img-fluid" src="img/service-4.jpg" alt="" />
            <div className="portfolio-text">
              <h4 className="text-white mb-4">Garden Maintenance</h4>
              <div className="d-flex">
                <Link
                  className="btn btn-lg-square rounded-circle mx-2"
                  to="img/service-4.jpg"
                  data-lightbox="portfolio"
                >
                  <i className="fa fa-eye" />
                </Link>
                <Link className="btn btn-lg-square rounded-circle mx-2" to="">
                  <i className="fa fa-link" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 portfolio-item first wow fadeInUp"
          data-wow-delay="0.3s"
        >
          <div className="portfolio-inner rounded">
            <img className="img-fluid" src="img/service-5.jpg" alt="" />
            <div className="portfolio-text">
              <h4 className="text-white mb-4">Green Technology</h4>
              <div className="d-flex">
                <Link
                  className="btn btn-lg-square rounded-circle mx-2"
                  to="img/service-5.jpg"
                  data-lightbox="portfolio"
                >
                  <i className="fa fa-eye" />
                </Link>
                <Link className="btn btn-lg-square rounded-circle mx-2" to="">
                  <i className="fa fa-link" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-lg-4 col-md-6 portfolio-item second wow fadeInUp"
          data-wow-delay="0.5s"
        >
          <div className="portfolio-inner rounded">
            <img className="img-fluid" src="img/service-6.jpg" alt="" />
            <div className="portfolio-text">
              <h4 className="text-white mb-4">Urban Gardening</h4>
              <div className="d-flex">
                <Link
                  className="btn btn-lg-square rounded-circle mx-2"
                  to="img/service-6.jpg"
                  data-lightbox="portfolio"
                >
                  <i className="fa fa-eye" />
                </Link>
                <Link className="btn btn-lg-square rounded-circle mx-2" to="">
                  <i className="fa fa-link" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Projects End */}
</>


        
        </>
    )
}