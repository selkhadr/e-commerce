import Hero from '../Layout/Hero'
import GenderCollectionSection from '../Products/GenderCollectionSection'
import NewArrivals from '../Products/NewArrivals'
import ProductDetails from '../Products/ProductDetails'
import { Toaster } from 'react-hot-toast';
import ProductGrid from '../Products/ProductGrid';
import bgImg0 from '../assets/bg0.jpg';
import bgImg1 from '../assets/bg1.jpg';
import bgImg2 from '../assets/bg2.jpg';
import bgImg3 from '../assets/bg3.jpg';



const placeholderProducts = [
      {
          _id:1,
          name:"product 1",
          price:100,
          images:[{url: bgImg1}],
      },
      {
          _id:2,
          name:"product 2",
          price:200,
          images:[{url: bgImg2}],
      },
      {
          _id:3,
          name:"product 3",
          price:300,
          images:[{url: bgImg3}],
      },
      {
          _id:4,
          name:"product 4",
          price:400,
          images:[{url: bgImg1}],
      },
          {
              _id:5,
              name:"product 5",
              price:500,
              images:[{url: bgImg1}],
          },
          {
              _id:2,
              name:"product 2",
              price:200,
              images:[{url: bgImg2}],
          },
          {
              _id:3,
              name:"product 3",
              price:300,
              images:[{url: bgImg3}],
          },
          {
              _id:4,
              name:"product 4",
              price:400,
              images:[{url: bgImg0}],
          },
]

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
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          top wears for women
        </h2>
        <ProductGrid products={placeholderProducts} />
      </div>
    </>
  )
}

export default Home