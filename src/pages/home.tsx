import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ProductCard from "../components/product-card";
import { useLatestProductsQuery } from "../redux/api/productAPI";
import Loader, { Skeleton } from "../components/loader";
import { CartItem } from "../types/types";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducer/cartReducer";
const Home = () => {
  const { data, isLoading, isError } = useLatestProductsQuery("");
  console.log("data",data);
  const dispatch = useDispatch();

  const addToCartHandler = (cartItem:CartItem) => {
    if(cartItem.stock<1)return toast.error("Out of stock!");
    dispatch(addToCart(cartItem));
    toast.success("Added to cart!");
  };

  if (isError) toast.error("Cannot Fetch the Products")
  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products
        <Link to={"/search"} className="findmore">
          More
        </Link>
      </h1>
      <main>
      {isLoading?<Skeleton width="80vw"/>:
          data?.products.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              price={i.price}
              stock={i.stock}
              photo={i.photo}
              handler={addToCartHandler}
            />
          ))
        }
        {/* <ProductCard
          productId="jkjj"
          name="Macbook"
          price={232223}
          stock={213}
          handler={addToCartHandler}
          photo="https://m.media-amazon.com/images/I/71fMZDz2sEL._AC_UY218_.jpg"
        /> */}
      </main>
    </div>
  );
};

export default Home;
