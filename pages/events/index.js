import Layout from '@/components/Layout'
import {API_URL, PER_PAGE} from '@/config/index'
import EventItem from '@/components/EventItem';
import Link from 'next/link';
import Pagination from '@/components/Pagination';

const EventsPage =({events, page, total}) => {


  return (
      <Layout>
        <h1>Events</h1>
        {events.length === 0 && <h3>No events to show</h3>}

        {events.map(evt => (
            <EventItem key={evt.id} evt={evt}/>
        ))}

       <Pagination page={page} total={total}/>
      </Layout>
  )
}

//If you export a function called getStaticProps (Static Site Generation) from a page,
// Next.js will pre-render this page at build time using the props returned by
// getStaticProps.
// export async function getStaticProps(){
//   const res = await fetch(`${API_URL}/api/events?[populate]=*&_sort=date:ASC`)
//   const events = await res.json()
//
//
//   return {
//     props: {
//       events: events.data.slice(0,3),
//       revalidate: true,
//     }
//   }
// }

//If you export a function called getServerSideProps (Server-Side Rendering) from a page,
// Next.js will pre-render this page on each request using the data returned by
// getServerSideProps.
export async function getServerSideProps({query: {page = 1}}){

  //calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  //fetch total events
  const totalRes = await fetch(`${API_URL}/api/events?pagination[withCount]=true`)
  const totalData = await totalRes.json();
  const total = totalData.meta.pagination.total;
  console.log({ total });

  console.log(total)
  // fetch events
  const eventRes = await fetch(`${API_URL}/api/events?[populate]=*&_sort=date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`)
  const events = await eventRes.json()


  return {
    props: {
      events: events.data.slice(0,3),
      page: +page,
      total
    }
  }
}



export default EventsPage
