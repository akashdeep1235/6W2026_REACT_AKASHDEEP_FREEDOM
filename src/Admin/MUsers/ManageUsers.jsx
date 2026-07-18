import { Link } from "react-router-dom";
import UserService from "../../Services/UserService";
import { useState,useEffect } from "react";


export default function ManageUsers(){
    async function getUsers() {
    const data = await UserService.all();
    console.log(data);
    setUsers(data);
  }
  const [users,setUsers] = useState([])
  useEffect(()=>{
    getUsers()
  },[])

    return (
        <>
                   <div
    className="container-fluid page-header py-5 mb-5 wow fadeIn"
    data-wow-delay="0.1s"
  >
    <div className="container text-center py-5">
      <h1 className="display-3 text-white mb-4 animated slideInDown">
       Manage Users
      </h1>
      <nav aria-label="breadcrumb animated slideInDown">
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="#">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">Users</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
           Manage Users
          </li>
        </ol>
      </nav>
    </div>

    </div>
    
  <div className="container mb-5">

                <div className="d-flex justify-content-between mt-5">
                    <h1 className="text-center">Users List</h1>
                  
                </div>
                {/* Single Page Header End */}

            </div>

            
      <div className="table-responsive m-5 ">
  <table className="table border ">
    <thead>
      <tr>
        <th scope="col ">Sr.no</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col">Contact</th>
        <th scope="col">User Role</th>

        <th scope="col">Status</th>
        <th scope="col">Createdat</th>
 
      </tr>
    </thead>
     <tbody>
  {users.map((user, index) => (
    <tr key={user.id}>
      <th>{index + 1}</th>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.contact}</td>
      <td>{user.userType}</td>




     
      <td>{user.status}</td>
      <td>{new Date(user.createdAt).toLocaleDateString()}
  
  </td>
      <td>
      
      </td>
    </tr>
  ))}
</tbody> 
  </table>
</div>

        
        </>
    )
}