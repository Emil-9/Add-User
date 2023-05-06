import "./NewUser.css";
import React, { useState } from "react";

const NewUser = (props) => {
  const [userInput, setUserInput] = useState({
    name: "",
    age: "",
  });

  const ageInputHandler = (event) => {
    setUserInput((prev) => {
      return { ...prev, age: event.target.value };
    });
  };
  const nameInputHandler = (event) => {
    setUserInput((prev) => {
      return { ...prev, name: event.target.value };
    });
  };

  const submitUserHandler = (event) => {
    event.preventDefault();
    const formData = {
      id: Math.random(),
      name: userInput.name.trim(),
      age: +userInput.age, // + sign is to convert the age string to number
    };
    // submit this data to props to pass to the parent
    props.onSubmitData(formData);
    // clear the value of the inputs
    setUserInput({ name: "", age: "" });
  };
  return (
    <form action="" onSubmit={submitUserHandler}>
      <div className="form-container">
        <h2>Create User</h2>
        <label htmlFor="userName">Enter Username</label>
        <input
          value={userInput.name}
          onChange={nameInputHandler}
          type="text"
          name="userName"
          id="UserName"
        />
        <label htmlFor="userAge">Enter Age</label>
        <input
          value={userInput.age}
          onChange={ageInputHandler}
          type="number"
          name="userAge"
          id="userAge"
          // min={16}
          // max={100}
          step={1}
        />
        <button>ADD</button>
      </div>
    </form>
  );
};
export default NewUser;
