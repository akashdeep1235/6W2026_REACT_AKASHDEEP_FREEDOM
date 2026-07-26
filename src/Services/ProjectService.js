import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import ProjectModel from "../Models/ProjectModel"
import { db } from "../Firebase/FirebaseConfig";
 class ProjectService{
    async add(data){

        let newProject= new ProjectModel()
        newProject.categoryId = data.categoryId;
        newProject.title=data.title
        newProject.description=data.description
        newProject.budget=data.budget
        newProject.deadline=data.deadline
     newProject.clientId = data.clientId

   
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

}
 async updateProjectStatus(projectId, freelancerId) {
    await updateDoc(doc(db, "projects", projectId), {
      projectStatus: "In Progress",
      selectedFreelancerId: freelancerId,
    });
  }
}


export default new ProjectService()