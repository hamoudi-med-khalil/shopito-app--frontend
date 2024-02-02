import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsive } from './Data'

const ProductCarosel = ({products}) => {
    return (
        <div>
            <Carousel 
                showDots={false}
                responsive={responsive}
                infinite={true}
                autoplay={true}
                autoPlaySpeed={1}
                keyBoardControl={true}
                customTransition="all .500ms ease"
                transitionDuration={1}
                >
                {products}
            </Carousel>
        </div>
    )
}

export default ProductCarosel
