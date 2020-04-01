import React from 'react'
import Banner from './BannerComponent/Banner'
import Offer from './OfferComponent/Offer'
import TopProducts from './TopProductsComponent/TopProducts'
import Services from './OurServicesComponent/Services'
import TopBrands from './TopBrandsComponent/TopBrands'
export default function HomePage() {
    return (
        <div>
            <Banner/>
            <Offer/>
            <TopProducts/>
            <Services/>
            <TopBrands/>
        </div>
    )
}
