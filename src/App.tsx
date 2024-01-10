import './App.css'
import Home from "./components/Home.tsx";
import Customer from "./components/Customer.tsx";
import Order from "./components/Order.tsx";
import {BrowserRouter as Router,Routes,Route,Link} from 'react-router-dom'
import Product from "./components/Product.tsx";
import Login from './components/Login.tsx'
import Signup from "./components/Signup.tsx";


function App() {
  return (
      <Router>
          <div>
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                  <div className="container-fluid">
                      <div className="navbar-brand" >
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Wattpad-logo-vector.svg/1200px-Wattpad-logo-vector.svg.png"  className='logo' alt="logo"/>
                      </div>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                          <span className="navbar-toggler-icon"></span>
                      </button>
                      <div className="collapse navbar-collapse" id="navbarNav">
                          <ul className="navbar-nav">
                              <li className="nav-item">
                                  <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to='/customers'>Customer</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to='/products'>Product</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to='/orders'>Order Management</Link>
                              </li>
                              <li className="nav-item">
                                  <Link className="nav-link" to='/login'>Login</Link>
                              </li>
                          </ul>
                      </div>
                  </div>
              </nav>

              <Routes>
                  <Route path='/' element={<Home/>}/>
                  <Route path='/customers' element={<Customer/>}/>
                  <Route path='/orders' element={<Order/>}/>
                  <Route path='/products' element={<Product/>}/>
                  <Route path='/login' element={<Login/>}/>
                  <Route path='/signup' element={<Signup/>}/>
              </Routes>
          </div>
      </Router>
  )
}

export default App
