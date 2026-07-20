import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { updateDoc} from "firebase/firestore";
import UserModel from "../Models/UserModel"
import { auth } from "../Firebase/FirebaseConfig"
import { signOut } from "firebase/auth"

import { db } from "../Firebase/FirebaseConfig"
import { doc, getDoc, setDoc } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore"
import AuthService from "./AuthService"
class UserService {



  async register(data) {
    const userData = await createUserWithEmailAndPassword(auth, data.email, data.password)
    const user = userData.user

    let newUser = new UserModel
    newUser.uid = user.uid
    newUser.name = data.name
    newUser.email = data.email
    newUser.contact = data.contact
    newUser.userType = data.userType
    newUser.address = data.address
    newUser.image = data.image



    if (data.userType === "freelancer") {
      newUser.status = "pending";
    } else {
      newUser.status = "active";
    }



    await setDoc(doc(db, "users", user.uid), { ...newUser })

    signOut(auth)

    return userData
  }

  async login(data) {
    const userData = await signInWithEmailAndPassword(auth, data.email, data.password)
    const user = userData.user

    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (userDoc.exists()) {
      const firestoreData = userDoc.data()
      const authData = {
        uid: user.uid,
        name: firestoreData.name,
        email: user.email,
        password:user.password,
        userType: firestoreData.userType,
         status: firestoreData.status,
        token: await user.getIdToken(),
        image:user.image
      };

      await AuthService.setData(authData);

      return authData;

    } else {
      throw new Error("user not found")

    }
    return userData
  }

  async all() {
    const querySnapshot = await getDocs(collection(db, "users"));
    let users = []
    querySnapshot.forEach((doc) => {
      users.push({
        id: doc.id, ...doc.data()


      })



    });
    return users

  }
async approve(id) {
  await updateDoc(doc(db, "users", id), {
    status: "active",
    updatedAt: Date.now(),
  });
}

async reject(id) {
  await updateDoc(doc(db, "users", id), {
    status: "rejected",
    updatedAt: Date.now(),
  });
}

}

export default new UserService()