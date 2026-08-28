import { Link, useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";
import { ToastContainer } from "react-toastify"
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import CloudinaryService from "../Services/CloudinaryService";
import SkillService from "../Services/SkillService";
import axios from 'axios'
export default function URegister() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [contact, setContact] = useState("")
  const [address, setAddress] = useState("")
  const [userType, setUserType] = useState("client")
  const [profileImage, setProfileImage] = useState('');
  const [skills, setSkills] = useState('');
  const [skillList, setSkillList] = useState([]);



  const nav = useNavigate();


  async function register(e) {
    e.preventDefault()
      if (
    !name ||
    !email ||
    !password ||
    !contact ||
    !address ||
    !profileImage
  ) {
    toast.error("Please fill all the details");
    return;
  }

  if (userType === "freelancer" && !skills) {
    toast.error("Please select a skill");
    return;
  }



    try {
      let imageUrl = ""
      if (profileImage) {
        imageUrl = await CloudinaryService.upload(profileImage)
      }
      let payload = {
        name: name,
        email: email,
        password: password,
        userType: userType,
        contact: contact,
        address: address,
        profileImage:imageUrl,
        skills: userType === "freelancer" ? skills : "",

      }

      await UserService.register(payload)

      toast.success("user added")
      nav("/userlogin")
    }
    catch (err) {
      console.log("Error:", err)
      toast.error("Error detected")
    }


  }
  useEffect(() => {
  SkillService.all()
    .then((res) => {
      setSkillList(res);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  return (
    <>
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Register
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
                Register
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-7">
          <form onSubmit={register} className="">



             <input
                            type="file"
                            className="w-100 form-control border-0 py-3 mb-4"
                            placeholder="Insert your picture"
                            onChange={(e) => { setProfileImage(e.target.files[0]) }}
                            required
                        />


            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter name"
              onChange={(e) => { setName(e.target.value) }}
                required
            />
            <input
              type="email"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter email"
              onChange={(e) => { setEmail(e.target.value) }}
              required

            />
            <input
              type="password"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Password"
              onChange={(e) => { setPassword(e.target.value) }}
              required

            />
            <input
              type="tel"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Contact"
              onChange={(e) => { setContact(e.target.value) }}
              required

            />
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Addresss"
              onChange={(e) => { setAddress(e.target.value) }}
              required

            />



            <div className="mb-4">
              <select
                className="form-control py-3"

                value={userType}
                onChange={(e) => { setUserType(e.target.value) }}
              >

                <option value="client">Client</option>

                <option value="freelancer">Freelancer</option>


              </select>
            </div>
            {userType === "freelancer" && (
    <div className="form-group mt-3">
        <select
            className="form-control"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
        >
            <option value="">Select Skill</option>

            {skillList.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.name}
                </option>
            ))}
        </select>
    </div>
)}

            <button
              className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
              type="submit"
            >
              Submit
            </button>
          </form>
          <ToastContainer />
        </div>
      </div>


    </>)
}
