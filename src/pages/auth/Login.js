import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import loginImg from '../../assets/login.png'
import Card from '../../components/card/Card'
import { Link, useNavigate } from 'react-router-dom'
import { login ,reset } from '../../redux/features/auth/authSlice'
import { toast } from 'react-toastify'
import { validateEmail } from '../../utils'
import Loader from '../../components/loader/Loader'
import { useDispatch, useSelector } from 'react-redux'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { user, isError, isSuccess, isLoading, message, isLoggedIn} = useSelector(
        (state) => state.auth)
    
      const dispatch = useDispatch()
    
      const navigate = useNavigate()

      useEffect(() => {
        if(isError){
          toast.error(message)
      }
        if(isSuccess && isLoggedIn){
          navigate('/')
        }
        dispatch(reset())
      
      },[isSuccess, isLoggedIn, isError,dispatch, navigate ])

    const loginUser = async (e) => {
        e.preventDefault()
        if(!email || !password){
          return toast.error('All Fields are Required')
        }

        if(!validateEmail(email)){
          return toast.error('Please enter a valid email')
        }
     
    
      const userData = {
        email,
        password
      }
      console.log(userData)

     await dispatch(login(userData))
    }

    if(isLoading){
        return <Loader />
      }

    return (
        <section className={`container ${styles.auth}`}>
            <div className={styles.img}>
                <img src={loginImg} alt='loginimage' width={400} />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>Login</h2>
                    <form onSubmit={loginUser}>
                        <input
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />

                        <button
                            type='submit'
                            className='--btn --btn-primary --btn-block'
                        > Login
                        </button>

                        <span className={styles.register}>
                            <p>Dont you have an account?</p>
                            <Link to='/register' className={styles.regiterLink} >Register</Link>
                        </span>
                    </form>
                </div>
            </Card>


        </section>
    )
}

export default Login