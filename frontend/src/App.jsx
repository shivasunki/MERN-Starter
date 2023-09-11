import { useEffect, useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const BASE_URL = "http://localhost:3000/api";
import UserRecord from "./UserRecord";
import { useImmer } from "use-immer";
import "font-awesome/css/font-awesome.min.css"
import { Button, Modal } from "react-bootstrap";
import UserModalBs from "./UserModalBs";


export default function App() {
  const userObj = {
    username: "",
    email: "",
    contact: "",
    city: "",
  };
  const initusers = [{_id: "", ...userObj}];
  const [userData, setUserData] = useState(userObj);
  const [usermodalData, setUserModalData] = useState({_id: "", ...userObj});
  const [userList, setUserList] = useState([...initusers]);
  const [count, setCount] = useState(0);
  const [isError, setIsError] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [statusHidden, setStatusHidden] = useState("hidden");
  const [showmodal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(BASE_URL + "/users")
      .then((res) => {
        const users = res.data;
          setUserList([...users]);
          if(users.length>0)
          handleStatus(false, "Fetched users data successully!");
      })
      .catch((err) => {
        console.log("Error: ", err);
        handleStatus(true, err.response.data.message);
      });
  }, []);


  function handleStatus(err, txt) {
    setStatusHidden("");
    setIsError(err);
    setStatusText(txt);
    setTimeout(() => {
      setStatusHidden("hidden");
    }, 2000);
  }
  
  
  function saveform(e) {
    e.preventDefault();
    axios
      .post(BASE_URL + "/user/create", {
        ...userData,
      })
      .then((resp) => {
        console.log(resp);
        // alert("User Saved Successfully!");
        setUserData({...userObj})
        handleStatus(false, resp.data.message);
        setUserList([...userList, resp.data.user]);
      })
      .catch((err) => {
        console.log("Error: ", err);
        setUserList([...userList]);
        handleStatus(true, err.response.data.message)
      });
  }



  function openModal(e, newuserobj) {
    setShowModal(true);
    setUserModalData({...newuserobj});

  }


  function handleDelete(e, id) {
    if (confirm("Are you sure want to delete this record?")) {
      axios.post(BASE_URL+"/users/delete/"+id, {}).then((data) =>{
        console.log(data);
        handleStatus(false, "User deleted successfully!")
        setUserList(userList.filter((u)=>u._id!=id));
      }).catch(err=>{
        console.log("Error: ", err)
        handleStatus(true, err.response.data.message)
      });
    }
  }

  function handleModalClose() {
    setShowModal(false);
  }

  function handleSave(e) {
    e.preventDefault();
    handleModalClose();
    axios.post(BASE_URL+"/users/update/"+usermodalData._id, {...usermodalData}).then((resp)=>{
      console.log("update response: ", resp.data)
      let newuser = resp.data.user
      let newlist = userList.filter(u=>u._id!=newuser._id);
      console.log("New list: ", newlist, "\n", usermodalData._id, "\n", usermodalData._id===newuser.id);
      handleStatus(false, "User data udated successfully!")
      setUserList([...newlist, {...usermodalData}]);
    }).catch((err)=>{
      console.log("Error: ", err);
      handleStatus(true, err.response.data.message)
    })
  }


  return (
    <div className="App">
      <div>
        <form onSubmit={saveform} className="form">
          <div className="container">
            <h1 className="m-3 p-3">Welcome</h1>
            <div style={{border: "1px solid #f1f1f1", overflowWrap: "break-word", color: "white", borderRadius: "5px", width: 500, padding: "5px", margin: "auto"}} className={statusHidden+" "+(!isError? "bg-success " : "bg-danger ")}>{statusText}</div>
            <div className="row mt-3">
              <div className="form-group col-md-3">
                <input
                  type="text"
                  required
                  name="username"
                  placeholder="Full Name*"
                  className="form-control"
                  value={userData.username}
                  onChange={(e) =>
                    setUserData({ ...userData, username: e.target.value })
                  }
                />
              </div>
              <div className="form-group col-md-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email*"
                  value={userData.email}
                  className="form-control"
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group col-md-2">
                <input
                  type="tel"
                  required
                  name="contact"
                  placeholder="Contact No.*"
                  value={userData.contact}
                  className="form-control"
                  onChange={(e) =>
                    setUserData({ ...userData, contact: e.target.value })
                  }
                />
              </div>

              <div className="form-group col-md-2">
                <input
                  type="text"
                  name="city"
                  placeholder="City*"
                  required
                  value={userData.city}
                  className="form-control"
                  onChange={(e) =>
                    setUserData({ ...userData, city: e.target.value })
                  }
                />
              </div>
              <div className="form-group col-md-2">
                <button className="form-control btn btn-dark" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="row">
          <div className="col-md-12">
            <table className="table table-hover mt-3">
              <thead>
                <tr>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>City</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((user, idx) => {
                   return user.username ? <UserRecord
                    key={idx}
                    id={user._id}
                    username={user.username}
                    email={user.email}
                    contact={user.contact}
                    city={user.city}
                    handleDelete={handleDelete}
                    openModal={openModal}
                  /> : <tr key={1}></tr>;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <UserModalBs
        id={usermodalData._id}
        username={usermodalData.username}
        email={usermodalData.email}
        contact={usermodalData.contact}
        city={usermodalData.city}
        showmodal={showmodal}
        handleModalClose={handleModalClose}
        handleSave={handleSave}
        setUserModalData={setUserModalData}
        usermodalData={usermodalData}
      />
    </div>
  );
}
