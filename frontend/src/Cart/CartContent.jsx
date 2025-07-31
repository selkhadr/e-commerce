import { IoMdTrash } from 'react-icons/io';
import{useDispatch} from"react-redux";
import { removeFromCart, updateCartItemQuantity } from '../redux/slices/cartSlice';


// Dummy data for cart products

function CartContent({cart,userId, guestId}) {
  const dispatch = useDispatch();

  //handle adding or substracting to cart
  const handleAddToCart = (productId,delta,quantity,size,color)=>{
    const newQuantity = quantity+delta;
    if(newQuantity>=1){
      dispatch(updateCartItemQuantity({
        productId,
        quantity:newQuantity,
        guestId,
        userId,
        size,
        color
      }))
    }
  }


  

  // Function to handle item removal
  const handleRemoveItem = (productId) => {
    setCartProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  const handleRemoveFromCart=(productId,size,color)=>{
    dispatch(removeFromCart({productId,guestId,userId,size,color}));
  }

  return (
    <div className="max-h-150 overflow-y-auto space-y-4">
      {cart.products.map((product) => (
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
                onClick={() => handleAddToCart(product.productId,
                  -1,
                  product.quantity,
                  product.size,
                  product.color,
                )}
                className="px-2 py-1 border text-xs rounded-full text-black"
              >
                -
              </button>
              <span className="w-4 text-center text-black font-semibold">{product.quantity}</span>
              <button
                onClick={() => handleAddToCart(product.productId,
                  1,
                  product.quantity,
                  product.size,
                  product.color,
                )}
                className="px-2 py-1 border rounded-full text-black"
              >
                +
              </button>
            </div>

            {/* Price + Remove */}
            <div className="text-black flex text-xs flex-col items-center sm:items-end">
              <p className="font-bold">${product.price.toFixed(2)}</p>
              <button
                onClick={() => handleRemoveFromCart(product.productId,
                  product.size,
                  product.color,
                )}
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


export default CartContent;