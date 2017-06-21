import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import {IntlProvider, addLocaleData, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { selectedLocale } from './actions/index';

class CreateCustomer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
    this.onSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    fetch('http://localhost:8080/rest/createcustomer', {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        headers:{
        //'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
        },


        body: JSON.stringify({
          firstname: self.refs.firstname.value,
          lastname: self.refs.lastname.value,
          email: self.refs.email.value,
          gender: self.refs.gender.value,
          location: self.refs.location.value,
          status: self.refs.status.value,
          type: self.refs.type.value,
          description: self.refs.description.value,
        }),
      })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        window.location.href = '/listCustomers';
      });
  }

  render() {
    const { intl, selectedLocale } = this.props;
    return (
      <div>
        <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
          <div className="form-group">
              <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'customer.firstname' })} ref="firstname"/><br />
              <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'customer.lastname' })} ref="lastname"/><br />
              <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'customer.email' })} ref="email"/><br />
              <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'customer.gender' })} ref="gender"/><br />
              <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'customer.location' })} ref="location"/><br />
              <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'customer.status' })} ref="status"/><br />
              <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'customer.type' })} ref="type"/><br />
              <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'customer.description' })} ref="description"/><br />
              <button type="submit" className="btn btn-default">{intl.formatMessage({ id: 'submit' })}</button>
          </div>
        </form>
      </div>
    );
  }
}

//export default Menu
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectedLocale }, dispatch);
}

CreateCustomer.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(connect(null, mapDispatchToProps)(CreateCustomer));
//export default CreateCustomer;
