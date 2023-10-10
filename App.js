import React, { useState } from "react";
import "./App.css";
import UserForm from "./UserForm";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div className="App">
      <UserForm addUser={addUser} />
      <UserList users={users} />
    </div>
  );
}

export default App;
