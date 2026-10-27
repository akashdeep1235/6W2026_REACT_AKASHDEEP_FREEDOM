// import { Link } from "react-router-dom"
// import ProjectService from "../../Services/ProjectService";
// import SkillService from "../../Services/SkillService"
// import { useState, useEffect } from "react";
// import { RingLoader } from "react-spinners";
// import UserService from "../../Services/UserService";4
// import ContractService from "../../Services/ContractService";

// const override = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

// export default function Work() {
//     const [loading, setLoading] = useState(false);
//     const [skills, setSkills] = useState([])
//       const[Contracts,setContracts]=useState([]);
//     const [projects, setProjects] = useState([])
//     const [users,setUsers]=useState([])


//       async function getContracts() {
//         try {
//           setLoading(true)
//           const data = await ContractService.all();
//           console.log(data);
//           setContracts(data);
//         }
//         catch (err) {
//           console.log(err)
//         }
//         finally {
//           setLoading(false)
//         }
//       }
  
//     async function getSkills() {
//       try {
//         setLoading(true)
//         let res = await SkillService.all()
//         console.log("Cate", res)
//         setSkills(res)
//       } catch (err) {
//         console.log(err)
//       }
//       finally {
//         setLoading(false)
//       }
//     }
  
  
//     async function getProjects() {
//       try {
//         setLoading(true)
//         const data = await ProjectService.all();
//         console.log(data);
//         setProjects(data);
//       }
//       catch (err) {
//         console.log(err)
//       }
//       finally {
//         setLoading(false)
//       }
//     }
//        async function getUsers() {
//           try {
//             setLoading(true)
//             const data = await UserService.all();
//             console.log(data);
//             setUsers(data);
//           }
//           catch (err) {
//             console.log(err)
//           }
//           finally {
//             setLoading(false)
//           }
//         }




  
  
  
//     useEffect(() => {
//       getProjects()
//       getSkills()
//       getUsers()
//       getContracts()

//     }, [])
  

//   async function handlePay(){
//     var options = {
//     "key": "rzp_test_TCTIa3OFOZcik7", // Enter the Key ID generated from the Dashboard
//     "amount": "50000", // Amount is in currency subunits. 
//     "currency": "INR",
//     "name": "Freedom", //your business name
//     "description": "Test Transaction",
//     "image": "https://o7services.com/wp-content/uploads/2023/11/O7-LOGO-PNG-4-2.png",

//     "handler":function(response){
//       toast.success("Payment Successful")


//     },
    
//     "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
//         "name": "Gaurav Kumar", //your customer's name
//         "email": "gaurav.kumar@example.com",
//         "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
//     },
//     "notes": {
//         "address": "Razorpay Corporate Office"
//     },
//     "theme": {
//         "color": "#3399cc"
//     }
// };
// var rzp1 = new Razorpay(options);
// rzp1.on('payment.failed', function (response) {
//             alert(response.error.code);
//             alert(response.error.description);
//             alert(response.error.source);
//             alert(response.error.step);
//             alert(response.error.reason);
//             alert(response.error.metadata.order_id);
//             alert(response.error.metadata.payment_id);
//         });

//     rzp1.open();

//   }
//   return (
   
//     <>
//   {/* Page Header Start */}
//   <div
//     className="container-fluid page-header py-5 mb-5 wow fadeIn"
//     data-wow-delay="0.1s"
//   >
//     <div className="container text-center py-5">
//       <h1 className="display-3 text-white mb-4 animated slideInDown">
//         Work
//       </h1>
//       <nav aria-label="breadcrumb animated slideInDown">
//         <ol className="breadcrumb justify-content-center mb-0">
//           <li className="breadcrumb-item">
//             <a href="#">Home</a>
//           </li>
//           <li className="breadcrumb-item">
//             <a href="#">Pages</a>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             Work
//           </li>
//         </ol>
//       </nav>
//     </div>
//   </div>
//   {/* Page Header End */}

//    {loading ?
//           <RingLoader
//             color="#81C408"
//             loading={loading}
//             cssOverride={override}
//             size={75}
//             aria-label="Loading Spinner"
//             data-testid="loader"
//           />
  
  
//           : <div className="table-responsive m-5 ">
//             <table className="table border ">
//               <thead>
//                 <tr>
//                   <th scope="col ">Sr.no</th>
//                   <th scope="col ">Project</th>
  
//                   <th scope="col"> Freelancer</th>
//                   <th scope="col">Final Amount</th>
//                   <th>Deadline</th>
//                   <th>Contract status</th>
//                   <th>Payment status</th>
//                   <th>Action </th>

                  


                  
                  
  
  
//                 </tr>
//               </thead>
//               <tbody>
//                   {Contracts.map((contract, index) => (
//                 <tr >
//                   <td>
//                     {index + 1}
//                   </td>
//                      <td>
//                      {projects.find((e)=> e.id==contract.projectId)?.title}
//                   </td>


                
               

//                   <td> {users.find((e)=> e.uid==contract.freelancerId)?.name}</td>
//                   <td>{projects.find((e) => e.id == contract.projectId)?.finalAmount}</td>

//                   <td> {projects.find((e) => e.id == contract.projectId)?.deadline}</td>
//                   <td> {contract.paymentStatus}</td>

//                   <td> {contract.contractStatus}</td>
//                   <td>   <button
             
//               type="button" onClick={(handlePay)}
//             >
            
//               Release Payment
//             </button></td>
                

//                 </tr>
//               ))}
//               </tbody>
//             </table>
//           </div>
//         }
  
//         <div className="text-center">
         
     
// </div>


//     </>
//   );
// }
// src/Client/Work/Work.jsx
// Comment key:  NEW = line added | CHANGED = line modified | FIXED = bug removed

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";                          // NEW: old file used toast without importing it
import ProjectService from "../../Services/ProjectService";
import UserService from "../../Services/UserService";            // FIXED: stray "4" after this import removed
import ContractService from "../../Services/ContractService";
import AuthService from "../../Services/AuthService";            // NEW: to read the logged-in user's id
// REMOVED: SkillService import (skills were never shown on this page)

const override = { display: "block", margin: "0 auto", borderColor: "red" };

export default function Work() {
  const [loading, setLoading] = useState(false);
  const [contracts, setContracts] = useState([]);                // CHANGED: renamed from "Contracts" (lowercase is the React convention)
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  // REMOVED: skills state (not used)

  const uid = AuthService.getUid();                              // NEW: id of the logged-in client

  // CHANGED: four separate load functions merged into one
  async function loadAll() {
    try {
      setLoading(true);
      const [c, p, u] = await Promise.all([                      // NEW: loads all three at the same time
        ContractService.byClient(uid),                           // CHANGED (main fix): only THIS client's contracts, was ContractService.all()
        ProjectService.all(),
        UserService.all(),
      ]);
      setContracts(c);
      setProjects(p);
      setUsers(u);
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
          await ContractService.releasePayment(contract.id);     // NEW (main fix): saves Paid + Completed in Firestore
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
                      {contract.paymentStatus === "Paid" ? (                    // NEW: hide the button once the contract is paid
                        <span className="badge bg-success">Paid</span>          // NEW: green "Paid" badge
                      ) : (
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"                    // NEW: Bootstrap button styling
                          onClick={() => handlePay(contract, project?.finalAmount)}   // CHANGED: passes contract and amount, was onClick={handlePay}
                        >
                          Release Payment
                        </button>
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

