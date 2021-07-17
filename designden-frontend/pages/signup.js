import Link from "next/link";
import Layout from "@/components/Layout";

export default function SignupPage() {
  return (
    <Layout>
      <form>
        <h1>Sign Up</h1>
        <input type="text" name="fname" id="fname" placeholder="First Name" />
        <input type="text" name="lname" id="lname" placeholder="Last Name" />
        <input type="email" name="email" id="email" placeholder="Email" />
        <input
          type="text"
          name="password"
          id="password"
          placeholder="password"
        />
        <button>Sign Up</button>
        <div>
          <p>Already have an account?</p>
          <Link href="/login">Login</Link>
        </div>
      </form>
    </Layout>
  );
}
