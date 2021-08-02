import Layout from "@/components/Layout";
import Message from "@/components/Message.js";
import styles from "@/styles/Table.module.css";
import addressService from "../../services/addresses.js";
import { useEffect, useState } from "react";
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
export default function AddressesPage() {
  // initalize state variables
  const [addresses, setAddresses] = useState([]);
  const [addressForm, setAddressForm] = useState({});
  const [message, setMessage] = useState({ text: null, isError: false });

  // get all reviews from database on first page load
  useEffect(() => {
    addressService
      .getAll()
      .then((response) => {
        setAddresses(response);
      })
      .catch((e) => console.log(e));
  }, []);

  //issue lies somewhere in here
  // add new review to database from button click
  const addAddress = (event) => {
    event.preventDefault();
    let newAddress = { ...addressForm };
    addressService
      .create(newAddress)
      .then((response) => {
        console.log(response);
        newAddress = { ...newAddress, addressID: response.id };
        setAddresses(addresses.concat(newAddress));
        setAddressForm({});
        displayMessage(response.message, false);
      })
      .catch((error) => {
        let errMsg;
        if (error.response) {
          errMsg = error.response.data;
        } else {
          errMsg = "Error: Unable to add address, missing required fields.";
        }
        displayMessage(errMsg, true);
      });
  };

  // outputs a success or error message to the screen
  const displayMessage = (text, isError) => {
    setMessage({ text: text, isError: isError });
    setTimeout(() => {
      setMessage({ text: null, isError: false });
    }, 5000);
  };
  // update user in database on update button click
  const updateAddress = (index) => (event) => {
    event.preventDefault();
    const address = addresses[index];
    addressService
      .update(address.addressID, address)
      .then(console.log("successful update"))
      .catch((error) => console.log(error));
  };

  // delete review from row button click
  const deleteAddress = (index) => (event) => {
    event.preventDefault();
    addressService
      .remove(addresses[index].addressID)
      .then((response) => {
        const newAddresses = [...addresses];
        newAddresses.splice(index, 1);
        setAddresses(newAddresses);
        displayMessage(response, false);
      })
      .catch((e) => console.log(e));
  };

  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newAddresses = [...addresses];
    newAddresses[index][name] = value;
    setAddresses(newAddresses);
  };

  return (
    <Layout>
      <Message message={message.text} isError={message.isError} />
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
              <tr key={address.addressID}>
                <td>{address.addressID}</td>
                <td>
                  <input
                    type="text"
                    name="street"
                    value={address.streetAddress}
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
                  <button onClick={updateAddress(index)}>Update</button>
                </td>
                <td>
                  <button onClick={deleteAddress(index)}>Delete</button>
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
          <input
            type="text"
            placeholder="Street*"
            value={addressForm.streetAddress || ""}
            onChange={(e) =>
              setAddressForm({ ...addressForm, streetAddress: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="City*"
            value={addressForm.city || ""}
            onChange={(e) =>
              setAddressForm({ ...addressForm, city: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Zip*"
            value={addressForm.zip || ""}
            onChange={(e) =>
              setAddressForm({ ...addressForm, zip: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="State*"
            maxLength="2"
            value={addressForm.state || ""}
            onChange={(e) =>
              setAddressForm({ ...addressForm, state: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Country*"
            maxLength="2"
            value={addressForm.country || ""}
            onChange={(e) =>
              setAddressForm({ ...addressForm, country: e.target.value })
            }
          />
        </div>
        <div>
          <button onClick={addAddress}>Add</button>
        </div>
      </form>
    </Layout>
  );
}
