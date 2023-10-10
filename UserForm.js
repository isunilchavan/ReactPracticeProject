import React, { useState } from "react";
import "./UserForm.css";

function UserForm({ addUser }) {
  const [username, setUsername] = useState("");
  const [age, setAge] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAddUser = () => {
    if (!username.trim() || !age.trim()) {
      setErrorMessage("Invalid input. Both fields are required.");
    } else if (parseInt(age) < 0) {
      setErrorMessage("Invalid age. Age must be greater than 0.");
    } else {
      addUser({ username, age: parseInt(age) });
      setUsername("");
      setAge("");
      setErrorMessage("");
    }
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
      <button onClick={handleAddUser} className="add-button">
        Add User
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default UserForm;