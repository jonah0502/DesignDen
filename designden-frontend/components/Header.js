import Link from "next/link";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>DesignDen</a>
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link href="/admin">
              <a>Admin</a>
            </Link>
          </li>
          <li>
            <Link href="/templates">
              <a>Templates</a>
            </Link>
          </li>
          <li>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </li>
          <li>
            <Link href="/checkout">
              <a>Cart</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
