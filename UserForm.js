import React, { useState, useEffect } from "react";
import "./UserForm.css";
import ErrorModal from "./ErrorModal";
// import UserList from "./UserList";

function UserForm({ addUser }) {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [college, setCollege] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [users, setUsers] = useState([]);

  // Load user data from local storage when the component mounts
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(storedUsers);
  }, []);

  // Save user data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleAddUser = () => {
    if (!username.trim() || !age.trim() || !college.trim()) {
      setErrorMessage("Invalid input. All fields are required.");
      setIsErrorModalOpen(true);
    } else if (parseInt(age) < 0) {
      setErrorMessage("Invalid age. Age must be greater than 0.");
      setIsErrorModalOpen(true);
    } else {
      const newUser = { username, age: parseInt(age), college };
      setUsers([...users, newUser]);
      setUsername("");
      setAge("");
      setCollege("");
      setErrorMessage("");
    }
  };

  const handleCloseErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <div className="user-form">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input-field"
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="input-field"
      />
      <input
        type="text"
        placeholder="College Name"
        value={college}
        onChange={(e) => setCollege(e.target.value)}
        className="input-field"
      />
      <button onClick={handleAddUser} className="add-button">
        Add User
      </button>
      {isErrorModalOpen && (
        <ErrorModal
          errorMessage={errorMessage}
          onClose={handleCloseErrorModal}
        />
      )}
      {/* <UserList users={users} /> */}
    </div>
  );
}

export default UserForm;
