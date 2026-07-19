import { signOut } from "firebase/auth"
import { auth } from "../Firebase/FirebaseConfig"

class AuthService{
    async setData(res){
        localStorage.setItem("name",res.name)
        localStorage.setItem("uid",res.uid)
        localStorage.setItem("email",res.email)
        localStorage.setItem("token",res.token)
        localStorage.setItem("islogin","true")
         localStorage.setItem("userType", res.userType)

    }
    getEmail(){
        return localStorage.getItem("email")
    }
    getUserType(){
        return localStorage.getItem("userType")
    }
    logout(){
        localStorage.clear()
        sessionStorage.clear()
        signOut(auth)
    }
    getUid() {
    return localStorage.getItem("uid")
}
}
export default new AuthService();
