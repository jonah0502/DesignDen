import Link from "next/link"
import Layout from '@/components/Layout'
import TemplateItem from '@/components/TemplateItem'

import Head from 'next/head';
import { API_URL } from "@/config/index";
export default function HomePage({templates}) {
  
  return (
    <Layout>
      <Head>
        <title>DesignDen</title>
        <meta name='description' content='Welcome to DesignDen'></meta>
      </Head>
      <h1>Featured Designs</h1>
      {templates.length === 0 && <h3>No Designs to show</h3>}

      {templates.map((tmp)=> (
        <TemplateItem key={tmp.id} tmp={tmp}/>
      ))}

      {templates.length > 0 &&(
        <Link href = '/templates'>
          <a className='btn-secondary'>View All Templates</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps(){
  const res = await fetch(`${API_URL}/api/templates`)
  const templates = await res.json()

  return{
    props:{templates: templates.slice(0,3)},
    revalidate: 1,
  }
}