
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase/FirebaseConfig";

export default function UserLogin() {

  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  // Login Function
  async function login(e) {
    e.preventDefault();

    if (!email.trim() || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      let payload = {
        email: email.trim(),
        password: password
      };

      const user = await UserService.login(payload);

      // Check freelancer approval
      if (user.status === "pending") {
        toast.error("Your profile is waiting for admin approval.");
        return;
      }

      // Check rejected freelancer
      if (user.status === "rejected") {
        toast.error("Your profile has been rejected.");
        return;
      }

      // Redirect according to user role
      if (user.userType === "admin") {
        toast.success("Login success");
        nav("/admin/manageskills");
      }
      else if (user.userType === "freelancer") {
        toast.success("Login success");
        nav("/freelancer");
      }
      else if (user.userType === "client") {
        toast.success("Login success");
        nav("/");
      }
      else {
        toast.error("Invalid user role");
      }

    }
    catch (err) {

      console.log("Login Error Code:", err.code);
      console.log("Login Error Message:", err.message);

      if (
        err.code === "auth/invalid-credential" ||
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        toast.error("Incorrect email or password");
      }
      else if (err.message === "User profile not found") {
        toast.error("User profile not found in database");
      }
      else {
        toast.error("Login failed. Please try again.");
      }

    }
    finally {
      setLoading(false);
    }
  }


  // Forgot Password Function
  async function forgotPassword() {

    if (!email.trim()) {
      toast.error("Please enter your email address first");
      return;
    }

    try {

      await sendPasswordResetEmail(auth, email.trim());

      toast.success("Password reset link sent to your email");

    }
    catch (err) {

      console.log("Forgot Password Error:", err);

      if (err.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address");
      }
      else {
        toast.error("Unable to send password reset email");
      }

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

          <form onSubmit={login}>

            {/* Email */}
            <input
              type="email"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password */}
            <input
              type="password"
              className="w-100 form-control border-0 py-3 mb-2"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Forgot Password */}
            <div className="text-end mb-3">
              <button
                type="button"
                className="btn btn-link text-primary text-decoration-none"
                onClick={forgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              className="w-100 btn form-control border-secondary py-3 bg-white text-primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Submit"}
            </button>

          </form>

          <ToastContainer />

        </div>
      </div>

      {/* Register Link */}
      <p className="text-center mt-3">
        Don't have an account?{" "}

        <Link
          to="/uregister"
          className="text-primary fw-bold text-decoration-none"
        >
          Register Here
        </Link>
      </p>

    </>
  );
}
