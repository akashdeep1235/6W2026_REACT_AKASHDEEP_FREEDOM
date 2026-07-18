import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectService from "../../Services/ProjectService";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"
import SkillService from "../../Services/SkillService";
import BidService from "../../Services/BidService";
import Bids from "./Bids";

export default function AddBids() {
  const [bidamount, setBidamount] = useState("")
  const [proposal, setProposal] = useState("")

  const [projectId, setProjectId] = useState("")
  const [bids, SetBids] = useState([])



  const [project, setProject] = useState([])
  const [loading, setLoading] = useState(false)
  const { id } = useParams();



  const nav = useNavigate()

  async function getProjects() {
    try {
      setLoading(true)
      const data = await ProjectService.all();
      console.log(data);
      setProject(data);
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
  }, [])

  async function addBid(e) {
    e.preventDefault()

    try {
      let payload = {
        bidamount: bidamount,
        proposal: proposal,
        projectId: projectId


      }
      console.log(payload);

      await BidService.add(payload)

      toast.success("Bid added")
      setTimeout(() => {
        nav(-1);
      }, 1500);
    }
    catch (err) {
      console.log("Error:", err)
      toast.error("Error adding Bid ")
    }



  }
  useEffect(() => {
    setProjectId(id);
    
  }, [id]);
  return (
    <>
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Add Bid
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="#">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to="#">Bids</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Add Bid
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-7">
          <form onSubmit={addBid} className="">


            <input
              type="Number Input"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Bid Amount "
              onChange={(e) => { setBidamount(e.target.value) }}

            />
            <input
              type="Textarea"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Proposal"
              onChange={(e) => { setProposal(e.target.value) }}


            />





            <button
              className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>




    </>

  )
}
