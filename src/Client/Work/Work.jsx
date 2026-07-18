import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Work() {
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