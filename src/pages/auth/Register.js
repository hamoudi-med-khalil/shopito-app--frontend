import React, { useEffect, useState } from 'react'
import styles from './auth.module.scss'
import Card from '../../components/card/Card'
import registerImg from '../../assets/register.png'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { validateEmail } from '../../utils';
import {useDispatch, useSelector} from 'react-redux'
import { register, reset } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';



const initialState = {
  name : '',
  email : '',
  password : '',
  cPassword : '',
 };

const Register = () => {
  

  const [formData, setFormData] = useState(initialState)

  const {name, email, password, cPassword} = formData

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
  

  const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({...formData, [name] : value})
  }

  const registerUser = async (e) => {

    e.preventDefault()
    if(!email || !password){
      return toast.error('All Fields are Required')
    }
    if(password.length < 6 ){
      return toast.error('Password must be more than 6 characters')
    }
    if(!validateEmail(email)){
      return toast.error('Please enter a valid email')
    }
    if(password !== cPassword){
      return toast.error('Password do not match')
  }

  const userData = {
    name,
    email,
    password
  }
 await dispatch(register(userData))
  
}

if(isLoading){
  return <Loader />
}







  return (
    <>

    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}> 
        <h2>Register</h2>

        <form onSubmit={registerUser}>

          <input
          type='text'
          placeholder='Name'
          name='name'
          value={name}
          onChange={handleInputChange}
          
          >
          </input>

          <input
          type='email'
          placeholder='Email'
          name='email'
          value={email}
          onChange={handleInputChange}
          >
          </input>

          <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleInputChange}
          autoComplete="password"
          >
          </input>

          <input
          type='password'
          placeholder='Confirm Password'
          name='cPassword'
          value={cPassword}
          onChange={handleInputChange}
          autoComplete="cPassword"
          >
          </input>

          <button
          type='submit'
           className='--btn --btn-primary --btn-block'
           > Register
          </button>

          <span className={styles.register}>
            <p>Already have an account</p>
            <Link to='/login' className={styles.regiterLink}> Login</Link>
          </span>


        </form>
        </div>

      </Card>
      <div className={styles.img} >
        <img src={registerImg} alt='registerImg' width={400} />
      </div>

    </section>
    </>
  )

  }
export default Register
