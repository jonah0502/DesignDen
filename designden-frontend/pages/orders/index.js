import Layout from "@/components/Layout";
import styles from "@/styles/Table.module.css";

const orderHeaders = [
  "OrderID",
  "UserID",
  "OrderDate",
  "BillingStreet",
  "BillingCity",
  "BillingZip",
  "BillingState",
  "BillingCountry",
];

const orders = [
  {
    id: 0,
    userId: 1,
    date: new Date(2021, 6, 15).toLocaleDateString(),
    street: "1903 Rainbow Road",
    city: "Los Angeles",
    zip: "90017",
    state: "CA",
    country: "US",
  },
  {
    id: 1,
    userId: 1,
    date: new Date(2021, 6, 15).toLocaleDateString(),
    street: "1903 Rainbow Road",
    city: "Los Angeles",
    zip: "90017",
    state: "CA",
    country: "US",
  },
  {
    id: 2,
    userId: 2,
    date: new Date(2021, 6, 17).toLocaleDateString(),
    street: "869 Center St",
    city: "Portland",
    zip: "97875",
    state: "OR",
    country: "US",
  },
  {
    id: 3,
    userId: 5,
    date: new Date(2021, 6, 17).toLocaleDateString(),
    street: "2053 Leisure Lane",
    city: "San Luis Obispo",
    zip: "93401",
    state: "CA",
    country: "US",
  },
  {
    id: 4,
    userId: 3,
    date: new Date(2021, 6, 18).toLocaleDateString(),
    street: "3382 Gateway Road",
    city: "Portland",
    zip: "97225",
    state: "OR",
    country: "US",
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
    </Layout>
  );
}
