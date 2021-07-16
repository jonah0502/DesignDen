import Link from "next/link"
import Layout from '../components/Layout'
import Head from 'next/head';

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>DesignDen</title>
        <meta name='description' content='Welcome to DesignDen'></meta>
      </Head>
      <h1>Home</h1>
      <Link href='/about'>About</Link>
    </Layout>
  )
}
