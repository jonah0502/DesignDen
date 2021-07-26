import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import { useState } from "react";

const addressHeaders = [
  "AddressID",
  "Street",
  "City",
  "Zip",
  "State",
  "Country",
  "Update",
  "Delete",
];

const addressData = [
  {
    id: 1,
    street: "1903 Rainbow Road",
    city: "Los Angeles",
    zip: "90017",
    state: "CA",
    country: "US",
  },
  {
    id: 2,
    street: "869 Center St",
    city: "Portland",
    zip: "97875",
    state: "OR",
    country: "US",
  },
  {
    id: 3,
    street: "2053 Leisure Lane",
    city: "San Luis Obispo",
    zip: "93401",
    state: "CA",
    country: "US",
  },
  {
    id: 4,
    street: "3382 Gateway Road",
    city: "Portland",
    zip: "97225",
    state: "OR",
    country: "US",
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(addressData);

  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newAddresses = [...addresses];
    newAddresses[index][name] = value;
    setAddresses(newAddresses);
  };

  const handleRowDelete = (index) => (event) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };

  return (
    <Layout>
      <h1>Addresses</h1>
      <p>Supported operations: Create, Read, Update, Delete</p>
      <br />
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {addressHeaders.map((address) => {
                return <th key={address}>{address}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {addresses.map((address, index) => (
              <tr key={address.id}>
                <td>{address.id}</td>
                <td>
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="zip"
                    value={address.zip}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="state"
                    maxLength="2"
                    value={address.state}
                    onChange={handleRowChange(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="country"
                    maxLength="2"
                    value={address.country}
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
      </div>
      <br />
      <h3>Add new address</h3>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="Street" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Zip" />
          <input type="text" placeholder="State" maxLength="2" />
          <input type="text" placeholder="Country" maxLength="2" />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
    </Layout>
  );
}
