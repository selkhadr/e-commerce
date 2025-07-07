import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

const Topbar = () => {
  return (
    <div className="bg-gray-800 text-white text-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-2 gap-2 sm:gap-0">
        <div className="hidden sm:flex gap-4 items-center">
          <a href="#" className="hover:text-gray-200">
            <FaFacebook />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-gray-200">
            <FaXTwitter />
          </a>
        </div>

        <div className="text-center">
          <span className="block text-white text-xs sm:text-sm font-medium">
            we ship worldwide – fast and reliable shipping
          </span>
        </div>

        <div className="hidden sm:block">
          <a href="tel:061234676" className="hover:underline">
            📞 061234676
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
