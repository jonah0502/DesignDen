import Link from "next/link";
import styles from "@/styles/Sidebar.module.css";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <h4>Entities</h4>
      <ul>
        <li>
          <Link href="/admin/products">Products</Link>
        </li>
        <li>
          <Link href="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link href="/admin/users">Users</Link>
        </li>
        <li>
          <Link href="/admin/addresses">Addresses</Link>
        </li>
        <li>
          <Link href="/admin/reviews">Reviews</Link>
        </li>
        <li>
          <Link href="/admin/tags">Tags</Link>
        </li>
      </ul>
      <h4>Relationships</h4>
      <ul>
        <li>
          <Link href="/admin/products-orders">Products_Orders</Link>
        </li>
        <li>
          <Link href="/admin/products-tags">Products_Tags</Link>
        </li>
        <li>
          <Link href="/admin/users-products">Users_Products</Link>
        </li>
      </ul>
    </div>
  );
}
