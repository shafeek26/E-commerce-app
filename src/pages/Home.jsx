import { useProductsState } from "../context/ProductContext";
import Product from "../components/Product";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const Home = () => {
  const { productsList, isLoading, searchProductsquerry, dispatch, pageNumber } =
    useProductsState();

  const searchedProductsList = productsList.filter((product) =>
    (product.title.toLowerCase().includes(searchProductsquerry) || product.description.toLowerCase().includes(searchProductsquerry))
  );

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 my-10">
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400 bg-blue-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400 bg-blue-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400 bg-blue-400"></div>
        </div>
      ) : (
        <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {searchedProductsList
            .slice(pageNumber * 10 - 10, pageNumber * 10)
            .map((product) => {
              return <Product key={product.id} product={product} />;
            })}
        </div>
      )}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => {
            dispatch({
              type:'PREVIOUS_PAGE'
            });
          }}
          className="flex items-center px-4 py-2 mx-1 text-gray-500 border border-gray-400 dark:border-gray-800 rounded-md cursor-not-allowed dark:text-gray-400"
        >
          <BsArrowLeft />
        </button>
        {[...Array(productsList.length / 10)].map((_, idx) => {
          return (
            <button
            onClick={() => {
              dispatch({
                type:'CURRENT_PAGE',
                payload : idx
              })
            }}
              key={idx}
              className="flex items-center px-4 py-2 mx-1 text-gray-500 border border-gray-400 dark:border-gray-800 rounded-md dark:text-gray-400 hover:scale-105"
            >
              {idx + 1}
            </button>
          );
        })}
        <button
          onClick={()=>{ dispatch({
            type:'NEXT_PAGE'
          })}}
          className="flex items-center px-4 py-2 mx-1 text-gray-500 border border-gray-400 dark:border-gray-800 rounded-md cursor-not-allowed dark:text-gray-400"
        >
          <BsArrowRight />
        </button>
      </div>
    </>
  );
};

export default Home;
