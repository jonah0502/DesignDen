import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";

export default function SignupPage() {
  return (
    <Layout title="Signup">
      <form className={styles.container}>
        <h1>Sign Up</h1>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <div className={styles.dateInput}>
          <label htmlFor="birthdate">Date of birth:</label>
          <input type="date" />
        </div>
        <input type="email" placeholder="Email" />
        <input type="text" placeholder="Password" />
        <input type="text" placeholder="Confirm Password" />
        <button>Sign Up</button>
        <div className={styles.formFooter}>
          <p>Already have an account?</p>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </Layout>
  );
}
