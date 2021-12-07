import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/TemplateItem.module.css'
export default function TemplateItem({tmp}) {
    return (
        <div className={styles.template}>
            <div className={styles.img}>
                <Image src={tmp.image? tmp.image : '/images/event-default.png'}
                 width={170}
                 height= {100}
                 />
            </div>
            <div className={styles.info}>
                <span>
                {new Date(tmp.date).toLocaleDateString('en-US')} Last Updated {new Date(tmp.updated).toLocaleDateString('en-US')}
                </span>
                <h3>{tmp.name}</h3>
            </div>

            <div className={styles.link}>
                <Link href={`/templates/${tmp.slug}`}>
                    <a className='btn'>Details</a>
                </Link>
            </div>
        </div>
    )
}
