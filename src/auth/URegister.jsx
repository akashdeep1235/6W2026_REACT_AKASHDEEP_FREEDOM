
import { Link, useNavigate } from "react-router-dom";
import UserService from "../Services/UserService";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import CloudinaryService from "../Services/CloudinaryService";
import SkillService from "../Services/SkillService";

export default function URegister() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("client");

  const [profileImage, setProfileImage] = useState("");
  const [skills, setSkills] = useState("");
  const [skillList, setSkillList] = useState([]);
  const [resume, setResume] = useState("");

  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  // Register User
  async function register(e) {

    e.preventDefault();

    if (loading) return;

    // Required field validation
    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !contact ||
      !address.trim() ||
      !profileImage
    ) {
      toast.error("Please fill all the details");
      return;
    }
    // Name validation
    if (!/^[A-Za-z ]+$/.test(name.trim())) {
      toast.error("Name must contain only letters");
      return;
    }

    // Contact validation
    if (!/^[6-9]\d{9}$/.test(contact)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    // Password validation
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    if (!/[0-9]/.test(password)) {
      toast.error("Password must contain at least one number");
      return;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      toast.error("Password must contain at least one special character");
      return;
    }

    // Profile image validation
    if (!profileImage.type.startsWith("image/")) {
      toast.error("Please upload a valid profile image");
      return;
    }

    // Freelancer validation
    if (userType === "freelancer") {

      if (!skills) {
        toast.error("Please select a skill");
        return;
      }

      if (!resume) {
        toast.error("Please upload your resume");
        return;
      }

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ];

      if (!allowedTypes.includes(resume.type)) {
        toast.error("Only PDF, DOC and DOCX files are allowed");
        return;
      }
    }

    try {

      setLoading(true);

      // Upload Profile Image
      let imageUrl = "";

      if (profileImage) {
        imageUrl = await CloudinaryService.upload(profileImage);
      }

      // Upload Resume
      let resumeUrl = "";

      if (userType === "freelancer" && resume) {
        resumeUrl = await CloudinaryService.upload(resume);
      }

      // Prepare User Data
      let payload = {

        name: name.trim(),
        email: email.trim(),
        password: password,
        userType: userType,
        contact: contact,
        address: address.trim(),
        profileImage: imageUrl,

        skills: userType === "freelancer" ? skills : "",

        resumeUrl: userType === "freelancer" ? resumeUrl : ""

      };

      // Save User
      await UserService.register(payload);

      toast.success("Registration successful!");

      nav("/userlogin");

    }

    catch (err) {

      console.log("Registration Error:", err);

      if (err.code === "auth/email-already-in-use") {
        toast.error("This email is already registered");
      }

      else if (err.code === "auth/invalid-email") {
        toast.error("Please enter a valid email address");
      }

      else if (err.code === "auth/weak-password") {
        toast.error("Password must contain at least 6 characters");
      }

      else {
        toast.error("Registration failed. Please try again.");
      }

    }

    finally {
      setLoading(false);
    }

  }

  // Fetch Skills
  useEffect(() => {

    SkillService.all()

      .then((res) => {
        setSkillList(res);
      })

      .catch((err) => {
        console.log("Skill Fetch Error:", err);
        toast.error("Unable to load skills");
      });

  }, []);

  return (
    <>

      {/* Page Header Start */}
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

              <li
                className="breadcrumb-item active"
                aria-current="page"
              >
                Register
              </li>

            </ol>

          </nav>

        </div>
      </div>
      {/* Page Header End */}


      {/* Registration Form Start */}
      <div className="d-flex justify-content-center mt-2">

        <div className="col-lg-7">

          <form onSubmit={register} noValidate>

            {/* Profile Image */}
            <input
              type="file"
              className="w-100 form-control border-0 py-3 mb-4"
              accept="image/*"
              onChange={(e) => setProfileImage(e.target.files[0] || "")}
            />


            {/* Name */}
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value.replace(/[^A-Za-z ]/g, ""))}
              autoComplete="name"
            />


            {/* Email */}
            <input
              type="email"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />


            {/* Password */}
            <input
              type="password"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />


            {/* Contact */}
            <input
              type="tel"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Contact"
              maxLength={10}
              value={contact}
              onChange={(e) => {
                setContact(
                  e.target.value.replace(/\D/g, "").slice(0, 10)
                );
              }}
            />


            {/* Address */}
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />


            {/* User Type */}
            <div className="mb-4">

              <select
                className="form-control py-3"
                value={userType}
                onChange={(e) => {
                  setUserType(e.target.value);
                  setSkills("");
                  setResume("");
                }}
              >

                <option value="client">
                  Client
                </option>

                <option value="freelancer">
                  Freelancer
                </option>

              </select>

            </div>


            {/* Freelancer Fields */}
            {userType === "freelancer" && (
              <>

                {/* Select Skill */}
                <div className="mb-4">

                  <label className="form-label">
                    Select Skill
                  </label>

                  <select
                    className="form-select py-3"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  >

                    <option value="">
                      Select Skill
                    </option>

                    {skillList.map((item) => (
                      <option
                        key={item.id}
                        value={item.id}
                      >
                        {item.name}
                      </option>
                    ))}

                  </select>

                </div>


                {/* Upload Resume */}
                <div className="mb-4">

                  <label className="form-label fw-semibold">
                    Upload Resume
                  </label>

                  <input
                    type="file"
                    className="form-control py-3"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      setResume(e.target.files[0] || "");
                    }}
                  />

                  <small className="text-muted">
                    Upload your resume in PDF, DOC or DOCX format.
                  </small>

                </div>

              </>
            )}


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
      {/* Registration Form End */}


      {/* Login Link */}
      <p className="text-center mt-3">

        Already have an account?{" "}

        <Link
          to="/userlogin"
          className="text-primary fw-bold text-decoration-none"
        >
          Login Here
        </Link>

      </p>

    </>
  );
}
