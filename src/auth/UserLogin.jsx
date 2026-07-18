import { Link, useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";
import { ToastContainer } from "react-toastify"
import { useState } from "react";
import { toast } from "react-toastify"

export default function UserLogin() {
  const nav = useNavigate();

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  async function login(e) {
    e.preventDefault()

    try {
      let payload = {

        email: email,
        password: password
      }

      const user = await UserService.login(payload)
      if (user.status === "pending") {
    toast.error("Your profile is waiting for admin approval.");
    return;
}

if (user.status === "rejected") {
    toast.error("Your profile has been rejected.");
    return;
}

     
      if (user.userType === "admin") {
        nav("/admin/manageskills");
      } else if (user.userType === "freelancer") {
        nav("/freelancer");
      } else if (user.userType === "client") {
        nav("/");
      } else {
        toast.error("Invalid user role");
      }
       toast.success("Login success")
    }
    



    catch (err) {
      console.log("Error:", err)
      toast.error("user not found")
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
            Login
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
                Login
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}
      <div className="d-flex justify-content-center mt-2">
        <div className="col-lg-7">
          <form onSubmit={login} className="">



            <input
              type="email"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter email"
              onChange={(e) => { setEmail(e.target.value) }}


            />
            <input
              type="password"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Password"
              onChange={(e) => { setPassword(e.target.value) }}


            />

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
      <p className="text-center mt-3">
  Don't have an account?{" "}
  <Link to="/uregister" className="text-primary fw-bold text-decoration-none">
    Register Here
  </Link>
</p>


    </>)
}
