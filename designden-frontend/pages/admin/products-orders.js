import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";

const headers = ["OrderID", "ProductID", "Quantity"];

const data = [
  {
    orderID: 1,
    productID: 2,
    quantity: 1,
  },
  {
    orderID: 1,
    productID: 3,
    quantity: 1,
  },
  {
    orderID: 2,
    productID: 1,
    quantity: 3,
  },
  {
    orderID: 3,
    productID: 2,
    quantity: 1,
  },
  {
    orderID: 3,
    productID: 4,
    quantity: 1,
  },
  {
    orderID: 3,
    productID: 5,
    quantity: 1,
  },
];

export default function ProductOrdersPage() {
  return (
    <Layout>
      <h1>Products_Orders</h1>
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
            {data.map((item) => (
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
          <input type="text" placeholder="OrderID" />
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
