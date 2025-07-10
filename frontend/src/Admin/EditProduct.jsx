import React, { useState } from 'react'

function EditProduct() {
  const [productData, setProductData]=useState({
    name:"",
    description:"",
    price:0,
    countInStock:0,
    sku:"",
    category:"",
    brand:"",
    sizes:[],
    colors:[],
    collections:"",
    material:"",
    gender:"",
    images:[
      {
        url:"https://picsum.photos.150?random=1",
      },
      {
        url:"https://picsum.photos.150?random=2",
      },
    ],
  });
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setProductData((prevData)=>({...prevData,[name]: value}));
  }
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form >
        {/* name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input type="text" name="name" value={productData.name} onChange={handleChange} 
          className="w-full border border-gray-300 rounded-md p-2" required/>
        </div>
        {/* description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">description</label>
          <textarea name="description" value={productData.description} onChange={handleChange} className="w-full border border-gray-300 rounded-md p-2"
          rows={4} required/>
        </div>
        {/* price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input type="number" name="price" value={productData.price} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        {/* count in stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">count in stock</label>
          <input type="number" name="contInStock" value={productData.countInStock} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        {/* sku */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">sku</label>
          <input type="text" name="sku" value={productData.sku} 
          onChange={handleChange} 
          className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        {/* sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">sizes (comma-separated)</label>
          <input type="text" name="sizes" value={productData.sizes.join(",")} 
          onChange={(e)=>setProductData({...productData,sizes:e.target.value.split(",").map((size)=>size.trim()),})} 
          className="w-full border border-gray-300 rounded-md p-2" />
        </div>
        {/* color */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">colors (comma-separated)</label>
          <input type="text" name="color" value={productData.colors.join(",")} 
          onChange={(e)=>setProductData({...productData,colors:e.target.value.split(",").map((color)=>color.trim()),})} 
          className="w-full border border-gray-300 rounded-md p-2" />
        </div>



        
      </form>
    </div>
  )
}

export default EditProduct