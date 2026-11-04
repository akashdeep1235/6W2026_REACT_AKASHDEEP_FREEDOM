
import {
  addDoc, collection, getDocs, deleteDoc, doc, query, where,
} from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import ReviewModel from "../Models/ReviewModel";

class ReviewService {

  // Add a review
  async add(data) {
    let newReview = new ReviewModel();

    newReview.projectId = data.projectId;
    newReview.reviewerId = data.reviewerId;
    newReview.reviewForId = data.reviewForId;
    newReview.rating = Number(data.rating);
    newReview.review = data.review;
    newReview.createdAt = Date.now();

    return await addDoc(collection(db, "Reviews"), { ...newReview });
  }

  // Get all reviews (admin)
  async all() {
    const snap = await getDocs(collection(db, "Reviews"));
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  // Review this client already wrote for a project (null if none yet)
  async byProject(projectId, reviewerId) {
    const q = query(
      collection(db, "Reviews"),
      where("projectId", "==", projectId),
      where("reviewerId", "==", reviewerId)
    );
    const snap = await getDocs(q);
    return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
  }

  // Reviews written by this client (used on Work page to hide the Rate button)
  async byReviewer(reviewerId) {
    const q = query(collection(db, "Reviews"), where("reviewerId", "==", reviewerId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  // Reviews received by this freelancer
  async byFreelancer(freelancerId) {
    const q = query(collection(db, "Reviews"), where("reviewForId", "==", freelancerId));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  // Delete a review (admin)
  async delete(id) {
    await deleteDoc(doc(db, "Reviews", id));
  }
}

export default new ReviewService();