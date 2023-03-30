import { useProductsState } from "../context/ProductContext";
import {  deleteDoc, doc  } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, dispatch, isLoading } = useProductsState();
  const productRef = collection(db, "products");
  const navigate = useNavigate();
console.log(cart)

// fetching cart data
useEffect(() => {
  const fetchCartData = async () => {
    try {
      const data = await getDocs(productRef);
      const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      dispatch({
        type: "Cart_PRODUCTS",
        payload: result,
      });
    } catch (error) {
      console.log(error);
    }
  };
  fetchCartData();
}, [dispatch, productRef]);

  //form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Remove product from cart

  const removeProduct = async(productId) => {
    try {
      const docDelete = doc(db, "products", productId);
      await deleteDoc(docDelete);
      dispatch({
        type:'REMOVE_FROM_CART',
        payload:productId
      })
    } catch (error) {
      console.log(error)
    }
  }

  // increase product quantity 
  const increaseProductQty = async(product) => {
    
    try {
      const updateingDoc = doc(db, "products", product.id);
      await updateDoc(updateingDoc,{qty:product.qty+1});
      dispatch({
        type:'INCREASE_PRODUCT_QTY',
        payload:product.id
      })
    } catch (error) {
      console.log(error)
    }
  }

  // decrease product quantity 
  const decreaseProductQty = async(product) => {
    
    try {
      const updateingDoc = doc(db, "products", product.id);

      if(product.qty > 1){
         await updateDoc(updateingDoc,{qty:product.qty-1});
      }else{
        await updateDoc(updateingDoc,{qty:product.qty});
      }
      dispatch({
        type:'DECREASE_PRODUCT_QTY',
        payload:product.id
      })
    } catch (error) {
      console.log(error)
    }
  }


  // totalAmont of cart items 
  const totalAmount = cart.reduce((acc, currItem) => {
    return acc + currItem.qty * currItem.price
  },0)

  // totalAmont savings in cart items 
  const totalSaving = cart.reduce((acc, currItem) => {
    return acc + Math.round((currItem.qty * currItem.price * currItem.discountPercentage)/100)
  },0)

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 my-10">
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400 bg-blue-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400 bg-blue-400"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400 bg-blue-400"></div>
        </div>
      ) : (
        <div>
          {cart.length !== 0 ? (
            <div className="bg-gray-50 dark:bg-gray-900  dark:nx-bg-neutral-900">
              <div className="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                  Shopping Cart
                </h1>
                <form
                  onSubmit={handleSubmit}
                  className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16"
                >
                  <section
                    aria-labelledby="cart-heading"
                    className="lg:col-span-8 bg-white dark:bg-slate-600"
                  >
                    <h2 id="cart-heading" className="sr-only">
                      Items in your shopping cart
                    </h2>

                    <ul className="divide-y divide-gray-200 border-t border-b border-gray-200">
                      {cart.map((product, productIdx) => (
                        <div key={product.id} className="px-4">
                          <li className="flex py-6 sm:py-6 ">
                            <div className="flex-shrink-0">
                              <img
                                src={product?.thumbnail}
                                alt={product.title}
                                className="h-24 w-24 rounded-md object-contain object-center sm:h-38 sm:w-38"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                              <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                <div>
                                  <div className="flex justify-between">
                                    <h3 className="text-sm">
                                      <a
                                        href={product.href}
                                        className="font-medium text-lg text-gray-700 dark:text-white"
                                      >
                                        {product.name}
                                      </a>
                                    </h3>
                                  </div>
                                  <div className="mt-3 flex items-end">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                      &nbsp;&nbsp;${product?.price}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <div className="flex mb-2">
                            <div className="flex min-w-24 dark:text-white">
                              <button
                                onClick={() => decreaseProductQty(product)}
                                type="button"
                                className="h-7 w-7 rounded-full border border-[#e0e0e0]"
                              >
                                -
                              </button>
                              <input
                                type="text"
                                className="h-7 w-9 text-center mx-1 border dark:bg-white dark:text-black"
                                value={product.qty}
                                onChange={() => {}}
                              />
                              <button
                                onClick={() => increaseProductQty(product)}
                                type="button"
                                className="h-7 w-7 rounded-full border border-[#e0e0e0] flex justify-center items-center"
                              >
                                +
                              </button>
                            </div>
                            <div className="ml-4 flex flex-1 sm:ml-6 dark:text-white">
                              <button className="font-medium mr-4 ">
                                SAVE FOR LATTER
                              </button>
                              <button
                                onClick={() => removeProduct(product.id)}
                                className="font-medium"
                              >
                                REMOVE
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </section>

                  {/* Order summary */}
                  <section
                    aria-labelledby="summary-heading"
                    className="mt-16 rounded-md bg-white dark:bg-slate-600 lg:col-span-4 lg:mt-0 lg:p-0"
                  >
                    <h2
                      id="summary-heading"
                      className=" px-4 py-3 sm:p-4 border-b border-gray-200 text-lg font-medium text-gray-900 dark:text-gray-200"
                    >
                      Price Details
                    </h2>

                    <div>
                      <dl className=" space-y-1  px-6 py-4 sm:p-6">
                        <div className="flex items-center justify-between pt-4">
                          <dt className="flex items-center text-sm text-gray-800 dark:text-gray-200">
                            <span>Discount</span>
                          </dt>
                          <dd className="text-sm font-medium text-green-700 dark:text-green-400">
                            - $ {totalSaving}
                          </dd>
                        </div>
                        <div className="flex items-center justify-between py-4">
                          <dt className="flex text-sm text-gray-800 dark:text-gray-200">
                            <span>Delivery Charges</span>
                          </dt>
                          <dd className="text-sm font-medium text-green-700 dark:text-green-400">
                            Free
                          </dd>
                        </div>
                        <div className="flex items-center justify-between py-4 border-y border-dashed ">
                          <dt className="text-base font-medium text-gray-900 dark:text-white">
                            Total Amount
                          </dt>
                          <dd className="text-base font-medium text-gray-900 dark:text-white">
                            $ {totalAmount}
                          </dd>
                        </div>
                      </dl>
                      <div className="px-6 pb-4 font-medium text-green-700 dark:text-green-400">
                        You will save ₹ {totalSaving} on this order
                      </div>
                    </div>
                  </section>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center space-y-5 flex-col my-10">
              <img src="./images/emptycart.jpg" alt="img" />
              <h1 className="text-xl font-semibold">Your Cart Is Empty</h1>
              <button onClick={() => {navigate('/')}} className="rounded-md border border-gray-600 px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-300 mb-10">
                Shop Now
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Cart;
