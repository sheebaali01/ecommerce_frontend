import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Loading from './components/loader';
import {Toaster} from 'react-hot-toast';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import {useDispatch, useSelector} from 'react-redux';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { getUser } from './redux/api/userAPI';
import Loader from './components/admin/loader';
import ProtectedRoute from './components/protected-route';
import { UserReducerInitialState } from './types/reducer-types';



const Home = lazy(() => import('./pages/home'));
const Search = lazy(() => import('./pages/search'));
const Cart = lazy(() => import('./pages/cart'));
const Shipping = lazy(() => import('./pages/shipping'));
const Login = lazy(() => import('./pages/login'));
const Orders = lazy(() => import('./pages/orders'));
const OrderDetails = lazy(() => import('./pages/order-details'));
const NotFound = lazy(() =>import( './pages/not-found'));
const Checkout = lazy(() =>import(  './pages/checkout'));

//Admin routes 
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const BarCharts = lazy(() => import("./pages/admin/charts/barcharts"));
const PieCharts = lazy(() => import("./pages/admin/charts/piecharts"));
const LineCharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const NewProduct = lazy(() => import("./pages/admin/management/new-product"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/product-management")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transaction-management")
)
function App() {
  const {user,loading} = useSelector((state:{userReducer:UserReducerInitialState}) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        console.log("logged in");
        const data = await getUser(user.uid);
        dispatch(userExist(data.user));
      }
      else{
        dispatch(userNotExist());
        console.log("not logged in");
      }
    })
  },[])
  return loading ? <Loader/> :(
  
    <Router>

    {/* Header */}
    <Header user={user}/>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />
        <Route path='/cart' element={<Cart />} />

        {/* not logged in user route*/}

        <Route path='/login' element={
          <ProtectedRoute isAuthenticated={user?false:true}>
            <Login />
          </ProtectedRoute>
        } 
        />

        {/* logged in user routes*/}
        <Route element={<ProtectedRoute isAuthenticated={user?true:false} />}>
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/order/:id' element={<OrderDetails />} />
          <Route path='/pay' element={<Checkout />} />
        </Route>

        {/* admin routes*/}
        <Route
        element={
          <ProtectedRoute isAuthenticated={true} adminOnly={true} admin={user?.role==="admin"?true:false} />
        }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/product" element={<Products />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/transaction" element={<Transaction />} />        
        
          {/*Charts*/}
          <Route path="/admin/chart/bar" element={<BarCharts />} />
          <Route path="/admin/chart/line" element={<LineCharts />} />
          <Route path="/admin/chart/pie" element={<PieCharts />} />

          {/*Apps*/}
          <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
          <Route path="/admin/app/coupon" element={<Coupon />} />

          {/*Management*/}
          <Route path="/admin/product/new" element={<NewProduct />} />   
          <Route path="/admin/product/:id" element={<ProductManagement />} />   
          <Route path="/admin/transaction/:id" element={<TransactionManagement />} />   
        </Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </Suspense>
    <Toaster position="bottom-center"/>
  </Router>
  )

}

export default App
