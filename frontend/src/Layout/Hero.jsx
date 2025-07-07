import { Link } from 'react-router-dom';
import bgImg from '../assets/bg.jpg';


const Hero = () => {
  return (
    <section className="relative h-[calc(100vh-120px)] w-full flex items-center justify-center overflow-hidden"> {/* Adjusted height */}
      {/* Background Image - Using a placeholder for demonstration */}
<img
  src={bgImg}
  alt="Tropical vacation"
  className="absolute inset-0 h-full w-full object-cover filter brightness-75 z-0"
/>
<div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4 z-10">
  <div className="text-center text-white p-6  max-w-lg mx-auto z-20">
    <h2 className="text-4xl md:text-5xl  font-bold mb-4 rounded-md">Your Dream Vacation Awaits</h2>
    <p className="text-lg md:text-xl  mb-6 rounded-md">Explore our exclusive vacation packages and discover your next unforgettable adventure!</p>
    <Link
      href="#"
      className="inline-block  bg-red-950 hover:bg-red-900 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
    >
      <p className=''>Explore Packages</p>
    </Link>
  </div>
</div>
    </section>
  );
};

export default Hero;