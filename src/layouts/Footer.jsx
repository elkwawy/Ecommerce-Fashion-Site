import { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaTwitter, FaInstagram, FaYoutube, FaFacebookSquare } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";

const Footer = memo(() => {
  const parts = [
    { id: 5, title: "My Cart", link: "/cart" },
    { id: 2, title: "Contact us", link: "/contactUs" },
    { id: 3, title: "My Wishlist", link: "/wishlist" },
    // { id: 1, title: "About us", link: "/aboutUs" },
    { id: 4, title: "My Account", link: "/profile" },
  ];

  const { categories, status } = useSelector((state) => state.categories);

  return (
    <div className="footer bg-[#F8F8F8] py-10 sm:py-14">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
        <img
          src={require("../assets/icons/logo.png")}
          className="w-[190px] -mt-5 max-sm:mx-auto"
          alt="Logo"
        />

        <ul className="space-y-2 max-sm:text-center">
          <li className="text-[#222222] font-[700] text-[30px] cursor-pointer">
            <Link to="/">Help</Link>
          </li>
          {parts.map((part) => (
            <li key={part.id}>
              <Link className="cursor-pointer text-[20px] text-gray-800 font-[400] trans hover:ml-1" to={part.link}>
                {part.title}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="space-y-2 max-sm:text-center">
          <li className="text-[#222222] font-[700] text-[30px] cursor-pointer">
            Categories
          </li>
          {status === "loading" ? (
            [...Array(5)].map((_, index) => (
              <li key={index}>
                <Skeleton height={25} width={150} />
              </li>
            ))
          ) : (
            categories &&
            categories.map((cat) => (
              <li key={cat.slug}>
                <Link className="cursor-pointer text-[20px] text-gray-800 font-[400] trans hover:ml-1" to={`${cat.slug}/all`}>
                  {cat.name}
                </Link>
              </li>
            ))
          )}
        </ul>

        <ul className="space-y-3 max-sm:text-center">
          <li className="text-[#222222] font-[700] text-[30px]">Follow Us</li>
          <li className="grid grid-cols-2 max-w-[160px] max-sm:w-[130px] max-sm:mx-auto gap-6 text-[30px]">
            <Link to="https://youtube.com" target="_blank" title="Youtube">
              <FaYoutube className="text-[#222222] hover:text-red-600 transition" />
            </Link>
            <Link to="https://twitter.com" target="_blank" title="Twitter">
              <FaTwitter className="text-[#222222] hover:text-blue-400 transition" />
            </Link>
            <Link to="https://instagram.com" target="_blank" title="Instagram">
              <FaInstagram className="text-[#222222] hover:text-pink-600 transition" />
            </Link>
            <Link to="https://facebook.com" target="_blank" title="Facebook">
              <FaFacebookSquare className="text-[#222222] hover:text-blue-600 transition" />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
});

export default Footer;
