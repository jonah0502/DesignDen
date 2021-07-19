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
        <li>
          <Link href="/templates/[id]">Delete Product</Link>
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
          <Link href="/users">View Users</Link>
        </li>
        <li>
          <Link href="/signup">Add User</Link>
        </li>
        <li>
          <Link href="/users/edit">Update User</Link>
        </li>
        <li>
          <Link href="/users/delete">Delete User</Link>
        </li>
      </ul>
      <h3>Reviews</h3>
      <ul>
        <li>
          <Link href="/reviews">View Reviews</Link>
        </li>
        <li>
          <Link href="/reviews/add">Add Review</Link>
        </li>
        <li>
          <Link href="/reviews/edit">Update Review</Link>
        </li>
        <li>
          <Link href="/reviews/delete">Delete Review</Link>
        </li>
      </ul>
      <h3>Tags</h3>
      <ul>
        <li>
          <Link href="/tags">View Tags</Link>
        </li>
        <li>
          <Link href="/tags/add">Add Tag</Link>
        </li>
        <li>
          <Link href="/tags/delete">Delete Tag</Link>
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
          <Link href="/product-tags">View Product_Tags</Link>
        </li>
        <li>
          <Link href="/product-tags/add">Add Product_Tag</Link>
        </li>
        <li>
          <Link href="/product-tags/delete">Delete Product_Tag</Link>
        </li>
      </ul>
    </Layout>
  );
}
