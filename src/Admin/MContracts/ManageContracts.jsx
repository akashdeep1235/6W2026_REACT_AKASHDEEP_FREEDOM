import { Link } from "react-router-dom";
import ProjectService from "../../Services/ProjectService";
import BidService from "../../Services/BidService"
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
export default function ManageContracts() {
  const [loading, setLoading] = useState(false);
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



  useEffect(() => {
    getProjects()
    getBids()
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
            Manage contracts
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
                Manage
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container mb-5">
        <div className="d-flex justify-content-between mt-5">
          <h1 className="text-center">Contract List</h1>


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
                <th scope="col">Client</th>
                <th>Freelancer</th>



                <th scope="col">Work Url</th>
                <th scope="col">Payment Status</th>
                <th scope="col">Contract Status</th>

                

                <th scope="col">Created at</th>
                <th scope="col">Updated at</th>



              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>
        </div>
      }


    </>
  )
}