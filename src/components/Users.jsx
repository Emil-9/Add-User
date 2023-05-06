import "./Users.css";
import User from "./User";
const Users = (props) => {
  const deleteUserHandler = (event) => {
    props.deletedUser(event);
  };
  return (
    <div className="users-container">
      <h2>Registered Users</h2>
      {props.registerdUsers.length > 0 &&
        props.registerdUsers.map((user) => {
          return (
            <User
              onDeleteUser={deleteUserHandler}
              key={user.id}
              name={user.name}
              age={user.age}
            />
          );
        })}
    </div>
  );
};
export default Users;
