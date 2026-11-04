// src/Admin/Payments/ManagePayments.jsx   (REPLACE the stub)
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import ContractService from "../../Services/ContractService";
import ProjectService from "../../Services/ProjectService";
import UserService from "../../Services/UserService";

const override = { display: "block", margin: "0 auto", borderColor: "red" };

export default function ManagePayments() {
    const [loading, setLoading] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("All");     // All / Paid / Pending

    useEffect(() => {
        async function loadAll() {
            try {
                setLoading(true);
                const [c, p, u] = await Promise.all([
                    ContractService.all(),
                    ProjectService.all(),
                    UserService.all(),
                ]);
                // newest contract first
                setContracts([...c].sort((a, b) => b.createdAt - a.createdAt));
                setProjects(p);
                setUsers(u);
            } catch (err) {
                console.log(err);
                toast.error("Could not load payments");
            } finally {
                setLoading(false);
            }
        }
        loadAll();
    }, []);

    // one row per contract with names and amount looked up once
    const rows = contracts.map((c) => {
        const project = projects.find((p) => p.id === c.projectId);
        return {
            ...c,
            title: project?.title || "",
            amount: Number(project?.finalAmount) || 0,
            clientName: users.find((u) => u.uid === c.clientId)?.name || "",
            freelancerName: users.find((u) => u.uid === c.freelancerId)?.name || "",
            isPaid: c.paymentStatus === "Paid",
        };
    });

    const paidRows = rows.filter((r) => r.isPaid);
    const pendingRows = rows.filter((r) => !r.isPaid);
    const totalPaid = paidRows.reduce((sum, r) => sum + r.amount, 0);
    const totalPending = pendingRows.reduce((sum, r) => sum + r.amount, 0);

    const visible =
        filter === "Paid" ? paidRows : filter === "Pending" ? pendingRows : rows;

    const cards = [
        { label: "Total Paid", value: "₹ " + totalPaid.toLocaleString("en-IN"), color: "#81C408" },
        { label: "Pending Amount", value: "₹ " + totalPending.toLocaleString("en-IN"), color: "#ffc107" },
        { label: "Paid Contracts", value: paidRows.length, color: "#0d6efd" },
        { label: "Pending Contracts", value: pendingRows.length, color: "#6f42c1" },
    ];

    function formatDate(ms) {
        if (!ms) return "-";
        return new Date(ms).toLocaleString([], { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    }

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Manage Payments</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item"><Link to="/admin/manageskills">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Payments</li>
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
                    <div className="row g-4 mb-4">
                        {cards.map((c) => (
                            <div className="col-6 col-lg-3" key={c.label}>
                                <div className="border rounded p-4 text-center h-100" style={{ borderTop: "4px solid " + c.color }}>
                                    <h3 className="mb-1">{c.value}</h3>
                                    <p className="mb-0 text-muted">{c.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Filter */}
                    <div className="btn-group mb-3" role="group" aria-label="Payment filter">
                        {["All", "Paid", "Pending"].map((f) => (
                            <button
                                key={f}
                                type="button"
                                className={"btn btn-sm " + (filter === f ? "btn-primary" : "btn-outline-primary")}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div className="table-responsive">
                        <table className="table border">
                            <thead>
                                <tr>
                                    <th>Sr.no</th>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Freelancer</th>
                                    <th>Amount</th>
                                    <th>Payment status</th>
                                    <th>Contract status</th>
                                    <th>Paid on</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visible.length === 0 && (
                                    <tr><td colSpan="8" className="text-center">No payments found</td></tr>
                                )}
                                {visible.map((r, index) => (
                                    <tr key={r.id}>
                                        <td>{index + 1}</td>
                                        <td>{r.title}</td>
                                        <td>{r.clientName}</td>
                                        <td>{r.freelancerName}</td>
                                        <td>₹ {r.amount.toLocaleString("en-IN")}</td>
                                        <td>
                                            <span className={"badge " + (r.isPaid ? "bg-success" : "bg-warning text-dark")}>
                                                {r.isPaid ? "Paid" : "Pending"}
                                            </span>
                                        </td>
                                        <td>{r.contractStatus}</td>
                                        <td>{r.isPaid ? formatDate(r.updatedAt) : "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}