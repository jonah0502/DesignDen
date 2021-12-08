import Link from 'next/link'
import Image from 'next/image'
import styles from '@/styles/TemplateItem.module.css'
export default function TemplateItem({tmp}) {
    console.log(tmp)
    console.log(`-----------------------------end ${tmp.id} ---------------------------`);
    return (
        <div className={styles.template}>
            <div className={styles.img}>
                <Image src={tmp.attributes.image.data.attributes.formats.thumbnail.url ? tmp.attributes.image.data.attributes.formats.thumbnail.url : '/images/event-default.png'}
                 width={170}
                 height= {100}
                 />
            </div>
            <div className={styles.info}>
                <span>
                    Created: {new Date(tmp.attributes.createdAt).toLocaleDateString('en-US')} Last Updated: {new Date(tmp.attributes.updatedAt).toLocaleDateString('en-US')}
                </span>
                <h3>{tmp.attributes.name}</h3>
            </div>

            <div className={styles.link}>
                <Link href={`/templates/${tmp.attributes.slug}`}>
                    <a className='btn'>Details</a>
                </Link>
            </div>
        </div>
    )
}
