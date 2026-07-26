import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

import { db } from "../Firebase/FirebaseConfig";
import BidModel from "../Models/BidModel";
 class BidService{
    async add(data){

        let newBid= new BidModel()
        newBid.projectId = data.projectId;
        newBid.bidamount= data.bidamount;
        newBid.proposal=data.proposal;
        newBid.freelancerId=data.freelancerId;



      

   
       const docRef = await addDoc(collection(db, "Bids"), { ...newBid});
  return docRef;

    }
    async all(){
      const querySnapshot = await getDocs(collection(db, "Bids"));
      let Bids= []
      querySnapshot.forEach((doc) => {
        Bids.push({id: doc.id, ...doc.data()})
        
    
      });
      return Bids

}
async hireFreelancer(bid) {

  // Accept selected bid
  await updateDoc(doc(db, "Bids", bid.id), {
    bidStatus: "Accepted"
  });

  // Get all bids for the same project
  const q = query(
    collection(db, "Bids"),
    where("projectId", "==", bid.projectId)
  );

  const querySnapshot = await getDocs(q);

  // Reject all other bids
  for (const item of querySnapshot.docs) {
    if (item.id !== bid.id) {
      await updateDoc(doc(db, "Bids", item.id), {
        bidStatus: "Rejected"
      });
    }
  }
}

}
export default new BidService()