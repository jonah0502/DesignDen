import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import ordersService from "../../services/orders.js";
import { useEffect, useState } from "react";


const orderHeaders = [
  "OrderID",
  "UserID",
  "AddressID",
  "OrderDate",
  "FirstName",
  "LastName",
  "Email",
];


export default function OrdersPage() {
  // initalize state variables
  const [orders, setOrders] = useState([]);
  const [ordersForm, setOrdersForm] = useState({});
  const [message, setMessage] = useState({ text: null, isError: false });

  // get all reviews from database on first page load
  useEffect(() => {
    ordersService
      .getAll()
      .then((response) => {
        setOrders(response);
      })
      .catch((e) => console.log(e));
  }, []);


  // add new review to database from button click
  const addOrder = (event) => {
    event.preventDefault();
    const today = new Date().toISOString().slice(0, 10);

    let newOrder = { ...ordersForm, orderDate: today };
    
    ordersService
      .create(newOrder)
      .then((response) => {
        console.log(response);
        newOrder = { ...newOrder, orderID: response.id };
        setOrders(orders.concat(newOrder));
        setOrdersForm({});
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


  return (
    <Layout>
      <h1>Orders</h1>
      <p>Supported operations: Create, Read</p>
      <br />
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {orderHeaders.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              return (
                <tr key={order.orderID}>
                  <td>{order.orderID}</td>
                  <td>{order.userID}</td>
                  <td>{order.billingAddressID}</td>
                  <td>{order.orderDate}</td>
                  <td>{order.firstName}</td>
                  <td>{order.lastName}</td>
                  <td>{order.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <h3>Add new order</h3>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input type="text" 
          placeholder="UserID*"
          value={ordersForm.userID || ""}
          onChange={(e) =>
            setOrdersForm({ ...ordersForm, userID: e.target.value })
          }
          />
          <input type="text"
          placeholder="AddressID*"
          value={ordersForm.billingAddressID || ""}
          onChange={(e) =>
            setOrdersForm({ ...ordersForm, billingAddressID: e.target.value })
          }
           />
          <input type="text"
          placeholder="ContactFirstName*" 
          value={ordersForm.firstName || ""}
          onChange={(e) =>
            setOrdersForm({ ...ordersForm, firstName: e.target.value })
          }/>
          <input type="text"
          placeholder="ContactLastName*" 
          value={ordersForm.lastName || ""}
          onChange={(e) =>
            setOrdersForm({ ...ordersForm, lastName: e.target.value })
          }
          />
          <input type="text" 
          placeholder="ContactEmail*"
          value={ordersForm.email || ""}
          onChange={(e) =>
            setOrdersForm({ ...ordersForm, email: e.target.value })
          }
          />
        </div>
        <div>
          <button onClick={addOrder}>Add</button>
        </div>
      </form>
    </Layout>
  );
}
