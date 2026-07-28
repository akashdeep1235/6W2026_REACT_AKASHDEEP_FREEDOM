import { Link } from "react-router-dom"
import ProjectService from "../../Services/ProjectService";
import SkillService from "../../Services/SkillService"
import { useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Work() {
    const [loading, setLoading] = useState(false);
    const [skills, setSkills] = useState([])
    
    const [projects, setProjects] = useState([])
  
    async function getSkills() {
      try {
        setLoading(true)
        let res = await SkillService.all()
        console.log("Cate", res)
        setSkills(res)
      } catch (err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }
  
  
    async function getProjects() {
      try {
        setLoading(true)
        const data = await ProjectService.all();
        console.log(data);
        setProjects(data);
      }
      catch (err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }
  
  
  
    useEffect(() => {
      getProjects()
      getSkills()
    }, [])
  

  async function handlePay(){
    var options = {
    "key": "rzp_test_TCTIa3OFOZcik7", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. 
    "currency": "INR",
    "name": "Freedom", //your business name
    "description": "Test Transaction",
    "image": "https://o7services.com/wp-content/uploads/2023/11/O7-LOGO-PNG-4-2.png",

    "handler":function(response){
      toast.success("Payment Successful")


    },
    
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        "name": "Gaurav Kumar", //your customer's name
        "email": "gaurav.kumar@example.com",
        "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#3399cc"
    }
};
var rzp1 = new Razorpay(options);
rzp1.on('payment.failed', function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
        });

    rzp1.open();

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
        Work
      </h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#">Pages</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Work
          </li>
        </ol>
      </nav>
    </div>
  </div>
  {/* Page Header End */}

   {loading ?
          <RingLoader
            color="#81C408"
            loading={loading}
            cssOverride={override}
            size={75}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
  
  
          : <div className="table-responsive m-5 ">
            <table className="table border ">
              <thead>
                <tr>
                  <th scope="col ">Sr.no</th>
                  <th scope="col ">Skill</th>
  
                  <th scope="col">Title</th>
                  <th scope="col">Description</th>
                  <th>Budget</th>
                  <th>Deadline</th>
                  <th>Action</th>
  
  
                </tr>
              </thead>
              <tbody>
                {projects.map((project, index) => (
                  <tr >
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      {
  
  
                        skills.find((c) => c.id == project.categoryId)?.name
  
                      }
                    </td>
  
  
                    <td>{project.title}</td>
                    <td>{project.description}</td>
  
                    <td>₹ {project.budget}</td>
                    <td>{project.deadline}</td>
                    <td>
                      <Link to={`/freelancer/bids/addbids/${project.id}`}>
                        <button>  Add Bids</button>
                      </Link>
                      &nbsp;
                      <button onClick={() => { deleteskill(skill.id) }} className="btn btn-md rounded-circle bg-light border ">
                        <i className="bi bi-trash text-danger" />
                      </button>
  
  
                    </td>
  
  
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
  
        <div className="text-center">
            <button
              className="btn border-secondary py-3 bg-white text-primary "
              type="button" onClick={(handlePay)}
            >
              <i className="bi bi-plus"></i>
              Pay Now
            </button>
     
</div>


    </>
  );
}