
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc
} from "firebase/firestore";

import UserModel from "../Models/UserModel";
import { auth, db } from "../Firebase/FirebaseConfig";
import AuthService from "./AuthService";

class UserService {

  // Register User
  async register(data) {

    const userData = await createUserWithEmailAndPassword(
      auth,
      data.email.trim(),
      data.password
    );

    const user = userData.user;

    let newUser = new UserModel();

    newUser.uid = user.uid;
    newUser.name = data.name;
    newUser.email = data.email;
    newUser.contact = data.contact;
    newUser.userType = data.userType;
    newUser.address = data.address;
    newUser.profileImage = data.profileImage;
    newUser.skills = data.skills || "";
    newUser.resumeUrl = data.resumeUrl || "";

    if (data.userType === "freelancer") {
      newUser.status = "pending";
    } else {
      newUser.status = "active";
    }

    await setDoc(doc(db, "users", user.uid), {
      ...newUser
    });

    // Sign out after registration
    await signOut(auth);

    return userData;
  }


  // Login User
  async login(data) {

    // First verify email and password using Firebase
    const userData = await signInWithEmailAndPassword(
      auth,
      data.email.trim(),
      data.password
    );

    const user = userData.user;

    // Get user details from Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      await signOut(auth);
      throw new Error("User profile not found");
    }

    const firestoreData = userDoc.data();

    // Check freelancer approval status
    if (
      firestoreData.userType === "freelancer" &&
      firestoreData.status === "pending"
    ) {
      await signOut(auth);
      return { status: "pending" };
    }

    // Check rejected freelancer
    if (
      firestoreData.userType === "freelancer" &&
      firestoreData.status === "rejected"
    ) {
      await signOut(auth);
      return { status: "rejected" };
    }

    // Allow active users to login
    const authData = {
      uid: user.uid,
      name: firestoreData.name,
      email: user.email,
      contact: firestoreData.contact,
      address: firestoreData.address,
      userType: firestoreData.userType,
      status: firestoreData.status,
      token: await user.getIdToken(),
      image: firestoreData.profileImage
    };

    await AuthService.setData(authData);

    return authData;
  }


  // Get All Users
  async all() {

    const querySnapshot = await getDocs(collection(db, "users"));

    let users = [];

    querySnapshot.forEach((doc) => {

      users.push({
        id: doc.id,
        ...doc.data()
      });

    });

    return users;
  }


  // Approve Freelancer
  async approve(id) {

    await updateDoc(doc(db, "users", id), {
      status: "active",
      updatedAt: Date.now()
    });

  }


  // Reject Freelancer
  async reject(id) {

    await updateDoc(doc(db, "users", id), {
      status: "rejected",
      updatedAt: Date.now()
    });

  }


  // Get Single User
  async getById(uid) {

    const snap = await getDoc(doc(db, "users", uid));

    return snap.exists()
      ? { id: snap.id, ...snap.data() }
      : null;
  }


  // Update User Profile
  async updateProfile(uid, data) {

    await updateDoc(doc(db, "users", uid), {

      name: data.name,
      contact: data.contact,
      address: data.address,
      skills: data.skills,
      profileImage: data.profileImage,
      updatedAt: Date.now()

    });

  }

}

export default new UserService();
