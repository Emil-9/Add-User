import "./App.css";
import { useState } from "react";
import NewUser from "./components/NewUser";
import AsideNav from "./UI/aside/AsideNav";
import Users from "./components/Users";
import initialUsers from "./components/initialUsers";
import Message from "./UI/Message";
import Background from "./UI/Background";

function App() {
  const [usersArray, setUsersArray] = useState(initialUsers);
  const [isError, setIsError] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [type, settype] = useState("");
  // check the value for letters and numbers -> no special chars
  function onlyLettersAndNumbers(str) {
    return /^[A-Za-z0-9]*$/.test(str);
  }
  const submitDataHandler = (comingData) => {
    // check if this user is already registered in the same username
    if (
      usersArray.filter(
        (e) => e.name.toLowerCase() === comingData.name.toLowerCase()
      ).length > 0
    ) {
      setMessageContent("This username is already registered!");
      setIsError(true);
      settype("error");
    } else if (comingData.name.length < 4) {
      if (comingData.name.length === 0) {
        setMessageContent("Username is required");
        setIsError(true);
        settype("error");
      } else {
        setMessageContent("Username must be more than 4 charectars");
        setIsError(true);
        settype("error");
      }
    } else if (onlyLettersAndNumbers(comingData.name) === false) {
      setMessageContent("Username must contain only letters and numbers");
      setIsError(true);
      settype("error");
    } else if (+comingData.age < 16) {
      if (comingData.age === 0) {
        setMessageContent("Age is required");
        setIsError(true);
        settype("error");
      } else if (comingData.age < 18) {
        setMessageContent("Age must be 18 or more");
        setIsError(true);
        settype("error");
      }
    } else if (+comingData.age > 120) {
      setMessageContent("Age is not valid");
      setIsError(true);
      settype("error");
    } else {
      settype("success");
      setIsError(false);
      setIsAdded(true);
      setMessageContent("Success: User has been added");
      setUsersArray((prev) => {
        return [comingData, ...prev];
      });
    }
  };
  const deleteUserHandler = (userName) => {
    const reduceNamesArray = usersArray.filter(
      (name) => name.name !== userName
    );
    setUsersArray(reduceNamesArray);
    settype("deleted");
    setIsDeleted(true);
    setMessageContent("User Deleted");
  };
  return (
    <div className="App">
      <Background />
      <div className="main-container">
        {(isAdded || isError || isDeleted) && (
          <Message
            messageType={type}
            className={type}
            message={messageContent}
          />
        )}
        <AsideNav>
          <NewUser onSubmitData={submitDataHandler} />
        </AsideNav>
        <Users deletedUser={deleteUserHandler} registerdUsers={usersArray} />
      </div>
    </div>
  );
}

export default App;
