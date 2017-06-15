import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
//import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';
import ListCustomers from './listCustomers.js';
import CreateCustomer from './createCustomer.js';
import AddProduct from './addProduct.js';
import ListProducts from './listProducts.js';
import AddTransaction from './addTransaction.js';
import ListTransactions from './listTransactions.js';
import Register from './register.js';
import Login from './login.js';
import Logout from './logout.js';

class Menu extends React.Component {
  render () {
    return (
      <Router>
        <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/menu">SHOP</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey={1} title="Customer" id="basic-nav-dropdown">
              <MenuItem eventKey={1.1} href="/createCustomer">New Customer</MenuItem>
              <MenuItem eventKey={1.2} href="/listCustomers">All Customers</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={2} title="Product" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} href="/addProduct">New Product</MenuItem>
              <MenuItem eventKey={2.2} href="/listProducts">All Products</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Transaction" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/addTransaction">New Transaction</MenuItem>
              <MenuItem eventKey={3.2} href="/listTransactions">All Transaction</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/register">Register</MenuItem>
              <MenuItem eventKey={3.2} href="/login">Login</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3} href="/logout">Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
          <Route exact path="/createCustomer" component={CreateCustomer}/>
          <Route path="/listCustomers" component={ListCustomers}/>
          <Route path="/addProduct" component={AddProduct}/>
          <Route path="/listProducts" component={ListProducts}/>
          <Route path="/addTransaction" component={AddTransaction}/>
          <Route path="/listTransactions" component={ListTransactions}/>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
          <Route path="/logout" component={Logout}/>
        </div>
      </Router>
    );
  }
}
export default Menu
