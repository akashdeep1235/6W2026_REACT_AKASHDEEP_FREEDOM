import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import ContractService from "../../Services/ContractService";
import ProjectService from "../../Services/ProjectService";
import UserService from "../../Services/UserService";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Orders() {
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [c, u, p] = await Promise.all([
          ContractService.all(),
          UserService.all(),
          ProjectService.all(),
        ]);
        // Show only completed / paid contracts as Orders
        setContracts(
          c.filter(
            (x) =>
              x.contractStatus === "Completed" || x.paymentStatus === "Paid"
          )
        );
        setUsers(u);
        setProjects(p);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getUserName = (uid) =>
    users.find((u) => u.uid === uid)?.name || "—";
  const getProjectTitle = (id) =>
    projects.find((p) => p.id === id)?.title || "—";
  const getAmount = (projectId) => {
    const p = projects.find((x) => x.id === projectId);
    return p?.finalAmount ? `₹ ${Number(p.finalAmount).toLocaleString("en-IN")}` : "—";
  };

  return (
    <>
      <div
        className="container-fluid page-header py-5 mb-5 wow fadeIn"
        data-wow-delay="0.1s"
      >
        <div className="container text-center py-5">
          <h1 className="display-3 text-white mb-4 animated slideInDown">
            Manage Orders
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb justify-content-center mb-0">
              <li className="breadcrumb-item">
                <Link to="/admin">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Orders
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container mb-5">
        <h2 className="mb-4">Completed Orders</h2>

        {loading ? (
          <RingLoader
            color="#81C408"
            loading={loading}
            cssOverride={override}
            size={75}
          />
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Freelancer</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {contracts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No completed orders yet
                    </td>
                  </tr>
                ) : (
                  contracts.map((c, i) => (
                    <tr key={c.id}>
                      <td>{i + 1}</td>
                      <td>{getProjectTitle(c.projectId)}</td>
                      <td>{getUserName(c.clientId)}</td>
                      <td>{getUserName(c.freelancerId)}</td>
                      <td>{getAmount(c.projectId)}</td>
                      <td>
                        <span
                          className={`badge ${
                            c.paymentStatus === "Paid"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {c.paymentStatus}
                        </span>
                      </td>
                      <td>{c.contractStatus}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}