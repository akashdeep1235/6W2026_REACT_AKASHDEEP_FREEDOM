import { Link, useNavigate } from "react-router-dom";
import ProjectService from "../../Services/ProjectService";
import { useState,useEffect } from "react";
import { toast, ToastContainer } from "react-toastify"
import SkillService from "../../Services/SkillService";
import UserService from "../../Services/UserService"
import AuthService from "../../Services/AuthService";
export default function AddProject() {

  const [ProjectTitle, setProjectTitle] = useState("")
  const [PDescription, setPDescription] = useState("")
  const [Budget, setBudget] = useState("")
  const [Deadline, setDeadline] = useState("")
  const[categoryId,setCategoryId]=useState("")
  const[clientId,setClientId]=useState("")

  

  

    const [skills, setSkills] = useState([])
    const [loading, setLoading] = useState(false)



  const nav = useNavigate()

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



        useEffect(()=>{
        getSkills()
    
    }, [])

  async function addProject(e) {
    e.preventDefault()

    try {
    
      let payload = {
        title: ProjectTitle,
        pdescription: PDescription,
        budget: Budget,
        deadline: Deadline,
        categoryId:categoryId,
        clientId:AuthService.getUid() 

      }

      await ProjectService.add(payload)

      toast.success("project added")
      setTimeout(() => {
        nav(-1);
      }, 1500);
    }
    catch (err) {
      console.log("Error:", err)
      toast.error("Error adding project")
    }



  }

  return (
    <>
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Add Project
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
                Add Project
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-7">
          <form onSubmit={addProject} className="">


            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Project Title"
              onChange={(e) => { setProjectTitle(e.target.value) }}

            />
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Description"
              onChange={(e) => { setPDescription(e.target.value) }}


            />
            <div className="mb-4">
              <select
                type="text"
                className="w-100 form-control border-0 py-3 mb-4"
                placeholder="Select Category" onChange={(e) => { setCategoryId(e.target.value) }}
              >
                <option value="" selected disabled>Select Category</option>
                {
                  skills.map((c) => (
                    <option value={c.id}>{c.name}</option>
                  ))

                }

              </select>
            </div>
            <input
              type="number"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Budget"
              onChange={(e) => { setBudget(e.target.value) }}


            />
            <input
              type="date"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Deadline"
              onChange={(e) => { setDeadline(e.target.value) }}


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
      


    </>)
}
