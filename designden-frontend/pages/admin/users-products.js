import Layout from "@/components/Layout";
import Message from "@/components/Message.js";
import styles from "@/styles/Table.module.css";
import userService from "../../services/users.js";
import { useEffect, useState } from "react";

const cartHeaders = ["UserID", "ProductID", "Quantity", "Delete"];

export default function UsersProductsPage() {
  // initalize state variables
  const [cartItems, setCartItems] = useState([]);
  const [cartForm, setCartForm] = useState({});
  const [message, setMessage] = useState({ text: null, isError: false });

  // get all cartItems from database on first page load
  useEffect(() => {
    userService
      .getAllCarts()
      .then((response) => setCartItems(response))
      .catch((error) => console.log(error));
  }, []);

  // outputs a success or error message to the screen
  const displayMessage = (text, isError) => {
    setMessage({ text: text, isError: isError });
    setTimeout(() => {
      setMessage({ text: null, isError: false });
    }, 5000);
  };

  const addCartItem = (event) => {
    event.preventDefault();
    userService
      .addToCart(cartForm.userID, cartForm.productID, cartForm.quantity)
      .then((response) => {
        setCartItems([...cartItems, cartForm]);
        setCartForm({});
        displayMessage(response, false);
      })
      .catch((error) => {
        let errMsg;
        if (error.response) {
          errMsg = error.response.data;
        } else {
          errMsg =
            "Error: Unable to add item to cart, missing required fields.";
        }
        displayMessage(errMsg, true);
      });
  };

  const deleteCartItem = (index) => (event) => {
    event.preventDefault();
    userService
      .removeFromCart(cartItems[index].userID, cartItems[index].productID)
      .then(() => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
        displayMessage(response, false);
      })
      .catch((error) => {
        displayMessage(error.response.data, true);
      });
  };

  return (
    <Layout>
      <Message message={message.text} isError={message.isError} />
      <h1>Users_Products</h1>
      <p>Represents the products currently in the users cart</p>
      <p>Supported operations: Create, Read, Delete</p>
      <br />
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              {cartHeaders.map((header) => {
                return <th key={header}>{header}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={`${item.userID}-${item.productID}`}>
                <td>{item.userID}</td>
                <td>{item.productID}</td>
                <td>{item.quantity}</td>
                <td>
                  <button onClick={deleteCartItem(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <h3>Add new item to cart</h3>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="UserID*"
            value={cartForm.userID || ""}
            onChange={(e) =>
              setCartForm({ ...cartForm, userID: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="ProductID*"
            value={cartForm.productID || ""}
            onChange={(e) =>
              setCartForm({ ...cartForm, productID: e.target.value })
            }
          />
          <input
            type="number"
            min="0"
            placeholder="Quantity*"
            value={cartForm.quantity || ""}
            onChange={(e) =>
              setCartForm({ ...cartForm, quantity: e.target.value })
            }
          />
        </div>
        <div>
          <button onClick={addCartItem}>Add</button>
        </div>
      </form>
    </Layout>
  );
}
