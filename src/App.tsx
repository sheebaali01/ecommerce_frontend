import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/loading';


const Home = lazy(() => import('./pages/home'));
const Search = lazy(() => import('./pages/search'));

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
  return <Router>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/search' element={<Search />} />

        {/* admin routes*/}
          <Route
          // element={
          //   <ProtectedRoute isAuthenticated={true} adminRoute={true} isAdmin={true} />
          // }
          >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/products" element={<Products />} />
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
          <Route path="/admin/products/new" element={<NewProduct />} />   
          <Route path="/admin/products/:id" element={<ProductManagement />} />   
          <Route path="/admin/transaction/:id" element={<TransactionManagement />} />   
        </Route>
      </Routes>
    </Suspense>
  </Router>

}

export default App
