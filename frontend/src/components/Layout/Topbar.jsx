import {TbBrandMeta} from "react-icons/tb"
import {IoLogoInstagram} from "react-icons/io"
import {RiTwitterXLine} from "react-icons/ri"

const Topbar = () => {
  return (
    <div className="bg-[var(--red-color)] text-white">
        <div className="container mx-auto flex justify-between items-center py-3 ">
            <div className="hidden md:flex items-center space-x-4">
                <a href="#" className="hover:text-gray-300">
                    <TbBrandMeta className="h-5 w-5"/>
                </a>
                <a href="#" className="hover:text-gray-300">
                    <IoLogoInstagram className="h-5 w-5"/>
                </a>
                <a href="#" className="hover:text-gray-300">
                    <RiTwitterXLine className="h-5 w-5"/>
                </a>
            </div>
            <div className="text-sm text-center flex-grow">
                <span>
                    we ship worldwide - fast and reliable shipping
                </span>
            </div>
            <div className="tex-sm hidden md:block ">
                <a href="tel:+12345678" className="hover:text-gray-300">
                    +1 (234) 567890
                </a>
            </div>
        </div>
    </div>
  )
}

export default Topbar;