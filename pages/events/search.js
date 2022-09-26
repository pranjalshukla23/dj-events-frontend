import Layout from '@/components/Layout'
import {API_URL} from '@/config/index'
import EventItem from '@/components/EventItem';
import qs from 'qs'
import {useRouter} from 'next/router'
import Link from 'next/link'

const SearchPage =({events}) => {
  const router = useRouter()

  return (
      <Layout title="Search Results">
        <Link href='events'>Go Back</Link>
        <h1>Search Results for ${router.query.term}</h1>
        {events.length === 0 && <h3>No events to show</h3>}

        {events.map(evt => (
            <EventItem key={evt.id} evt={evt}/>
        ))}
      </Layout>
  )
}

//If you export a function called getServerSideProps (Server-Side Rendering) from a page,
// Next.js will pre-render this page on each request using the data returned by
// getServerSideProps.
export async function getServerSideProps({query: {term}}){

  //console.log("query", term)

  const query = qs.stringify({
    filters: {
      $or: [
        {
          name : {
            $contains: term,
          }
        },
        {
          performers : {
            $contains: term,
          }
        },
        {
          description : {
            $contains: term,
          }
        },
        {
          venue : {
            $contains: term,
          }
        }
      ]
    }
  })

  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`)
  const events = await res.json()

  //console.log("events", events)


  return {
    props: {
      events: events.data
    }
  }
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




export default SearchPage
