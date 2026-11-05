
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import UserService from "../../../Services/UserService";
import { toast } from "react-toastify";
import SkillService from "../../../Services/SkillService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ManageFreelancerReq() {

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]);

  // Get pending freelancer requests
  async function getUsers() {
    try {
      setLoading(true);

      let res = await UserService.all();

      const freelancers = res.filter(
        user =>
          user.userType === "freelancer" &&
          user.status === "pending"
      );

      setUsers(freelancers);

    } catch (err) {
      console.log(err);
      toast.error("Unable to load freelancer requests");
    }
    finally {
      setLoading(false);
    }
  }

  // Approve freelancer
  async function approveUser(id) {
    try {
      await UserService.approve(id);

      toast.success("Freelancer approved");
      getUsers();

    } catch (err) {
      console.log(err);
      toast.error("Approval failed");
    }
  }

  // Reject freelancer
  async function rejectUser(id) {
    try {
      await UserService.reject(id);

      toast.success("Freelancer rejected");
      getUsers();

    } catch (err) {
      console.log(err);
      toast.error("Reject failed");
    }
  }

  // Get skills
  async function getSkills() {
    try {
      const data = await SkillService.all();
      setSkills(data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers();
    getSkills();
  }, []);

  return (
    <>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Manage Freelancer Requests
          </h1>

          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>

              <li className="breadcrumb-item">
                <Link to="#">Freelancer Requests</Link>
              </li>

              <li className="breadcrumb-item active">
                Manage Freelancer Requests
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container mb-5">
        <div className="d-flex justify-content-between mt-5">
          <h1 className="text-center">Request List</h1>
        </div>
      </div>

      {loading ? (
        <RingLoader
          color="#81C408"
          loading={loading}
          cssOverride={override}
          size={75}
          aria-label="Loading Spinner"
        />
      ) : (
        <div className="table-responsive m-5">

          <table className="table table-bordered table-hover">

            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Skills</th>
                <th>Resume</th>
                <th>Status</th>
                <th>Created At</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {users.length > 0 ? (

                users.map((user, index) => (

                  <tr key={user.id}>

                    <td>{index + 1}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.contact}</td>

                    <td>
                      {skills.find(
                        (s) => s.id === user.skills
                      )?.name || "-"}
                    </td>

                    {/* Resume */}
                    <td>
                      {user.resumeUrl ? (
                        <a
                          href={user.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary"
                        >
                          View Resume
                        </a>
                      ) : (
                        <span className="text-muted">
                          Not Uploaded
                        </span>
                      )}
                    </td>

                    {/* Status */}
                    <td>
                      <span className="badge bg-warning text-dark">
                        {user.status}
                      </span>
                    </td>

                    {/* Created At */}
                    <td>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* Actions */}
                    <td>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => approveUser(user.id)}
                      >
                        Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm ms-2"
                        onClick={() => rejectUser(user.id)}
                      >
                        Reject
                      </button>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>
                  <td colSpan="9" className="text-center">
                    No pending freelancer requests found.
                  </td>
                </tr>

              )}

            </tbody>

          </table>
        </div>
      )}
    </>
  );
}
