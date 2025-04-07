import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProductsByCategory from './pages/product_by_category.jsx';
import OrdersByStatus from './pages/order_by_status.jsx';
import CustomerDetails from './pages/customer_details';
import OrderDetails from './pages/order_details';
import Products from './pages/products.jsx';
import Orders from './pages/orders.jsx';
import Customers from './pages/customers.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4">
      <div className="container">
        <a className="navbar-brand" href="/">Shopping</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/" className={`nav-link`}>Home</a>
            </li>
            <li className="nav-item">
              <a href="/products" className={`nav-link`}>Products</a>
            </li>
            <li className="nav-item">
              <a href="/customers" className={`nav-link`}>Customers</a>
            </li>
            <li className="nav-item">
              <a href="/orders" className={`nav-link`}>Orders</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <div className="App">
            <Navigation/>
            <div className="container">
              <div className="welcome-banner">
                <h1>Shop</h1>
              </div>
              <div className="custom-box">
                <h2>Quick Navigation</h2>
                <ul className="home-menu">
                  <li><a href="/products" className="btn btn-primary create-button">View All Products</a></li>
                  <li><a href="/customers" className="btn btn-primary create-button">View All Customers</a></li>
                  <li><a href="/orders" className="btn btn-primary create-button">View All Orders</a></li>
                </ul>
              </div>
            </div>
          </div>
        } />
        <Route path="/products" element={
          <div>
          <Navigation/>
          <Products/>
          </div>
        } />
        <Route path="/customers" element={
            <div>
            <Navigation/>
            <Customers/>
            </div>
        } />
        <Route path="/orders" element={
            <div>
            <Navigation/>
            <Orders/>
            </div>
        } />     
        <Route path="/products/:shortcode" element={
            <div>
            <Navigation/>
            <ProductsByCategory />
            </div>
          } />
        <Route path="/orders/:status" element={
            <div>
            <Navigation/>
            <OrdersByStatus/>
            </div>
           } />
        <Route path="/customer/:id" element={
            <div>
            <Navigation/>
            <CustomerDetails/>
            </div>
          } />
        <Route path="/order/:id" element={
            <div>
            <Navigation/>            
            <OrderDetails/>
            </div>
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
