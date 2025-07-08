import Hero from '../Layout/Hero'
import GenderCollectionSection from '../Products/GenderCollectionSection'
import NewArrivals from '../Products/NewArrivals'
import ProductDetails from '../Products/ProductDetails'
import { Toaster } from 'react-hot-toast';
function Home() {
  return (
    <>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
      <h2 className="text-3xl text-center font-bold mb-4">
        Best Seller
      </h2>
      <ProductDetails/>
      <Toaster />
    </>
  )
}

export default Home