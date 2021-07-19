import Layout from "@/components/Layout";

const headers = ["OrderID", "ProductID", "Quantity"];

const data = [
  {
    orderID: 0,
    productID: 1,
    quantity: 1,
  },
  {
    orderID: 0,
    productID: 2,
    quantity: 1,
  },
  {
    orderID: 1,
    productID: 0,
    quantity: 3,
  },
  {
    orderID: 2,
    productID: 1,
    quantity: 1,
  },
  {
    orderID: 2,
    productID: 3,
    quantity: 1,
  },
  {
    orderID: 2,
    productID: 4,
    quantity: 1,
  },
];

export default function ProductOrdersPage() {
  return (
    <Layout>
      <h1>Products_Orders</h1>
      <table>
        <thead>
          <tr>
            {headers.map((header) => {
              return <td key={header}>{header}</td>;
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
    </Layout>
  );
}
