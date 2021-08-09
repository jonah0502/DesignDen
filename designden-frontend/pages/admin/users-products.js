import Layout from "@/components/Layout";
import Message from "@/components/Message.js";
import styles from "@/styles/Table.module.css";
import userService from "../../services/users.js";
import { getUserList } from "../../services/users.js";
import { getProductList } from "../../services/products.js";
import { useEffect, useState } from "react";

const cartHeaders = [
  "UserID",
  "User",
  "ProductID",
  "Product",
  "Quantity",
  "Delete",
];

export default function UsersProductsPage() {
  // initalize state variables
  const [cartItems, setCartItems] = useState([]);
  const [cartForm, setCartForm] = useState({});
  const [message, setMessage] = useState({ text: null, isError: false });
  const [userList, setUserList] = useState([]);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    // get all cartItems from database on first page load
    userService
      .getAllCarts()
      .then((response) => setCartItems(response))
      .catch((error) => console.log(error));
    // get list of users for the form
    getUserList()
      .then((response) => {
        setUserList(response);
      })
      .catch((e) => console.log(e));
    // get list of products for the form
    getProductList()
      .then((response) => {
        setProductList(response);
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

  const addCartItem = (event) => {
    event.preventDefault();
    const userID =
      userList.map((user) => user.name).indexOf(cartForm.userName) + 1;
    const productID =
      productList.map((product) => product.name).indexOf(cartForm.productName) +
      1;
    userService
      .addToCart(userID, productID, cartForm.quantity)
      .then((response) => {
        const newCartItem = {
          ...cartForm,
          userID: userID,
          productID: productID,
        };
        setCartItems([...cartItems, newCartItem]);
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
      .then((response) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
        displayMessage(response, false);
      })
      .catch((error) => {
        let errMsg;
        if (error.response) {
          errMsg = error.response.data;
          displayMessage(errMsg, true);
        }
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
                <td>{item.userName}</td>
                <td>{item.productID}</td>
                <td>{item.productName}</td>
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
          <select
            value={cartForm.userName}
            onChange={(e) =>
              setCartForm({ ...cartForm, userName: e.target.value })
            }
          >
            <option value="">Select user</option>
            {userList.map((user) => (
              <option key={user.userID} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          <select
            value={cartForm.productName}
            onChange={(e) =>
              setCartForm({ ...cartForm, productName: e.target.value })
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
