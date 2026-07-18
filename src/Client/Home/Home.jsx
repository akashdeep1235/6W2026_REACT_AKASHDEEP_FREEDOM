import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
    <>
  {/* Carousel Start */}
  <div className="container-fluid p-0 wow fadeIn" data-wow-delay="0.1s">
    <div
      id="header-carousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img className="w-100 h-100" src="https://media.istockphoto.com/id/1352603244/photo/shot-of-an-unrecognizable-businessman-working-on-his-laptop-in-the-office.jpg?s=612x612&w=0&k=20&c=upiDYeAZEsxbUBdhX35MXm79drIXA-5Q-FcfmZk71lM=" alt="Image"  style={{ objectFit: "cover" }} />
          <div className="carousel-caption bg-transparent">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <h1 style={{ color: 'black' }} className="display-1 mb-3 animated slideInDown">
                    Tired of Your 9-5 Job? 
                  </h1>
                    <h1 style={{ color: 'black' }} className="display-1  mb-3 animated slideInDown">
                    Get your freedom here
                  </h1> 
                  <Link to="/skills" className="btn btn-primary py-sm-3 px-sm-4">
                    Join Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img className="w-100" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1fcF045RbMxwwjlXBphggA_v-eoBenQ49gWoDJQ4mi4GOv5Ik-01TLI&s=10img/carousel-2.jpg" alt="Image" />
          <div className="carousel-caption bg-transparent">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-6">
                  <h1 style={{ color: 'black' }} className="display-1 mb-5 animated slideInDown">
               Find the Perfect Freelancer

                  </h1>
                    <h1 className="display-1 text-white mb-5 animated slideInDown">
    
                  </h1>
                  <Link to="/freelancer" className="btn btn-primary py-sm-3 px-sm-4">
                 Explore Skills
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#header-carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  </div>
  {/* Carousel End */}
  {/* Top Feature Start */}
  <div className="container-fluid top-feature py-5 pt-lg-0">
    <div className="container py-5 pt-lg-0">
      <div className="row gx-0">
        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.1s">
          <div
            className="bg-white shadow d-flex align-items-center h-100 px-5"
            style={{ minHeight: 160 }}
          >
            <div className="d-flex">
              <div className="flex-shrink-0 btn-lg-square rounded-circle bg-light">
                <i className="fa fa-times text-primary" />
              </div>
              <div className="ps-3">
                <h4>No Hidden Fees </h4>
                <span>transparent pricing on every gig</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.3s">
          <div
            className="bg-white shadow d-flex align-items-center h-100 px-5"
            style={{ minHeight: 160 }}
          >
            <div className="d-flex">
              <div className="flex-shrink-0 btn-lg-square rounded-circle bg-light">
                <i className="fa fa-users text-primary" />
              </div>
              <div className="ps-3">
                <h4>Verified Freelancers</h4>
                <span>every profile is skill-approved before listing</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 wow fadeIn" data-wow-delay="0.5s">
          <div
            className="bg-white shadow d-flex align-items-center h-100 px-5"
            style={{ minHeight: 160 }}
          >
            <div className="d-flex">
              <div className="flex-shrink-0 btn-lg-square rounded-circle bg-light">
                <i className="fa fa-phone text-primary" />
              </div>
              <div className="ps-3">
                <h4>24/7 Available</h4>
                <span>reachable anytime for either side</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Top Feature End */}
  {/* About Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5 align-items-end">
        <div className="col-lg-3 col-md-5 wow fadeInUp" data-wow-delay="0.1s">
          <img
            className="img-fluid rounded"
            data-wow-delay="0.1s"
            src=""
            alt="pic"
          />
        </div>
        <div className="col-lg-6 col-md-7 wow fadeInUp" data-wow-delay="0.3s">
          <h1 className="display-1 text-primary mb-0"> 500+</h1>
          <p className="text-primary mb-4">Freelancers Onboarded</p>
          <h1 className="display-5 mb-4">We Turn Your Work Into True Freedom</h1>
          <p className="mb-4">
           Freedom connects skilled freelancers with customers who need work done, backed by secure payments and a support team that keeps every order on track.
          </p>
          <Link className="btn btn-primary py-3 px-4" to="">
            Explore More
          </Link>
        </div>
        <div className="col-lg-3 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
          <div className="row g-5">
            <div className="col-12 col-sm-6 col-lg-12">
              <div className="border-start ps-4">
                <i className="fa fa-award fa-3x text-primary mb-3" />
                <h4 className="mb-3">Award Winning</h4>
                <span>
                  Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                  justo magna
                </span>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-12">
              <div className="border-start ps-4">
                <i className="fa fa-users fa-3x text-primary mb-3" />
                <h4 className="mb-3">Dedicated Team</h4>
                <span>
                  Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo
                  justo magna
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* About End */}
  {/* Facts Start */}
  <div
    className="container-fluid facts my-5 py-5"
    data-parallax="scroll"
    data-image-src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY1fcF045RbMxwwjlXBphggA_v-eoBenQ49gWoDJQ4mi4GOv5Ik-01TLI&s=10img/carousel-2.jpg"
  >
    <div className="container py-5">
      <div className="row g-5">
        <div
          className="col-sm-6 col-lg-3 text-center wow fadeIn"
          data-wow-delay="0.1s"
        >
          <h1 className="display-4 text-white" data-toggle="counter-up">
            2000+
          </h1>
          <span className="fs-5 fw-semi-bold text-light">Happy Clients</span>
        </div>
        <div
          className="col-sm-6 col-lg-3 text-center wow fadeIn"
          data-wow-delay="0.3s"
        >
          <h1 className="display-4 text-white" data-toggle="counter-up">
            3000+
          </h1>
          <span className="fs-5 fw-semi-bold text-light">Works Complated</span>
        </div>
        <div
          className="col-sm-6 col-lg-3 text-center wow fadeIn"
          data-wow-delay="0.5s"
        >
          <h1 className="display-4 text-white" data-toggle="counter-up">
            500+
          </h1>
          <span className="fs-5 fw-semi-bold text-light">Verified Freelancers</span>
        </div>
        <div
          className="col-sm-6 col-lg-3 text-center wow fadeIn"
          data-wow-delay="0.7s"
        >
          <h1 className="display-4 text-white" data-toggle="counter-up">
            100
          </h1>
          <span className="fs-5 fw-semi-bold text-light">Awards Achieved</span>
        </div>
      </div>
    </div>
  </div>
  {/* Facts End */}
  {/* Features Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
          <p className="fs-5 fw-bold text-primary">Why Choose Us!</p>
          <h1 className="display-5 mb-4">
           Few Reasons Why People Choose Freedom!
          </h1>
          <p className="mb-4">
        Freedom connects skilled freelancers with customers who need work done, backed by secure payments and a support team that keeps every order on track. No hidden fees, no fragmented hiring — just a platform built to make freelance work simple for everyone involved.
          </p>
          <Link className="btn btn-primary py-3 px-4" to="">
            Explore More
          </Link>
        </div>
        <div className="col-lg-6">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <div className="row g-4">
                <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                  <div
                    className="text-center rounded py-5 px-4"
                    style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}
                  >
                    <div
                      className="btn-square bg-light rounded-circle mx-auto mb-4"
                      style={{ width: 90, height: 90 }}
                    >
                      <i className="fa fa-check fa-3x text-primary" />
                    </div>
                    <h4 className="mb-0">100% Satisfaction</h4>
                  </div>
                </div>
                <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                  <div
                    className="text-center rounded py-5 px-4"
                    style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}
                  >
                    <div
                      className="btn-square bg-light rounded-circle mx-auto mb-4"
                      style={{ width: 90, height: 90 }}
                    >
                      <i className="fa fa-users fa-3x text-primary" />
                    </div>
                    <h4 className="mb-0">Dedicated Team</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 wow fadeIn" data-wow-delay="0.7s">
              <div
                className="text-center rounded py-5 px-4"
                style={{ boxShadow: "0 0 45px rgba(0,0,0,.08)" }}
              >
                <div
                  className="btn-square bg-light rounded-circle mx-auto mb-4"
                  style={{ width: 90, height: 90 }}
                >
                  <i className="fa fa-tools fa-3x text-primary" />
                </div>
                <h4 className="mb-0">Modern Equipment</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Features End */}
  

  {/* Team Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div
        className="text-center mx-auto wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ maxWidth: 500 }}
      >
        <p className="fs-5 fw-bold text-primary">Our Freelancers</p>
        <h1 className="display-5 mb-5">
          Dedicated &amp; Experienced Professionals
        </h1>
      </div>
      <div className="row g-4">
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="team-item rounded">
            <img className="img-fluid" src="img/team-1.jpg" alt="" />
            <div className="team-text">
              <h4 className="mb-0">Doris Jordan</h4>
              <p className="text-primary">Web Developer</p>
              <div className="team-social d-flex">
                <Link className="btn btn-square rounded-circle me-2" to="">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="btn btn-square rounded-circle me-2" to="">
                  <i className="fab fa-twitter" />
                </Link>
                <Link className="btn btn-square rounded-circle me-2" to="">
                  <i className="fab fa-instagram" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="team-item rounded">
            <img className="img-fluid" src="img/team-2.jpg" alt="" />
            <div className="team-text">
              <h4 className="mb-0">Johnny Ramirez</h4>
              <p className="text-primary">UI/UX Designer</p>
              <div className="team-social d-flex">
                <Link className="btn btn-square rounded-circle me-2" to="">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="btn btn-square rounded-circle me-2" to="">
                  <i className="fab fa-twitter" />
                </Link>
                <Link className="btn btn-square rounded-circle me-2" to="">
                  <i className="fab fa-instagram" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="team-item rounded">
            <img className="img-fluid" src="img/team-3.jpg" alt="" />
            <div className="team-text">
              <h4 className="mb-0">Diana Wagner</h4>
              <p className="text-primary">Software Engineer</p>
              <div className="team-social d-flex">
                <Link className="btn btn-square rounded-circle me-2" to="">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="btn btn-square rounded-circle me-2" to="">
                  <i className="fab fa-twitter" />
                </Link>
                <Link className="btn btn-square rounded-circle me-2" to="">
                  <i className="fab fa-instagram" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Team End */}
  {/* Testimonial Start */}
  <div className="container-xxl py-5">
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.1s">
          <p className="fs-5 fw-bold text-primary">Testimonial</p>
          <h1 className="display-5 mb-5">What Our Clients Say About Us!</h1>
          <p className="mb-4">
            Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
            diam amet diam et eos. Clita erat ipsum et lorem et sit sed stet
            lorem sit clita duo justo.
          </p>
          <Link className="btn btn-primary py-3 px-4" to="">
            See More
          </Link>
        </div>
        <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.5s">
          <div className="owl-carousel testimonial-carousel">
            <div className="testimonial-item">
              <img
                className="img-fluid rounded mb-3"
                src="img/testimonial-1.jpg"
                alt=""
              />
              <p className="fs-5">
                Dolores sed duo clita tempor justo dolor et stet lorem kasd
                labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et
                labore et tempor diam tempor erat.
              </p>
              <h4>Client Name</h4>
              <span>Profession</span>
            </div>
            <div className="testimonial-item">
              <img
                className="img-fluid rounded mb-3"
                src="img/testimonial-2.jpg"
                alt=""
              />
              <p className="fs-5">
                Dolores sed duo clita tempor justo dolor et stet lorem kasd
                labore dolore lorem ipsum. At lorem lorem magna ut et, nonumy et
                labore et tempor diam tempor erat.
              </p>
              <h4>Client Name</h4>
              <span>Profession</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Testimonial End */}
</>



    </>

  )}
