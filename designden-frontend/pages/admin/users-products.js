import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import userService from "../../services/users.js";
import { useEffect, useState } from "react";

const cartHeaders = ["UserID", "ProductID", "Quantity", "Delete"];

export default function UsersProductsPage() {
  const [cartItems, setCartItems] = useState([]);
  const [cartForm, setCartForm] = useState({});

  useEffect(() => {
    userService
      .getAllCarts()
      .then((response) => setCartItems(response))
      .catch((error) => console.log(error));
  }, []);

  const addCartItem = (event) => {
    event.preventDefault();
    userService
      .addToCart(cartForm.userID, cartForm.productID, cartForm.quantity)
      .then(() => {
        setCartItems([...cartItems, cartForm]);
        setCartForm({});
      })
      .catch((error) => console.log(error));
  };

  const deleteCartItem = (index) => (event) => {
    event.preventDefault();
    userService
      .removeFromCart(cartItems[index].userID, cartItems[index].productID)
      .then(() => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Layout>
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
            placeholder="UserID"
            value={cartForm.userID || ""}
            onChange={(e) =>
              setCartForm({ ...cartForm, userID: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="ProductID"
            value={cartForm.productID || ""}
            onChange={(e) =>
              setCartForm({ ...cartForm, productID: e.target.value })
            }
          />
          <input
            type="number"
            min="0"
            placeholder="Quantity"
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
