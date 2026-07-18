import AdHeader from "./AdHeader";
import AdFooter from "./AdFooter";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AuthService from "../../Services/AuthService";
import { toast, ToastContainer } from "react-toastify";
export default function Layout() {
       const nav = useNavigate()

    function getUserType(){
        const res = AuthService.getUserType()
        return res;
    }
    function getUserEmail(){
        const res = AuthService.getEmail()
        return res;
    }

useEffect(() => {
    const email = getUserEmail();
    const userType = getUserType();

    if (
        email == null ||
        (userType !== "admin" )
    ) {
        toast.error("Unauthorised");
        nav("/");
    }
}, []);


    return(

        <>
        <AdHeader/>
        <Outlet />
        <AdFooter />
        <ToastContainer/>
        </>
    )
}