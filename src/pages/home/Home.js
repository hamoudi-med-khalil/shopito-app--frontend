import React from 'react'
import Slider from '../../components/slider/Slider'
import './Home.scss'
import HomeInfoBox from '../home/HomeInfoBox'
import PageHeading from '../../components/PageHeading'
import ProductCarosel from '../../components/carousel/Carousel'
import { productData } from '../../components/carousel/Data'
import CarouselItem from '../../components/carousel/CarouselItem'
import ProductCategory from './ProductCategory'
import FooterLinks from '../../components/footer/FooterLinks'




function Home() {
    const productss = productData.map((item) => {
        return(
            <div key={item.id}>
                <CarouselItem
                name={item.name}
                url={item.imageurl}
                price={item.price}
                description={item.description}
                />
            </div>
        )
    })

    return (
        <>
            <Slider />

            <section>
                <div className='container' >
                    <HomeInfoBox />
                    <PageHeading heading={'Latest Products'} btnText={'Shop Now >>>'} />
                    <ProductCarosel products={productss}/>
                </div>

            </section>

            <section className='--bg-grey'>
                <div className='container '>
                    <PageHeading heading={'Categories'} />
                    <ProductCategory />
                </div>
            </section>
            
            <section>
                <div className='container' >
                    <HomeInfoBox />
                    <PageHeading heading={'Mobile Phones'} btnText={'Shop Now >>>'} />
                    <ProductCarosel products={productss}/>
                </div>

            </section>
            <FooterLinks />
        </>
    )
}

export default Home