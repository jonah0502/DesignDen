import Layout from "@/components/Layout";
import { useState } from "react";

const userHeaders = [
  "UserID",
  "FirstName",
  "LastName",
  "Email",
  "Birthdate",
  "StoreCredits",
];

const usersData = [
  {
    id: 0,
    firstName: "Alice",
    lastName: "Baker",
    email: "abaker@example.com",
    birthdate: new Date(1994, 4, 25).toISOString().split("T")[0],
    storeCredits: 100,
  },
  {
    id: 1,
    firstName: "Bob",
    lastName: "Smith",
    email: "bsmith@example.com",
    birthdate: new Date(1990, 9, 7).toISOString().split("T")[0],
    storeCredits: 70,
  },
  {
    id: 2,
    firstName: "Carol",
    lastName: "Henderson",
    email: "chenderson@example.com",
    birthdate: new Date(1985, 2, 27).toISOString().split("T")[0],
    storeCredits: 0,
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

  const handleRowDelete = (index) => (event) => {
    const newUsers = [...users];
    newUsers.splice(index, 1);
    setUsers(newUsers);
  };

  return (
    <Layout>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            {userHeaders.map((header) => {
              return <td key={header}>{header}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
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
              <td>
                <button onClick={handleRowDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
