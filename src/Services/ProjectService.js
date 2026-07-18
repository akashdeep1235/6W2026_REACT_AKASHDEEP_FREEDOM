import { addDoc, collection, getDocs } from "firebase/firestore";
import ProjectModel from "../Models/ProjectModel"
import { db } from "../Firebase/FirebaseConfig";
 class ProjectService{
    async add(data){

        let newProject= new ProjectModel()
        newProject.categoryId = data.categoryId;
        newProject.title=data.title
        newProject.pdescription=data.pdescription
        newProject.budget=data.budget
        newProject.deadline=data.deadline

   
       const docRef = await addDoc(collection(db, "projects"), { ...newProject});
  return docRef;

    }
    async all(){
      const querySnapshot = await getDocs(collection(db, "projects"));
      let projects= []
      querySnapshot.forEach((doc) => {
        projects.push({id: doc.id, ...doc.data()})
        
    
      });
      return projects

}}
export default new ProjectService()