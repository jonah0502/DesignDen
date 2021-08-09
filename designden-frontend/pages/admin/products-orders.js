import Layout from "@/components/Layout";
import Message from "@/components/Message.js";
import styles from "@/styles/Table.module.css";
import orderService from "../../services/orders";
import { getProductList } from "../../services/products";
import { getOrderList } from "../../services/orders";
import { useEffect, useState } from "react";

const headers = ["OrderID", "ProductID", "Product", "Quantity"];

export default function ProductOrdersPage() {
  // initalize state variables
  const [POs, setPOs] = useState([]);
  const [POForm, setPOForm] = useState({});
  const [message, setMessage] = useState({ text: null, isError: false });
  const [productList, setProductList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    // get all product orders from database on first page load
    orderService
      .getAllPO()
      .then((response) => {
        setPOs(response);
      })
      .catch((e) => console.log(e));
    // get list of products for form
    getProductList()
      .then((response) => {
        setProductList(response);
      })
      .catch((e) => console.log(e));
    // get list of orders for form
    getOrderList()
      .then((response) => {
        setOrderList(response);
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

  // add new product order to database from button click
  const addPO = (event) => {
    event.preventDefault();

    const productID =
      productList.map((product) => product.name).indexOf(POForm.productName) +
      1;
    let newPO = { ...POForm, productID: productID };
    console.log(newPO);

    orderService
      .createPO(newPO)
      .then((response) => {
        newPO = { ...newPO };
        setPOs(POs.concat(newPO));
        displayMessage(response.message, false);
      })
      .catch((error) => {
        let errMsg;
        if (error.response) {
          errMsg = error.response.data;
        } else {
          errMsg =
            "Error: Unable to add product_order, missing required fields.";
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
                <td>{item.productName}</td>
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
          <select
            value={POForm.orderID}
            onChange={(e) => setPOForm({ ...POForm, orderID: e.target.value })}
          >
            <option value="">Select order</option>
            {orderList.map((order) => (
              <option key={order.orderID} value={order.orderID}>
                {order.orderID}
              </option>
            ))}
          </select>
          <select
            value={POForm.productName}
            onChange={(e) =>
              setPOForm({ ...POForm, productName: e.target.value })
            }
          >
            <option value="">Select product</option>
            {productList.map((product) => (
              <option key={product.productID} value={product.name}>
                {product.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="0"
            placeholder="Quantity"
            value={POForm.quantity || ""}
            onChange={(e) => setPOForm({ ...POForm, quantity: e.target.value })}
          />
        </div>
        <div>
          <button onClick={addPO}>Add</button>
        </div>
      </form>
    </Layout>
  );
}
