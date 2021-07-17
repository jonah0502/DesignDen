import Link from "next/link";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";

export default function SignupPage() {
  return (
    <Layout title="Signup">
      <form className={styles.container}>
        <h1>Sign Up</h1>
        <input type="text" name="fname" id="fname" placeholder="First Name" />
        <input type="text" name="lname" id="lname" placeholder="Last Name" />
        <div className={styles.dateInput}>
          <label htmlFor="birthdate">Date of birth:</label>
          <input type="date" name="birthdate" id="birthdate" />
        </div>
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="Password"
        />
        <input
          type="text"
          name="password-confirm"
          id="password-confirm"
          placeholder="Confirm Password"
        />
        <button type="submit">Sign Up</button>
        <div className={styles.formFooter}>
          <p>Already have an account?</p>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </Layout>
  );
}
