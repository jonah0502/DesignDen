import Link from "next/link";
import Layout from "@/components/Layout";

export default function LoginPage() {
  return (
    <Layout title="Login">
      <h1>Login</h1>
      <form>
        <div>
          <label htmlFor="email">Email: </label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input type="text" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
        <Link href="/account">Create Account</Link>
      </form>
    </Layout>
  );
}
