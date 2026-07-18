import { Link } from "react-router-dom";
export default function Profile() {
    return(
        <>
          <div
    className="container-fluid page-header py-5 mb-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-3 text-white mb-4 animated slideInDown">
        Profile
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
            Profile
          </li>
        </ol>
      </nav>
    </div>
  </div>

  {/* // change */}
  <div className="container mb-5">
        <div className="d-flex justify-content-between mt-5">
          <h1 className="text-center">User Profile</h1>


        </div>
        {/* Single Page Header End */}

      </div>


   <div className="table-responsive m-5  ">
          <table className="table border p-3">
            <thead>
             
                <th scope="col ">Sr.no</th>
                <th scope ="col">User
                  <hr></hr>
                </th>
                </thead>
                <hr/>
                 <tc>
                <li scope="col m-3 ">Client Name</li>
                <hr/>
                <li scope="col ">Email</li>
</tc>

                
             
            
            {/* <tbody>
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
            </tbody> */}
          </table>
        </div>
        </>


    )
}