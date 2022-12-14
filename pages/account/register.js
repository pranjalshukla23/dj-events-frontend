import {FaUser} from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState, useEffect, useContext} from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout'
import styles from '@/styles/AuthForm.module.css'
import AuthContext from '@/context/AuthContext'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [username, setUserName] = useState('')

  //get the state defined in context
  const {register, error} = useContext(AuthContext)

  useEffect(() => {
    if(error){
      toast.error("Something went wrong")
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if(password !== passwordConfirm){
      toast.error("Passwords do not match")
    }
    register({username,email,password})

  }
  return (
      <Layout title="User Registration">
        <div className={styles.auth}>
          <h1>
            <FaUser />Register
          </h1>
          <ToastContainer />
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">UserName</label>
              <input type="text" id="username" value={username} onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input type="password" id="passwordConfirm" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)}/>
            </div>
            <input type="submit" value="register" className="btn" />
          </form>
          <p>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Already have an account ? <Link href='/account/login'>Login</Link>
          </p>
        </div>
      </Layout>
  )
}

export default RegisterPage
