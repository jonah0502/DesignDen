import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import orderService from "../../services/orders";
import { useEffect, useState } from "react";
import Message from "@/components/Message.js";



const headers = ["OrderID", "ProductID", "Quantity"];

export default function ProductOrdersPage() {
  // initalize state variables
  const [POs, setPOs] = useState([]);
  const [POForm, setPOForm] = useState({ });
  const [message, setMessage] = useState({ text: null, isError: false });

 // get all reviews from database on first page load
 useEffect(() => {
  orderService
    .getAllPO()
    .then((response) => {
      setPOs(response);
    })
    .catch((e) => console.log(e));
}, []);

// outputs a success or error message to the screen
const displayMessage = (text, isError) => {
  setMessage({ text: text, isError: isError });
  setTimeout(() => {
    setMessage({ text: null, isError: false });
  }, 5000);
};

  // add new review to database from button click
  const addPO = (event) => {
    event.preventDefault();

    let newPO = { ...POForm };
    
    orderService
      .createPO(newPO)
      .then((response) => {
        newPO = { ...newPO};
        setPOs(POs.concat(newPO));
        setPOForm({});
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


  return (
    <Layout>
      <Message message={message.text} isError={message.isError} />
      <h1>Products_Orders</h1>
      <p>Represents the products associated with each order</p>
      <p>Supported operations: Create, Read</p>
      <br />
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {headers.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {POs.map((item) => (
              <tr key={`${item.orderID}-${item.productID}`}>
                <td>{item.orderID}</td>
                <td>{item.productID}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <h3>Add a product to an order</h3>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input type="text" 
          placeholder="OrderID"
          value={POForm.orderID || ""}
          onChange={(e) =>
            setPOForm({ ...POForm, orderID: e.target.value })
          } />
          <input type="text" 
          placeholder="ProductID"
          value={POForm.productID || ""}
          onChange={(e) =>
            setPOForm({ ...POForm, productID: e.target.value })
          } />
          <input type="number" 
          min="0" 
          placeholder="Quantity"
          value={POForm.quantity || ""}
          onChange={(e) =>
            setPOForm({ ...POForm, quantity: e.target.value })
          } />
        </div>
        <div>
          <button onClick={addPO}>Add</button>
        </div>
      </form>
    </Layout>
  );
}
