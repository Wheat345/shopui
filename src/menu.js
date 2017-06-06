import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import ListCustomers from './listCustomers.js';
import CreateCustomer from './createCustomer.js';
import AddProduct from './addProduct.js';
import ListProducts from './listProducts.js';
import AddTransaction from './addTransaction.js';
import ListTransactions from './listTransactions.js';
import Login from './login.js';
import Logout from './logout.js';

const Menu = () => (
  <Router>
    <div>
      <a href="/createCustomer">Create Customer</a>&nbsp;&nbsp;
      <a href="/listCustomers">List Customers</a>&nbsp;&nbsp;
      <a href="/addProduct">Add Product</a>&nbsp;&nbsp;
      <a href="/listProducts">List Products</a>&nbsp;&nbsp;
      <a href="/addTransaction">Add Transaction</a>&nbsp;&nbsp;
      <a href="/listTransactions">List Transactions</a>&nbsp;&nbsp;
      <a href="/login">Login</a>&nbsp;&nbsp;
      <a href="/logout">Logout</a>
      <Route exact path="/createCustomer" component={CreateCustomer}/>
      <Route path="/listCustomers" component={ListCustomers}/>
      <Route path="/addProduct" component={AddProduct}/>
      <Route path="/listProducts" component={ListProducts}/>
      <Route path="/addTransaction" component={AddTransaction}/>
      <Route path="/listTransactions" component={ListTransactions}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
    </div>
  </Router>
)

export default Menu
