import { useEffect, useState } from "react";
import {useParams, Link} from "react-router-dom"

function OrderDetails() {
    const {id}=useParams();
    const [orderDetails,setOrderDetails]=useState(null);
    useEffect(()=>{
        const mockOrderDetails={
            _id:id,
            createAt:new Date(),
            isPaid:true,
            isDelivered:false,
            paymentMethod:"paypal",
            shippingMethod:"standard",
            shippingAddress:{city:"new yourk",contry:"usa"},
            orderItem:[
                {
                    productid:"1",
                    name:"jacket",
                    price:12,
                    quantity:1,
                    image: "https://picsum.photos/150?random=1"
                },
                {
                    productid:"2",
                    name:"sara",
                    price:33,
                    quantity:1,
                    image: "https://picsum.photos/150?random=1"
                },
            ],
        };
        setOrderDetails(mockOrderDetails);
    },[id])
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">order details</h2>
        {!orderDetails ? (<p>no orders found</p>)
        :(<div className="p-4 sm:p-6 rounded-lg border">
            {/* order info */}
        <div className="flex flex-col sm:flex-row justify-between mb-8">
            <div className="">
                <h3 className="text-lg md:text-xl font-semibold
                "> order id :#{orderDetails._id}</h3>
                <p className="text-gray-600">
                    {new Date(orderDetails.createAt).toLocaleString()}
                </p>
            </div>
            <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0">
                <span className={`${
                    orderDetails.isPaid ? 
                "bg-green-100 text-green-700"
                :"bg-red-100 text-red-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                    {orderDetails.isPaid?"approved":"appending"}
                </span>
                <span className={`${
                    orderDetails.isDelivered ? 
                "bg-green-100 text-green-700"
                :"bg-yellow-100 text-yellow-700"
                } px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                    {orderDetails.isDelivered?"delivered":"pending"}
                </span>
            </div>
        </div>
{/* customer payment  shipping*/}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
        <div>
            <h4 className="text-lg font-semibold mb-2">Payment info</h4>
            <p>payment method:{orderDetails.paymentMethod}</p>
            <p>status: {orderDetails.isPaid ? "paid":"inpaid"}</p>

        </div>
        <div>
            <h4 className="text-lg font-semibold mb-2">shiping info</h4>
            <p>shiping method:{orderDetails.shippingMethod}</p>
            <p>address: {`${orderDetails.shippingAddress.city}, ${orderDetails.shippingAddress.contry}`}</p>
            
        </div>
    </div>
    {/* product list */}
    <div className="overflow-x-auto">
        <h4 className="text-lg font-semibold mb-4">products</h4>
        <table className="min-w-full text-gray-600 mb-4">
            <thead className="bg-gray-100">
                <tr>
                    <th className="py-2 px-4">name</th>
                    <th className="py-2 px-4">unit proce</th>
                    <th className="py-2 px-4">quantity</th>
                    <th className="py-2 px-4">total</th>
                </tr>
            </thead>
            <tbody>
                {orderDetails.orderItem.map((item)=>(
                    <tr key={item.productId} className="border-b">
                        <td className="py-2 px-4 flex items-center">
                            <img src={item.image} className="w-12 h-12 object-cover rounded-lg mr-4" />
                            <Link 
                            to={`/product/${item.productId}`}
                            className="text-blue-500 hover:underline">
                                {item.name}
                            </Link>
                        </td>
                        <td className="py-2 px-4">
                            ${item.price}
                        </td>
                        <td className="py-2 px-4">
                            ${item.quantity}
                        </td>
                        <td className="py-2 px-4">
                            ${item.price * item.quantity}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    {/* back to order link */}
    <Link to="/my-orders" className="text-blue-500 hover:underline">
    back to my orders</Link>
    </div>
        )}
    </div>
  )
}

export default OrderDetails