import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import slugify from 'slugify'
import styles from '@/styles/Form.module.css'
export default function AddTemplatePage() {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        slug: ''
    })

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

      const res = await fetch(`${API_URL}/api/templates`, {
        method: 'POST',
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
    return (
        <Layout title = 'Add New Template'>
            <Link href='/templates'>Go Back</Link>
            <h1>Add Template</h1>
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

        <input type='submit' value='Add Template' className='btn' />
      </form>
        </Layout>
    )
}
