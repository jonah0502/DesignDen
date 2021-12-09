import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { API_URL } from '@/config/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import slugify from 'slugify'
import styles from '@/styles/Form.module.css'
import {FaImage} from 'react-icons/fa'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'




export default function EditTemplatePage({tmp}) {
    const [values, setValues] = useState({
        name: tmp.attributes.name,
        description: tmp.attributes.description,
        price: tmp.attributes.price,
        slug: tmp.attributes.slug
    })


    const [imagePreview, setImagePreview] = useState(tmp.attributes.image.data ? tmp.attributes.image.data.attributes.formats.thumbnail.url : null)

    const [showModal, setShowModal] = useState(false)

    const newVal = {
        "data": values
        }
      
       

    const router = useRouter()
    const handleSubmit = async (e)=>{
        e.preventDefault()

          // Validation
    const hasEmptyFields = Object.values(values).some(
        (element) => element === ''
      )

      if (hasEmptyFields) {
        toast.error('Please fill in all fields')
      }

      const res = await fetch(`${API_URL}/api/templates/${tmp.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVal),
      })
      console.log(JSON.stringify(newVal));
      if (!res.ok) {
        toast.error('Something Went Wrong')
      } else {
        const tmp = await res.json()
        router.push(`/templates/${tmp.data.attributes.slug}`)
      }
    }

    
    const handleInputChange = (e) => {
        const { name, value } = e.target
        if(name == 'name'){
            setValues({ ...values, [name]: value, "slug":slugify(value, {lower: true}) })
        }
        else{
        setValues({ ...values, [name]: value })}
      }

const imageUploaded = async (e)=>{
    const res = await axios.get(`${API_URL}/api/templates/${tmp.id}?populate=image`)
    const data = res.data.data;
    setImagePreview(data.attributes.image.data.attributes.formats.thumbnail.url)
    setShowModal(false)
}

    return (
        <Layout title = 'Add New Template'>
            <Link href='/templates'>Go Back</Link>
            <h1>Edit Template</h1>
            <ToastContainer />

            <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor='name'>Template Name</label>
            <input
              type='text'
              id='name'
              name='name'
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor='price'>Price</label>
            <input
              type='text'
              name='price'
              id='price'
              value={values.price}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor='description'>Template Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input type='submit' value='Update Template' className='btn' />
      </form>

      <h2>Template Image</h2>
      {imagePreview?(
          <Image src={imagePreview} height={100} width={170}></Image>
      ):( <div>
      <p> No Image Uploaded</p>
      </div>)}

      <div>
          <button onClick={() => setShowModal(true)} className="btn-secondary">
              <FaImage/> Set Image
          </button>
      </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
            <ImageUpload tmpId={tmp.id} imageUploaded={imageUploaded}/>
        </Modal>

        </Layout>
    )
}

export async function getServerSideProps({params: {id}}){
    const res = await axios.get(`${API_URL}/api/templates/${id}?populate=image`)
    const tmp = res.data.data;
    console.log(tmp)
    return{
        props:{
            tmp
        }
    }
}