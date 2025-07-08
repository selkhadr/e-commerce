import { Link } from 'react-router-dom';
import bgImg0 from '../assets/bg0.jpg'; // Make sure this path is correct

function GenderCollectionSection() {
  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Women's Collection */}
        <div className="relative flex flex-col items-center justify-center rounded-lg shadow-lg overflow-hidden h-90">
          <img src={bgImg0} alt="Women's Collection" className="w-full h-full object-cover object-center absolute inset-0" />
          <div className="relative z-10 p-6 bg-black bg-opacity-40 w-full h-full flex flex-col items-center justify-center text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Women's Collection</h2>
            <Link
              to="/collection/all?gender=women"
              className="mt-4 px-6 py-3 bg-white text-gray-900 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex flex-col items-center justify-center rounded-lg shadow-lg overflow-hidden h-90">
          <img src={bgImg0} alt="Men's Collection" className="w-full h-full object-cover object-center absolute inset-0" />
          <div className="relative z-10 p-6 bg-black bg-opacity-40 w-full h-full flex flex-col items-center justify-center text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Men's Collection</h2>
            <Link
              to="/collection/all?gender=men"
              className="mt-4 px-6 py-3 bg-white text-gray-900 font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GenderCollectionSection;