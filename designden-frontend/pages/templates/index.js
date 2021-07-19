import Layout from "@/components/Layout";
import Link from "next/link";
import TemplateItem from '@/components/TemplateItem'
import {API_URL} from '@/config/index'
import data from '../api/templates/data.json'

export default function TemplatesPage({temps}) {
  // TODO: route "/templates/add" should be something like "/users/[id]/templates/add"
  return (
    <Layout>
       <h1>Templates</h1>
       <Link href="/templates/add">Post a new template</Link>
       <div>
         <input type="text" placeholder="Search" />
       </div>
        <h3>No templates to show</h3>

    </Layout>
    // <Layout>
    //   <h1>Templates</h1>
    //   <Link href="/templates/add">Post a new template</Link>
    //   <div>
    //     <input type="text" placeholder="Search" />
    //   </div>
    //   {temps.length === 0 && <h3>No templates to show</h3>}

    //   {temps.map(tmp=>(
    //     <TemplateItem key={tmp.id} tmp={tmp} />
    //   ))}
    // </Layout>
  );
}

export async function getInitialProps(){
  const res = await fetch(`${API_URL}/api/templates`)
  const temps = await res.json()
  
  if (!temps) {
    return {
      notFound: true,
    }
  }
  return{
    props: {temps},
    revalidate: 1,
  }
}