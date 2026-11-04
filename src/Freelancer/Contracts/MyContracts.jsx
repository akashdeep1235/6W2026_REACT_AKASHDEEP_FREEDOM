// src/Freelancer/Contracts/MyContracts.jsx   (NEW FILE - create the "Contracts" folder)
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import ContractService from "../../Services/ContractService";
import ProjectService from "../../Services/ProjectService";
import UserService from "../../Services/UserService";
import AuthService from "../../Services/AuthService";

const override = { display: "block", margin: "0 auto", borderColor: "red" };

export default function MyContracts() {
    const [loading, setLoading] = useState(false);
    const [contracts, setContracts] = useState([]);
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);

    const uid = AuthService.getUid();

    useEffect(() => {
        async function loadAll() {
            try {
                setLoading(true);
                const [c, p, u] = await Promise.all([
                    ContractService.byFreelancer(uid),     // only THIS freelancer's contracts
                    ProjectService.all(),
                    UserService.all(),
                ]);
                setContracts(c);
                setProjects(p);
                setUsers(u);
            } catch (err) {
                console.log(err);
                toast.error("Could not load contracts");
            } finally {
                setLoading(false);
            }
        }
        loadAll();
    }, []);
    async function handleSubmitWork(contract) {
        const url = window.prompt("Paste the link to your finished work (Google Drive, GitHub, etc.)");
        if (!url) return;
        if (!/^https?:\/\//i.test(url.trim())) {
            toast.error("Enter a valid link starting with http:// or https://");
            return;
        }
        try {
            await ContractService.submitWork(contract.id, url.trim());
            toast.success("Work submitted");
            setContracts((prev) =>
                prev.map((c) =>
                    c.id === contract.id ? { ...c, workFileUrl: url.trim(), contractStatus: "Submitted" } : c
                )
            );
        } catch (err) {
            console.log(err);
            toast.error("Could not submit work");
        }
    }

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">My Contracts</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item"><Link to="/freelancer/bids">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Contracts</li>
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
                                <th>Client</th>
                                <th>Final Amount</th>
                                <th>Deadline</th>
                                <th>Contract status</th>
                                <th>Payment status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contracts.length === 0 && (
                                <tr><td colSpan="8" className="text-center">No contracts yet</td></tr>
                            )}
                            {contracts.map((contract, index) => {
                                const project = projects.find((p) => p.id === contract.projectId);
                                const client = users.find((u) => u.uid === contract.clientId);
                                return (
                                    <tr key={contract.id}>
                                        <td>{index + 1}</td>
                                        <td>{project?.title}</td>
                                        <td>{client?.name}</td>
                                        <td>{project?.finalAmount}</td>
                                        <td>{project?.deadline}</td>
                                        <td>{contract.contractStatus}</td>
                                        <td>{contract.paymentStatus}</td>
                                        <td>
                                            <Link to={`/freelancer/chat/${contract.id}`} className="btn btn-primary btn-sm me-2">
                                                Chat
                                            </Link>

                                            {contract.contractStatus === "Active" && (
                                                <button type="button" className="btn btn-success btn-sm me-2" onClick={() => handleSubmitWork(contract)}>
                                                    Submit Work
                                                </button>
                                            )}

                                            {contract.workFileUrl?.startsWith("http") && (
                                                <a href={contract.workFileUrl} target="_blank" rel="noreferrer" className="btn btn-outline-secondary btn-sm">
                                                    View Work
                                                </a>
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
