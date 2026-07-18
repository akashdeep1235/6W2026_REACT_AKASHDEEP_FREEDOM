import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import SkillService from "../../Services/SkillService"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function EditSkills()
{
  const nav = useNavigate()
  const[SkillName,setSkillName]=useState("")
  const[Description,setDescription]=useState("")

  const params=useParams()

    async function editSkill(e) {
        e.preventDefault()
        try {
            let payload = {
                name: SkillName,
                description: Description,
            }
            SkillService.update(payload, params.id)
            nav(-1)
            toast.success("Skill Updated")
        } catch (err) {
            toast.error("Error updating skill")
            console.log("Error: ", err)
        }
    }
   

    async function getSkillDetails() {
        const res = await SkillService.single(params.id)
        if (res) {
            setSkillName(res.name)
            setDescription(res.description)
        }
        else{
          return false
        }

    }

    useEffect(() => {
        getSkillDetails()
    }, []) 


    return (
        <>
            <div
    className="container-fluid page-header py-5 mb-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-3 text-white mb-4 animated slideInDown">
    Edit skills
      </h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="#">Skills</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">Manage Skills</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
         Edit skills
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}
   <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-7">
          <form action=""className="" onSubmit={editSkill}>
            
           
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
               value={SkillName}
              onChange={(e)=>{setSkillName(e.target.value)}}
           
              
            />
             <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
               value={Description}
              onChange={(e)=>{setDescription(e.target.value)}}
             

            
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