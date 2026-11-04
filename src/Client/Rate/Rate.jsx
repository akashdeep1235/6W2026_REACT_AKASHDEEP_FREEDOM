// src/Client/Rate/Rate.jsx   (REPLACE)
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import ContractService from "../../Services/ContractService";
import ProjectService from "../../Services/ProjectService";
import UserService from "../../Services/UserService";
import ReviewService from "../../Services/ReviewService";
import AuthService from "../../Services/AuthService";

const override = { display: "block", margin: "0 auto", borderColor: "red" };

export default function Rate() {
    const { id } = useParams();                 // contract id from /rate/:id
    const navigate = useNavigate();
    const uid = AuthService.getUid();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [contract, setContract] = useState(null);
    const [pending, setPending] = useState([]);      // completed contracts not reviewed yet (list mode)
    const [projectTitle, setProjectTitle] = useState("");
    const [freelancerName, setFreelancerName] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [review, setReview] = useState("");

    useEffect(() => {
        async function init() {
            try {
                setLoading(true);
                setContract(null);
                const [contracts, projects, users] = await Promise.all([
                    ContractService.byClient(uid),          // only this client's contracts
                    ProjectService.all(),
                    UserService.all(),
                ]);

                // LIST MODE: opened from the menu (/rate) with no contract id
                if (!id) {
                    const myReviews = await ReviewService.byReviewer(uid);
                    const list = contracts
                        .filter((x) => x.contractStatus === "Completed")
                        .filter((x) => !myReviews.some((r) => r.projectId === x.projectId))
                        .map((x) => ({
                            ...x,
                            title: projects.find((p) => p.id === x.projectId)?.title || "",
                            freelancer: users.find((u) => u.uid === x.freelancerId)?.name || "",
                        }));
                    setPending(list);
                    return;
                }

                const c = contracts.find((x) => x.id === id);

                if (!c) {
                    toast.error("Contract not found", { toastId: "rate-nf" });
                    navigate("/rate", { replace: true });
                    return;
                }
                if (c.contractStatus !== "Completed") {
                    toast.error("You can rate only after payment is released", { toastId: "rate-nc" });
                    navigate("/rate", { replace: true });
                    return;
                }
                const existing = await ReviewService.byProject(c.projectId, uid);
                if (existing) {
                    toast.info("You have already reviewed this contract", { toastId: "rate-done" });
                    navigate("/rate", { replace: true });
                    return;
                }

                setContract(c);
                setProjectTitle(projects.find((p) => p.id === c.projectId)?.title || "");
                setFreelancerName(users.find((u) => u.uid === c.freelancerId)?.name || "");
            } catch (err) {
                console.log(err);
                toast.error("Could not load contract");
            } finally {
                setLoading(false);
            }
        }
        init();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (rating < 1) {
            toast.error("Please select a star rating");
            return;
        }
        if (review.trim().length < 5) {
            toast.error("Please write a short review (at least 5 characters)");
            return;
        }

        try {
            setSaving(true);
            await ReviewService.add({
                projectId: contract.projectId,
                reviewerId: uid,
                reviewForId: contract.freelancerId,
                rating,
                review: review.trim(),
            });
            toast.success("Thank you for your review");
            navigate("/work");
        } catch (err) {
            console.log(err);
            toast.error("Could not save review");
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Rate</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item"><Link to="/work">Work</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Rate</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}

            {loading ? (
                <RingLoader color="#81C408" loading={loading} cssOverride={override} size={75} />
            ) : !id ? (
                <div className="container mb-5" style={{ maxWidth: 800 }}>
                    {pending.length === 0 ? (
                        <p className="text-center text-muted">
                            Nothing to rate yet. Completed and paid contracts will appear here.
                        </p>
                    ) : (
                        <div className="table-responsive">
                            <table className="table border">
                                <thead>
                                    <tr>
                                        <th>Sr.no</th>
                                        <th>Project</th>
                                        <th>Freelancer</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pending.map((c, index) => (
                                        <tr key={c.id}>
                                            <td>{index + 1}</td>
                                            <td>{c.title}</td>
                                            <td>{c.freelancer}</td>
                                            <td>
                                                <Link to={`/rate/${c.id}`} className="btn btn-warning btn-sm">Rate</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            ) : (
                contract && (
                    <div className="container mb-5" style={{ maxWidth: 600 }}>
                        <div className="border rounded p-4">
                            <h4 className="mb-1">{projectTitle || "Project"}</h4>
                            <p className="text-muted mb-4">How was your experience with {freelancerName || "the freelancer"}?</p>

                            <form onSubmit={handleSubmit}>
                                {/* Star rating */}
                                <div className="mb-3">
                                    <label className="form-label d-block">Rating</label>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <span
                                            key={star}
                                            role="button"
                                            aria-label={star + " star"}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHover(star)}
                                            onMouseLeave={() => setHover(0)}
                                            style={{
                                                fontSize: 36,
                                                cursor: "pointer",
                                                color: star <= (hover || rating) ? "#ffc107" : "#dee2e6",
                                            }}
                                        >
                                            ★
                                        </span>
                                    ))}
                                    {rating > 0 && <span className="ms-2 text-muted">{rating} / 5</span>}
                                </div>

                                {/* Review text */}
                                <div className="mb-3">
                                    <label className="form-label">Your review</label>
                                    <textarea
                                        className="form-control"
                                        rows={4}
                                        maxLength={500}
                                        placeholder="Describe the quality of work, communication and timeliness..."
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                    />
                                    <small className="text-muted">{review.length} / 500</small>
                                </div>

                                <div className="d-flex gap-2">
                                    <button type="submit" className="btn btn-primary" disabled={saving}>
                                        {saving ? "Saving..." : "Submit Review"}
                                    </button>
                                    <Link to="/work" className="btn btn-outline-secondary">Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            )}
        </>
    );
}