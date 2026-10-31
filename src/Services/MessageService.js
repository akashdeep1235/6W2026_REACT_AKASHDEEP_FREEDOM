import {
  addDoc, collection, doc, getDoc, onSnapshot, orderBy, query,
} from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";

class MessageService {

  // Load one contract (used to check that the user belongs to it)
  async getContract(contractId) {
    const snap = await getDoc(doc(db, "Contracts", contractId));
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
  }

  // Save one message inside Contracts/{contractId}/messages
  async send(contractId, { senderId, senderName, text }) {
    return await addDoc(collection(db, "Contracts", contractId, "messages"), {
      senderId,
      senderName,
      text,
      createdAt: Date.now(),
    });
  }

  // Live updates: calls onChange(list) every time a message is added.
  // Returns a function that stops listening.
  listen(contractId, onChange, onError) {
    const q = query(
      collection(db, "Contracts", contractId, "messages"),
      orderBy("createdAt", "asc")
    );
    return onSnapshot(
      q,
      (snap) => onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      onError
    );
  }
}

export default new MessageService();