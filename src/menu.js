import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { bindActionCreators } from 'redux'
import {IntlProvider, addLocaleData, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { selectedLocale } from './actions/index';

import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
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
  constructor(props) {
    super(props);
    //console.log('props load in menu: '+JSON.stringify(props));
  }
  render () {
    const { intl, selectedLocale } = this.props;
    return (
      <Router>
        <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/menu">
              {intl.formatMessage({ id: 'menu.logo' })}</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavDropdown eventKey={1} title={intl.formatMessage({ id: 'menu.customer' })} id="basic-nav-dropdown">
              <MenuItem eventKey={1.1} href="/createCustomer">{intl.formatMessage({ id: 'menu.customer.newcustomer' })}</MenuItem>
              <MenuItem eventKey={1.2} href="/listCustomers">{intl.formatMessage({ id: 'menu.customer.listcustomers' })}</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={2} title={intl.formatMessage({ id: 'menu.product' })} id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} href="/addProduct">{intl.formatMessage({ id: 'menu.product.newproduct' })}</MenuItem>
              <MenuItem eventKey={2.2} href="/listProducts">{intl.formatMessage({ id: 'menu.product.listproducts' })}</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title={intl.formatMessage({ id: 'menu.transaction' })} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/addTransaction">{intl.formatMessage({ id: 'menu.transaction.newtransaction' })}</MenuItem>
              <MenuItem eventKey={3.2} href="/listTransactions">{intl.formatMessage({ id: 'menu.transaction.listtransactions' })}</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title={intl.formatMessage({ id: 'menu.account' })} id="basic-nav-dropdown">
              <MenuItem eventKey={3.1} href="/register">{intl.formatMessage({ id: 'menu.account.register' })}</MenuItem>
              <MenuItem eventKey={3.2} href="/login">{intl.formatMessage({ id: 'menu.account.login' })}</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3} href="/logout">{intl.formatMessage({ id: 'menu.account.logout' })}</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={4} title={intl.formatMessage({ id: 'menu.language' })} id="basic-nav-dropdown">
              <MenuItem eventKey={4.1} onClick={() => selectedLocale('en')}>{intl.formatMessage({ id: 'menu.language.english' })}</MenuItem>
              <MenuItem eventKey={4.2} onClick={() => selectedLocale('fr')}>{intl.formatMessage({ id: 'menu.language.french' })}</MenuItem>
              <MenuItem eventKey={4.3} onClick={() => selectedLocale('zh')}>{intl.formatMessage({ id: 'menu.language.chinese' })}</MenuItem>
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

// function mapStateToProps (state) {
//    const { lang, messages } = state.localeReducer;
//    return { locale: lang, key: lang, messages };
// };

//export default Menu
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectedLocale }, dispatch);
}

Menu.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(connect(null, mapDispatchToProps)(Menu));
