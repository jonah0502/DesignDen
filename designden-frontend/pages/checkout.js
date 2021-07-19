import Layout from "@/components/Layout";
import Cart from "@/components/Cart";
import styles from "@/styles/Form.module.css";

export default function CheckoutPage() {
  return (
    <Layout>
      <h1>Checkout</h1>
      <Cart></Cart>
      <form className={styles.container}>
        <div>
          <h3>Contact Information</h3>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <h3>Billing Address</h3>
          <input type="text" placeholder="Street Address" />
          <input type="text" placeholder="City" />
          <input type="text" placeholder="Zip" />
          <input type="text" placeholder="State" />
          <input type="text" placeholder="Country" />
        </div>
        <button>Place Order</button>
      </form>
    </Layout>
  );
}
