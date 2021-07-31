import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import userService from "../../services/users.js";
import { useEffect, useState } from "react";

const userHeaders = [
  "UserID",
  "AddressID",
  "FirstName",
  "LastName",
  "Email",
  "Birthdate",
  "StoreCredits",
  "Update",
];

export default function UsersPage() {
  // initalize state variables
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ addressID: null });

  // get the users from database on first page load
  useEffect(() => {
    userService.getAll().then((data) => setUsers(data));
  }, []);

  // add a new user to database on form button click
  const addUser = (event) => {
    event.preventDefault();
    console.log(userForm);
    userService
      .create(userForm)
      .then((response) => {
        console.log(response);
        let newUser = { ...userForm, userID: response.id };
        setUsers(users.concat(newUser));
        setUserForm({ addressID: null });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // update user in database on update button click
  const updateUser = (index) => (event) => {
    event.preventDefault();
    const user = users[index];
    userService
      .update(user.userID, user)
      .then(console.log("successful update"))
      .catch((error) => console.log(error));
  };

  // handle input changes for each row
  const handleRowChange = (index) => (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const newUsers = [...users];
    newUsers[index][name] = value;
    setUsers(newUsers);
  };

  return (
    <Layout>
      <h1>Users</h1>
      <p>Supported operations: Create, Read, Update</p>
      <br />
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {userHeaders.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.userID}>
                <td>{user.userID}</td>
                <td>
                  <input
                    type="number"
                    name="addressID"
                    value={user.addressID || ""}
                    placeholder="null"
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="firstName"
                    value={user.firstName}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="lastName"
                    value={user.lastName}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="email"
                    value={user.email}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="date"
                    name="birthdate"
                    value={user.birthDate}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="storeCredits"
                    value={user.storeCredits}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <button onClick={updateUser(index)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <h3>Add new user</h3>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="FirstName"
            value={userForm.firstName || ""}
            onChange={(e) =>
              setUserForm({ ...userForm, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="LastName"
            value={userForm.lastName || ""}
            onChange={(e) =>
              setUserForm({ ...userForm, lastName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={userForm.email || ""}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
          />
          <input
            type="date"
            value={userForm.birthDate || ""}
            onChange={(e) =>
              setUserForm({ ...userForm, birthDate: e.target.value })
            }
          />
          <input
            type="number"
            min="0"
            placeholder="StoreCredits"
            value={userForm.storeCredits || ""}
            onChange={(e) =>
              setUserForm({ ...userForm, storeCredits: e.target.value })
            }
          />
        </div>
        <div>
          <button onClick={addUser}>Add</button>
        </div>
      </form>
    </Layout>
  );
}
