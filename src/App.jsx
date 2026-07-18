import { BrowserRouter, Routes, Route } from "react-router-dom";
import './Firebase/FirebaseConfig'  
import { ToastContainer } from "react-toastify";

//Customer imports
import Layout from "./Client/Layout/Layout";
import Home from "./Client/Home/Home";
import Skills from "./Client/Skills/Skills";
import Projects from "./Client/Projects/Projects";
import Work from "./Client/Work/Work";
import Rate from "./Client/Rate/Rate";
import Contact from "./Client/Contact/Contact";
import Profile from "./Client/Profile/Profile";
import AddProject from "./Client/Projects/AddProject";

// Admin imports
import AdLayout from "./Admin/AdminLayout/AdLayout";
import ManageSkills from "./Admin/ASkills/ManageSkills";
import AddSkills from "./Admin/ASkills/AddSkills";
import Orders from "./Admin/Orders/Orders";
import ManageUsers from "./Admin/MUsers/ManageUsers";
import ManageBids from "./Client/MBids/ManageBids";
import ManageContracts from "./Admin/MContracts/ManageContracts";
import ManagePayments from "./Admin/Payments/ManagePayments";
import URegister from "./auth/URegister";

import ManageProjects from "./Admin/MProjects/ManageProjects";


//Freelancer imports
import FrLayout from "./Freelancer/FrLayout/FrLayout";
import ManageGigs from "./Freelancer/Abids/Bids";
import AddGigs from "./Freelancer/Abids/AddBids";
import UserLogin from "./auth/UserLogin";
import EditSkills from "./Admin/ASkills/EditSkills";
import ProjectService from "./Services/ProjectService";
import Bids from "./Freelancer/Abids/Bids";
import AddBids from "./Freelancer/Abids/AddBids";
import ManageFreelancerReq from "./Admin/FrRequests/FreelancerReq";





export default function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>

          {/* Admin Route */}
          <Route path="/admin" element={<AdLayout />}>
            <Route path="manageskills" element={<ManageSkills />} />
            <Route path="manageskills/addskills" element={<AddSkills />} />
            <Route path="manageskills/editskills/:id" element={<EditSkills/>} />
            <Route path="managerequests" element={<ManageFreelancerReq />} />

            <Route path="mprojects" element={<ManageProjects/>}/>
            <Route path="orders" element={<Orders/>} />
            <Route path="manageusers" element={<ManageUsers/>} />
       
            <Route path="managecontracts" element={<ManageContracts/>} />

            
            <Route path="managepayments" element={<ManagePayments/>} />




          </Route>


          {/*Customer Route */}
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/addproject" element={<AddProject />} />
            <Route path="managebids" element={<ManageBids/>} />

            <Route path="/work" element={<Work />} />
            <Route path="/rate" element={<Rate />} />
            <Route path="/contact" element={<Contact />} />
     
            <Route path="/profile" element={<Profile />} />
            <Route path="/uregister" element={<URegister />} />
            <Route path="/userlogin" element={<UserLogin />} />
         



          </Route>


          {/* Freelancer Route */}
          <Route path="/freelancer" element={<FrLayout />}>
            <Route path="bids" element={<Bids />} />
            <Route path="bids/addbids/:id" element={<AddBids/>} />
            
            

          </Route>

        </Routes>

      </BrowserRouter>
       <ToastContainer position="top-right" autoClose={3000} />
        </>
  );
}