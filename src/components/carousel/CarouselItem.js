import React from 'react'
import './Carousel.scss'
import { Link } from 'react-router-dom'
import {shortenText} from '../../utils/index.js'
import { Products } from '../../pages/products/Products.js'

const CarouselItem = ({url, name, price, description}) => {
  return (
    <div className='carouselItem'>
                <Products />

         <Link to='/product-details'>
            <img className='product--image' src={url} alt={url} />

            <p className='price'> {`${price}`}</p>

            <h4> {shortenText(name, 18)}  </h4>

            <p className='--mb'> {shortenText(description, 26)} </p>
            
         </Link>
         <button className='--btn --btn-primary --btn-block'>Add To Cart</button>
    </div>
  )
}

export default CarouselItem
