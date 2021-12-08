import Layout from '@/components/Layout'
import TemplateItem from '@/components/TemplateItem'
import axios from 'axios';
import qs from 'qs';
import {useRouter} from 'next/router';
import Head from 'next/head';
import { API_URL } from "@/config/index";
import Link from "next/link"


export default function SearchPage({templates}) {
  const router = useRouter()
  return (
    <Layout title='Search Results'>
        <Link href='/templates'> Go Back</Link>
      <h1>Search Results for {router.query.term}</h1>
      {templates.length === 0 && <h3>No Designs to show</h3>}

      {templates.map((tmp)=> (
        <TemplateItem key={tmp.id} tmp={tmp}/>
      ))}
    </Layout>
  )
}

export async function getServerSideProps({query:{term}}){
    
    //TODO: allow search through users and descriptions
    const query = qs.stringify({
        filters: {
            $or:[
                {
                    name: {
                        $containsi: term,
                      },
                },
                {
                    description: {
                        $containsi: term,
                      },
                },
                {
                    author: {
                        username: {
                            $containsi: term,
                        },                        
                      },
                },

            ]

          },
        },
         {
            encodeValuesOnly: true,
          });
      
 
    const res = await axios.get(`${API_URL}/api/templates?populate=*&${query}`)
    const templates = res.data.data;
  

  return{
    props:{templates},
  }
}