import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import {IntlProvider, addLocaleData, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { selectedLocale } from './actions/index';

class AddProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
    this.onSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    fetch('http://localhost:8080/rest/createproduct', {
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
          name: self.refs.name.value,
          catalog: self.refs.catalog.value,
          format: self.refs.format.value,
          cost: self.refs.cost.value,
          sellprice: self.refs.sellprice.value,
          description: self.refs.description.value,
        }),

      })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        window.location.href = '/listProducts';
      });
  }

  render() {
    const { intl, selectedLocale } = this.props;
    return (
      <div>
        <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'prodcut.name' })} ref="name"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'prodcut.catalog' })} ref="catalog"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'prodcut.format' })} ref="format"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'prodcut.cost' })} ref="cost"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'prodcut.sellprice' })} ref="sellprice"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'prodcut.description' })} ref="description"/><br />
            <button type="submit" className="btn btn-default">{intl.formatMessage({ id: 'submit' })}</button>
          </div>
        </form>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectedLocale }, dispatch);
}
AddProduct.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(connect(null, mapDispatchToProps)(AddProduct));
