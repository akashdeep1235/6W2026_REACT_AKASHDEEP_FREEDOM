import {
  addDoc,
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "../Firebase/FirebaseConfig";
import ContractModel from "../Models/ContractModel";

class ContractService {

  // Add Contract
  async add(data) {

    let newContract = new ContractModel();

    newContract.projectId = data.projectId;
    newContract.clientId = data.clientId;
    newContract.freelancerId = data.freelancerId;
    newContract.workFileUrl = data.workFileUrl || "";

    newContract.paymentStatus = "Pending";
    newContract.contractStatus = "Active";

    newContract.createdAt = Date.now();
    newContract.updatedAt = "";

    const docRef = await addDoc(
      collection(db, "Contracts"),
      { ...newContract }
    );

    return docRef;
  }

  // Get All Contracts
  async all() {

    const querySnapshot = await getDocs(collection(db, "Contracts"));

    let contracts = [];

    querySnapshot.forEach((doc) => {

      contracts.push({
        id: doc.id,
        ...doc.data()
      });

    });

    return contracts;
  }

  // Update Work File
  async submitWork(id, workUrl) {

    await updateDoc(doc(db, "Contracts", id), {

      workFileUrl: workUrl,

      contractStatus: "Submitted",

      updatedAt: Date.now()

    });

  }

  // Release Payment
  async releasePayment(id) {

    await updateDoc(doc(db, "Contracts", id), {

      paymentStatus: "Paid",

      contractStatus: "Completed",

      updatedAt: Date.now()

    });

  }

}

export default new ContractService();