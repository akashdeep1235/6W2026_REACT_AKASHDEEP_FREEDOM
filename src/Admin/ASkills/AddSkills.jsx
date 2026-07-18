import { Link, useNavigate } from "react-router-dom";
import SkillService from "../../Services/SkillService";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify"
import CloudinaryService from "../../Services/CloudinaryService"
import axios from 'axios'
export default function AddSkills() {

  const [SkillName, setSkillName] = useState("")
  const [Description, setDescription] = useState("")
  const [image, setImage] = useState('');

  const nav = useNavigate()

  async function addSkill(e) {
    e.preventDefault()

    try {


      let imageUrl = ""
      if (image) {
        imageUrl = await CloudinaryService.upload(image)
      }
      let payload = {
        name: SkillName,
        description: Description,
        image: imageUrl
      }

      await SkillService.add(payload)

      toast.success("Skill added")
      setTimeout(() => {
        nav(-1);
      }, 1500);

      
    }
    catch (err) {
      console.log("Error:", err)
      toast.error("Error adding skill")
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
            Add Skills
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
                Add Skills
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-7">
          <form onSubmit={addSkill} className="">


            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Skill Name"
              onChange={(e) => { setSkillName(e.target.value) }}

            />
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Skill Description"
              onChange={(e) => { setDescription(e.target.value) }}


            />
             <input
                            type="file"
                            className="w-100 form-control border-0 py-3 mb-4"
                            onChange={(e) => { setImage(e.target.files[0]) }}
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
      <ToastContainer />


    </>)
}
