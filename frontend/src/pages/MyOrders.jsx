import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching orders from an API
    setTimeout(() => {
      const mockOrders = [
        {
          _id: "12345", // Changed _id to be unique for better keying
          createAt: new Date(),
          shippingAddress: { city: "New York", country: "USA" },
          orderItems: [
            { name: "Product A", image: "https://placehold.co/50x50/E0F2F7/000000?text=ProdA" },
          ],
          totalPrice: 100.00,
          isPaid: true,
        },
        {
          _id: "67890", // Changed _id to be unique
          createAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
          shippingAddress: { city: "Los Angeles", country: "USA" },
          orderItems: [
            { name: "Product B", image: "https://placehold.co/50x50/FFF3E0/000000?text=ProdB" },
            { name: "Product C", image: "https://placehold.co/50x50/E8F5E9/000000?text=ProdC" },
          ],
          totalPrice: 250.50,
          isPaid: false,
        },
        {
          _id: "11223", // Changed _id to be unique
          createAt: new Date(Date.now() - 86400000 * 5), // 5 days ago
          shippingAddress: { city: "Chicago", country: "USA" },
          orderItems: [
            { name: "Product D", image: "https://placehold.co/50x50/FBE9E7/000000?text=ProdD" },
          ],
          totalPrice: 75.00,
          isPaid: true,
        },
      ];
      setOrders(mockOrders);
    }, 1000); // Simulate network delay
  }, []);

  const handleRowClick = (orderId)=>{
    navigate(`/orders/${orderId}`);
  }

  return (
    // Main container div with responsive padding and max width
    <div className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen font-inter rounded-lg shadow-lg">
      {/* Heading for the orders section */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center sm:text-left">
        My Orders
      </h2>

      {/* Outer div for table to enable horizontal scrolling on small screens */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        {/* Table structure with full width and collapse borders */}
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          <thead className="bg-gray-100">
            <tr>
              {/* Table header cells with padding, text alignment, and font styling */}
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">
                Image
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Shipping Address
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">
                Status
              </th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Conditional rendering based on whether orders exist */}
            {orders.length > 0 ? (
              // Map through orders and render a table row for each
              orders.map((order) => (
                <tr key={order._id} 
                onClick={()=>handleRowClick(order._id)}
                className="hover:bg-gray-50 transition-colors duration-200">
                  {/* Table data cells */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    {/* Image for the first item in the order, with fallback */}
                    <img
                      src={order.orderItems[0]?.image || "https://placehold.co/50x50/cccccc/000000?text=N/A"}
                      alt={order.orderItems[0]?.name || "Product Image"}
                      className="w-12 h-12 object-cover rounded-md shadow-sm"
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/cccccc/000000?text=N/A"; }}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order._id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Format date and time */}
                    {order.createAt ? (
                      <>
                        {new Date(order.createAt).toLocaleDateString()}
                        <br />
                        {new Date(order.createAt).toLocaleTimeString()}
                      </>
                    ) : "N/A"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Display shipping address or N/A */}
                    {order.shippingAddress ? `${order.shippingAddress.city}, ${order.shippingAddress.country}` : "N/A"}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.orderItems.length}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    {/* Status badge with conditional styling */}
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.isPaid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              // Message when no orders are found
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500 text-lg">
                  You have no orders.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyOrders;
