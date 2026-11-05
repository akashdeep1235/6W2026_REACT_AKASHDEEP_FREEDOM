
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import UserService from "../../Services/UserService";
import ReviewService from "../../Services/ReviewService";
import SkillService from "../../Services/SkillService";

export default function Home() {

  const [freelancers, setFreelancers] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [counts, setCounts] = useState({
    freelancers: 0,
    customers: 0,
    reviews: 0,
    members: 0
  });

  useEffect(() => {
    fetchHomeData();
  }, []);

  // Fetch Home Page Data
  const fetchHomeData = async () => {
    try {

      const [users, reviews, skills] = await Promise.all([
        UserService.all(),
        ReviewService.all(),
        SkillService.all()
      ]);

      // Get approved freelancers
      const approvedFreelancers = users.filter(
        (user) =>
          user.userType === "freelancer" &&
          user.status === "active"
      );

      // Get customers
      const customers = users.filter(
        (user) => user.userType === "client"
      );

      // Create Skill ID and Name Mapping
      const skillMap = new Map(
        skills.map((skill) => [skill.id, skill.name])
      );

      // Convert Skill IDs into Skill Names
      const updatedFreelancers = approvedFreelancers.map(
        (freelancer) => {

          let skillNames = [];

          if (Array.isArray(freelancer.skills)) {

            skillNames = freelancer.skills.map(
              (id) => skillMap.get(id) || id
            );

          } else if (freelancer.skills) {

            skillNames = [
              skillMap.get(freelancer.skills) ||
              freelancer.skills
            ];

          }

          return {
            ...freelancer,
            skillNames: skillNames
          };

        }
      );

      // Create User Lookup
      const userMap = new Map(
        users.map((user) => [
          user.uid || user.id,
          user
        ])
      );

      // Get Actual Reviews
      const actualReviews = reviews
        .map((review) => ({
          ...review,
          customer: userMap.get(review.reviewerId),
          freelancer: userMap.get(review.reviewForId)
        }))
        .filter(
          (review) =>
            review.customer && review.freelancer
        )
        .sort(
          (a, b) =>
            (b.createdAt || 0) - (a.createdAt || 0)
        );

      // Set Freelancers
      setFreelancers(updatedFreelancers.slice(0, 3));

      // Set Testimonials
      setTestimonials(actualReviews.slice(0, 3));

      // Set Counts
      setCounts({
        freelancers: approvedFreelancers.length,
        customers: customers.length,
        reviews: reviews.length,
        members:
          approvedFreelancers.length + customers.length
      });

    } catch (error) {
      console.log("Home Data Error:", error);
    }
  };

  return (
    <>

      {/* Carousel Start */}
      <div
        className="container-fluid p-0 wow fadeIn"
        data-wow-delay="0.1s"
      >

        <div
          id="header-carousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >

          <div className="carousel-inner">

            <div className="carousel-item active">

              <img
                className="w-100 h-100"
                src="https://media.istockphoto.com/id/1352603244/photo/shot-of-an-unrecognizable-businessman-working-on-his-laptop-in-the-office.jpg?s=612x612&w=0&k=20&c=upiDYeAZEsxbUBdhX35MXm79drIXA-5Q-FcfmZk71lM="
                alt="Freelancer working"
                style={{ objectFit: "cover" }}
              />

              <div className="carousel-caption bg-transparent">

                <div className="container">

                  <div className="row justify-content-center">

                    <div className="col-lg-8">

                      <h1
                        style={{ color: "black" }}
                        className="display-1 mb-3 animated slideInDown"
                      >
                        Tired of Your 9-5 Job?
                      </h1>

                      <h1
                        style={{ color: "black" }}
                        className="display-1 mb-3 animated slideInDown"
                      >
                        Get your freedom here
                      </h1>

                      <Link
                        to="/skills"
                        className="btn btn-primary py-sm-3 px-sm-4"
                      >
                        Join Now
                      </Link>

                    </div>

                  </div>

                </div>

              </div>

            </div>


            <div className="carousel-item">

              <img
                className="w-100"
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200"
                alt="Freelancers working together"
              />

              <div className="carousel-caption bg-transparent">

                <div className="container">

                  <div className="row justify-content-center">

                    <div className="col-lg-6">

                      <h1
                        style={{ color: "black" }}
                        className="display-1 mb-5 animated slideInDown"
                      >
                        Find the Perfect Freelancer
                      </h1>

                      <Link
                        to="/skills"
                        className="btn btn-primary py-sm-3 px-sm-4"
                      >
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
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            />

            <span className="visually-hidden">
              Previous
            </span>
          </button>


          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            />

            <span className="visually-hidden">
              Next
            </span>
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
                    <h4>No Hidden Fees</h4>
                    <span>
                      Transparent pricing on every gig
                    </span>
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
                    <span>
                      Every profile is skill-approved before listing
                    </span>
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
                    <span>
                      Reachable anytime for either side
                    </span>
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
                src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600"
                alt="Freelancers working"
              />

            </div>


            <div className="col-lg-6 col-md-7 wow fadeInUp" data-wow-delay="0.3s">

              <h1 className="display-1 text-primary mb-0">
                {counts.freelancers}+
              </h1>

              <p className="text-primary mb-4">
                Verified Freelancers
              </p>

              <h1 className="display-5 mb-4">
                We Turn Your Work Into True Freedom
              </h1>

              <p className="mb-4">
                Freedom connects skilled freelancers with customers
                who need work done, backed by secure payments and a
                support team that keeps every order on track.
              </p>

              <Link
                className="btn btn-primary py-3 px-4"
                to="/skills"
              >
                Explore More
              </Link>

            </div>


            <div className="col-lg-3 col-md-12 wow fadeInUp" data-wow-delay="0.5s">

              <div className="row g-5">

                <div className="col-12 col-sm-6 col-lg-12">

                  <div className="border-start ps-4">

                    <i className="fa fa-award fa-3x text-primary mb-3" />

                    <h4 className="mb-3">
                      Quality Work
                    </h4>

                    <span>
                      Connect with skilled and approved freelancers.
                    </span>

                  </div>

                </div>


                <div className="col-12 col-sm-6 col-lg-12">

                  <div className="border-start ps-4">

                    <i className="fa fa-users fa-3x text-primary mb-3" />

                    <h4 className="mb-3">
                      Dedicated Team
                    </h4>

                    <span>
                      Support for customers and freelancers.
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
        data-image-src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200"
      >

        <div className="container py-5">

          <div className="row g-5">

            <div className="col-sm-6 col-lg-3 text-center">

              <h1 className="display-4 text-white">
                {counts.customers}
              </h1>

              <span className="fs-5 fw-semi-bold text-light">
                Customers
              </span>

            </div>


            <div className="col-sm-6 col-lg-3 text-center">

              <h1 className="display-4 text-white">
                {counts.reviews}
              </h1>

              <span className="fs-5 fw-semi-bold text-light">
                Reviews
              </span>

            </div>


            <div className="col-sm-6 col-lg-3 text-center">

              <h1 className="display-4 text-white">
                {counts.freelancers}
              </h1>

              <span className="fs-5 fw-semi-bold text-light">
                Verified Freelancers
              </span>

            </div>


            <div className="col-sm-6 col-lg-3 text-center">

              <h1 className="display-4 text-white">
                {counts.members}
              </h1>

              <span className="fs-5 fw-semi-bold text-light">
                Registered Members
              </span>

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

              <p className="fs-5 fw-bold text-primary">
                Why Choose Us!
              </p>

              <h1 className="display-5 mb-4">
                Few Reasons Why People Choose Freedom!
              </h1>

              <p className="mb-4">
                Freedom connects skilled freelancers with customers
                who need work done, backed by secure payments and a
                support team that keeps every order on track.
                No hidden fees, no fragmented hiring — just a
                platform built to make freelance work simple.
              </p>

              <Link
                className="btn btn-primary py-3 px-4"
                to="/skills"
              >
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

                        <h4 className="mb-0">
                          100% Satisfaction
                        </h4>

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

                        <h4 className="mb-0">
                          Dedicated Team
                        </h4>

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

                    <h4 className="mb-0">
                      Modern Technology
                    </h4>

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

            <p className="fs-5 fw-bold text-primary">
              Our Freelancers
            </p>

            <h1 className="display-5 mb-5">
              Dedicated & Experienced Professionals
            </h1>

          </div>


          <div className="row g-4">

            {freelancers.length === 0 ? (

              <div className="col-12 text-center">
                <h5>
                  No approved freelancers available yet.
                </h5>
              </div>

            ) : (

              freelancers.map((freelancer, index) => (

                <div
                  className="col-lg-4 col-md-6 wow fadeInUp"
                  data-wow-delay={`${0.1 + index * 0.2}s`}
                  key={freelancer.uid || freelancer.id}
                >

                  <div className="team-item rounded">

                    <img
                      className="img-fluid"
                      src={
                        freelancer.profileImage ||
                        `img/team-${index + 1}.jpg`
                      }
                      alt={freelancer.name}
                    />

                    <div className="team-text">

                      <h4 className="mb-0">
                        {freelancer.name}
                      </h4>

                      <p className="text-primary">
                        {freelancer.skillNames.join(", ") ||
                          "Freelancer"}
                      </p>

                    </div>

                  </div>

                </div>

              ))

            )}

          </div>

        </div>
      </div>
      {/* Team End */}


      {/* Testimonial Start */}
      <div className="container-xxl py-5">

        <div className="container">

          <div className="row g-5">

            <div className="col-lg-5 wow fadeInUp" data-wow-delay="0.1s">

              <p className="fs-5 fw-bold text-primary">
                Testimonials
              </p>

              <h1 className="display-5 mb-5">
                What Our Customers Say About Us!
              </h1>

              <p className="mb-4">
                Read genuine feedback from customers who have
                worked with freelancers through Freedom.
              </p>

            </div>


            <div className="col-lg-7 wow fadeInUp" data-wow-delay="0.5s">

              <div className="row g-4">

                {testimonials.length === 0 ? (

                  <div className="col-12 text-center">
                    <p>
                      No customer reviews available yet.
                    </p>
                  </div>

                ) : (

                  testimonials.map((item) => (

                    <div
                      className="col-md-6"
                      key={item.id}
                    >

                      <div className="testimonial-item border rounded p-4 h-100">

                        <h4>
                          {item.customer.name}
                        </h4>

                        <p className="text-primary">
                          Review for {item.freelancer.name}
                        </p>

                        <p>
                          {"⭐".repeat(
                            Math.max(
                              0,
                              Math.min(
                                5,
                                Number(item.rating) || 0
                              )
                            )
                          )}
                        </p>

                        <p className="fs-5">
                          {item.review}
                        </p>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>

        </div>
      </div>
      {/* Testimonial End */}

    </>
  );
}
