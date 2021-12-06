import Layout from '@/components/Layout'
import styles from '@/styles/Event.module.css'
import { API_URL } from "@/config/index";
export default function TemplatesPage({evt}) {
  
  return (
    <Layout>
        <h1>{evt.name}</h1>
    </Layout>
  )
}
/*
//at run time
export async function getServerSideProps({query: {slug}}){
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()
    console.log(slug)
  return{
    props:{
        evt: events[0],
    },
  }
}*/

// at build time


export async function getStaticPaths(){
    const res = await fetch(`${API_URL}/api/events`)
    const events = await res.json()
    const paths = events.map(evt => ({
        params: {slug: evt.slug}
    }))
    return{
        paths,
        fallback: true,
    }
}

export async function getStaticProps({params: {slug}}){
    const res = await fetch(`${API_URL}/api/events/${slug}`)
    const events = await res.json()
      
    return{
      props:{
          evt: events[0],
      },
      revalidate: 1
    }
  }