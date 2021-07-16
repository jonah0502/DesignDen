import Link from 'next/link'
import Layout from '../components/Layout'


export default function AboutPage() {
    return (
        <Layout title="About DesignDen">
            <h1>About</h1>
            <p>This is an app to sell and buy website designs.</p>
            <Link href='/'>Home</Link>
        </Layout>
    )
}
