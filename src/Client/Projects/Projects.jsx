
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import ProjectService from "../../Services/ProjectService";
import AuthService from "../../Services/AuthService";

export default function Projects() {

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const uid = AuthService.getUid();

      const res = await ProjectService.all();

      // Show only logged-in customer's projects
      const myProjects = res.filter(
        (project) => project.clientId === uid
      );

      setProjects(myProjects);

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Filter projects according to status
  const filteredProjects = projects.filter((project) => {

    if (filter === "All") {
      return true;
    }

    if (filter === "Complete Projects") {
      return project.projectStatus === "Completed";
    }

    if (filter === "Ongoing Projects") {
      return project.projectStatus !== "Completed";
    }

    return true;
  });

  return (
    <>
      {/* Page Header Start */}
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
                <Link to="/">Home</Link>
              </li>

              <li className="breadcrumb-item active">
                Projects
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {/* Browse Projects Start */}
      <div className="container mb-5">

        <div className="d-flex justify-content-between mt-5">
          <h1 className="text-center">Browse Projects</h1>

          <Link to="/addproject">
            <button
              className="btn border-secondary py-3 bg-white text-primary"
              type="button"
            >
              <i className="bi bi-plus"></i>
              Add Project
            </button>
          </Link>
        </div>

      </div>
      {/* Browse Projects End */}

      {/* Projects Start */}
      <div className="container-xxl py-5">
        <div className="container">

          <div
            className="text-center mx-auto wow fadeInUp"
            data-wow-delay="0.1s"
            style={{ maxWidth: 500 }}
          >
            <p className="fs-5 fw-bold text-primary">
              Your Projects
            </p>

            <h1 className="display-5 mb-5">
              {loading
                ? "Loading Projects..."
                : projects.length === 0
                ? "No Projects yet"
                : "My Projects"}
            </h1>
          </div>

          {/* Project Filters */}
          <div className="row wow fadeInUp" data-wow-delay="0.3s">

            <div className="col-12 text-center">
              <ul className="list-inline rounded mb-5">

                {["All", "Complete Projects", "Ongoing Projects"].map(
                  (item) => (
                    <li
                      key={item}
                      className={`list-inline-item mx-2 ${
                        filter === item ? "active" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => setFilter(item)}
                    >
                      {item}
                    </li>
                  )
                )}

              </ul>
            </div>

          </div>

          {/* Dynamic Projects */}
          <div className="row g-4">

            {!loading && filteredProjects.length === 0 && (
              <div className="col-12 text-center">
                <h4 className="text-muted">
                  {projects.length === 0
                    ? "No Projects yet. Add your first project!"
                    : "No projects found in this category."}
                </h4>
              </div>
            )}

            {filteredProjects.map((project) => (

              <div
                className="col-lg-4 col-md-6 wow fadeInUp"
                key={project.id}
              >

                <div className="border rounded p-4 h-100">

                  <h4 className="text-primary mb-3">
                    {project.title}
                  </h4>

                  <p>
                    {project.description}
                  </p>

                  <p>
                    <strong>Budget:</strong> ₹{project.budget}
                  </p>

                  <p>
                    <strong>Deadline:</strong>{" "}
                    {project.deadline}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        project.projectStatus === "Completed"
                          ? "bg-success"
                          : project.projectStatus === "In Progress"
                          ? "bg-warning text-dark"
                          : "bg-primary"
                      }`}
                    >
                      {project.projectStatus}
                    </span>
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>
      </div>
      {/* Projects End */}

    </>
  );
}
