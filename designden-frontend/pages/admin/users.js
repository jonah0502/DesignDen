import Layout from "@/components/Layout";
import Message from "@/components/Message.js";
import styles from "@/styles/Table.module.css";
import userService from "../../services/users.js";
import { getAddressList } from "../../services/addresses.js";
import { useEffect, useState } from "react";

const userHeaders = [
  "UserID",
  "FirstName",
  "LastName",
  "Email",
  "AddressID",
  "Address",
  "Birthdate",
  "StoreCredits",
  "Update",
];

export default function UsersPage() {
  // initalize state variables
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ addressID: null });
  const [message, setMessage] = useState({ text: null, isError: false });
  const [addressList, setAddressList] = useState([]);

  useEffect(() => {
    // get the users from database on first page load
    userService.getAll().then((data) => setUsers(data));
    // get the addresses for the form
    getAddressList().then((response) => setAddressList(response));
  }, []);

  // outputs a success or error message to the screen
  const displayMessage = (text, isError) => {
    setMessage({ text: text, isError: isError });
    setTimeout(() => {
      setMessage({ text: null, isError: false });
    }, 5000);
  };

  // add a new user to database on form button click
  const addUser = (event) => {
    event.preventDefault();
    const addressID =
      addressList
        .map((address) => address.fullAddress)
        .indexOf(userForm.fullAddress) + 1;
    let newUser = { ...userForm };
    if (addressID) {
      newUser = { ...userForm, addressID: addressID };
    }
    userService
      .create(newUser)
      .then((response) => {
        newUser = { ...newUser, userID: response.id };
        setUsers(users.concat(newUser));
        displayMessage(response.message, false);
      })
      .catch((error) => {
        let errMsg;
        if (error.response) {
          errMsg = error.response.data;
        } else {
          errMsg = "Error: Unable to add user, missing required fields.";
        }
        displayMessage(errMsg, true);
      });
  };

  // update user in database on update button click
  const updateUser = (index) => (event) => {
    event.preventDefault();
    const user = users[index];
    userService
      .update(user.userID, user)
      .then((response) => {
        displayMessage(response, false);
      })
      .catch((error) => {
        displayMessage(error.response.data, true);
      });
  };

  // handle input changes for each row
  const handleRowChange = (index) => (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    const newUsers = [...users];
    newUsers[index][name] = value;
    if (name === "fullAddress") {
      newUsers[index]["addressID"] =
        addressList.map((address) => address.fullAddress).indexOf(value) + 1 ||
        null;
    }
    setUsers(newUsers);
  };

  return (
    <Layout>
      <Message message={message.text} isError={message.isError} />
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
                <td>{user.addressID}</td>
                <td>
                  <select
                    name="fullAddress"
                    value={user.fullAddress || ""}
                    onChange={handleRowChange(index)}
                  >
                    <option value="">null</option>
                    {addressList.map((address) => (
                      <option
                        key={address.addressID}
                        value={address.fullAddress}
                      >
                        {address.fullAddress}
                      </option>
                    ))}
                  </select>
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
            placeholder="FirstName*"
            value={userForm.firstName || ""}
            onChange={(e) =>
              setUserForm({ ...userForm, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="LastName*"
            value={userForm.lastName || ""}
            onChange={(e) =>
              setUserForm({ ...userForm, lastName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email*"
            value={userForm.email || ""}
            onChange={(e) =>
              setUserForm({ ...userForm, email: e.target.value })
            }
          />
          <select
            value={userForm.fullAddress || ""}
            onChange={(e) =>
              setUserForm({ ...userForm, fullAddress: e.target.value })
            }
          >
            <option value="">Select address</option>
            {addressList.map((address) => (
              <option key={address.addressID} value={address.fullAddress}>
                {address.fullAddress}
              </option>
            ))}
          </select>
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
            placeholder="StoreCredits*"
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
