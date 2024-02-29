import React, { useState } from 'react'
import styles from '../header/Header.module.scss'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { FaShoppingCart, FaTimes, FaUserCircle } from 'react-icons/fa' 
import { HiOutlineMenuAlt3 } from 'react-icons/hi' 
import { logout, reset } from '../../redux/features/auth/authSlice'
import { useDispatch } from 'react-redux'
import { ShowOnLogout } from '../headingLink/HiddenLink'
import ShowOnLogin from '../headingLink/HiddenLink'
import { UserName } from '../../pages/profile/Profile'


export const logo = (
    <div className={styles.logo}>
        <Link to='/'>
            <h2>
                 Shop<span>ito</span>
            </h2>
        </Link>
    </div>
)

const activeLink = ({ isActive }) => ( isActive ? `${styles.active}` : '')


function Header() {

    const[showMenu, setShowMenu]= useState(false);

    const [scrollPage,setScrollPage] = useState(false);

    const fixNavbar = () => {
           if (window.scrollY > 50){
            setScrollPage (true)
           }else {
            setScrollPage (true)
           }
    }
    window.addEventListener('scroll', fixNavbar)

    const toggleMenu  = () => {
        setShowMenu(!showMenu)
    }
    const hideMenu  = () => {
        setShowMenu(false)
    }
    const dispatch = useDispatch()

    
    const navigate = useNavigate()

    
    const logoutUser = async () => {
          dispatch(logout())
          dispatch(reset())
          navigate('/login')
    }


    const cart = (
        <span className={styles.cart}>
            <Link to='/cart'>
              Cart
              <FaShoppingCart size={20} />
              <p>0</p>
            </Link>
        </span>
    )
    
  return (
    <header className={scrollPage ? `${styles.fixed}` : null}>
        
        <div className={styles.header} >  
           {logo}

           <nav className={ showMenu ? `${styles['show-nav']}` : `${styles['hide-nav']}`} >

             <div className={ showMenu ? `${styles['nav-wrapper']} ${styles['show-nav-wrapper']}`: `${styles['nav-wrapper']}`} onClick={hideMenu}> </div>               
              <ul>
                    <li className={styles['logo-mobile']}>
                        {logo}
                        <FaTimes size={22} color='#fff' onClick={hideMenu}/>
                    </li>

                    <li>
                        <NavLink to='/' className={activeLink} >
                            Shop
                        </NavLink>
                    </li>
                </ul>

                <div className={styles['header-right']}>              
                    <span className={styles.links}>
                            <ShowOnLogout>
                                <NavLink to='/login' className={activeLink} >
                                        Login
                                </NavLink>
                            </ShowOnLogout>
                            <ShowOnLogout>
                                <NavLink to='/register' className={activeLink}>
                                    Register
                                </NavLink>
                            </ShowOnLogout>

                            <ShowOnLogin>
                                <NavLink to='/login' className={activeLink}>
                                    <FaUserCircle size={18} color='#ff7722'/>
                                    <UserName />
                                </NavLink>
                            </ShowOnLogin>




                        <ShowOnLogin>
                                <NavLink to='/history-order' className={activeLink}>
                                    My Order
                                </NavLink>
                            </ShowOnLogin>

                            <ShowOnLogin>
                                <Link to='/' onClick={logoutUser}>
                                    Logout
                                </Link>
                            </ShowOnLogin>
                            
                            <ShowOnLogin>
                                <Link to='/profile' >
                                    Profile
                                </Link>
                            </ShowOnLogin>
                    </span>
                    {cart}
                </div>
             </nav>
        <div className={styles['menu-icon']}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu}  />
        </div>

        </div>

    </header>
  )
}

export default Header

