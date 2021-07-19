import Layout from "@/components/Layout";
import Link from "next/link";

export default function IndexPage() {
  return (
    <Layout>
      <h1>Index Page</h1>
      <br />
      <h2>Entities</h2>
      <br />
      <h3>Products</h3>
      <ul>
        <li>
          <Link href="/templates">View Products</Link>
        </li>
        <li>
          <Link href="/templates/add">Add Product</Link>
        </li>
      </ul>
      <h3>Orders</h3>
      <ul>
        <li>
          <Link href="/orders">View Orders</Link>
        </li>
        <li>
          <Link href="/checkout">Add Order</Link>
        </li>
      </ul>
      <h3>Users</h3>
      <ul>
        <li>
          <Link href="/users">View, Edit, or Delete Users</Link>
        </li>
        <li>
          <Link href="/signup">Add User</Link>
        </li>
      </ul>
      <h3>Reviews</h3>
      <ul>
        <li>
          <Link href="/reviews">View, Add, Edit, or Delete Reviews</Link>
        </li>
      </ul>
      <h3>Tags</h3>
      <ul>
        <li>
          <Link href="/tags">View, Add, Edit, or Delete Tags</Link>
        </li>
      </ul>
      <br />
      <h2>Relationship Tables</h2>
      <br />
      <h3>Product_Orders</h3>
      <ul>
        <li>
          <Link href="/product-orders">View Product_Orders</Link>
        </li>
      </ul>
      <h3>Product_Tag</h3>
      <ul>
        <li>
          <Link href="/product-tags">
            View, Add, Edit, or Delete Product_Tags
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
