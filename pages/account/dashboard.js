import Layout from '@/components/Layout'
import {parseCookies} from '@/helpers/index'
import {API_URL} from '@/config/index';
import styles from '@/styles/Dashboard.module.css'
import DashboardEvent from '@/components/DashboardEvent';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router'

const DashboardPage = ({events, token}) => {

  const router = useRouter()
  const deleteEvent = async(id) => {
    if(confirm('Are you sure')){
      const res = await fetch(`${API_URL}/api/events/${id}`,{
        method: 'DELETE',
        headers:{
          Authorization: `Bearer ${token}`
        }
      })

      const data = await res.json()

      if(!res.ok){
        toast.error(data.message)
      }else{
        router.push('/events')
      }
    }
  }

  return (
      <Layout title="User Dashboard">
        <div className={styles.dash}>
          <h1>Dashboard</h1>
          <h3>My Events</h3>
        </div>
        {events.attributes.data.map((evt) => (
           <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent}/>
        ))}
      </Layout>
  )
}

//If you export a function called getServerSideProps (Server-Side Rendering) from a page,
// Next.js will pre-render this page on each request using the data returned by
// getServerSideProps.
export async function getServerSideProps({req}){
  const {token} = parseCookies(req)
  const res = await fetch(`${API_URL}/api/events/me`,{
    method: 'GET',
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  const events = await res.json()
  return {
    props: {
      events: events.data,
      token
    }
  }
}

export default DashboardPage
