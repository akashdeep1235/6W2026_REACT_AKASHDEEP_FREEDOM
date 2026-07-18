import { Link } from "react-router-dom";
import SkillService from "../../Services/SkillService";
import { useState, useEffect } from "react";
import { RingLoader, PacmanLoader } from "react-spinners";
import Swal from "sweetalert2";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function ManageSkills() {
  let [loading, setLoading] = useState(false);
  async function getSkills() {
    try {
      setLoading(true)
      const data = await SkillService.all();
      console.log(data);
      setSkills(data);
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }

  const [skills, setSkills] = useState([])
  useEffect(() => {
    getSkills()
  }, [])

  async function deleteskill(id){
     try {

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          SkillService.delskill(id)
           getSkills()
          Swal.fire({
            title: "Deleted!",
            text: "The Skill has been deleted.",
            icon: "success"
          });
        }
      });





    } catch (err) {
      toast.error("Error Deleting Category")
      console.log("Error: ", err)
    }
  }

  return (
    <>
      {/* Page Header Start */}
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Manage Skills
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Skills</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Manage Skills
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container mb-5">
        <div className="d-flex justify-content-between mt-5">
          <h1 className="text-center">Skills List</h1>
          <Link to="/admin/manageskills/addskills">
            <button
              className="btn border-secondary py-3 bg-white text-primary "
              type="submit"
            >
              <i className="bi bi-plus"></i>
              Add Skills
            </button>
          </Link>

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
                <th scope="col">Category Name</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Createdat</th>
                <th scope="col">Actions</th>


              </tr>
            </thead>
            <tbody>
              {skills.map((skill, index) => (
                <tr key={skill.id}>
                  <th>{index + 1}</th>
                  <td>{skill.name}</td>
                  <td>{skill.description}</td>
                  <td>{skill.status ? 'Active' : 'Inactive'}</td>
                  <td>{new Date(skill.createdAt).toLocaleDateString()}

                  </td>
                  <td>
                    <Link to={`/admin/manageskills/editskills/${skill.id}`}>
                      <button className="btn btn-md rounded-circle bg-light border ">
                        <i className="bi bi-pencil text-danger" />
                      </button>
                      </Link>
                         &nbsp;
                        <button onClick={() => { deleteskill(skill.id) }} className="btn btn-md rounded-circle bg-light border ">
                          <i className="bi bi-trash text-danger" />
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
