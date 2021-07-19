import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/TemplateItem.module.css'

export default function TemplateItem({ tmp }) {
  return (
    <div className={styles.template}>
      <div className={styles.img}>
        <Image
          src={
            tmp.image
              ? tmp.image
              : '/images/default_image.jpg'
          }
          width={170}
          height={100}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(tmp.date).toLocaleDateString('en-US')}
        </span>
        <h3>{tmp.name}</h3>
      </div>

      <div className={styles.link}>
          <span>$ {tmp.price}</span>
          <div></div>
        <Link href={`/templates/${tmp.slug}`}>
          <a className='btn'>Details</a>
        </Link>
      </div>
    </div>
  )
}