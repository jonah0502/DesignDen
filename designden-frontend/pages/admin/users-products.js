import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";
import { useState } from "react";

const cartHeaders = ["UserID", "ProductID", "Quantity", "Update", "Delete"];

const cartData = [
  {
    userID: 1,
    productID: 1,
    quantity: 1,
  },
  {
    userID: 1,
    productID: 2,
    quantity: 10,
  },
  {
    userID: 1,
    productID: 4,
    quantity: 5,
  },
  {
    userID: 2,
    productID: 1,
    quantity: 1,
  },
];

export default function UsersProductsPage() {
  const [cartItems, setCartItems] = useState(cartData);

  const handleRowChange = (index) => (event) => {
    const { name, value } = event.target;
    const newCartItems = [...cartItems];
    newCartItems[index][name] = value;
    setCartItems(newCartItems);
  };

  const handleRowDelete = (index) => (event) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  return (
    <Layout>
      <h1>Users_Products</h1>
      <p>Represents the products currently in the users cart</p>
      <p>Supported operations: Create, Read, Update, Delete</p>
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
                <td>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    min="1"
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
      <h3>Add new item to cart</h3>
      <form className={styles.formContainer}>
        <div className={styles.inputContainer}>
          <input type="text" placeholder="UserID" />
          <input type="text" placeholder="ProductID" />
          <input type="number" min="0" placeholder="Quantity" />
        </div>
        <div>
          <button>Add</button>
        </div>
      </form>
    </Layout>
  );
}
