import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import { useRouter } from 'next/router'
import styles from '@/styles/Template.module.css'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import Image from 'next/image'

export default function TemplatePage({ tmp }) {
    const router = useRouter()
  const deleteEvent = (e)=>{
      console.log('delete')
  }
    return (
      <Layout>
        <div className={styles.event}>
            <div className = {styles.controls}>
                <Link href={`/templates/edit/${tmp.id}`}>
                <a>
                    <FaPencilAlt/> Add / Edit Review
                </a>
                </Link>
                <a href="#" className={styles.delete} onClick={deleteEvent}>
                    <FaTimes/> Delete Review
                </a>
            </div>
            <span>
          {new Date(tmp.date).toLocaleDateString('en-US')} Last Updated {new Date(tmp.updated).toLocaleDateString('en-US')}
        </span>
        <h1>{tmp.name}</h1>
        {tmp.image && (
          <div className={styles.image}>
            <Image
              src={tmp.image}
              width={960}
              height={600}
              priority={true}
              loading="eager"
            />
          </div>
        )}

        <h3>Author:</h3>
        <p>{tmp.author}</p>
        <h3>Description:</h3>
        <p>{tmp.description}</p>
        <h3>Price:</h3>
        <p>${tmp.price}</p>

        <Link href='/templates'>
          <a className={styles.back}>{'<'} Go Back</a>
        </Link>

        </div>
      </Layout>
    )
  }

//  export async function getStaticPaths() {
//    const res = await fetch(`${API_URL}/api/templates`)
//    const templates = await res.json()

//    const paths = templates.map((tmp) => ({
//      params: { slug: tmp.slug },
//    }))

//    return {
//      paths,
//      fallback: true,
//    }
//  }

//  export async function getStaticProps({ params: { slug } }) {
//    const res = await fetch(`${API_URL}/api/templates/${slug}`)
//    const templates = await res.json()

//    return {
//      props: {
//        tmp: templates[0],
//      },
//      revalidate: 1,
//    }
//  }

export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/api/templates/${slug}`)
    const templates = await res.json()
  
    return {
      props: {
        tmp: templates[0],
      },
    }
  }