import Link from "next/link"
import Layout from '@/components/Layout'
import TemplateItem from '@/components/TemplateItem'
import axios from 'axios';

import Head from 'next/head';
import { API_URL } from "@/config/index";
export default function TemplatesPage({templates}) {
  
  return (
    <Layout>
      <Head>
        <title>DesignDen</title>
        <meta name='description' content='Welcome to DesignDen'></meta>
      </Head>
      <h1>Designs</h1>
      {templates.length === 0 && <h3>No Designs to show</h3>}

      {templates.map((tmp)=> (
        <TemplateItem key={tmp.id} tmp={tmp}/>
      ))}
    </Layout>
  )
}

export async function getStaticProps(){
  const res = await axios.get(`${API_URL}/api/templates?populate=*&sort=createdAt:ASC`)
  const templates = res.data.data;
  

  return{
    props:{templates},
    revalidate: 1,
  }
}