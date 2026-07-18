import FrHeader from "./FrHeader";
import FrFooter from "./FrFooter";
import { Outlet, useNavigate } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { useEffect } from "react";
import { toast } from "react-toastify";
export default function FrLayout() {
     const nav = useNavigate()

    function getUserType(){
        const res = AuthService.getUserType()
        return res;
    }
    function getUserEmail(){
        const res = AuthService.getEmail()
        return res;
    }

    useEffect(()=>{
        const email = getUserEmail()
        const userType = getUserType()
        if(userType !== 'freelancer' || email == null){
            toast.error("Unauthorised")
            nav('/')
        }

    }, [])

    return(

        <>
        <FrHeader/>
        <Outlet />
        <FrFooter />
        </>
    )
}