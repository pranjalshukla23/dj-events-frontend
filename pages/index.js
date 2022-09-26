import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import EventItem from '@/components/EventItem';
import Link from 'next/link';

const HomePage =({events}) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map(evt => (
          <EventItem key={evt.id} evt={evt}/>
      ))}
      {events.length > 0 && (
          <Link href='/events'>
            <a className='btn-secondary'>
              View All Events
            </a>
          </Link>
        )}
    </Layout>
  )
}

//If you export a function called getStaticProps (Static Site Generation) from a page,
// Next.js will pre-render this page at build time using the props returned by
// getStaticProps.
export async function getStaticProps(){
  const res = await fetch(`${API_URL}/api/events?[populate]=*&_sort=date:ASC&_limit=3`)
  const events = await res.json()
  //console.log("events", events)


  return {
    props: {
      events: events.data,
    },
    revalidate: 1
  }
}

//If you export a function called getServerSideProps (Server-Side Rendering) from a page,
// Next.js will pre-render this page on each request using the data returned by
// getServerSideProps.
// export async function getServerSideProps(){
//   const res = await fetch(`${API_URL}/api/events`)
//   const events = await res.json()
//
//
//   return {
//     props: {
//       events
//     }
//   }
// }



export default HomePage
