import React, { useReducer } from "react";
import "./UserForm.css";
import ErrorModal from "./ErrorModal";

const initialState = {
  username: "",
  age: "",
  college: "",
  errorMessage: "",
  isErrorModalOpen: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "setUsername":
      return { ...state, username: action.payload };
    case "setAge":
      return { ...state, age: action.payload };
    case "setCollege":
      return { ...state, college: action.payload };
    case "setErrorMessage":
      return { ...state, errorMessage: action.payload };
    case "setIsErrorModalOpen":
      return { ...state, isErrorModalOpen: action.payload };
    case "resetForm":
      return { ...initialState }; // Reset the form fields
    default:
      return state;
  }
};

function UserForm({ addUser }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleAddUser = () => {
    const { username, age, college } = state;

    if (!username.trim() || !age.trim() || !college.trim()) {
      dispatch({ type: "setErrorMessage", payload: "Invalid input. All fields are required." });
      dispatch({ type: "setIsErrorModalOpen", payload: true });
    } else if (parseInt(age) < 0) {
      dispatch({ type: "setErrorMessage", payload: "Invalid age. Age must be greater than 0." });
      dispatch({ type: "setIsErrorModalOpen", payload: true });
    } else {
      addUser({ username, age: parseInt(age), college });
      dispatch({ type: "resetForm" }); // Reset the form fields
      dispatch({ type: "setErrorMessage", payload: "" });
    }
  };

  const handleCloseErrorModal = () => {
    dispatch({ type: "setIsErrorModalOpen", payload: false });
  };

  return (
    <div className="user-form">
      <input
        type="text"
        placeholder="Username"
        value={state.username}
        onChange={(e) => dispatch({ type: "setUsername", payload: e.target.value })}
        className="input-field"
      />
      <input
        type="number"
        placeholder="Age"
        value={state.age}
        onChange={(e) => dispatch({ type: "setAge", payload: e.target.value })}
        className="input-field"
      />
      <input
        type="text"
        placeholder="College Name"
        value={state.college}
        onChange={(e) => dispatch({ type: "setCollege", payload: e.target.value })}
        className="input-field"
      />
      <button onClick={handleAddUser} className="add-button">
        Add User
      </button>
      {state.isErrorModalOpen && (
        <ErrorModal
          errorMessage={state.errorMessage}
          onClose={handleCloseErrorModal}
        />
      )}
    </div>
  );
}

export default UserForm;
