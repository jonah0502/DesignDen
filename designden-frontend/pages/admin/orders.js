import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";

const orderHeaders = [
  "OrderID",
  "UserID",
  "AddressID",
  "OrderDate",
  "FirstName",
  "LastName",
  "Email",
];

const orders = [
  {
    id: 1,
    userID: 1,
    addressID: 1,
    date: new Date(2021, 6, 15).toLocaleDateString(),
    firstName: "Alice",
    lastName: "Baker",
    email: "abaker@example.com",
  },
  {
    id: 2,
    userID: 1,
    addressID: 1,
    date: new Date(2021, 6, 15).toLocaleDateString(),
    firstName: "Alice",
    lastName: "Baker",
    email: "abaker@example.com",
  },
  {
    id: 3,
    userID: 2,
    addressID: 2,
    date: new Date(2021, 6, 17).toLocaleDateString(),
    firstName: "Bob",
    lastName: "Smith",
    email: "bsmith@example.com",
  },
  {
    id: 4,
    userID: 5,
    addressID: 3,
    date: new Date(2021, 6, 17).toLocaleDateString(),
    firstName: "Eve",
    lastName: "Walker",
    email: "ewalker@example.com",
  },
  {
    id: 5,
    userId: 4,
    addressID: 4,
    date: new Date(2021, 6, 18).toLocaleDateString(),
    firstName: "David",
    lastName: "Kim",
    email: "dkim@example.com",
  },
];

export default function OrdersPage() {
  return (
    <Layout>
      <h1>View Orders</h1>
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
                <tr key={order.id}>
                  {Object.values(order).map((item) => {
                    return <td key={item}>{item}</td>;
                  })}
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
          <input type="text" placeholder="UserID" />
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
