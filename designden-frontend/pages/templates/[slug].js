import Layout from '@/components/Layout'

export default function EventPage() {

    return (
        <Layout>
            <h1>My Templates</h1>
        </Layout>
    )
}
export async function getServerSideProps({ query: { slug } }) {
    const res = await fetch(`${API_URL}/events?slug=${slug}`)
    const events = await res.json()
  
    return {
        props: {
          evt: events[0],
        },
      }
    }