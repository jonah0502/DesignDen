import { useState } from 'react'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'

export default function ImageUpload({ tmpId, imageUploaded}) {
    const [image, setImage] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('files', image)
        formData.append('ref', 'template')
        formData.append('refId', tmpId)
        formData.append('field', 'image')
        
        const res = await fetch(`${API_URL}/api/upload`, {
            method: 'POST',
            body: formData,
          })

          for (var value of formData.values()) {
            console.log(value);
         }
        console.log(res)

        if (res.ok) {
          imageUploaded()
        }
      }

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
      }

    return (
        <div className={styles.form}>
          <h1>Upload Template Image</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.file}>
              <input type='file' onChange={handleFileChange} />
            </div>
            <input type='submit' value='Upload' className='btn' />
          </form>
        </div>
      )
}
