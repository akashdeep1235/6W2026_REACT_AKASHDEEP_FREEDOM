import { addDoc, collection, getDocs } from "firebase/firestore";

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

}}
export default new BidService()