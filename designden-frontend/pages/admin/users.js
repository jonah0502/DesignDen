import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import { useState } from "react";

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

const usersData = [
  {
    id: 1,
    addressID: 1,
    firstName: "Alice",
    lastName: "Baker",
    email: "abaker@example.com",
    birthdate: new Date(1994, 4, 25).toISOString().split("T")[0],
    storeCredits: 100,
  },
  {
    id: 2,
    addressID: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bsmith@example.com",
    birthdate: new Date(1990, 9, 7).toISOString().split("T")[0],
    storeCredits: 70,
  },
  {
    id: 3,
    addressID: "null",
    firstName: "Carol",
    lastName: "Henderson",
    email: "chenderson@example.com",
    birthdate: new Date(1985, 2, 27).toISOString().split("T")[0],
    storeCredits: 0,
  },
  {
    id: 4,
    addressID: 3,
    firstName: "David",
    lastName: "Kim",
    email: "dkim@example.com",
    birthdate: new Date(1992, 11, 12).toISOString().split("T")[0],
    storeCredits: 40,
  },
  {
    id: 5,
    addressID: "null",
    firstName: "Eve",
    lastName: "Walker",
    email: "ewalker@example.com",
    birthdate: new Date(1997, 7, 14).toISOString().split("T")[0],
    storeCredits: 400,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState(usersData);

  const handleRowChange = (index) => (event) => {
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
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <input
                    type="number"
                    name="addressID"
                    value={user.addressID}
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
                    value={user.birthdate}
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
                  <button>Update</button>
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
          <input type="text" placeholder="FirstName" />
          <input type="text" placeholder="LastName" />
          <input type="email" placeholder="Email" />
          <input type="text" placeholder="Password" />
          <input type="date" />
          <input type="number" min="0" placeholder="StoreCredits" />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
    </Layout>
  );
}
