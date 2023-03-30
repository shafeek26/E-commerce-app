import { Link } from "react-router-dom";
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { useProductsState } from "../context/ProductContext";

const Navbar = () => {
const { dispatch, searchProductsquerry } = useProductsState();

  const searchProducts = (e) => {
    const value = e.target.value;
    dispatch({
      type:'SEARCH_PRODUCTS',
      payload:value
    })
  }
  return (
    <div className="">
      <nav className="relative px-8 py-4 flex justify-between items-center bg-stone-100 dark:border-gray-700">
        <Link
          className="text-3xl font-bold leading-none flex items-center space-x-4"
          href="/">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#4F46E5"
              className="w-8 h-8">
              <path
                fillRule="evenodd"
                d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                clipRule="evenodd"
              />
              <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
            </svg>
          </span>
          <span className="text-gray-600 dark:text-gray-300 text-xl">
            Shopper..
          </span>
        </Link>
        <div className="lg:hidden">
          <button className="navbar-burger flex items-center text-gray-600 dark:text-gray-300 p-3">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden lg:flex lg:items-center lg:justify-end grow mr-4 space-x-5">
        <li>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <AiOutlineSearch className="text-2xl text-gray-400"/>
              </span>
              <input
              value={searchProductsquerry}
              onChange={(e)=>{searchProducts(e)}}
                type="text"
                className="py-2 pl-10 pr-4 text-md text-gray-700 bg-transparent border dark:bg-gray-800 rounded-md focus:outline-none focus:bg-white focus:text-gray-900"
                placeholder="Search"
              />
            </div>
          </li>
          <li>
            <Link to='/cart'
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-4 py-2">
              <span className="flex items-center space-x-1"><AiOutlineShoppingCart className="text-2xl"/><span className="text-md">Cart</span></span>
            </Link>
          </li>
          <li>
            <Link
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 px-4 py-2">
              <span className="flex items-center space-x-1"><MdOutlineAccountCircle className="text-2xl"/><span className="text-md">Account</span></span>
            </Link>
          </li>
        </ul>
        <div className="hidden lg:block">
        <img
        className="inline-block w-8 h-8 rounded-full"
        src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
        alt="Dan_Abromov"
      />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;