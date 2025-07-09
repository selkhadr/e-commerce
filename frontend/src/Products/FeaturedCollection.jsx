import bgImg0 from '../assets/bg0.jpg';
function FeaturedCollection() {
  return (
    // Main container section with a gradient background, centered content, and padding
    <section className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 p-4 font-inter">
      {/* Unified container for both text and image, giving them a shared background and styling */}
      {/* This container uses flexbox to arrange its children (text and image) */}
      {/* It's responsive, switching from column on small screens to row on medium screens and up */}
      <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-6xl w-full">

        {/* Text Content Section */}
        {/* This div now inherits the background from its parent unified container */}
        {/* It's designed to be centered on small screens and left-aligned on medium screens and up */}
        {/* flex-1 allows it to take up available space in the flex container */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4 md:space-y-6 m-4 md:m-0 md:mr-8 flex-1">
          {/* Main heading for comfort and style */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Comfort and Style
          </h2>
          {/* Sub-heading emphasizing "Made For You" */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-700 leading-tight">
            Made For You
          </h2>
          {/* Descriptive paragraph */}
          <p className="text-lg sm:text-xl text-gray-700 max-w-md">
            Discover high-quality apparel designed for ultimate comfort and timeless style.
          </p>
          {/* Call to action button */}
          {/* Uses a standard anchor tag as react-router-dom Link is not available */}
          <a
            href="/collection/all"
            className="inline-block mt-6 px-8 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-full shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300"
          >
            Shop Now
          </a>
        </div>

        {/* Image Content Section */}
        {/* This div also inherits the background from the unified container */}
        {/* flex-shrink-0 prevents it from shrinking, and flex-1 allows it to take space */}
        {/* Uses flex to center the image within its container */}
        <div className="mt-8 md:mt-0 flex-shrink-0 flex-1 flex justify-center items-center">
          <img
            src={bgImg0} // Placeholder image
            alt="Comfort and Style Collection"
            // Responsive image styling: full width within its container, max width limits, auto height
            // Rounded corners and shadow for visual appeal
            className="rounded-2xl shadow-2xl object-cover w-full max-w-sm md:max-w-md lg:max-w-lg h-auto"
            // Fallback in case the image fails to load, displays a "Image Not Found" placeholder
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://placehold.co/600x400/A78BFA/ffffff?text=Image+Not+Found";
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default FeaturedCollection;
