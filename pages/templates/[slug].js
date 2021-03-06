import Layout from '@/components/Layout'
import Link from 'next/link'
import Image from 'next/image'
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import styles from '@/styles/Template.module.css'
import { API_URL } from "@/config/index";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router';

export default function TemplatesPage({tmp}) {
  const router = useRouter()

  console.log(tmp)
  const deleteTemplate = async (e) => {
    if(confirm('Are you sure?')){
      const res = await fetch(`${API_URL}/api/templates/${tmp.id}`, {
        method: 'DELETE',
      })
      const data = await res.json()

      if(!res.ok){
        toast.error(data.message)
      } else{
        router.push('/templates')
      }
    }
  }
  return (
    <Layout>
        <div className = {styles.template}>
          <div className={styles.controls}>
            <Link href={`/templates/edit/${tmp.id}`}>
              <a>
                <FaPencilAlt /> Edit Page
              </a>
            </Link>
            <a href="#" className={styles.delete} onClick={deleteTemplate}>
              <FaTimes/> Delete template
            </a>

          </div>
          <span>
          Created: {new Date(tmp.attributes.createdAt).toLocaleDateString('en-US')} Last Updated: {new Date(tmp.attributes.updatedAt).toLocaleDateString('en-US')}
          </span>
          <h1>{tmp.attributes.name}</h1>
          <ToastContainer/>
            <div className={styles.image}>
              < Image src={tmp.attributes.image.data ? tmp.attributes.image.data.attributes.formats.medium.url : '/images/event-default.png'}
              width={960} height={600} />
            </div>
          <h3>Author:</h3>
          <p>{tmp.attributes.author.data ? tmp.attributes.author.data.attributes.username: null}</p>
          <h3>Description:</h3>
          <p>{tmp.attributes.description}</p>
          <h3>Price:</h3>
          <p>${tmp.attributes.price}</p>

          <Link href='/templates'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>
        </div>
    </Layout>
  )
}
/*
//at run time
export async function getServerSideProps({query: {slug}}){
  const res = await fetch(`${API_URL}/api/templates/${slug}`)
  const templates = await res.json()
    console.log(slug)
  return{
    props:{
        tmp: templates[0],
    },
  }
}*/

// at build time


export async function getStaticPaths(){
  const res = await axios.get(`${API_URL}/api/templates?populate=*`)
  const templates = res.data.data;

    const paths = templates.map(tmp => ({
        params: {slug: tmp.attributes.slug}
    }))
    
    return{
        paths,
        fallback: true,
    }
}

export async function getStaticProps({params: {slug}}){
    const res = await axios.get(`${API_URL}/api/templates?populate=*&filters[slug][$eq]=${slug}`)
    const templates = res.data.data;
  
    

    return{
      props:{
          tmp: templates[0],
      },
      revalidate: 1
    }
  }