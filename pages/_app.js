import '../styles/globals.css'
import {AuthProvider} from '@/context/AuthContext'
function MyApp({ Component, pageProps }) {
  return (
      //wrap the components with context provider who will use the context
      <AuthProvider>
    <Component {...pageProps} />
  </AuthProvider>
  )
}

export default MyApp
