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

  // get all reviews from database on first page load
  useEffect(() => {
    ordersService
      .getAll()
      .then((response) => {
        setOrders(response);
      })
      .catch((e) => console.log(e));
  }, []);


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
          placeholder="UserID"
          value={ordersForm.userID || ""}
          onChange={(e) =>
            setAddressForm({ ...ordersForm, userID: e.target.value })
          }
          />
          <input type="text" placeholder="AddressID" />
          <input type="text" placeholder="ContactFirstName" />
          <input type="text" placeholder="ContactLastName" />
          <input type="text" placeholder="ContactEmail" />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
    </Layout>
  );
}
