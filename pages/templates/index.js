import Link from "next/link"
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'

import Head from 'next/head';
import { API_URL } from "@/config/index";
export default function TemplatesPage({events}) {
  
  return (
    <Layout>
      <Head>
        <title>DesignDen</title>
        <meta name='description' content='Welcome to DesignDen'></meta>
      </Head>
      <h1>Designs</h1>
      {events.length === 0 && <h3>No Designs to show</h3>}

      {events.map((evt)=> (
        <EventItem key={evt.id} evt={evt}/>
      ))}
    </Layout>
  )
}

export async function getStaticProps(){
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return{
    props:{events},
    revalidate: 1,
  }
}