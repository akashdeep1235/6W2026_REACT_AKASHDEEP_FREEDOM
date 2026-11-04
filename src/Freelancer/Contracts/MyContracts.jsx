// src/Admin/MContracts/ManageContracts.jsx   (REPLACE the whole file)
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import ContractService from "../../Services/ContractService";
import ProjectService from "../../Services/ProjectService";
import UserService from "../../Services/UserService";

const override = { display: "block", margin: "0 auto", borderColor: "red" };

function formatDate(ms) {
  if (!ms) return "-";
  return new Date(ms).toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });
}

export default function ManageContracts() {
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);
        const [c, p, u] = await Promise.all([
          ContractService.all(),
          ProjectService.all(),
          UserService.all(),
        ]);
        setContracts([...c].sort((a, b) => b.createdAt - a.createdAt));   // newest first
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

  return (
    <>
      {/* Page Header Start */}
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">Manage contracts</h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item"><Link to="/admin/manageskills">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Contracts</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Page Header End */}

      <div className="container mb-5">
        <div className="d-flex justify-content-between mt-5">
          <h1 className="text-center">Contract List</h1>
        </div>
      </div>

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
                <th>Freelancer</th>
                <th>Work Url</th>
                <th>Payment Status</th>
                <th>Contract Status</th>
                <th>Created at</th>
                <th>Updated at</th>
              </tr>
            </thead>
            <tbody>
              {contracts.length === 0 && (
                <tr><td colSpan="9" className="text-center">No contracts found</td></tr>
              )}
              {contracts.map((contract, index) => (
                <tr key={contract.id}>
                  <td>{index + 1}</td>
                  <td>{projects.find((p) => p.id === contract.projectId)?.title}</td>
                  <td>{users.find((u) => u.uid === contract.clientId)?.name}</td>
                  <td>{users.find((u) => u.uid === contract.freelancerId)?.name}</td>
                  <td>
                    {contract.workFileUrl?.startsWith("http") ? (
                      <a href={contract.workFileUrl} target="_blank" rel="noreferrer">View Work</a>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td>{contract.paymentStatus}</td>
                  <td>{contract.contractStatus}</td>
                  <td>{formatDate(contract.createdAt)}</td>
                  <td>{formatDate(contract.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}