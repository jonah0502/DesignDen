import Layout from "@/components/Layout";
import Cart from "@/components/Cart";

export default function CheckoutPage() {
  return (
    <Layout>
      <h1>Checkout</h1>
      <Cart></Cart>
      <form>
        <div>
          <h3>Contact Information</h3>
          <input type="text" name="fname" id="fname" placeholder="First Name" />
          <input type="text" name="lname" id="lname" placeholder="Last Name" />
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div>
          <h3>Billing Address</h3>
          <input
            type="text"
            name="billing-street"
            id="billing-street"
            placeholder="Street Address"
          />
          <input
            type="text"
            name="billing-city"
            id="billing-city"
            placeholder="City"
          />
          <input
            type="text"
            name="billing-zip"
            id="billing-zip"
            placeholder="Zip"
          />
          <input
            type="text"
            name="billing-state"
            id="billing-state"
            placeholder="State"
          />
          <input
            type="text"
            name="billing-country"
            id="billing-country"
            placeholder="Country"
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </Layout>
  );
}
