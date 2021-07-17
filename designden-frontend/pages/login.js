import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";

export default function LoginPage() {
  return (
    <Layout title="DesignDen Login">
      <form className={styles.container}>
        <h1>Login</h1>
        <input type="email" id="email" name="email" placeholder="Email" />
        <input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <div className={styles.formFooter}>
          <p>Don&apos;t have an account? </p>
          <Link href="/signup">Sign Up</Link>
        </div>
      </form>
    </Layout>
  );
}
