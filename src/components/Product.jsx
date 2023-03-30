import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { db } from "../firebase/firebase.config";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const Product = ({ product }) => {
  const [isAdded, setIsAdded] = useState(false);
  const productRef = collection(db, "products");
  const navigate = useNavigate();

  // Add to cart functionality
  const handleAddProduct = async (id, product) => {
    try {
      const data = await getDocs(productRef);
      const result = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const existingCartItem = result.find(
        (item) => item.title === product.title
      );
      if (!existingCartItem) {
        await addDoc(productRef, { ...product, qty: 1 });
      } else {
        const updatingDoc = doc(db, "products", existingCartItem.id);
        await updateDoc(updatingDoc, {
          qty: existingCartItem.qty + 1,
        });
      }

      setIsAdded(true);
      setTimeout(() => {
        setIsAdded((prevState) => !prevState);
      }, 1000);

      navigate("/cart");
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 1000,
        theme: "light",
      });
      console.log(error.message);
    }
  };

  return (
    <div className="p-10 max-w-md mx-auto dark:bg-gray-900">
      <img
        src={product?.thumbnail}
        alt="img"
        className="py-4 h-64 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-72"
      />

      <div className="relative border-t dark:bg-gray-700 border-gray-100 dark:border-gray-400 bg-white p-6">
        <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
          {product?.title}
        </h3>

        <p className="mt-1.5 text-sm text-gray-700 dark:text-gray-200">
          ${product.price}
        </p>

        <button
          onClick={() => handleAddProduct(product.id, product)}
          disabled={isAdded}
          className={`"w-full rounded-md  px-3.5 py-1.5 text-base mt-4 font-semibold leading-7 text-white hover:bg-indigo-500" ${
            isAdded ? "bg-green-600" : "bg-indigo-600"
          }`}
        >
          {isAdded ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
