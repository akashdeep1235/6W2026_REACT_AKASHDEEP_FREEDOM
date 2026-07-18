import { Link } from "react-router-dom";
import ProjectService from "../../Services/ProjectService";
import SkillService from "../../Services/SkillService"
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import UserService from "../../Services/UserService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function ManageProjects() {
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([])
  const [users,setUsers]=useState([])
  const [projects, setProjects] = useState([])

  async function getSkills() {
    try {
      setLoading(true)
      let res = await SkillService.all()
      console.log("Cate", res)
      setSkills(res)
    } catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }


  async function getProjects() {
    try {
      setLoading(true)
      const data = await ProjectService.all();
      console.log(data);
      setProjects(data);
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }
    async function getUsers() {
    try {
      setLoading(true)
      const data = await UserService.all();
      console.log(data);
      setUsers(data);
    }
    catch (err) {
      console.log(err)
    }
    finally {
      setLoading(false)
    }
  }







  useEffect(() => {
    getProjects()
    getSkills()
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
            Manage Projects
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
                Manage Projects
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container mb-5">
        <div className="d-flex justify-content-between mt-5">
          <h1 className="text-center">Projects List</h1>


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
                <th scope="col ">Client</th>


                <th scope="col ">Skill</th>

                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th>Budget</th>
                <th>Deadline</th>

                <th scope="col">Status</th>
                <th scope="col">Createdat</th>

              </tr>
            </thead>
            <tbody>
              {projects.map((project, index) => (
                <tr >
                  <td>
                    {index + 1}
                  </td>

                  <td>
                    {
                    users.find((e)=> e.uid==project.clientId)?.name
                    }

                  </td>
                  <td>
                    {


                      skills.find((c) => c.id == project.categoryId)?.name

                    }
                  </td>


                  <td>{project.title}</td>
                  <td>{project.pdescription}</td>

                  <td>₹ {project.budget}</td>
                  <td>{project.deadline}</td>
                  <td>{project.projectStatus}</td>
                  <td>
                    {new Date(project.createdAt).toLocaleDateString()}
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