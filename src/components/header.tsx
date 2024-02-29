import { Link } from 'react-router-dom';
import { FaSearch ,FaShoppingBag , FaSignInAlt,FaUser } from 'react-icons/fa'

const user = {
    _id:"fff"
}
const Header = () => {
  return (
    <nav>
         <Link to={"/"}>Home</Link>
         <Link to={"/search"}>{" "} <FaSearch/></Link>
         <Link to={"/cart"}>{" "} <FaShoppingBag/></Link>
         {
            user?._id?(
                <>
                <button><FaUser/></button>
                </>
            ):<Link to={"/login"}>{" "} <FaSignInAlt/></Link>
         }
    </nav>
  );
};

export default Header