import Link from 'next/link'
import styles from '../styles/Header.module.css'
import Search from './Search'
export default function Header() {

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href='/'>
          <a>DesignDen</a>
        </Link>
      </div>
      <Search/>
      <nav>
        <ul>
          <li>
            <Link href='/templates'>
              <a>Templates</a>
            </Link>
          </li>
          <li>
            <Link href='/templates/add'>
              <a>Add Template</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}