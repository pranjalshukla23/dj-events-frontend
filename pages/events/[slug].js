import Layout from '@/components/Layout';
import {API_URL} from '@/config/index'
import styles from '@/styles/Event.module.css'
import Link from 'next/link'
import Image from 'next/image'
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useRouter} from 'next/router'

const EventPage = ({evt}) => {

  const router = useRouter()

  return (
      <Layout>
       <div className={styles.event}>
         <span>
           {new Date(evt.attributes.date).toLocaleDateString('en-US')} at {evt.attributes.time}
         </span>
         <h1>{evt.name}</h1>
         <ToastContainer />
         {evt.attributes.image && (
             <div className={styles.image}>
               <Image src={evt.attributes.image.data ? evt.attributes.image.data.attributes.formats.medium.url : '/images/event-default.png'} width={960} height={600} />
             </div>
         )}
         <h3>Performance:</h3>
         <p>{evt.attributes.performers}</p>
         <h3>Description</h3>
         <p>{evt.attributes.description}</p>
         <h3>Venue: {evt.attributes.venue}</h3>
         <p>{evt.attributes.address}</p>

         <Link href='/events'>
           <a className={styles.back}>
             {'<'} Go Back
           </a>
         </Link>
       </div>
      </Layout>
  )
}

//If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.
//When you export a function called getStaticPaths (Static Site Generation) from a page that
// uses dynamic routes, Next.js will statically pre-render all the paths specified
// by getStaticPaths.
// export async function getStaticPaths(){
//
//   const res = await fetch(`${API_URL}/api/events?[populate]=*`)
//   const events = await res.json()
//
//   const paths = events.data.map(evt => ({
//     params: {slug: evt.attributes.slug}
//   }))
//
//  // console.log(paths)
//   return {
//     paths,
//     fallback: true
//   }
// }

//If you export a function called getStaticProps (Static Site Generation) from a page,
// Next.js will pre-render this page at build time using the props returned by
// getStaticProps.
// export async function getStaticProps({params: {slug}}){
//
//   const res = await fetch(`${API_URL}/api/events?filters[slug][$eq]=${slug}&[populate]=*`)
//
//   const events = await res.json()
//
//   //console.log("event", events)
//
//   return {
//     props: {
//       evt: events.data[0]
//     },
//     revalidate: 1
//   }
// }


//If you export a function called getServerSideProps (Server-Side Rendering) from a page,
// Next.js will pre-render this page on each request using the data returned by
// getServerSideProps.
export async function getServerSideProps({query: {slug}}){

  const res = await fetch(`${API_URL}/api/events/?slug=${slug}&[populate]=*`)

  const events = await res.json()

  console.log(events)

  return {
    props: {
      evt: events[0].data
    }
  }
}


export default EventPage
