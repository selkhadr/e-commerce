import { useState } from 'react';
import { IoMdTrash } from 'react-icons/io';

// Dummy data for cart products
const initialCartProducts = [
  {
    id: 1,
    name: 'Stylish T-Shirt',
    img: null, // Orange background, white text
    size: 'M',
    quantity: 1,
    price: 25.99,
  },
  {
    id: 2,
    name: 'Comfortable Jeans',
    img: null, // Black background, white text
    size: 'L',
    quantity: 2,
    price: 49.99,
  },
  {
    id: 3,
    name: 'Sporty Sneakers',
    img: null, // Red background, white text
    size: '10',
    quantity: 1,
    price: 79.95,
  },{
    id: 4,
    name: 'Sporty Sneakers',
    img: null, // Red background, white text
    size: '10',
    quantity: 1,
    price: 79.95,
  },
];

function App() {
  const [cartProducts, setCartProducts] = useState(initialCartProducts);

  // Function to handle quantity decrement
  const handleDecrement = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(1, product.quantity - 1) }
          : product
      )
    );
  };

  // Function to handle quantity increment
  const handleIncrement = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  // Function to handle item removal
  const handleRemoveItem = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <div className="max-h-150 overflow-y-auto space-y-4">
      {initialCartProducts.map((product) => (
        <div
          key={product.id}
          className="flex flex-col sm:flex-row items-center p-3 border rounded-md shadow-sm w-full"
        >
          {/* Image */}
          <img
            src={product.img}
            className="w-10 h-10 text-xs object-cover rounded-md"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://placehold.co/80x80?text=No+Image';
            }}
          />

          {/* Info + Actions */}
          <div className="flex-grow flex flex-col sm:flex-row justify-between items-center w-full sm:ml-4 overflow-hidden">
            {/* Details */}
            <div className="text-black text-xs text-center sm:text-left mb-2 sm:mb-0">
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm">Size: {product.size} | Qty: {product.quantity}</p>
            </div>

            {/* Quantity */}
            <div className="flex text-xs items-center space-x-2 ">
              <button
                onClick={() => handleDecrement(product.id)}
                className="px-2 py-1 border text-xs rounded-full text-black"
              >
                -
              </button>
              <span className="w-4 text-center text-black font-semibold">{product.quantity}</span>
              <button
                onClick={() => handleIncrement(product.id)}
                className="px-2 py-1 border rounded-full text-black"
              >
                +
              </button>
            </div>

            {/* Price + Remove */}
            <div className="text-black flex text-xs flex-col items-center sm:items-end">
              <p className="font-bold">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleRemoveItem(product.id)}
                className="px-3 py-1 rounded-full border text-black"
              >
                <IoMdTrash/>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


export default App;