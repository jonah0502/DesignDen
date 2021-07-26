import Layout from "@/components/Layout";
import Link from "next/link";

export default function IndexPage() {
  return (
    <Layout>
      <h1>Admin Page</h1>
      <p>
        Welcome to the admin page! <br /> <br />
        Click the links on the sidebar to view each table.
      </p>
    </Layout>
  );
}
