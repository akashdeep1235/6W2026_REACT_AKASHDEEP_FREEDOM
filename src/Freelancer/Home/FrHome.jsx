// src/Freelancer/Home/FrHome.jsx   (NEW FILE)
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import ContractService from "../../Services/ContractService";
import ProjectService from "../../Services/ProjectService";
import UserService from "../../Services/UserService";
import ReviewService from "../../Services/ReviewService";
import AuthService from "../../Services/AuthService";

const override = { display: "block", margin: "0 auto", borderColor: "red" };

export default function FrHome() {
    const [loading, setLoading] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const uid = AuthService.getUid();
    const myName = localStorage.getItem("name") || "Freelancer";

    useEffect(() => {
        async function loadAll() {
            try {
                setLoading(true);
                const [c, r, p, u] = await Promise.all([
                    ContractService.byFreelancer(uid),     // only THIS freelancer's contracts
                    ReviewService.byFreelancer(uid),       // only reviews received by this freelancer
                    ProjectService.all(),
                    UserService.all(),
                ]);
                setContracts(c);
                // newest review first
                setReviews([...r].sort((a, b) => b.createdAt - a.createdAt));
                setProjects(p);
                setUsers(u);
            } catch (err) {
                console.log(err);
                toast.error("Could not load your dashboard");
            } finally {
                setLoading(false);
            }
        }
        loadAll();
    }, []);

    const active = contracts.filter((c) => c.contractStatus === "Active").length;
    const submitted = contracts.filter((c) => c.contractStatus === "Submitted").length;
    const completed = contracts.filter((c) => c.contractStatus === "Completed").length;

    const stats = [
        { label: "Active Contracts", value: active, color: "#81C408" },
        { label: "Waiting for Payment", value: submitted, color: "#ffc107" },
        { label: "Completed", value: completed, color: "#0d6efd" },
        { label: "Reviews Received", value: reviews.length, color: "#6f42c1" },
    ];

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Welcome, {myName}</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item"><Link to="/freelancer/bids">Bids</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Home</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}

            {loading ? (
                <RingLoader color="#81C408" loading={loading} cssOverride={override} size={75} />
            ) : (
                <div className="container mb-5">

                    {/* Summary cards */}
                    <div className="row g-4 mb-5">
                        {stats.map((s) => (
                            <div className="col-6 col-lg-3" key={s.label}>
                                <div className="border rounded p-4 text-center h-100" style={{ borderTop: "4px solid " + s.color }}>
                                    <h2 className="mb-1">{s.value}</h2>
                                    <p className="mb-0 text-muted">{s.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Quick links */}
                    <div className="d-flex flex-wrap gap-2 mb-5">
                        <Link to="/freelancer/bids" className="btn btn-primary">Browse Projects &amp; Bid</Link>
                        <Link to="/freelancer/contracts" className="btn btn-outline-primary">My Contracts</Link>
                    </div>

                    {/* Reviews received */}
                    <h4 className="mb-3">Reviews from Clients</h4>
                    {reviews.length === 0 ? (
                        <p className="text-muted">No reviews yet. Reviews appear here after a client pays and rates your work.</p>
                    ) : (
                        <div className="row g-4">
                            {reviews.map((r) => {
                                const project = projects.find((p) => p.id === r.projectId);
                                const client = users.find((u) => u.uid === r.reviewerId);
                                return (
                                    <div className="col-md-6" key={r.id}>
                                        <div className="border rounded p-4 h-100">
                                            <div className="mb-2" aria-label={r.rating + " out of 5 stars"}>
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span
                                                        key={star}
                                                        style={{ fontSize: 22, color: star <= r.rating ? "#ffc107" : "#dee2e6" }}
                                                    >
                                                        ★
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="mb-3" style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                                                {r.review}
                                            </p>
                                            <small className="text-muted d-block">
                                                {project?.title || "Project"}{client?.name ? " · " + client.name : ""}
                                            </small>
                                            <small className="text-muted">
                                                {new Date(r.createdAt).toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" })}
                                            </small>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}