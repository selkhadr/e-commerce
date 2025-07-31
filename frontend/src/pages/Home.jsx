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
import FeaturedCollection from '../Products/FeaturedCollection';
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useState } from 'react';
import { fetchProductsByFilters } from '../redux/slices/productsSlice';
import axios from 'axios';


function Home() {
  const dispatch = useDispatch();
  const {products,loading,error} = useSelector((state)=>state.products);
  const [bestSellerProduct,setBestSellerProduct]=useState(null);

  useEffect(()=>{
    //fetch products for a specific collection
    dispatch(fetchProductsByFilters({
      gender:"Women",
      category:"bottom wear",
      limit:8,
    })
  );
  //fetch best seller product
  const fetchBestSeller= async()=>{
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
      );
      setBestSellerProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  fetchBestSeller();
  },[dispatch]);

  return (
    <>
      <Hero/>
      <GenderCollectionSection/>
      <NewArrivals/>
      <h2 className="text-3xl text-center font-bold mb-4">
        Best Seller
      </h2>
      {bestSellerProduct?(<ProductDetails productId={bestSellerProduct._id}/>):(
        <p className="text-center">loading best seller products...</p>
      )}
      
      <Toaster />
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          top wears for women
        </h2>
        <ProductGrid products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection/>
    </>
  )
}

export default Home