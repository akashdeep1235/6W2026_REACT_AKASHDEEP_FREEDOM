import { Link } from "react-router-dom";
export default function Skills() {
    return (
        <>
 {/* Page Header Start */}
  <div
    className="container-fluid page-header py-5 mb-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-3 text-white mb-4 animated slideInDown">
        SKills
      </h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="#">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">Pages</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Skills
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
  {/* Service Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div
        className="text-center mx-auto wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ maxWidth: 500 }}
      >
        <p className="fs-5 fw-bold text-primary">Our Skills</p>
        <h1 className="display-5 mb-5">SKills That We Offer For You</h1>
      </div>
      <div className="row g-4">
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="service-item rounded d-flex h-100">
            <div className="service-img rounded">
              <img className="img-fluid" src="https://media.istockphoto.com/id/1352603244/photo/shot-of-an-unrecognizable-businessman-working-on-his-laptop-in-the-office.jpg?s=612x612&w=0&k=20&c=upiDYeAZEsxbUBdhX35MXm79drIXA-5Q-FcfmZk71lM=" alt="" />
            </div>
            <div className="service-text rounded p-5">
              <div className="btn-square rounded-circle mx-auto mb-3">
                <img
                  className="img-fluid"
                  src=""
                  alt="Icon"
                />
              </div>
              <h4 className="mb-3">Web development</h4>
              <p className="mb-4">
          Building and maintaining responsive, functional websites using modern frameworks and clean code.
              </p>
              <Link className="btn btn-sm" to="/addproject">
                <i className="fa fa-plus text-primary me-2" />
               Add Project
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item rounded d-flex h-100">
            <div className="service-img rounded">
              <img className="img-fluid" src="https://ik.imagekit.io/saubldfer/hamstech-blog/wp-content/uploads/2021/11/Title-Image-4.jpg" alt="" />
            </div>
            <div className="service-text rounded p-5">
              <div className="btn-square rounded-circle mx-auto mb-3">
                <img
                  className="img-fluid"
                  src=""
                  alt="Icon"
                />
              </div>
              <h4 className="mb-3">Graphic Design</h4>
              <p className="mb-4">
                Creating visual content — logos, banners, and branding assets — that communicate a client's identity.
              </p>
              <Link className="btn btn-sm" to="/addproject">
                <i className="fa fa-plus text-primary me-2" />
             Add Project
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item rounded d-flex h-100">
            <div className="service-img rounded">
              <img className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu83MnxksTjDSBmcRzV6TWUx0G3oje8xorXp4ZEbWOmYRrbYkLnZFj1H2s&s=10" alt="" />
            </div>
            <div className="service-text rounded p-5">
              <div className="btn-square rounded-circle mx-auto mb-3">
                <img
                  className="img-fluid"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdM7Ip2SC3clLMBuDbiPmyPd7aFu3uIQEnddCfaoz1gA&s=10"
                  alt="Icon"
                />
              </div>
              <h4 className="mb-3">Digital &amp; Marketing</h4>
              <p className="mb-4">
               Promoting products and services through social media, ads, and campaign strategy to grow reach.
              </p>
              <Link className="btn btn-sm"to="/addproject">
                <i className="fa fa-plus text-primary me-2" />
             Add Project
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="service-item rounded d-flex h-100">
            <div className="service-img rounded">
              <img className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEq5EoV7UnxI_Z926Txku4snKmyA4Q_XW_EBQ8ehfuB351YXsAox-w080&s=10" alt="" />
            </div>
            <div className="service-text rounded p-5">
              <div className="btn-square rounded-circle mx-auto mb-3">
                <img
                  className="img-fluid"
                  src=""
                  alt="Icon"
                />
              </div>
              <h4 className="mb-3">Video Editing</h4>
              <p className="mb-4">
               Cutting, color-grading, and assembling raw footage into polished videos for content or ads.
              </p>
              <Link className="btn btn-sm"to="/addproject">
                <i className="fa fa-plus text-primary me-2" />
               Add Project
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="service-item rounded d-flex h-100">
            <div className="service-img rounded">
              <img className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUhqqRahL2PsN2EvUef2tCguAD0zLkmJo_BdvdNbc7sGPsrZ3QnUEJxRE&s=10" alt="" />
            </div>
            <div className="service-text rounded p-5">
              <div className="btn-square rounded-circle mx-auto mb-3">
                <img
                  className="img-fluid"
                  src=""
                  alt="Icon"
                />
              </div>
              <h4 className="mb-3">Mobile App Development</h4>
              <p className="mb-4">
              Designing and building iOS and Android apps with smooth performance and intuitive interfaces.
              </p>
              <Link className="btn btn-sm"to="/addproject">
                <i className="fa fa-plus text-primary me-2" />
             Add Project
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="service-item rounded d-flex h-100">
            <div className="service-img rounded">
              <img className="img-fluid" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FR5ihqBcGn6JFc6iPCsm47w9HSiu3S02ayaAwB5ANZHDEf2MDja_k1I&s=10" alt="" />
            </div>
            <div className="service-text rounded p-5">
              <div className="btn-square rounded-circle mx-auto mb-3">
                <img
                  className="img-fluid"
                  src=""
                  alt="Icon"
                />
              </div>
              <h4 className="mb-3">UI/UX Design</h4>
              <p className="mb-4">
                Erat ipsum justo amet duo et elitr dolor, est duo duo eos lorem
                sed diam stet diam sed stet.
              </p>
              <Link className="btn btn-sm" to="/read-more">
                <i className="fa fa-plus text-primary me-2" />
              Add Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Service End */}


        </>
    )}
