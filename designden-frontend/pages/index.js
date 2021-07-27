import Link from "next/link";
import Layout from "@/components/Layout";
import Head from "next/head";

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>DesignDen</title>
        <meta name="description" content="Welcome to DesignDen"></meta>
      </Head>
      <h1>Home</h1>
      <Link href="/admin">Admin</Link>
      <br />
      <p>
        Note to graders: please use the link to the admin page to review our
        project.
        <br />
        <br />
        Other client-facing pages are intended to enhance the project as a
        portfolio project for when the course is over and can be ignored.
      </p>
    </Layout>
  );
}
