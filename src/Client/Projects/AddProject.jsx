
import { Link, useNavigate } from "react-router-dom";
import ProjectService from "../../Services/ProjectService";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import SkillService from "../../Services/SkillService";
import AuthService from "../../Services/AuthService";

export default function AddProject() {

  const [ProjectTitle, setProjectTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Budget, setBudget] = useState("");
  const [Deadline, setDeadline] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const nav = useNavigate();


  // Get Skills
  async function getSkills() {
    try {
      setLoading(true);

      const data = await SkillService.all();

      setSkills(data);
    }
    catch (err) {
      console.log(err);
      toast.error("Error loading categories");
    }
    finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    getSkills();
  }, []);


  // Add Project
  async function addProject(e) {
    e.preventDefault();

    if (
      !ProjectTitle.trim() ||
      !Description.trim() ||
      !Budget ||
      !Deadline ||
      !categoryId
    ) {
      toast.error("Please fill all the details");
      return;
    }

    if (Number(Budget) <= 0) {
      toast.error("Budget must be greater than zero");
      return;
    }

    const selectedDate = new Date(Deadline + "T00:00:00");

    if (selectedDate < new Date(new Date().toDateString())) {
      toast.error("Please select a future deadline");
      return;
    }

    const uid = AuthService.getUid();

    if (!uid) {
      toast.error("Please login first");
      return;
    }

    try {
      setSubmitting(true);

      let payload = {
        title: ProjectTitle.trim(),
        description: Description.trim(),
        budget: Number(Budget),
        deadline: Deadline,
        categoryId: categoryId,
        clientId: uid
      };

      await ProjectService.add(payload);

      toast.success("Project added successfully");

      setTimeout(() => {
        nav(-1);
      }, 1500);

    }
    catch (err) {
      console.log("Error:", err);
      toast.error("Error adding project");
    }
    finally {
      setSubmitting(false);
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

          <form onSubmit={addProject}>

            {/* Project Title */}
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Project Title"
              value={ProjectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              required
            />


            {/* Description */}
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />


            {/* Category */}
            <div className="mb-4">

              <select
                className="w-100 form-control border-0 py-3 mb-4"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >

                <option value="" disabled>
                  Select Category
                </option>

                {loading ? (
                  <option disabled>Loading categories...</option>
                ) : (
                  skills.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))
                )}

              </select>

            </div>


            {/* Budget */}
            <input
              type="number"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Budget"
              value={Budget}
              onChange={(e) => setBudget(e.target.value)}
              min="1"
              required
            />


            {/* Deadline */}
            <input
              type="date"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Deadline"
              value={Deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toLocaleDateString("en-CA")}
              required
            />


            {/* Submit Button */}
            <button
              className="w-100 btn form-control border-secondary py-3 bg-white text-primary"
              type="submit"
              disabled={submitting || loading}
            >
              {submitting ? "Please Wait..." : "Submit"}
            </button>

          </form>

        </div>

      </div>

      <ToastContainer />

    </>
  );
}
