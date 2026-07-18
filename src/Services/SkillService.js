import Skillmodel from "../Models/Skillmodel";

import { getDoc,addDoc, collection,doc,getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../Firebase/FirebaseConfig";
import { log } from 'firebase/firestore/lite/pipelines';

const dbPath="skills"
class SkillService{
  async add (data){
    console.log(data)

    let newSkill = new Skillmodel(data)
    newSkill.name = data.name
    newSkill.description = data.description
    newSkill.image=data.image
    
    const docRef = await addDoc(collection(db, "skills"), { ...newSkill });

    return docRef;
   }
async all(){
  const querySnapshot = await getDocs(collection(db, "skills"));
  let skills = []
  querySnapshot.forEach((doc) => {
    skills.push({id: doc.id, ...doc.data()})
    

  });
  return skills

}
    async single(id) {
        const docRef = doc(db, "skills", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() }
        } else {
            console.log("No such document!");
            return false
        }
    }


    async update(data, id) {
        const docRef = doc(db, "skills", id);
        await updateDoc(docRef, data);
    }
 
    async delskill(id){
        const docRef = doc(db ,dbPath, id);
        await deleteDoc(docRef)
    }

}

export default new SkillService()