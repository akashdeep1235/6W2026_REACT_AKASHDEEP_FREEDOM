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

  // Get Skills / Categories
  async function getSkills() {
    try {
      setLoading(true);
      const data = await SkillService.all();
      setSkills(data);
    } catch (err) {
      console.log(err);
      toast.error("Error loading categories");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getSkills();
  }, []);

  // Add Project
  async function addProject(e) {
    e.preventDefault();

    if (submitting) return;

    // 1. Required fields
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

    // 2. Project Title validation (letters + spaces only)
    const title = ProjectTitle.trim();

    if (title.length < 5) {
      toast.error("Project title must be at least 5 characters");
      return;
    }

    if (title.length > 100) {
      toast.error("Project title cannot exceed 100 characters");
      return;
    }

    if (!/^[A-Za-z ]+$/.test(title)) {
      toast.error("Project title can only contain letters and spaces");
      return;
    }

    // 3. Description validation
    const desc = Description.trim();

    if (desc.length < 20) {
      toast.error("Description must be at least 20 characters");
      return;
    }

    if (desc.length > 1000) {
      toast.error("Description cannot exceed 1000 characters");
      return;
    }

    // 4. Budget validation
    const budgetValue = Number(Budget);

    if (isNaN(budgetValue) || budgetValue <= 0) {
      toast.error("Budget must be a valid number greater than zero");
      return;
    }

    if (budgetValue > 1000000) {
      toast.error("Budget cannot exceed ₹10,00,000");
      return;
    }

    if (!Number.isInteger(budgetValue)) {
      toast.error("Budget must be a whole number");
      return;
    }

    // 5. Deadline validation
    const selectedDate = new Date(Deadline + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error("Please select today or a future date as deadline");
      return;
    }

    // 6. Auth check
    const uid = AuthService.getUid();
    if (!uid) {
      toast.error("Please login first");
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        title: title,
        description: desc,
        budget: budgetValue,
        deadline: Deadline,
        categoryId: categoryId,
        clientId: uid,
      };

      await ProjectService.add(payload);

      toast.success("Project added successfully");

      setTimeout(() => {
        nav(-1);
      }, 1500);
    } catch (err) {
      console.log("Error:", err);
      toast.error("Error adding project");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Page Header Start */}
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
          <form onSubmit={addProject} noValidate>

            {/* Project Title - Letters & Spaces only */}
            <input
              type="text"
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Project Title"
              value={ProjectTitle}
              onChange={(e) =>
                setProjectTitle(e.target.value.replace(/[^A-Za-z ]/g, ""))
              }
              maxLength={100}
            />

            {/* Description */}
            <textarea
              className="w-100 form-control border-0 py-3 mb-4"
              placeholder="Enter Description (minimum 20 characters)"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              maxLength={1000}
            />

            {/* Category */}
            <div className="mb-4">
              <select
                className="w-100 form-control border-0 py-3"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
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
              max="1000000"
              step="1"
            />

            {/* Deadline */}
            <input
              type="date"
              className="w-100 form-control border-0 py-3 mb-4"
              value={Deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={new Date().toLocaleDateString("en-CA")}
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