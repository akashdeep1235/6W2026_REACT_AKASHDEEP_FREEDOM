import { Link } from "react-router-dom";
import ProjectService from "../../Services/ProjectService";
import BidService from "../../Services/BidService"
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import UserService from "../../Services/UserService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function ManageBids() {
  const [loading, setLoading] = useState(false);
   const [users,setUsers]=useState([])
  const [bids, setBids] = useState([])

  const [projects, setProjects] = useState([])


  async function getBids() {
    try {
      setLoading(true)
      let res = await BidService.all()
      console.log("Cate", res)
      setBids(res)
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
    getBids()
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
            Browse bids
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">bids</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Browse bids
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container mb-5">
        <div className="d-flex justify-content-between mt-5">
          <h1 className="text-center">Bids List</h1>


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


                <th scope="col">Project</th>
                <th scope="col">Freelancer</th>


                <th scope="col">Bid Amount</th>
                <th>Proposal</th>


                <th scope="col">Status</th>
                <th scope="col">Createdat</th>

              </tr>
            </thead>
            <tbody>
              {bids.map((bid, index) => (
                <tr >
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {projects.find((p) => p.id === bid.projectId)?.title || "Project Not Found"}
                  </td>
                      <td>
                        {
                      users.find((t)=> t.uid==bid.freelancerId)?.name}
                  </td>
                  




                  <td>{bid.bidamount}</td>
                  <td>{bid.proposal}</td>


                  <td>{bid.bidStatus}</td>
                  <td>
                    {new Date(bid.createdAt).toLocaleDateString()}
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