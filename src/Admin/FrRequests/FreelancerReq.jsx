import { Link } from "react-router-dom";
import ProjectService from "../../Services/ProjectService";

import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import UserService from "../../Services/UserService";
import { toast } from "react-toastify";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function ManageFreelancerReq() {
  const [loading, setLoading] = useState(false);
 const [users,setUsers]=useState([])

///check whteher the freelancer is able to login after approval 

  async function getUsers() {
    try {
      setLoading(true)
      let res = await UserService.all()

      const freelancers=res.filter(user=>user.userType=='freelancer'&&user.status=="pending"
      );
    console.log("Cate", res)
      setUsers(freelancers)
    } catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }
  async function approveUser(id) {
  try {
    await UserService.approve(id);
    toast.success("Freelancer approved");
    getUsers(); // Refresh the table
  } catch (err) {
    console.log(err);
    toast.error("Approval failed");
  }
}
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


  
  useEffect(() => {
   
    getUsers()
  }, [])


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
                <Link to="#">Freelancer Requests </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
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
        {/* Single Page Header End */}

      </div>

      {loading ?
        <RingLoader
          color="#81C408"
          loading={loading}
          cssOverride={override}
          size={75}
          aria-label="Loading Spinner"
          data-testid="loader"
        />


        : <div className="table-responsive m-5 ">
          <table className="table border ">
            <thead>
              <tr>
                <th scope="col ">Sr.no</th>


                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th>Phone</th>
                <th>Skills</th>


                <th scope="col">Status</th>
                <th scope="col">Createdat</th>
                <th scope="col">Action</th>



              </tr>
            </thead>
            <tbody>
  {users.map((user, index) => (
    <tr key={user.id}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.contact}</td>
      <td>{user.skills || "-"}</td>
      <td>{user.status}</td>
      
      <td>
        {user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : "-"}
      </td>
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
  ))}
</tbody>
          </table>
        </div>
      }


    </>
  )
}