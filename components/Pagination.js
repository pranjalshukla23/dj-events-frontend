import Link from 'next/link';
import {API_URL, PER_PAGE} from '@/config/index'


const Pagination = ({page,total}) => {


  //get the last page
  const lastPage = Math.ceil(total / PER_PAGE)

  return (
      <>
        {page > 1 && (
            //go to previous page
            <Link href={`/events?page=${page - 1}`}>
              <a className='btn-secondary'>
                Prev
              </a>
            </Link>
        )}

        {page < lastPage && (
            //go to next page
            <Link href={`/events?page=${page + 1}`}>
              <a className='btn-secondary'>
                Next
              </a>
            </Link>
        )}
      </>
  )

}

export default Pagination
