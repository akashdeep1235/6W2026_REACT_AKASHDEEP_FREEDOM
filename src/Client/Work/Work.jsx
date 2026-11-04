import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReviewService from "../../Services/ReviewService";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import ProjectService from "../../Services/ProjectService";
import UserService from "../../Services/UserService";
import ContractService from "../../Services/ContractService";
import AuthService from "../../Services/AuthService";


const override = { display: "block", margin: "0 auto", borderColor: "red" };

export default function Work() {
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);                // CHANGED: renamed from "Contracts" (lowercase is the React convention)
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [reviews, setReviews] = useState([]);
  // REMOVED: skills state (not used)

  const uid = AuthService.getUid();                              // NEW: id of the logged-in client

  // CHANGED: four separate load functions merged into one
  async function loadAll() {
    try {
      setLoading(true);
      const [c, p, u, r] = await Promise.all([
        ContractService.byClient(uid),
        ProjectService.all(),
        UserService.all(),
        ReviewService.byReviewer(uid),
      ]);
      setContracts(c);
      setProjects(p);
      setUsers(u);
      setReviews(r);
    } catch (err) {
      console.log(err);
      toast.error("Could not load contracts");                   // NEW: user sees an error message if loading fails
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();                                                   // CHANGED: one call instead of four
  }, []);

  // CHANGED: now receives the contract and the amount
  function handlePay(contract, amount) {
    const options = {
      key: "rzp_test_TCTIa3OFOZcik7",
      amount: Number(amount) * 100,                              // CHANGED: real amount in paise, was hardcoded "50000"
      currency: "INR",
      name: "Freedom",
      description: "Payment for contract " + contract.id,        // CHANGED: was "Test Transaction"
      handler: async function () {
        try {
          await ContractService.releasePayment(contract.id, contract.projectId);    // NEW (main fix): saves Paid + Completed in Firestore
          toast.success("Payment successful");
          loadAll();                                             // NEW: refreshes the table so status updates on screen
        } catch (err) {
          console.log(err);
          toast.error("Paid, but failed to update contract. Contact admin.");   // NEW
        }
      },
      prefill: {
        name: localStorage.getItem("name") || "",                // CHANGED: logged-in user's name, was "Gaurav Kumar"
        email: localStorage.getItem("email") || "",              // CHANGED: logged-in user's email, was a fake email
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new window.Razorpay(options);                    // CHANGED: window.Razorpay instead of bare Razorpay
    rzp.on("payment.failed", function (response) {
      toast.error(response.error.description || "Payment failed");   // CHANGED: one toast, replaces seven alert() pop-ups
    });
    rzp.open();
  }

  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">Work</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              {/* CHANGED: was <a href="#"> */}
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              {/* CHANGED: was <a href="#"> */}
              <li className="breadcrumb-item"><Link to="#">Pages</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Work</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      {loading ? (
        <RingLoader color="#81C408" loading={loading} cssOverride={override} size={75} />
      ) : (
        <div className="table-responsive m-5">
          <table className="table border">
            <thead>
              <tr>
                <th>Sr.no</th>
                <th>Project</th>
                <th>Freelancer</th>
                <th>Final Amount</th>
                <th>Deadline</th>
                <th>Contract status</th>
                <th>Payment status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contracts.length === 0 && (                                       // NEW: message when the client has no contracts
                <tr><td colSpan="8" className="text-center">No contracts yet</td></tr>
              )}
              {contracts.map((contract, index) => {
                const project = projects.find((p) => p.id === contract.projectId);          // CHANGED: looked up once per row
                const freelancer = users.find((u) => u.uid === contract.freelancerId);      // CHANGED: looked up once per row
                return (
                  // NEW: key={contract.id} on the <tr> below removes React's console warning
                  <tr key={contract.id}>
                    <td>{index + 1}</td>
                    <td>{project?.title}</td>
                    <td>{freelancer?.name}</td>
                    <td>{project?.finalAmount}</td>
                    <td>{project?.deadline}</td>
                    {/* FIXED: columns were swapped (this showed payment status) */}
                    <td>{contract.contractStatus}</td>
                    {/* FIXED: columns were swapped (this showed contract status) */}
                    <td>{contract.paymentStatus}</td>
                    <td>
                      <Link to={`/chat/${contract.id}`} className="btn btn-outline-primary btn-sm me-2">
                        Chat
                      </Link>

                      {contract.workFileUrl?.startsWith("http") && (
                        <a href={contract.workFileUrl} target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm me-2">
                          View Work
                        </a>
                      )}

                      {contract.paymentStatus === "Paid" ? (
                        <>
                          <span className="badge bg-success me-2">Paid</span>
                          {reviews.some((r) => r.projectId === contract.projectId) ? (
                            <span className="badge bg-secondary">Reviewed</span>
                          ) : (
                            <Link to={`/rate/${contract.id}`} className="btn btn-warning btn-sm">
                              Rate
                            </Link>
                          )}
                        </>
                      ) : contract.contractStatus === "Submitted" ? (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={() => handlePay(contract, project?.finalAmount)}
                        >
                          Release Payment
                        </button>
                      ) : (
                        <span className="text-muted">Waiting for work</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

