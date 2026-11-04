// src/Services/QueryService.js   (NEW FILE)
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

class QueryService {

  // Save a message sent from the Contact page
  async add(data) {
    return await addDoc(collection(db, "Queries"), {
      userId: data.userId,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      userType: data.userType,
      createdAt: Date.now(),
    });
  }

  // All messages (for an admin page later)
  async all() {
    const snap = await getDocs(collection(db, "Queries"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
}

export default new QueryService();